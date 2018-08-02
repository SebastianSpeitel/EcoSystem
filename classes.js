//const plantcolor = color(0, 255, 0);
//const nutcolor = color(139, 69, 19);

class LifeForm {
    constructor() {
        this.pos = { x: 0, y: 0 };
    }

    set r(r) {
        this._r = r;
    }

    get r() {
        return _r || 10;
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
    
}

class Plant extends LifeForm{
    constructor() {
        super();
        do {
            this.health = floor(random(5, 10));
            this.nut = floor(random(5, 10));
        } while (this.r < 10);

        this.pos.x = random(this.r, width - this.r);
        this.pos.y = random(this.r, height - this.r);
    }

    get r() {
        return this.health + this.nut;
    }

    show() {
        noStroke();
        //outer circle (nut)
        fill(nutcolor);
        ellipse(this.pos.x, this.pos.y, this.r);
        //inner circle (plant)
        fill(plantcolor);
        ellipse(this.pos.x, this.pos.y, this.health);
    }

}

