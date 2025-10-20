

import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { View } from "./view.js";
import { project_api } from "./project-api.js";
import { tool_example, tool_example2 } from "./tools.js";

main();

function main() {

    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;
        varying lowp vec4 vColor;
        void main() {
            gl_Position = aVertexPosition;
            vColor = aVertexColor;
        }
    `;

    const fsSource = `
        varying lowp vec4 vColor;

        void main() {
            gl_FragColor = vColor;
        }
    `;

    const canvas = document.querySelector("#gl-canvas");
    const gl = canvas.getContext("webgl");

    const view = new View(gl);
    const proj = new project_api();

    if (gl === null) {
        alert("Unable to initialize WebGL.");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
        },
        uniformLocations: {
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    const buffers = initBuffers(gl, proj, view);
    drawScene(gl, programInfo, buffers, proj, view);
    
    let tool_active = false;
    let toolb = false;
    let t = new tool_example2(view);
    
    document.addEventListener("keydown", (event) => {
        if (event.key == "t") {
            if (toolb) {
                t = new tool_example2(view);
                toolb = false;
            } else {
                t = new tool_example(view);
                toolb = true;
            }
        } else if (event.key == "1") {
            view.mod_rgba(-0.1, 0, 0, 0);
        } else if (event.key == "2") {
            view.mod_rgba(0.1, 0, 0, 0);
        } else if (event.key == "3") {
            view.mod_rgba(0, -0.1, 0, 0);
        } else if (event.key == "4") {
            view.mod_rgba(0, 0.1, 0, 0);
        } else if (event.key == "5") {
            view.mod_rgba(0, 0, -0.1, 0);
        } else if (event.key == "6") {
            view.mod_rgba(0, 0, 0.1, 0);
        } else if (event.key == "7") {
            view.mod_rgba(0, 0, 0, -0.1);
        } else if (event.key == "8") {
            view.mod_rgba(0, 0, 0, 0.1);
        } else if (event.key == "]") {
            let l = view.get_layer();
            console.log(l)
            if (l < proj.get_num_layers()) view.select_layer(l + 1);
        } else if (event.key == "[") {
            let l = view.get_layer();
            if (l > 0) view.select_layer(l-1);
        }
    });

    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        view.scroll_up(event.deltaY * 0.00001);
        const buffers = initBuffers(gl, proj, view);
        drawScene(gl, programInfo, buffers, proj, view);
    }, { passive: false});

    canvas.addEventListener("mousedown", (event) => {
        //i*vres - 1 + vpos[0]
        if (event.buttons == 1) {
            let x = Math.round(((event.x*2/view.glw - 1) - view.get_offset()[0] + 1) / view.get_res() - 1);
            let y = Math.round((-1 * (event.y*2/view.glh - 1) - view.get_offset()[1] + 1) / view.get_res() - 1)
            tool_active = true;
            t.on_mouse_down(x, y, view.r(), view.g(), view.b(), view.a());
        }
    })

    canvas.addEventListener("mousemove", (event) => {
        if (event.buttons == 4) {
            view.add_offset(event.movementX, event.movementY);
            const buffers = initBuffers(gl, proj, view);
            drawScene(gl, programInfo, buffers, proj, view);
        } else 
        if (tool_active) {
            let x = Math.round(((event.x*2/view.glw - 1) - view.get_offset()[0] + 1) / view.get_res() - 1);
            let y = Math.round((-1 * (event.y*2/view.glh - 1) - view.get_offset()[1] + 1) / view.get_res() - 1)
            t.on_mouse_move(x, y);
        }
    });

    canvas.addEventListener("mouseup", (event) => {
        if (tool_active) {
            let x = Math.round(((event.x*2/view.glw - 1) - view.get_offset()[0] + 1) / view.get_res() - 1);
            let y = Math.round((-1 * (event.y*2/view.glh - 1) - view.get_offset()[1] + 1) / view.get_res() - 1)
            t.on_mouse_up(x, y);
            proj.update_pix(view.get_layer(), t.data_send());
            tool_active = false;
            const buffers = initBuffers(gl, proj, view);
            drawScene(gl, programInfo, buffers, proj, view);
        }
    })

}

function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLogo(shaderProgram,)}`,
        );
        return  null;
    }
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(`An error occured compiling the shaders: ${gl.getShaderInfoLog(shader)}`,);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}