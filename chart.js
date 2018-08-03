class Chart {
    constructor() {
        this.values = new Set();
        this.max = 1;
        this.colors = {
            plant: plantcolor,
            herbivore: herbivorecolor,
            carnivore: carnivorecolor
        };
    }

    add(keys, vals) {
        let value = {};
        keys.forEach((k, i) => {
            value[k] = vals[i];
            this.max = max(this.max, vals[i]);
        });
        this.values.add(value);
    }

    show() {
        if (this.values.size < 1) return;
        let step = width / this.values.size;
        let multY = height / this.max;
        let last = new Map();
        let i = -1;
        this.values.forEach(v => {
            i++;
            if (i % ceil(1 / step) != 0) return;
            let x = i * step;
            for (let key in v) {
                let y = height - v[key] * multY;
                if (this.colors[key]) stroke(this.colors[key]);
                else stroke(255);
                strokeWeight(5);
                if (step > 10) point(x, y);
                strokeWeight(2);
                if (last.has(key)) line(x - step, last.get(key), x, y);
                last.set(key, y);
            }
        });
    }
}