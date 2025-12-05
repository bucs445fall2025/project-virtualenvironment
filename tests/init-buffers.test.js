import test from 'node:test';
import assert from 'node:assert/strict';
import { initBuffers } from '../public/js/init-buffers.js';

// Create a mock WebGL context
function createMockGL() {
  const calls = [];
  const gl = {
    ARRAY_BUFFER: 'ARRAY_BUFFER',
    STATIC_DRAW: 'STATIC_DRAW',
    createBuffer: () => ({ id: Math.random() }),
    bindBuffer: (target, buffer) => calls.push(['bindBuffer', target, buffer]),
    bufferData: (target, data, usage) => calls.push(['bufferData', target, Array.from(data), usage]),
    calls
  };
  return gl;
}

function createMockProj(width = 2, height = 2) {
    const data = {
      resolution: [width, height],
      // [layer][x][y] = [r,g,b,a]
      layers: [
        [
          [ [1, 0, 0, 1], [0, 1, 0, 1] ],
          [ [0, 0, 1, 1], [1, 1, 0, 1] ]
        ]
      ]
    };
  
    return {
      get_res: () => data.resolution,
      get_num_layers: () => data.layers.length,
      get_pix_sum: (x, y) => {
        // Sum across all layers
        let r = 0, g = 0, b = 0;
        for (const layer of data.layers) {
          const pix = layer[x][y];
          r += pix[0];
          g += pix[1];
          b += pix[2];
        }
        return [r, g, b];
      }
    };
  }
  

function createMockView() {
  return {
    get_res: () => 0.5,
    get_offset: () => [0, 0],
    get_layer: () => 0
  };
}

//
// ──────────────────────────────────────────────
//   TESTS
// ──────────────────────────────────────────────
//

test('initBuffers returns position and color buffers', () => {
  const gl = createMockGL();
  const proj = createMockProj();
  const view = createMockView();

  const result = initBuffers(gl, proj, view);

  assert.ok(result.position);
  assert.ok(result.color);
});

test('initPositionBuffer generates correct number of vertices', () => {
  const gl = createMockGL();
  const proj = createMockProj(2, 2);
  const view = createMockView();

  initBuffers(gl, proj, view);

  // 2x2 pixels → 4 cells → 6 vertices each → 24 vertices
  const bufferCall = gl.calls.find(([fn]) => fn === 'bufferData');
  const vertices = bufferCall[2];
  assert.strictEqual(vertices.length, 24 * 2); // each vertex has x,y = 2 components
});

test('initColorBuffer produces 3 color components per vertex', () => {
  const gl = createMockGL();
  const proj = createMockProj(2, 2);
  const view = createMockView();

  initBuffers(gl, proj, view);

  // last bufferData call corresponds to colors
  const colorCall = gl.calls.at(-1);
  const colors = colorCall[2];

  // 2x2 pixels * 6 vertices * 3 color components = 72 values
  assert.strictEqual(colors.length, 2 * 2 * 6 * 3);

  // Ensure colors came from our mock pixel data (like [1,0,0] etc.)
  const uniqueColors = [...new Set(colors)];
  assert.ok(uniqueColors.includes(1));
  assert.ok(uniqueColors.includes(0));
});

test('WebGL functions are called correctly', () => {
  const gl = createMockGL();
  const proj = createMockProj();
  const view = createMockView();

  initBuffers(gl, proj, view);

  const fns = gl.calls.map(([fn]) => fn);
  assert.ok(fns.includes('bindBuffer'));
  assert.ok(fns.includes('bufferData'));
});
