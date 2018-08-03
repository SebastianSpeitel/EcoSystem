
const creaturePopulation = new Set();
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

    get vel() {
        if (!this._vel) this._vel = createVector();
        return this._vel;
    }

    set vel(v) {
        this._vel = v;
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

    get maxHealth() {
        return this.opt.maxHealth || -1;
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

    get preTick() {
        return this.opt.preTick || false;
    }

    get postShow() {
        return this.opt.postShow || false;
    }

    get maxEat() {
        return this.opt.maxEat || -1;
    }

    get offspringHealth() {
        return this.opt.offspringHealth || 1;
    }

    get eatEfficiency() {
        return this.opt.eatEfficiency || 1;
    }

    show() {
        stroke(0);
        strokeWeight(.6);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
        if (this.postShow) this.postShow();
    }

    tick(dt = 1) {
        if (this.preTick) this.preTick(dt);
        if (this.opt.movable) {
            if (this.speed >= 0) this.vel.limit(this.speed);
            this.pos.add(this.vel.copy().mult(dt));
            this.pos.x = constrain(this.pos.x, this.r, width - this.r);
            this.pos.y = constrain(this.pos.y, this.r, height - this.r);
        }
        if (this.radius) this.r = lerp(this.r, this.radius(), 5 * dt);
        if (this.regen !== 0) this.health += this.regen * dt;
        if (this.aging !== 0) this.health *= (1 - this.aging) ** dt;
        if (this.reproduce && this.health > this.reproduceHealth) this.reproduce();
        if (this.maxHealth >= 0) this.health = min(this.health, this.maxHealth);
        if (this.health < 1) this.die();
    }

    eat(food, dt = 1) {
        let eating = food.health;
        if (this.maxEat >= 0) eating = min(this.maxEat * dt, eating);
        food.health -= eating;
        if (this.eatEfficiency !== 1) eating *= this.eatEfficiency;
        this.health += eating;

    }

    die() {
        Creature.all.delete(this);
    }

    static get all() {
        return creaturePopulation;
    }

    static count() {
        let cnt = 0;
        this.all.forEach(c => cnt += (c instanceof this) ? 1 : 0);
        return cnt;
    }

    static totalHealth() {
        let health = 0;
        this.all.forEach(c => health += (c instanceof this) ? c.health : 0);
        return health;
    }

}


function creatureGenerator(opt = {}) {
    return class extends Creature {
        constructor() {
            super(opt);
        }
        static get options() {
            return opt;
        }
        static get htmlGUI() {
            if (!this._htmlGUI) {
                this._htmlGUI = document.importNode(document.getElementById('creatureOption').content.children[0], true);
                if (opt.name) this._htmlGUI.querySelector('h4').innerText = opt.name;
                for (let i of Array.from(this._htmlGUI.querySelectorAll('input'))) {
                    i.onkeyup = () => {
                        let val = parseFloat(i.value);
                        if (val) opt[i.name] = val;
                    };
                }
            }
            let form = this._htmlGUI.querySelector('form');
            for (let o in opt) {
                if (form[o]) form[o].value = opt[o];
            }
            return this._htmlGUI;
        }
    }
}

