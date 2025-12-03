

import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { View } from "./view.js";
import { project_api } from "./project-api.js";
import { tool_example, tool_example2 } from "./tools.js";

main();

async function main() {

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

    const project_name = new URLSearchParams(window.location.search).get("name");
    setName(); //Small function
    const save_button = document.getElementById("save_image");
    const close_popup = document.getElementById("close");
    const notification = document.getElementById('notification');

    save_button.addEventListener('click', saveToDB);
    close_popup.addEventListener('click', closeNoti);

    const canvas = document.querySelector("#gl-canvas");
    const gl = canvas.getContext("webgl");
    const view = new View(gl);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    view.update_wh(gl);
    let proj;

    await loadProject();
    
    async function loadProject(){
        const result = await fetch("http://localhost:3000/api/data/load_project", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({
                project_name: project_name
            })
        }
        );
        const data = await result.json();
        // If data is empty, initialize an empty project file
        if (data.data.layers.length == 0){
            proj = new project_api();
        }
        else {
            // Otherwise, load from project
            proj = new project_api(data.data);
        }
    }

    // const proj = new project_api();

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
    
    // window.addEventListener('resize', () =>  {
    //     canvas.width = canvas.clientWidth;
    //     canvas.height = canvas.clientHeight;
    //     gl.viewport(0, 0, canvas.width, canvas.height);
    //     view.update_wh(gl);

    // })

    document.addEventListener("keydown", (event) => {
       
        if (event.key == "1") {
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
            if (l < proj.get_num_layers()-1) view.select_layer(l + 1);
        } else if (event.key == "[") {
            let l = view.get_layer();
            if (l > 0) view.select_layer(l-1);
        } else if (event.key == "v") {
            proj.data.layer_data[view.get_layer()][0] = proj.data.layer_data[view.get_layer()][0] == 1 ? 0 : 1;
            const buffers = initBuffers(gl, proj, view);
            drawScene(gl, programInfo, buffers, proj, view);
        } else if (event.key == "=") {
            proj.add_layer(view.get_layer());
            drawScene(gl, programInfo, buffers, proj, view);
        }
    });

    document.getElementById("button_draw").addEventListener("click", function() {
        if (!toolb) {
            t = new tool_example2(view);
            toolb = true;
        }
    });

    document.getElementById("button_shape").addEventListener("click", function() {
        if (toolb) {
            t = new tool_example(view);
            toolb = false;
        }
    });

    const colorpicker = document.getElementById("ui-color");
    colorpicker.addEventListener("input", function() { 
        view.set_rgba(parseInt(colorpicker.value.substring(1,3), 16)/255, parseInt(colorpicker.value.substring(3,5), 16)/255, parseInt(colorpicker.value.substring(5,7), 16)/255, 1);
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
            let x = Math.round((((event.offsetX)/view.glw)*2 - view.get_offset()[0]) / view.get_res());
            let y = Math.round(((1 - (event.offsetY)/view.glh)*2 - view.get_offset()[1]) / view.get_res());
            tool_active = true;
            console.log("x:", x, "y:", y, "client x:", event.offsetX, "client y:", event.offsetY, "offsets:", view.get_offset(), "glw:", view.glw, "glh:", view.glh, "res:", view.get_res());
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
            let offsets = canvas.getBoundingClientRect();
            let x = Math.round((((event.offsetX)/view.glw)*2 - view.get_offset()[0]) / view.get_res());
            let y = Math.round(((1 - (event.offsetY)/view.glh)*2 - view.get_offset()[1]) / view.get_res());
            t.on_mouse_move(x, y);
        }
    });
    
    canvas.addEventListener("mouseup", (event) => {
        if (tool_active) {
            let x = Math.round((((event.offsetX)/view.glw) - view.get_offset()[0]) / view.get_res() * 2);
            let y = Math.round(((1 - (event.offsetY)/view.glh) - view.get_offset()[1]) / view.get_res() * 2);
            t.on_mouse_up(x, y);
            proj.update_pix(view.get_layer(), t.data_send());
            tool_active = false;
            const buffers = initBuffers(gl, proj, view);
            drawScene(gl, programInfo, buffers, proj, view);
        }
    });

    async function saveToDB(){
        let noti_message = "Project Saved!"
        try {
            const result = await fetch("http://localhost:3000/api/data/save_project", {
                method: "POST",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    create_new: false,
                    project_name: project_name,
                    resolution: proj.data.resolution,
                    layers: proj.data.layers,
                    layer_data: proj.data.layer_data
                })
            }
            )
            const response = await result.json();
            if (response.error){
                console.log(response.error);
            }
    }
    catch(error){
        console.log(error.message);
        noti_message = "Project Unable To Be Saved"
    }

    const noti_text = document.getElementById('noti-text');
    noti_text.textContent = noti_message;
    // Now Show Notification Popup
    showNoti();

    }
    function showNoti(){
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.add("hide");
            setTimeout(() => {
                notification.classList.remove("hide", "show");
            }, 400)
        }, 5000);
    }
    function closeNoti(){
        //Closes noti if cross button is clicked
        notification.classList.remove("show");
    }

    function setName(){
        const title = document.getElementById("file-title");
        title.textContent = project_name;
    }

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
