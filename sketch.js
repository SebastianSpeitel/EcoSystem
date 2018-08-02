let w = 1024
let h = 576
let popSize = 20;
let fauna = [];

function setup() {

    let canvas = createCanvas(w, h);
    canvas.parent('sketch-holder');
    
    for (i = 0; i < popSize; i++) {
        fauna[i] = new Fauna();
    }
}

function draw() {

    background(0, 0, 0, 255);
    
    for (i = 0; i < fauna.length; i++) {
        fauna[i].fauna.plantShow();
        fauna[i].fauna.herbShow();
        fauna[i].fauna.herbMove();
    }
    
}