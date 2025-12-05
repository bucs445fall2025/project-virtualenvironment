import test from 'node:test';
import assert from 'node:assert/strict';
import { View } from '../public/js/view.js';

function createMockGL(width = 800, height = 600) {
    return {
      drawingBufferWidth: width,
      drawingBufferHeight: height,
    };
  }

  
  test('View constructor sets correct width, height, and resolution', () => {
    const gl = createMockGL(400, 200);
    const view = new View(gl);
  
    assert.strictEqual(view.glw, 400);
    assert.strictEqual(view.glh, 200);
  
    // resolution = 1 / min(width, height)
    const expectedResolution = 1 / 200;
    assert.strictEqual(view.resolution, expectedResolution);
  });

  test('get_res(), get_offset(), and get_layer() return correct values', () => {
    const gl = createMockGL(500, 500);
    const view = new View(gl);
  
    assert.strictEqual(view.get_res(), view.resolution);
    assert.deepStrictEqual(view.get_offset(), [0, 0]);
    assert.strictEqual(view.get_layer(), 0);
  });

  test('scroll_up() increases or decreases resolution within bounds', () => {
    const gl = createMockGL(1000, 1000);
    const view = new View(gl);
  
    // Starting resolution = 1 / 1000 = 0.001
    view.scroll_up(0.1);
    assert.strictEqual(view.resolution, 0.001 + 0.1);
  
    // Large positive delta should clamp to 1
    view.scroll_up(10);
    assert.strictEqual(view.resolution, 1);
  
    // Large negative delta should clamp to 0.00001
    view.scroll_up(-10);
    assert.strictEqual(view.resolution, 0.00001);
  });

  test('add_offset() correctly modifies offset based on dx and dy', () => {
    const gl = createMockGL(400, 200);
    const view = new View(gl);
  
    // dx increases x-offset; dy decreases y-offset
    view.add_offset(40, 20);
  
    const expectedX = 40 / 400; // 0.1
    const expectedY = -20 / 200; // -0.1
  
    assert.deepStrictEqual(view.get_offset(), [expectedX, expectedY]);
  });

  test('add_offset() correctly modifies offset based on dx and dy', () => {
    const gl = createMockGL(400, 200);
    const view = new View(gl);
  
    // dx increases x-offset; dy decreases y-offset
    view.add_offset(40, 20);
  
    const expectedX = 40 / 400; // 0.1
    const expectedY = -20 / 200; // -0.1
  
    assert.deepStrictEqual(view.get_offset(), [expectedX, expectedY]);
  });
  