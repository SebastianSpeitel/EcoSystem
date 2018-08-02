let w = 1024
let h = 576
let popSize = 20;
let lifeForms = [];
let plantcolor;
let nutcolor;

function setup() {
    plantcolor = color(0, 255, 0);
    nutcolor = color(139, 69, 19);

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');

    for (i = 0; i < popSize; i++) {
        lifeForms.push(new Plant());
    }
}

function draw() {

    background(0, 0, 0, 255);

    lifeForms.forEach(l => l.show());

}