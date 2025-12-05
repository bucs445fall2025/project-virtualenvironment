import test from 'node:test';
import assert from 'node:assert/strict';

import { project_api } from '../public/js/project-api.js';

test('constructor initializes correct resolution and data shape', () => {
    const api = new project_api();
  
    const res = api.get_res();
    assert.deepStrictEqual(res, [400, 400]);
  
    // Check number of layers
    assert.strictEqual(api.data.layers.length, 1);
  
    // Check one pixel structure (should be [0, 0, 0, 1])
    const pix = api.get_pix(0, 0, 0);
    assert.deepStrictEqual(pix, [0, 0, 0, 1]);
  });

  test('get_res() returns correct resolution', () => {
    const api = new project_api();
    assert.deepStrictEqual(api.get_res(), [400, 400]);
  });

  test('get_num_layers() returns correct number of layers', () => {
    const api = new project_api();
    assert.strictEqual(api.get_num_layers(), 1);
  });

  test('get_pix() returns correct pixel RGBA', () => {
    const api = new project_api();
    const pixel = api.get_pix(0, 10, 10);
    assert.deepStrictEqual(pixel, [0, 0, 0, 1]);
  });

  test('update_pix() updates pixel values with correct alpha blending', () => {
    const api = new project_api();
  
    // Set one pixel at (5,5) to semi-transparent red
    const data = {
      pix: [
        {
          pos: [5, 5],
          rgba: [1, 0, 0, 0.5], // 50% red
        },
      ],
    };
  
    api.update_pix(0, data);
  
    const updated = api.get_pix(0, 5, 5);
    const expected = [0.5, 0, 0, 1];
  
    assert.deepStrictEqual(updated, expected);
  });

  test('update_pix() skips out-of-bounds pixels safely', () => {
    const api = new project_api();
  
    // This pixel is outside the 400x400 resolution
    const data = {
      pix: [
        { pos: [999, 10], rgba: [1, 1, 1, 1] },
        { pos: [-1, -1], rgba: [1, 1, 1, 1] },
      ],
    };
  
    // Should not throw
    assert.doesNotThrow(() => api.update_pix(0, data));
  
    // Ensure normal pixels unchanged
    const untouched = api.get_pix(0, 0, 0);
    assert.deepStrictEqual(untouched, [0, 0, 0, 1]);
  });
  
  


  