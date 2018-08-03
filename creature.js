
const createPopulation = new Set();
class Creature {
    constructor(opt = {}) {
        this.opt = opt;
        this.health = this.startHealth ? opt.startHealth() : 0;
        this.r = this.radius ? this.radius() : 10;
        this.pos = createVector(
            random(this.r, width - this.r),
            random(this.r, height - this.r)
        );
        Creature.all.add(this);
    }

    get startHealth() {
        return this.opt.startHealth || false;
    }

    get radius() {
        return this.opt.radius || false;
    }

    get regen() {
        return this.opt.regen || 0;
    }

    get aging() {
        return this.opt.aging || 0;
    }

    get speed() {
        return this.opt.speed || -1;
    }

    get color() {
        return this.opt.color || color(255);
    }

    get reproduceHealth() {
        return this.opt.reproduceHealth || -1;
    }

    get reproduce() {
        return this.opt.reproduce || false;
    }

    get postShow() {
        return this.opt.postShow || false;
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
        if (this.postShow) this.postShow();
    }

    tick(dt = 1) {
        if (this.opt.movable) {
            if (this.speed >= 0) this.vel.limit(this.speed);
            if (!this.vel) this.vel = createVector();
            this.pos.add(this.vel.copy().mult(dt));
        }
        if (this.radius) this.r = lerp(this.r, this.radius(), 0.1 * dt);
        if (this.regen !== 0) this.health += this.regen * dt;
        if (this.aging !== 0) this.health *= (1 - this.aging * dt);
        if (this.reproduce && this.health > this.reproduceHealth) this.reproduce();
        if (this.health < 1) this.die();
    }

    eat(food) {
        this.health += food.health;
        food.die();
    }

    die() {
        Creature.all.delete(this);
    }

    static get all() {
        return createPopulation;
    }

}


function creatureGenerator(opt = {}) {
    return class extends Creature {
        constructor() {
            super(opt);
        }
    }
}

