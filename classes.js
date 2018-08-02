const plantcolor = color(0, 255, 0);
const nutcolor = color(139, 69, 19);

class Plant {
    constructor() {
        do {
            this.health = floor(random(5, 10));
            this.nut = floor(random(5, 10));
        } while (this.r < 10);

        this.pos = {
            x: random(this.r, width - this.r),
            y: random(this.r, height - this.r)
        };
    }

    get r() {
        return this.health + this.nut;
    }

    show() {
        //outer circle (nut)
        fill(nutcolor);
        ellipse(this.pos.x, this.pos.y, this.r);
        //inner circle (plant)
        fill(plantcolor);
        ellipse(this.pos.x, this.pos.y, this.health);
    }

}

