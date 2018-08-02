let w = 1024
let h = 576
let popSize = 20;
let lifeForms = new Set();
let plantcolor;
let nutcolor;
let herbivorecolor;
let carnivorecolor;

function setup() {
    plantcolor = color(0, 255, 0);
    nutcolor = color(139, 69, 19);
    herbivorecolor = color(0, 0, 255);
    carnivorecolor = color(255, 0, 0);

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');

    for (i = 0; i < popSize; i++) {
        lifeForms.add(new Plant());
        lifeForms.add(new Carnivore());
        lifeForms.add(new Herbivore());
    }
}

function draw() {

    background(0, 0, 0, 255);

    let fps = frameRate() || 60;
    lifeForms.forEach(l => l.tick(1 / fps) || l.show());

    if (lifeForms.size < 100) lifeForms.add(new Plant());
}

function findClosest(pos, cls) {
    let closest = null;
    lifeForms.forEach(l => {
        if (l instanceof cls && (!closest || l.pos.dist(pos) < closest.pos.dist(pos))) closest = l;
    });
    return closest;
}