import test from 'node:test';
import assert from 'node:assert/strict';

import { drawScene } from '../public/js/draw-scene.js';

// Mock WebGL context for testing
function createMockGL() {
    return {
        clearColor: () => {},
        clearDepth: () => {},
        enable: () => {},
        depthFunc: () => {},
        clear: () => {},
        bindBuffer: () => {},
        vertexAttribPointer: () => {},
        enableVertexAttribArray: () => {},
        useProgram: () => {},
        drawArrays: () => {},
        ARRAY_BUFFER: 34962,
        COLOR_BUFFER_BIT: 16384,
        DEPTH_TEST: 2929,
        LEQUAL: 515,
        TRIANGLES: 4,
        FLOAT: 5126
    };
}

// Mock project API for testing
function createMockProjectAPI() {
    return {
        get_res: () => [400, 400]
    };
}

// Mock view for testing
function createMockView() {
    return {
        get_res: () => 0.01,
        get_offset: () => [0, 0],
        get_layer: () => 0
    };
}

test('drawScene calls WebGL methods in correct order', () => {
    const gl = createMockGL();
    const programInfo = {
        program: 'mock-program',
        attribLocations: {
            vertexPosition: 0,
            vertexColor: 1
        }
    };
    const buffers = {
        position: 'mock-position-buffer',
        color: 'mock-color-buffer'
    };
    const proj = createMockProjectAPI();
    const view = createMockView();

    // Track method calls
    const calls = [];
    const originalMethods = {
        clearColor: gl.clearColor,
        clearDepth: gl.clearDepth,
        enable: gl.enable,
        depthFunc: gl.depthFunc,
        clear: gl.clear,
        bindBuffer: gl.bindBuffer,
        vertexAttribPointer: gl.vertexAttribPointer,
        enableVertexAttribArray: gl.enableVertexAttribArray,
        useProgram: gl.useProgram,
        drawArrays: gl.drawArrays
    };

    gl.clearColor = (...args) => { calls.push(['clearColor', args]); originalMethods.clearColor(...args); };
    gl.clearDepth = (...args) => { calls.push(['clearDepth', args]); originalMethods.clearDepth(...args); };
    gl.enable = (...args) => { calls.push(['enable', args]); originalMethods.enable(...args); };
    gl.depthFunc = (...args) => { calls.push(['depthFunc', args]); originalMethods.depthFunc(...args); };
    gl.clear = (...args) => { calls.push(['clear', args]); originalMethods.clear(...args); };
    gl.bindBuffer = (...args) => { calls.push(['bindBuffer', args]); originalMethods.bindBuffer(...args); };
    gl.vertexAttribPointer = (...args) => { calls.push(['vertexAttribPointer', args]); originalMethods.vertexAttribPointer(...args); };
    gl.enableVertexAttribArray = (...args) => { calls.push(['enableVertexAttribArray', args]); originalMethods.enableVertexAttribArray(...args); };
    gl.useProgram = (...args) => { calls.push(['useProgram', args]); originalMethods.useProgram(...args); };
    gl.drawArrays = (...args) => { calls.push(['drawArrays', args]); originalMethods.drawArrays(...args); };

    drawScene(gl, programInfo, buffers, proj, view);

    // Verify the sequence of calls
    assert.strictEqual(calls[0][0], 'clearColor');
    assert.deepStrictEqual(calls[0][1], [1.0, 1.0, 1.0, 1.0]);
    
    assert.strictEqual(calls[1][0], 'clearDepth');
    assert.deepStrictEqual(calls[1][1], [1.0]);
    
    assert.strictEqual(calls[2][0], 'enable');
    assert.strictEqual(calls[2][1][0], gl.DEPTH_TEST);
    
    assert.strictEqual(calls[3][0], 'depthFunc');
    assert.strictEqual(calls[3][1][0], gl.LEQUAL);
    
    assert.strictEqual(calls[4][0], 'clear');
    assert.strictEqual(calls[4][1][0], gl.COLOR_BUFFER_BIT);
    
    // Verify drawArrays is called with correct parameters
    const drawArraysCall = calls.find(call => call[0] === 'drawArrays');
    assert.ok(drawArraysCall);
    assert.strictEqual(drawArraysCall[1][0], gl.TRIANGLES);
    assert.strictEqual(drawArraysCall[1][1], 0); // offset
    assert.strictEqual(drawArraysCall[1][2], 400 * 400 * 6); // vertexCount
});

