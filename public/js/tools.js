
/*

Every tool is defined as a class that implements the tool interface as follows:

on_mouse_down(x, y)
- called on left-click
- x and y is mouse position
on_mouse_move(x, y, dx, dy)
- called every frame while mouse button held
- x and y is mouse position, dx and dy is change since last frame
on_mouse_up(x, y)
- called when mouse button released
- x and y is mouse position
preview_send()
- called every frame while mouse button held
- returns preview data for renderer 
- will leave unimplemented for now
data_send()
- called when mouse button released
- sends edits to project api as data object
- data format is as follows:
data [
    pix: [
        {
            pos: [x, y], // pixel position in document
            rgba: [r, g, b, a] // updated color value, note that the alpha is combined with the existing pixel, not replaced (ie. if a = 0.5, new pixel will be half existing color, half new colors)
        }, ...
]

*/

class t_rectangle  {

    constructor(view) {
        this.view = view;
    }

    start_pos = [0,0]
    end_pos = [0,0]
    rgba = [0,0,0,0]
    on_mouse_down(x, y, r, g, b, a, layer) {
        this.start_pos = [x,y];
        this.rgba = [r,g,b,a];
        this.layer = layer;
    }
    on_mouse_move(x, y, dx, dy) {
        this.end_pos = [x, y]
    }
    on_mouse_up(x, y) {
        this.end_pos = [x, y]
    }
    data_send() {
        let spos = this.start_pos;
        let epos = this.end_pos;
        let data = {
            pix: []
        };
        for (let i = spos[0]; (epos[0] > spos[0]) ? i <= epos[0] : i >= epos[0]; i = (epos[0] > spos[0]) ? i + 1 : i - 1) {
            for (let j = spos[1]; (epos[1] > spos[1]) ? j <= epos[1] : j >= epos[1]; j = (epos[1] > spos[1]) ? j + 1 : j - 1) {
                data.pix.push({
                    pos: [i, j],
                    rgba: this.rgba
                })
            }
        }
        return data;
    }
}

class t_pencil {
    

    rgba = [0,0,0,0];
    last_pix = [0,0];
    constructor(view) {
        this.view = view;
        this.size = 4;
    }

    on_mouse_down(x, y, r, g, b, a) {
        this.rgba = [r,g,b,a];
        this.last_pix = [x,y];
        console.log(x, y)
        this.data = {
            pix: []
        };
        for (let i = 0; i < this.size; i++) for (let j = 0; j < this.size; j++) this.data.pix.push({
                pos: [x+i-this.size/2, y+j-this.size/2],
                rgba: this.rgba
            })
    }
    on_mouse_move(x, y) {
        let dx = x - this.last_pix[0];
        let dy = y - this.last_pix[1];
        if (Math.abs(dx) >= Math.abs(dy)) {
            let cx = this.last_pix[0];
            let cyr = this.last_pix[1];
            let cy = cyr;
            let dif = Math.sign(dx);
            for (let k = 1; k <= Math.abs(dx); k++) {
                cx += dif;
                cyr += dy/Math.abs(dx);
                cy = Math.floor(cyr);
                for (let i = 0; i < this.size; i++) for (let j = 0; j < this.size; j++) this.data.pix.push({
                    pos: [cx+i-this.size/2, cy+j-this.size/2],
                    rgba: this.rgba
                })
            }
        } else {
            let cxr = this.last_pix[0];
            let cx = cxr
            let cy = this.last_pix[1];
            let dif = Math.sign(dy);
            for (let k = 1; k <= Math.abs(dy); k++) {
                cy += dif;
                cxr += dx/Math.abs(dy);
                cx = Math.floor(cxr);
                for (let i = 0; i < this.size; i++) for (let j = 0; j < this.size; j++) this.data.pix.push({
                    pos: [cx+i-this.size/2, cy+j-this.size/2],
                    rgba: this.rgba
                })
            }
        }
        this.last_pix = [x, y]
    }
    on_mouse_up(x, y) {

    }
    data_send() {
        return this.data;
    }

}

