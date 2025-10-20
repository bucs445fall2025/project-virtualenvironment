class View {
    offset = [0,0];
    layer = 0;
    rgba = [1, 1, 1, 1];

    constructor(gl) {
        this.glw = gl.drawingBufferWidth;
        this.glh = gl.drawingBufferHeight;
        this.resolution = 1 / Math.min(this.glw, this.glh);
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

    mod_rgba(dr, dg, db, da) {
        this.rgba[0] = Math.min(1, Math.max(0, this.rgba[0] + dr));
        this.rgba[1] = Math.min(1, Math.max(0, this.rgba[1] + dg));
        this.rgba[2] = Math.min(1, Math.max(0, this.rgba[2] + db));
        this.rgba[3] = Math.min(1, Math.max(0, this.rgba[3] + da));
        console.log(this.rgba)

    }

    r() { return this.rgba[0]; }
    g() { return this.rgba[1]; }
    b() { return this.rgba[2]; }
    a() { return this.rgba[3]; }

}

export { View };