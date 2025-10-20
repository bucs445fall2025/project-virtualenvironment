import test from 'node:test';
import assert from 'node:assert/strict';
import { tool_example, tool_example2 } from '../src/tools.js';

function createMockView() {
  return { get_res: () => 1, get_offset: () => [0, 0], get_layer: () => 0 };
}

test('tool_example tracks start and end positions correctly', () => {
  const tool = new tool_example(createMockView());

  tool.on_mouse_down(10, 20);
  assert.deepStrictEqual(tool.start_pos, [10, 20]);

  tool.on_mouse_move(30, 40, 20, 20);
  assert.deepStrictEqual(tool.end_pos, [30, 40]);

  tool.on_mouse_up(50, 60);
  assert.deepStrictEqual(tool.end_pos, [50, 60]);
});

test('tool_example data_send() creates correct pixel data for drag', () => {
  const tool = new tool_example(createMockView());
  tool.start_pos = [1, 1];
  tool.end_pos = [3, 3];

  const data = tool.data_send();

  // Expect a 3x3 square: (1,1) to (3,3) inclusive
  assert.strictEqual(data.pix.length, 9);
  assert.deepStrictEqual(data.pix[0], { pos: [1, 1], rgba: [0.5, 0, 1, 0.5] });
  assert.deepStrictEqual(data.pix.at(-1), { pos: [3, 3], rgba: [0.5, 0, 1, 0.5] });
});

test('tool_example data_send() works in reverse direction', () => {
  const tool = new tool_example(createMockView());
  tool.start_pos = [3, 3];
  tool.end_pos = [1, 1];

  const data = tool.data_send();

  assert.strictEqual(data.pix.length, 9);
  assert.deepStrictEqual(data.pix[0].pos, [3, 3]);
  assert.deepStrictEqual(data.pix.at(-1).pos, [1, 1]);
});

//
// ──────────────────────────────────────────────
//   TOOL_EXAMPLE2 TESTS
// ──────────────────────────────────────────────
//

test('tool_example2 initializes data correctly on mouse down', () => {
  const tool = new tool_example2(createMockView());
  tool.on_mouse_down(5, 5);

  assert.ok(tool.data);
  assert.deepStrictEqual(tool.data.pix, []);
});

test('tool_example2 on_mouse_move() adds pixels in brush square', () => {
  const tool = new tool_example2(createMockView());
  tool.on_mouse_down(50, 50);
  tool.on_mouse_move(50, 50, 0, 0);

  const { pix } = tool.data;
  assert.strictEqual(pix.length, tool.size ** 2); // 4x4 = 16 pixels

  // Check one of them is centered correctly
  const half = tool.size / 2;
  const expectedX = 50 + 0 - half;
  const expectedY = 50 + 0 - half;
  assert.deepStrictEqual(pix[0].pos, [expectedX, expectedY]);
  assert.deepStrictEqual(pix[0].rgba, [1, 0, 0, 1]);
});

test('tool_example2 data_send() returns the collected data', () => {
  const tool = new tool_example2(createMockView());
  tool.on_mouse_down(0, 0);
  tool.on_mouse_move(10, 10, 10, 10);
  const result = tool.data_send();

  assert.strictEqual(result, tool.data);
  assert.ok(Array.isArray(result.pix));
});
