class project_api {
    
    constructor() {
        let w = 400
        let h = 400
        this.data = {resolution : [w, h],layers : [[]]};
        for (let i = 0; i < w; i++) {
            this.data.layers[0].push([]);
            for (let j = 0; j < h; j++) {
                this.data.layers[0][i].push([0, 0, 0, 1]);
            }
        }
    }

    get_res() {
        return this.data.resolution;
    }

    get_num_layers() {
        return this.layers.length;
    }

    get_pix(layer, x, y) {
        return this.data.layers[layer][x][y];
    }

    update_pix(layer, data) {
        console.log(data);
        for (let i = 0; i < data.pix.length; i++) {
            if (data.pix[i].pos[0] > this.data.resolution[0] || data.pix[i].pos[1] > this.data.resolution[1]
                || data.pix[i].pos[0] < 0 || data.pix[i].pos[1] < 0
            ) continue;
            let p0 = this.data.layers[layer][data.pix[i].pos[0]][data.pix[i].pos[1]];
            let p1 = data.pix[i].rgba;
            let rgba_out = [
                p1[0] * p1[3] + p0[0] * p0[3] * (1 - p1[3]),
                p1[1] * p1[3] + p0[1] * p0[3] * (1 - p1[3]),
                p1[2] * p1[3] + p0[2] * p0[3] * (1 - p1[3]),
                p1[3] + p0[3] * (1 - p1[3])
            ];
            this.data.layers[layer][data.pix[i].pos[0]][data.pix[i].pos[1]] = rgba_out;
        }
    }
}

export { project_api };