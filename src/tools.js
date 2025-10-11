
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

class tool_example  {

    constructor(view) {
        this.view = view;
    }

    start_pos = [0,0]
    end_pos = [0,0]
    on_mouse_down(x, y) {
        this.start_pos = [x,y];
        console.log(this.start_pos)
    }
    on_mouse_move(x, y, dx, dy) {
        this.end_pos = [x, y]
        //console.log(this.end_pos)
    }
    on_mouse_up(x, y) {
        this.end_pos = [x, y]
        console.log(this.end_pos)
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
                    rgba: [0.5, 0, 1, 0.5]
                })
            }
        }
        return data;
    }
}

class tool_example2 {
    

    constructor(view) {
        this.view = view;
        this.size = 4;
    }

    on_mouse_down(x, y) {
        this.data = {
            pix: []
        };
    }
    on_mouse_move(x, y, dx, dy) {
        for (let i = 0; i < this.size; i++) for (let j = 0; j < this.size; j++) this.data.pix.push({
            pos: [x+i-this.size/2, y+j-this.size/2],
            rgba: [1, 0, 0, 1]
        })
    }
    on_mouse_up(x, y) {

    }
    data_send() {
        return this.data;
    }

}

export { tool_example, tool_example2 }