class t_fill {
    on_mouse_down(x, y, r, g, b, a, layer) {
        this.rgba = [r,g,b,a];
        this.layer = layer;
    }
    on_mouse_move(x, y, dx, dy) {

    }
    on_mouse_up(x, y) {

    }
    data_send() {
        this.data = { pix: [] };
        for (let i = 0; i < this.layer.length; i++) {
            for (let j = 0; j < this.layer[0].length; j++) {
                this.data.pix.push({pos: [i, j], rgba: this.rgba});
            }
        }
        return this.data;
    }
}

class t_floodfill {
    // unfinished
    constructor(view) {
        this.view = view;
    }

    pos = [0,0]
    rgba = [0,0,0,0]
    on_mouse_down(x, y, r, g, b, a, layer) {
        this.pos = [x,y];
        this.rgba = [r,g,b,a];
        this.layer = layer;
        this.pq = [];
    }
    on_mouse_move(x, y, dx, dy) {

    }
    on_mouse_up(x, y) {

    }

    data_send() {
        this.data = { pix: [] };
        this.select_col = this.layer[this.pos[0]][this.pos[1]];
        this.data.pix.push({ pos: this.pos, rgba: this.rgba });
        this.pq.push([this.pos[0] + 1, this.pos[1], 0]);
        this.pq.push([this.pos[0] + 1, this.pos[1] - 1, 1]);
        this.pq.push([this.pos[0], this.pos[1] - 1, 2]);
        this.pq.push([this.pos[0] - 1, this.pos[1] - 1, 3]);
        this.pq.push([this.pos[0] - 1, this.pos[1], 4]);
        this.pq.push([this.pos[0] - 1, this.pos[1] + 1, 5]);
        this.pq.push([this.pos[0], this.pos[1] + 1, 6]);
        this.pq.push([this.pos[0] + 1, this.pos[1] + 1, 7]);
        while (this.pq.length > 0) {
            const s = this.pq.length
            for (let i = 0; i < s; i++) {
                if (this.pq[i][0] < 0 || this.pq[i][0] >= this.layer.length || this.pq[i][1] >= this.layer[0].length || this.pq[i][1] < 0);
                if (this.layer[this.pq[i][0]][this.pq[i][1]][0] == this.select_col[0] && this.layer[this.pq[i][0]][this.pq[i][1]][1] == this.select_col[1] && this.layer[this.pq[i][0]][this.pq[i][1]][2] == this.select_col[2]) {
                    this.data.pix.push({ pos: [this.pq[i][0], this.pq[i][1]], rgba: this.rgba });
                    if (this.pq[i][2] == 7 || this.pq[i][2] == 0 || this.pq[i][2] == 1) this.pq.push([this.pq[i][0] + 1, this.pq[i][1], 0]);
                    if (this.pq[i][2] == 0 || this.pq[i][2] == 1 || this.pq[i][2] == 2) this.pq.push([this.pq[i][0] + 1, this.pq[i][1] - 1, 1]);
                    if (this.pq[i][2] == 1 || this.pq[i][2] == 2 || this.pq[i][2] == 3) this.pq.push([this.pq[i][0], this.pq[i][1] - 1, 2]);
                    if (this.pq[i][2] == 2 || this.pq[i][2] == 3 || this.pq[i][2] == 4) this.pq.push([this.pq[i][0] - 1, this.pq[i][1] - 1, 3]);
                    if (this.pq[i][2] == 3 || this.pq[i][2] == 4 || this.pq[i][2] == 5) this.pq.push([this.pq[i][0] - 1, this.pq[i][1], 4]);
                    if (this.pq[i][2] == 4 || this.pq[i][2] == 5 || this.pq[i][2] == 6) this.pq.push([this.pq[i][0] - 1, this.pq[i][1] + 1, 5]);
                    if (this.pq[i][2] == 5 || this.pq[i][2] == 6 || this.pq[i][2] == 7) this.pq.push([this.pq[i][0], this.pq[i][1] + 1, 6]);
                    if (this.pq[i][2] == 6 || this.pq[i][2] == 7 || this.pq[i][2] == 0) this.pq.push([this.pq[i][0] + 1, this.pq[i][1] + 1, 7]);
                }
            }
            this.pq = this.pq.slice(s+1);
            console.log(this.pq);
        }
        console.log(this.data);
        return this.data;
    }
}

export { t_pencil, t_rectangle, t_fill }