let w = 1024
let h = 576
let popSize = 500;
let plantcolor;
let nutcolor;
let herbivorecolor;
let carnivorecolor;
let Plant, Herbivore, Carnivore;
let chart;

function setup() {
    plantcolor = color(0, 255, 0);
    nutcolor = color(139, 69, 19);
    herbivorecolor = color(0, 0, 255);
    carnivorecolor = color(255, 0, 0);
    chart = new Chart();

    Plant = creatureGenerator({
        name: 'plant',
        startHealth: function () { return random(5, 20); },
        radius: function () { return sqrt(this.health); },
        regen: 1,
        maxHealth: 50,
        color: plantcolor
    });

    Herbivore = creatureGenerator({
        name: 'herbivore',
        startHealth: function () { return random(10, 20); },
        radius: function () { return sqrt(this.health); },
        regen: -0.1,
        color: herbivorecolor,
        speed: 15,
        maxEat: 30,
        movable: true,
        offspringHealth: 0.25,
        eatEfficiency: 0.75,
        preTick: function (dt) {
            let target = findClosest(this.pos, Plant);
            if (target) {
                let rel = target.pos.copy().sub(this.pos);
                if (rel.mag() < this.r + target.r) this.eat(target, dt);
                this.vel.lerp(rel, 0.5 * dt);
            }
        },
        reproduceHealth: 70,
        reproduce: function () {
            if (random() > 0.01) return;
            this.health *= this.offspringHealth;
            let twin = new Herbivore();
            twin.health = this.health;
            twin.r = twin.radius();
            twin.pos = this.pos.copy();
            twin.vel = this.vel.copy().mult(-2);
        }
    });

    Carnivore = creatureGenerator({
        name: 'carnivore',
        startHealth: function () { return random(10, 20); },
        radius: function () { return sqrt(this.health); },
        regen: -0.1,
        aging: 0.1,
        color: carnivorecolor,
        speed: 10,
        maxEat: 30,
        movable: true,
        offspringHealth: 0.25,
        eatEfficiency: 1,
        preTick: function (dt) {
            let target = findClosest(this.pos, Herbivore);
            if (target) {
                let rel = target.pos.copy().sub(this.pos);
                if (rel.mag() < this.r + target.r) this.eat(target, dt);
                this.vel.lerp(rel, 0.5 * dt);
            }
        },
        reproduceHealth: 70,
        reproduce: function () {
            if (random() > 0.01) return;
            this.health *= this.offspringHealth;
            let twin = new Carnivore();
            twin.health = this.health;
            twin.r = twin.radius();
            twin.pos = this.pos.copy();
            twin.vel = this.vel.copy().mult(-2);
        }
    });
    document.body.appendChild(Plant.htmlGUI);
    document.body.appendChild(Herbivore.htmlGUI);
    document.body.appendChild(Carnivore.htmlGUI);

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');

    for (i = 0; i < 100; i++) {
        new Plant();
        new Carnivore();
        new Herbivore();
    }
}

function draw() {

    background(0, 0, 0, 255);

    let fps = frameRate() || 60;
    Creature.all.forEach(l => l.tick(1 / fps) || l.show());

    if (Creature.all.size < popSize) new Plant();
    if (Creature.all.size < popSize * 0.9) new Plant();
    if (Creature.all.size < popSize * 0.8) new Plant();

    if (random() < 0.001) new Carnivore();
    if (random() < 0.001) new Herbivore();

    chart.add(['plant', 'herbivore', 'carnivore'], [Plant.totalHealth(), Herbivore.totalHealth(), Carnivore.totalHealth()]);
    chart.show();
}

function findClosest(pos, cls) {
    let closest = null;
    Creature.all.forEach(l => {
        if (l instanceof cls && (!closest || l.pos.dist(pos) - l.r < closest.pos.dist(pos) - closest.r)) closest = l;
    });
    return closest;
}

