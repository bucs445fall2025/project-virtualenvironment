function drawScene(gl, programInfo, buffers, proj, view) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT);

    setPositionAttribute(gl, buffers, programInfo);
    setColorAttribute(gl, buffers, programInfo);
    gl.useProgram(programInfo.program);

    const offset = 0;
    const vertexCount = proj.get_res()[0] * proj.get_res()[1] * 6;
    gl.drawArrays(gl.TRIANGLES, offset, vertexCount);

    // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.canvaspos);
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.canvascol);
    // gl.drawArrays(gl.LINES, offset, 8);
}

function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset,);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset,);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor)
}

export { drawScene };