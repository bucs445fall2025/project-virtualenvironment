class View {
    offset = [0,0];
    layer = 0;

    constructor(gl) {
        this.glw = gl.drawingBufferWidth;
        this.glh = gl.drawingBufferHeight;
        this.resolution = 1 / Math.min(this.glw, this.glh);
        console.log(this.resolution);
    }

    get_res () {
        return this.resolution;
    }
    get_offset () {
        return this.offset;
    }
    get_layer () {
        return this.layer;
    }

    scroll_up(delta) {
        this.resolution = Math.max(0.00001, Math.min(1, this.resolution + delta));
    }

    add_offset(dx, dy) {
        this.offset[0] += dx / this.glw;
        this.offset[1] -= dy / this.glh;
    }
}

export { View };