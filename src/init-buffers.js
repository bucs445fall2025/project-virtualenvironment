function initBuffers(gl, proj, view) {
    const positionBuffer = initPositionBuffer(gl, proj, view);
    const colorBuffer = initColorBuffer(gl, proj, view);

    return {
        position: positionBuffer,
        color: colorBuffer
    };
}

function initPositionBuffer(gl, proj, view) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let positions = [];

    const vres = view.get_res();
    const vpos = view.get_offset();
    const pres = proj.get_res();
    
    for (let i = 0; i < pres[0]; i++) {
        for (let j = 0; j < pres[1]; j++) {
            positions.push(
                i*vres - 1 + vpos[0], j*vres - 1 + vpos[1],
                i*vres + vres - 1 + vpos[0], j*vres - 1 + vpos[1],
                i*vres - 1 + vpos[0], j*vres + vres - 1 + vpos[1],
                i*vres + vres - 1 + vpos[0], j*vres - 1 + vpos[1],
                i*vres - 1 + vpos[0], j*vres + vres - 1 + vpos[1],
                i*vres + vres - 1 + vpos[0], j*vres + vres - 1 + vpos[1]
            );
        }
    }
//    positions.push(
//     -1, -1, -1, 0, 0, -1, -1, 0, 0, -1, 0, 0
//    );
//    positions.push(
//     -1, 0, -1, 1, 0, 0, -1, 1, 0, 0, 0, 1
//    )

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
    
}

function initColorBuffer(gl, proj, view) {
    const pres = proj.get_res();
    const llen = proj.get_num_layers();
    let colors = [];
    
    for (let i = 0; i < pres[0]; i++) {
        for (let j = 0; j < pres[1]; j++) {
            let pix = proj.get_pix_sum(i, j);
            for (let k = 0; k < 6; k++) {
                colors.push(
                    pix[0], pix[1], pix[2]
                );
            }
        }
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    return colorBuffer;
}

export { initBuffers }