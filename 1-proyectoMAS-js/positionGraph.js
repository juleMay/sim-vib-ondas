var xspacing = 1; // Disctancia entre circulos
var period = 0;
var dx; // Valor que incrementa x
var yvalues;
var w = 0;

class PositionGraph {
    constructor(x, y) {
        this.marginX = x;
        this.marginY = y;
        w = width/2 - (390 + ((150 - radius)/10) * 12);
        period = ((2 * Math.PI) / omega0) * 10;
        dx = (TWO_PI / period) * xspacing;
        yvalues = new Array(floor(w / xspacing));
    }

    show() {
        stroke(50);
        line(0, 440, width, 440);
        line(width/2, height/2 + 60, width/2, height);

        line(this.marginX, 10, this.marginX, (height / 8) - 10);
        line(this.marginX, 140, this.marginX, (height / 4) + 40);
        line(this.marginX, 280, this.marginX, (height / 2) - 10);

        line(this.marginX, this.marginY, width-390, this.marginY);
        line(this.marginX, this.marginY + 140, width-390, this.marginY + 140);
        line(this.marginX, this.marginY + 280, width-390, this.marginY + 280);

        stroke(150);
        line(this.marginX - 30, 120, width-40, 120);
        line(this.marginX - 30, 270, width-40, 270);
        line(this.marginX - 30, 410, width-40, 410);

        textSize(20);     
        fill("purple");
        this.calcPosWave();
        this.renderWave();
        text("θ(t)", this.marginX - 30, 110);
        
        fill("green");
        this.calcVelWave();
        this.renderWave();
        text("θ'(t)", this.marginX - 30, 260);
        
        fill("red");
        this.calcAcelWave();
        this.renderWave();
        text("θ''(t)", this.marginX - 30, 400);

        fill(10);
        text("t", width-390, 110);
        text("t", width-390, 260);
        text("t", width-390, 400);
    }

    calcPosWave() {
        let x = omega0 * time + phi;
        for (let i = 0; i < yvalues.length; i++) {
            yvalues[i] = 20 * amplitud*cos(x);
            x += dx;
        }
    }

    calcVelWave(){
        let x = omega0 * time + phi;
        for (let i = 0; i < yvalues.length; i++) {
            yvalues[i] = ((-omega0) * 40 * amplitud*sin(x))+140;
            x += dx;
        }
    }

    calcAcelWave(){
        let x = omega0 * time + phi;
        for (let i = 0; i < yvalues.length; i++) {
            yvalues[i] = -20 * amplitud*cos(x) + 280;
            x += dx;
        }
    }

    renderWave() {
        noStroke();
        for (let x = 0; x < yvalues.length; x++) {
            ellipse(this.marginX + (x * xspacing), this.marginY + yvalues[x], 2, 2);
        }
    }
}