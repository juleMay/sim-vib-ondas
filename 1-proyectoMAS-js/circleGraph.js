class CircleGraph{
    constructor(x, y){
        this.marginX = x;
        this.marginY = y;
    }

    show(){
        //Posición de la esfera pequeña
        var posAngle = amplitud * cos(omega0 * time + phi);
        var posX = radius * sin(posAngle);
        var posY = radius * cos(posAngle);
        var valuesX = new Array(10);
        var valuesY = new Array(10);

        posX += this.marginX;
        posY += this.marginY;

        //Dibujar marco
        rectMode(CENTER);
        noStroke();
        strokeWeight(1);
        fill(25);
        rect(this.marginX, this.marginY, 4 * radius, 3 * radius);
        
        noStroke();
        strokeWeight(1);
        fill(250);
        rect(this.marginX, this.marginY - radius / 1.3, 4 * radius , 1.5 * radius);
        //Dibujar el circulo grande
        noStroke();
        strokeWeight(1);
        fill(250);
        ellipse(this.marginX, this.marginY, 2.5 * radius);
        
        //Dibujar el circulo pequeño rotando
        fill(100);
        textSize(radius * 20 / 150);
        text("R", this.marginX - 60, this.marginY - 10);
        strokeWeight(2);
        stroke(100);
        fill(200);
        line(this.marginX, this.marginY, this.marginX - radius*1.25, this.marginY);
        ellipse(posX, posY, radius/2);
        line(posX + ((radius / 4) * sin(-posAngle)), posY + ((radius / 4) * cos(-posAngle)), posX, posY);
        fill(50);
        noStroke();
        text("r", posX + 5, posY);
    }
}