test('setPositionAttribute configures vertex attributes correctly', () => {
    const gl = createMockGL();
    const programInfo = {
        attribLocations: {
            vertexPosition: 2
        }
    };
    const buffers = {
        position: 'mock-position-buffer'
    };

    const calls = [];
    gl.bindBuffer = (...args) => { calls.push(['bindBuffer', args]); };
    gl.vertexAttribPointer = (...args) => { calls.push(['vertexAttribPointer', args]); };
    gl.enableVertexAttribArray = (...args) => { calls.push(['enableVertexAttribArray', args]); };

    // Import the function directly (it's not exported, so we need to test it through drawScene)
    // For this test, we'll verify the behavior through the drawScene function
    drawScene(gl, programInfo, buffers, createMockProjectAPI(), createMockView());

    // Find the position attribute setup calls
    const bindBufferCalls = calls.filter(call => call[0] === 'bindBuffer');
    const vertexAttribPointerCalls = calls.filter(call => call[0] === 'vertexAttribPointer');
    const enableVertexAttribArrayCalls = calls.filter(call => call[0] === 'enableVertexAttribArray');

    // Verify position buffer is bound
    const positionBindCall = bindBufferCalls.find(call => call[1][1] === 'mock-position-buffer');
    assert.ok(positionBindCall);
    assert.strictEqual(positionBindCall[1][0], gl.ARRAY_BUFFER);

    // Verify vertex attribute pointer is set correctly
    const positionAttribCall = vertexAttribPointerCalls.find(call => call[1][0] === 2);
    assert.ok(positionAttribCall);
    assert.strictEqual(positionAttribCall[1][1], 2); // numComponents
    assert.strictEqual(positionAttribCall[1][2], gl.FLOAT); // type
    assert.strictEqual(positionAttribCall[1][3], false); // normalize
    assert.strictEqual(positionAttribCall[1][4], 0); // stride
    assert.strictEqual(positionAttribCall[1][5], 0); // offset

    // Verify vertex attribute array is enabled
    const enablePositionCall = enableVertexAttribArrayCalls.find(call => call[1][0] === 2);
    assert.ok(enablePositionCall);
});

test('setColorAttribute configures color attributes correctly', () => {
    const gl = createMockGL();
    const programInfo = {
        attribLocations: {
            vertexColor: 3
        }
    };
    const buffers = {
        color: 'mock-color-buffer'
    };

    const calls = [];
    gl.bindBuffer = (...args) => { calls.push(['bindBuffer', args]); };
    gl.vertexAttribPointer = (...args) => { calls.push(['vertexAttribPointer', args]); };
    gl.enableVertexAttribArray = (...args) => { calls.push(['enableVertexAttribArray', args]); };

    drawScene(gl, programInfo, buffers, createMockProjectAPI(), createMockView());

    // Find the color attribute setup calls
    const bindBufferCalls = calls.filter(call => call[0] === 'bindBuffer');
    const vertexAttribPointerCalls = calls.filter(call => call[0] === 'vertexAttribPointer');
    const enableVertexAttribArrayCalls = calls.filter(call => call[0] === 'enableVertexAttribArray');

    // Verify color buffer is bound
    const colorBindCall = bindBufferCalls.find(call => call[1][1] === 'mock-color-buffer');
    assert.ok(colorBindCall);
    assert.strictEqual(colorBindCall[1][0], gl.ARRAY_BUFFER);

    // Verify color attribute pointer is set correctly
    const colorAttribCall = vertexAttribPointerCalls.find(call => call[1][0] === 3);
    assert.ok(colorAttribCall);
    assert.strictEqual(colorAttribCall[1][1], 3); // numComponents
    assert.strictEqual(colorAttribCall[1][2], gl.FLOAT); // type
    assert.strictEqual(colorAttribCall[1][3], false); // normalize
    assert.strictEqual(colorAttribCall[1][4], 0); // stride
    assert.strictEqual(colorAttribCall[1][5], 0); // offset

    // Verify color attribute array is enabled
    const enableColorCall = enableVertexAttribArrayCalls.find(call => call[1][0] === 3);
    assert.ok(enableColorCall);
});
