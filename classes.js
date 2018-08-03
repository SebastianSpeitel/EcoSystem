//const plantcolor = color(0, 255, 0);
//const nutcolor = color(139, 69, 19);

class LifeForm {
    constructor() {
        this.pos = createVector();
        this.health = 0;
        this.speed = 10;
    }

    set r(r) {
        this._r = r;
    }

    get r() {
        return _r || 10;
    }

    show() {
        noStroke();
        fill(this.color || 255);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    tick(dt = 1) {
        if (this.vel) {
            this.vel.add(createVector(random(-5, 5), random(-5, 5)));
            this.pos.add(this.vel.copy().limit(this.speed).mult(dt));
        }
        this.health -= 0.01 * dt;
        if (this.health < 1) this.die();
    }

    eat(food) {
        this.health += food.health;
        food.die();
    }

    die() {
        lifeForms.delete(this);
    }


}

class Plant extends LifeForm {
    constructor() {
        super();
        do {
            this.health = floor(random(5, 10));
            this.nut = floor(random(5, 10));
        } while (this.r < 10);

        this.pos.set(random(this.r, width - this.r), random(this.r, height - this.r));
    }

    get r() {
        return this.health + this.nut;
    }

    show() {
        noStroke();
        //outer circle (nut)
        fill(nutcolor);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
        //inner circle (plant)
        fill(plantcolor);
        ellipse(this.pos.x, this.pos.y, this.health * 2);
    }

}

class Herbivore extends LifeForm {
    constructor(health) {
        super();
        this.health = health || floor(random(5, 10));

        this.pos.set(random(this.r, width - this.r), random(this.r, height - this.r));

        this.speed = 25;
        this.color = herbivorecolor;
        this.vel = createVector();
    }

    get r() {
        return this.health;
    }

    tick(dt = 1) {
        let target = findClosest(this.pos, Plant);
        if (target) {
            let rel = target.pos.copy().sub(this.pos);
            if (rel.mag() < this.r + target.r) this.eat(target);
            this.vel.lerp(rel, 0.9 * dt);
        }
        if (this.health > 20) this.split();
        super.tick(dt);50
    }

    split() {
        this.health *= 0.5;
        let twin = new Herbivore(this.health);
        twin.pos = this.pos.copy();
        this.vel.x = -10;
        twin.vel.x = 10;
        //twin.vel.add(createVector(random(-15, 15), random(-15, 15)));
        lifeForms.add(twin);
    }
}

class Carnivore extends LifeForm {
    constructor(health) {
        super();
        this.health = health || floor(random(5, 10));

        this.pos.x = random(this.r, width - this.r);
        this.pos.y = random(this.r, height - this.r);

        this.speed = 10;
        this.color = carnivorecolor;
        this.vel = createVector();
    }

    get r() {
        return this.health;
    }

    tick(dt = 1) {
        let target = findClosest(this.pos, Herbivore);
        if (target) {
            let rel = target.pos.copy().sub(this.pos);
            if (rel.mag() < this.r + target.r) this.eat(target);
            this.vel.lerp(rel, 0.9 * dt);
        }
        if (this.health > 30) this.split();

        this.health *= 0.999;
        this.health -= 0.1 * dt;
        super.tick(dt);
    }

    split() {
        this.health *= 0.2;
        let twin = new Carnivore(this.health);
        twin.pos = this.pos.copy();
        this.vel.x = -10;
        twin.vel.x = 10;
        //twin.pos.add(createVector(random(2, 3), random(2, 3)).mult(random(-15, 15)));
        //console.log(twin);
        lifeForms.add(twin);
    }
}

