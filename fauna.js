class Fauna {
    constructor() {
        
        //Global distance measuring variable
        this.d;
        
        //Plant Variables
        this.plantPos = createVector(x, y); //Plant position on canvas
        this.plantHealth; //Health of plant.
        this.plantNut; //Plant's nutritional value.
        this.plantR; //Plant's radius
        this.plantC; //Plant's color
        
        //Herbivore Variables
        this.herbPos = createVector(x, y); //Herbivore position on canvas
        this.herbHealth; //Herbivore health
        this.herbNut; //Herbivore nutrition
        this.herbR; //Herbivore radius
        this.herbC; //Herbivore color
        
        class Plant {
            constructor() {
                this.plantHealth = floor(random(5, 10));
                this.plantNut = floor(random(5, 10));
                this.plantR = this.plantHealth + this.nut;
                    if (this.plantR < 10) {
                        this.plantHealth = floor(random(5, 10));
                        this.plantNut = floor(random(5, 10));
                        this.plantR = this.plantHealth + this.plantNut;
                    }
                this.plantPos.x = random(this.plantR, w - this.plantR);
                this.plantPos.y = random(this.plantR, h - this.plantR);
                this.plantC = this.plantR * 5;
                
                this.plantShow = function() {
                    stroke(0, this.plantC, 0);
                    strokeWeight(this.plantNut);
                    fill(0, this.plantC, 0);
                    ellipse(this.plantPos.x, this.plantPos.y, this.plantR);
                }
                
            }
        }
        
        class Herbivore {
            constructor() {
                this.herbHealth = floor(random(5, 10));
                this.herbNut = floor(random(5, 10));
                this.herbR = this.herbHealth + this.herbNut;
                    if (this.herbR < 10) {
                        this.herbHealth = floor(random(5, 10));
                        this.herbNut = floor(random(5, 10));
                        this.herbR = this.herbHealth + this.herbNut;
                    }
                this.herbC = this.herbR * 5;
                
                this.herbMove = function() {
                    this.herbRX = floor(random(-3, 3));
                    this.herbRY = floor(random(-3, 3));
                    if (this.herbPos.x < 1) {
                        this.herbPos.x = this.herbPos.x + 5;
                    } else if (this.herbPos.X < w) {
                        this.herbPos.x = this.herbPos.x - 5;
                    } else {
                        this.herbPos.x = this.herbPos.x + this.herbRX;
                    }
                    if (this.herbPos.y < 1) {
                        this.herbPos.y = this.herbPos.y + 5;
                    } else if (this.herbPos.y < w) {
                        this.herbPos.y = this.herbPos.y - 5;
                    } else {
                        this.herbPos.y = this.herbPos.y + this.herbRY;
                }
                
                this.herbShow = function() {
                    stroke(0, 0, this.herbC);
                    strokeWeight(this.herbNut);
                    fill(0, 0, this.HerbC);
                    ellipse(this.herbPos.x, this.herbPos.y, this.herbR);
                }
            }
        }
    }
        
//        class Predator {
//            constructor() {
//                
//            }
//        }
}
