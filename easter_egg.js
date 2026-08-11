let sentry;
let bullets = [];
let blobs = [];
let isFrozen = false;

const ACCENT = [139, 58, 58, 120]; // #8b3a3a with medium alpha
const BORDER = [181, 181, 176, 120]; // #b5b5b0 with medium alpha

function toggleGame() {
    isFrozen = !isFrozen;
    if (isFrozen) {
        noLoop();
    } else {
        loop();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    sentry = new Sentry(width / 2, height / 2);
    
    // Spawn initial blobs
    for (let i = 0; i < 6; i++) {
        spawnBlob();
    }
}

function draw() {
    clear(); // Keeps the canvas transparent so the main site shows through
    

    // Periodically spawn new blobs
    if (frameCount % 180 === 0 && blobs.length < 12) {
        spawnBlob();
    }
    
    // Update and display blobs
    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].update();
        blobs[i].display();
        
        // Remove blobs that drift too far off screen
        if (blobs[i].isOffScreen()) {
            blobs.splice(i, 1);
        }
    }
    
    // Update and display bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        bullets[i].display();
        
        if (bullets[i].isOffScreen()) {
            bullets.splice(i, 1);
            continue;
        }
        
        // Check collision with blobs
        let hit = false;
        for (let j = blobs.length - 1; j >= 0; j--) {
            if (bullets[i].hits(blobs[j])) {
                blobs[j].split();
                blobs.splice(j, 1); // destroy blob
                hit = true;
                break; // bullet destroys one blob at a time
            }
        }
        
        if (hit) {
            bullets.splice(i, 1); // destroy bullet
        }
    }
    
    // Update and display the sentry
    sentry.update();
    sentry.display();
    sentry.autoShoot();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function spawnBlob() {
    // Spawn randomly outside the screen bounds
    let x, y;
    if (random(1) < 0.5) {
        x = random(1) < 0.5 ? -100 : width + 100;
        y = random(height);
    } else {
        x = random(width);
        y = random(1) < 0.5 ? -100 : height + 100;
    }
    blobs.push(new BlobObj(x, y, random(35, 70)));
}

class Sentry {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.angle = 0;
        this.lastShotTime = 0;
    }
    
    update() {
        // Smoothly follow the mouse position
        let target = createVector(mouseX, mouseY);
        // Only follow if the mouse has moved into the window
        if (mouseX !== 0 || mouseY !== 0) {
            this.pos.lerp(target, 0.08);
        }
    }
    
    autoShoot() {
        // Find nearest blob
        let nearest = null;
        let recordDist = Infinity;
        
        for (let blob of blobs) {
            let d = dist(this.pos.x, this.pos.y, blob.pos.x, blob.pos.y);
            if (d < recordDist) {
                recordDist = d;
                nearest = blob;
            }
        }
        
        if (nearest && recordDist < width * 0.8) {
            // Aim at nearest blob
            let targetAngle = atan2(nearest.pos.y - this.pos.y, nearest.pos.x - this.pos.x);
            
            // Smoothly rotate towards target
            let diff = targetAngle - this.angle;
            // Handle angle wrap-around for shortest rotation path
            diff = atan2(sin(diff), cos(diff));
            this.angle += diff * 0.15;
            
            // Shoot slow-mo bullets
            if (millis() - this.lastShotTime > 800) { 
                let dir = p5.Vector.fromAngle(this.angle);
                bullets.push(new Bullet(this.pos.x, this.pos.y, dir));
                this.lastShotTime = millis();
            }
        }
    }
    
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        
        noFill();
        stroke(ACCENT);
        strokeWeight(2);
        
        // Draw sentry base (circle)
        circle(0, 0, 24);
        // Draw sentry barrel
        line(12, 0, 28, 0);
        
        // A little decorative inner circle
        strokeWeight(1);
        circle(0, 0, 10);
        
        pop();
    }
}

class Bullet {
    constructor(x, y, dir) {
        this.pos = createVector(x, y);
        // "Slow mo" bullets
        this.vel = dir.copy().mult(2.5); 
        this.radius = 3;
    }
    
    update() {
        this.pos.add(this.vel);
    }
    
    display() {
        push();
        fill(ACCENT);
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius * 2);
        pop();
    }
    
    hits(blob) {
        let d = dist(this.pos.x, this.pos.y, blob.pos.x, blob.pos.y);
        return d < this.radius + blob.radius;
    }
    
    isOffScreen() {
        return (this.pos.x < -100 || this.pos.x > width + 100 || this.pos.y < -100 || this.pos.y > height + 100);
    }
}

class BlobObj {
    constructor(x, y, radius) {
        this.pos = createVector(x, y);
        this.radius = radius;
        this.id = random(1000); // Unique offset for noise
        
        // Drift generally towards the center
        let center = createVector(width/2, height/2);
        let dir = p5.Vector.sub(center, this.pos);
        dir.normalize();
        // Add some random scatter to the direction
        dir.rotate(random(-PI/3, PI/3));
        this.vel = dir.mult(random(0.2, 0.6));
    }
    
    update() {
        this.pos.add(this.vel);
    }
    
    display() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(BORDER);
        strokeWeight(1.5);
        
        beginShape();
        let noiseMax = 1.5;
        // Draw wobbly circle using Perlin noise
        for (let i = 0; i < TWO_PI; i += 0.1) {
            let xoff = map(cos(i), -1, 1, 0, noiseMax);
            let yoff = map(sin(i), -1, 1, 0, noiseMax);
            // Time evolution of the wobble
            let r = map(noise(xoff, yoff, frameCount * 0.01 + this.id), 0, 1, this.radius * 0.7, this.radius * 1.3);
            
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
    
    split() {
        // If the blob is large enough, split it into two smaller ones
        if (this.radius > 20) {
            let r1 = this.radius * 0.65;
            let r2 = this.radius * 0.65;
            
            let b1 = new BlobObj(this.pos.x, this.pos.y, r1);
            let b2 = new BlobObj(this.pos.x, this.pos.y, r2);
            
            // Diverge paths
            b1.vel = this.vel.copy().rotate(PI/4).mult(1.3);
            b2.vel = this.vel.copy().rotate(-PI/4).mult(1.3);
            
            blobs.push(b1);
            blobs.push(b2);
        }
    }
    
    isOffScreen() {
        let margin = 200;
        return (this.pos.x < -margin || this.pos.x > width + margin || this.pos.y < -margin || this.pos.y > height + margin);
    }
}
