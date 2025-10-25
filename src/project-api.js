class project_api {
    
    constructor() {
        let w = 400
        let h = 400
        this.data = {resolution : [w, h],layers : [[]], layer_data: []};
        for (let i = 0; i < w; i++) {
            this.data.layers[0].push([]);
            this.data.layer_data.push([1]);
            for (let j = 0; j < h; j++) {
                this.data.layers[0][i].push([0, 0, 0, 1]);
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
        if (this.data.layer_data[0][0] == 1) col.push(this.data.layers[0][x][y][0],
            this.data.layers[0][x][y][1],
            this.data.layers[0][x][y][2],
            this.data.layers[0][x][y][3]
            ); 
        else {
            col = [0,0,0,0];
        }
        for (let l = 0; l < this.get_num_layers(); l++) {
            if (this.data.layer_data[l][0] == 0) continue;
            let pix = this.data.layers[l][x][y];
            col[0] = Math.min(1, col[0] * col[3] * (1 - pix[3]) + pix[0] * pix[3]);
            col[1] = Math.min(1, col[1] * col[3] * (1 - pix[3]) + pix[1] * pix[3]);
            col[2] = Math.min(1, col[2] * col[3] * (1 - pix[3]) + pix[2] * pix[3]);
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

    add_layer(layer_index) {
        let new_layer = [];
        for (let i = 0; i < this.data.resolution[0]; i++) {
            new_layer.push([]);
            for (let j = 0; j < this.data.resolution[1]; j++) {
                new_layer[i].push([0, 0, 0, 0]);
            }
        }

        this.data.layers = this.data.layers.slice(0, layer_index+1).concat([new_layer]).concat(this.data.layers.slice(layer_index+1, this.get_num_layers()));
        this.data.layer_data = this.data.layer_data.slice(0, layer_index+1).concat([1]).concat(this.data.layer_data.slice(layer_index+1, this.get_num_layers()));
        console.log(this.data);
    }
}

export { project_api };