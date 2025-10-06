function initBuffers(gl, proj) {
    const positionBuffer = initPositionBuffer(gl, proj);
    const colorBuffer = initColorBuffer(gl, proj);
    return {
        position: positionBuffer,
        color: colorBuffer
    };
}

function initPositionBuffer(gl, proj) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    let positions = [];

    const scalex = 2.0 / proj.resolution[0];
    const scaley = 2.0 / proj.resolution[1];
    const scale = (scalex < scaley) ? scalex : scaley;
    

    for (let l = 0; l < proj.layers.length; l++) {
        for (let j = 0; j < proj.resolution[1]; j++) {
            for (let i = 0; i < proj.resolution[0]; i++) {
                positions.push(i*scale - 1, j*scale - 1, i*scale + scale - 1, j*scale - 1, i*scale - 1, j*scale + scale - 1, i*scale + scale - 1, j*scale - 1, i*scale - 1, j*scale + scale - 1, i*scale + scale - 1, j*scale + scale - 1);
                console.log(positions.length);
            }
        }
    }

    console.log(scale)

    console.log(positions);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
    
}

function initColorBuffer(gl, proj) {
    let colors = [];
     for (let l = 0; l < proj.layers.length; l++) {
        for (let j = 0; j < proj.resolution[1]; j++) {
            for (let i = 0; i < proj.resolution[0]; i++) {
                for (let k = 0; k < 6; k++) {
                    colors.push(proj.layers[l][i][j][0], proj.layers[l][i][j][1], proj.layers[l][i][j][2], proj.layers[l][i][j][3]);
                }
            }
        }
    }

    console.log(colors)

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    return colorBuffer;
}

export { initBuffers }