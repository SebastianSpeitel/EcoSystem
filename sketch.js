let w = 1024
let h = 576
let popSize = 100;
let plantcolor;
let nutcolor;
let herbivorecolor;
let carnivorecolor;
let Plant, Herbivore, Carnivore;

function setup() {
    plantcolor = color(0, 255, 0);
    nutcolor = color(139, 69, 19);
    herbivorecolor = color(0, 0, 255);
    carnivorecolor = color(255, 0, 0);

    Plant = creatureGenerator({
        startHealth: function () { return random(5, 10); },
        radius: function () { return this.health; },
        regen: -0.01,
        color: plantcolor
    });

    Herbivore = creatureGenerator({
        startHealth: function () { return random(5, 10); },
        radius: function () { return this.health; },
        regen: -0.01,
        color: herbivorecolor,
        speed: 25

    });

    Carnivore = creatureGenerator({
        startHealth: function () { return random(5, 10); },
        radius: function () { return this.health; },
        regen: -0.1,
        aging: 0.001,
        color: carnivorecolor,
        speed: 10
    });

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');

    for (i = 0; i < popSize; i++) {
        new Plant(); new Carnivore(); new Herbivore();
    }
}

function draw() {

    background(0, 0, 0, 255);

    let fps = frameRate() || 60;
    Creature.all.forEach(l => l.tick(1 / fps) || l.show());

    if (Creature.all.size < 1000) new Plant();
}

function findClosest(pos, cls) {
    let closest = null;
    lifeForms.forEach(l => {
        if (l instanceof cls && (!closest || l.pos.dist(pos) < closest.pos.dist(pos))) closest = l;
    });
    return closest;
}