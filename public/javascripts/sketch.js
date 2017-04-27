/**
 * Created by Suhan on 25/04/2017.
 */

let p5canvas,system;
let textPool = [1,2,3,4,5,6,7,8,10,9,'J','Q','K']
function windowResized(){
    "use strict";
    resizeCanvas(windowWidth,windowHeight);
}
function setup() {
    system = new ParticleSystem(createVector(width/2, 50));

    p5canvas = createCanvas(windowWidth,windowHeight);
    //p5canvas.classList.add('canvas');
    //p5canvas.style('z-index','-1');
}

function draw() {
    document.querySelector('#shuffle').onclick=function(){
        "use strict";
        console.log("clear");
        p5canvas.clear();
    }
    system.addParticle();
    system.run();
    //ellipse(10, 10, 80, 80);
}
var Particle = function(position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255.0;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 20;
};

// Method to display
Particle.prototype.display = function() {

    stroke(200, this.lifespan);
    strokeWeight(1);
    fill(127, 0.02*this.lifespan);
    //ellipse(this.position.x, this.position.y, 120, 120);
    textSize(64);
    text(textPool[ Math.floor(Math.random() * 12)],Math.floor(Math.random() * 52)*this.position.x, Math.floor(Math.random() * 162)*this.position.y);

};

// Is the particle still useful?
Particle.prototype.isDead = function(){
    if (this.lifespan < 0) {
        return true;
    } else {
        return false;
    }
};

var ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};
