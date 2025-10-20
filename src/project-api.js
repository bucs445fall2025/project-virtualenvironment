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
        for (let i = 1; i < 10; i++) {
            this.data.layers.push([]);
            for (let j = 0; j < w; j++) {
                this.data.layers[i].push([]);
                for (let k = 0; k < h; k++) {
                    this.data.layers[i][j].push([0,0,0,0]);
                }
            }
        }
    }

    get_res() {
        return this.data.resolution;
    }

    get_num_layers() {
        return this.data.layers.length;
    }

    get_pix(layer, x, y) {
        return this.data.layers[layer][x][y];
    }

    get_pix_sum(x, y) {
        let col = [];
        col.push(this.data.layers[0][x][y][0],
            this.data.layers[0][x][y][1],
            this.data.layers[0][x][y][2],
            this.data.layers[0][x][y][3]
        );
        for (let l = 0; l < this.get_num_layers(); l++) {
            let pix = this.data.layers[l][x][y];
            col[0] = Math.min(1, col[0] * col[3] * (1 - pix[3]) + pix[0] * pix[3]/col[3]);
            col[1] = Math.min(1, col[0] * col[3] * (1 - pix[3]) + pix[1] * pix[3]/col[3]);
            col[2] = Math.min(1, col[2] * col[3] * (1 - pix[3]) + pix[2] * pix[3]/col[3]);
            col[3] = Math.min(1, col[3] * (1 - pix[3]) + pix[3]);
        }
        return col;
    }

    update_pix(layer, data) {
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