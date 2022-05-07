//#region Variables
let l, masa, tension;
let posInicialXa, posInicialXb;
let posXa, posXb;
let amplitudA1, amplitudA2, amplitudB1, amplitudB2;
let radio;
let w1, w2, tiempo;
let xSimulacion = 300, ySimulacion = 100, xMargen;
let sliderLongitud, sliderMasa, sliderTension, sliderposInicialXa, sliderposInicialXb;
//#region Variables para los graficos
let xGraficos = 1025, yGraficos = 100;
let xspacing = 1;
let period = 0;
let dx = 0.1;
let yvalues = new Array(95);;
//#endregion
//#endregion

function setup() {
	createCanvas(windowWidth,windowHeight);
	//#region Sliders
	sliderLongitud = createSlider(0.5, 2, 2, 0.1);
	sliderLongitud.position(180, 170);
	sliderLongitud.style('width', '80px');

	sliderMasa = createSlider(10, 50, 50);
	sliderMasa.position(180, 210);
	sliderMasa.style('width', '80px');

	sliderTension = createSlider(1, 10, 10);
	sliderTension.position(180, 250);
	sliderTension.style('width', '80px');

	sliderposInicialXa = createSlider(-0.2, 0.2, 0, 0.01);
	sliderposInicialXa.position(180, 290);
	sliderposInicialXa.style('width', '80px');

	sliderposInicialXb = createSlider(-0.2, 0.2, 0, 0.01);
	sliderposInicialXb.position(180, 330);
	sliderposInicialXb.style('width', '80px');
	//#endregion
	//Escala 1 metro son 100 pixeles
	//#region Condiciones iniciales
	radio = 60;
	amplitudA1 = 0;
	amplitudA2 = 0;
	amplitudB1 = 0;
	amplitudB2 = 0;
	estadoInicial();
	//#endregion
	frameRate(24);
}

function draw() {
	background(255);
	textFont("Georgia");
	strokeWeight(1);
	//#region Titulo
	fill(220);
	noStroke();
	rect(0, 0, width, 60);
	fill(40);
	textSize(27);
	textStyle(BOLD);
	text("Simulación de un Sistema Acoplado", 20, 40);
	textSize(17);
	textStyle(NORMAL);
	text("| Vibraciones y Ondas | Universidad del Cauca 2020", 580, 40);
	//#endregion
	//#region Tablero de Opciones
	var xTablero = 25, yTablero = 100;
	//area del tablero
	fill(250);
	stroke(220);
	rect(xTablero, yTablero, 250, 300);
	fill(0, 150, 255);
	rect(xTablero, yTablero, 250, 5);
	fill(20);
	noStroke();
	textSize(17);
	textStyle(NORMAL);
	text("Condiciones Iniciales", xTablero + 20, yTablero + 40);
	textSize(12);
	fill(80);
	text("Longitud: " + sliderLongitud.value() + " m", xTablero + 30, yTablero + 85);
	text("Masa: " + sliderMasa.value() + " kg", xTablero + 30, yTablero + 125);
	text("Tensión: " + sliderTension.value() + " N", xTablero + 30, yTablero + 165);
	text("Xa(0): " + sliderposInicialXa.value() + " m", xTablero + 30, yTablero + 205);
	text("Xb(0): " + sliderposInicialXb.value() + " m", xTablero + 30, yTablero + 245);
	//#endregion
	//#region Simulacion
	//Area para dibujar la simulacion
	fill(198, 211, 246);
	rect(xSimulacion, ySimulacion, 700, 300);
	fill(0, 150, 255);
	rect(xSimulacion, ySimulacion, 700, 5);
	//barras de los lados
	strokeWeight(2);
	stroke(245, 125, 175);
	for(let i = 0; (xSimulacion + 50 + xMargen / 2 + i * 20) < (xSimulacion + 650 - xMargen / 2); i++)
		rect(xSimulacion + 50 + xMargen / 2 + i * 20, ySimulacion + 125, 7, 1);
	stroke(20);
	fill(150);
	rect(xSimulacion + 25 + xMargen / 2, ySimulacion + 50, 25, 150);
	rect(xSimulacion + 650 - xMargen / 2, ySimulacion + 50, 25, 150);
	//lineas de longitud divididas
	stroke(100);
	strokeWeight(2);
	line(xSimulacion + 50 + xMargen / 2, ySimulacion + 230, xSimulacion + 650 - xMargen / 2, ySimulacion + 230);
	line(xSimulacion + 50 + xMargen / 2, ySimulacion + 225, xSimulacion + 50 + xMargen / 2, ySimulacion + 235);
	line(xSimulacion + 250 + xMargen / 6, ySimulacion + 225, xSimulacion + 250 + xMargen / 6, ySimulacion + 235);
	line(xSimulacion + 450 - xMargen / 6, ySimulacion + 225, xSimulacion + 450 - xMargen / 6, ySimulacion + 235);
	line(xSimulacion + 650 - xMargen / 2, ySimulacion + 225, xSimulacion + 650 - xMargen / 2, ySimulacion + 235);
	//linea de longitud unica
	line(xSimulacion + 50 + xMargen / 2, ySimulacion + 270, xSimulacion + 650 - xMargen / 2, ySimulacion + 270);
	line(xSimulacion + 50 + xMargen / 2, ySimulacion + 265, xSimulacion + 50 + xMargen / 2, ySimulacion + 275);
	line(xSimulacion + 650 - xMargen / 2, ySimulacion + 265, xSimulacion + 650 - xMargen / 2, ySimulacion + 275);
	//longitudes
	strokeWeight(1);
	fill(50);
	noStroke();
	textSize(12);
	text("l", xSimulacion + 150 + xMargen / 3, ySimulacion + 250);
	text("l", xSimulacion + 350, ySimulacion + 250);
	text("l", xSimulacion + 550 - xMargen / 3, ySimulacion + 250);
	text("3l", xSimulacion + 345, ySimulacion + 290);
	//#endregion
	//#region Tabla de graficos
	//area de la tabla
	fill(20);
	stroke(100);
	rect(xGraficos, yGraficos, 310, 525);
	fill(0, 150, 255);
	rect(xGraficos, yGraficos, 310, 5);
	//etiquetas de los graficos xa
	noStroke();
	textSize(16);
	fill(200);
	text("Primera Esfera", xGraficos + 10, yGraficos + 30);
	text("Segunda Esfera", xGraficos + 10, yGraficos + 290);
	textSize(12);
	fill(240);
	text("Xa(t)", xGraficos + 50, yGraficos + 70);
	text("t", xGraficos + 220, yGraficos + 90);
	text("·", xGraficos + 55, yGraficos + 128);
	text("Xa(t)", xGraficos + 50, yGraficos + 140);
	text("t", xGraficos + 220, yGraficos + 160);
	text("··", xGraficos + 55, yGraficos + 198);
	text("Xa(t)", xGraficos + 50, yGraficos + 210);
	text("t", xGraficos + 220, yGraficos + 230);
	//etiquetas de los graficos xb
	text("Xb(t)", xGraficos + 50, yGraficos + 330);
	text("t", xGraficos + 220, yGraficos + 350);
	text("·", xGraficos + 55, yGraficos + 388);
	text("Xb(t)", xGraficos + 50, yGraficos + 400);
	text("t", xGraficos + 220, yGraficos + 420);
	text("··", xGraficos + 55, yGraficos + 458);
	text("Xb(t)", xGraficos + 50, yGraficos + 470);
	text("t", xGraficos + 220, yGraficos + 490);
	//grafico de posicion de xa
	stroke(200);
	line(xGraficos + 99, yGraficos + 70, xGraficos + 220, yGraficos + 70);
	line(xGraficos + 99, yGraficos + 50, xGraficos + 99, yGraficos + 90);
	//grafico de velocidad de xa
	stroke(200);
	line(xGraficos + 99, yGraficos + 140, xGraficos + 220, yGraficos + 140);
	line(xGraficos + 99, yGraficos + 120, xGraficos + 99, yGraficos + 160);
	//grafico de aceleracion de xa
	stroke(200);
	line(xGraficos + 99, yGraficos + 210, xGraficos + 220, yGraficos + 210);
	line(xGraficos + 99, yGraficos + 190, xGraficos + 99, yGraficos + 230);
	//grafico de posicion de xb
	stroke(200);
	line(xGraficos + 99, yGraficos + 330, xGraficos + 220, yGraficos + 330);
	line(xGraficos + 99, yGraficos + 310, xGraficos + 99, yGraficos + 350);
	//grafico de velocidad de xb
	stroke(200);
	line(xGraficos + 99, yGraficos + 400, xGraficos + 220, yGraficos + 400);
	line(xGraficos + 99, yGraficos + 380, xGraficos + 99, yGraficos + 420);
	//grafico de aceleracion de xb
	stroke(200);
	line(xGraficos + 99, yGraficos + 470, xGraficos + 220, yGraficos + 470);
	line(xGraficos + 99, yGraficos + 450, xGraficos + 99, yGraficos + 490);
	//#endregion
	//#region Tabla de resultados
	var xResultados = 25, yResultados = 425;
	//area del tablero
	fill(250);
	stroke(220);
	rect(xResultados, yResultados, 975, 200);
	fill(0, 150, 255);
	rect(xResultados, yResultados, 5, 200);
	fill(20);
	noStroke();
	textSize(17);
	textStyle(NORMAL);
	text("Resultados", xResultados + 20, yResultados + 30);
	//Ecuaciones de movimiento
	textSize(14);
	fill(50);
	text("Ecuaciones de Movimiento",  xResultados + 30, yResultados + 65);
	textSize(12);
	fill(80);
	text("Xa(t) =  A1 · Cos(W1 · t) + A2 · Cos(W2 · t)",  xResultados + 30, yResultados + 105);
	text("= [" + nf(amplitudA1, 1, 3) + " · Cos(" + nf(w1, 1, 3) + " · t)]" + " + [" + nf(amplitudA2, 1, 3) + " · Cos(" + nf(w2, 1, 3) + " · t)]",  xResultados + 68, yResultados + 125);
	text("Xb(t) =  B1 · Cos(W1 · t) + B2 · Cos(W2 · t)",  xResultados + 30, yResultados + 165);
	text("= [" + nf(amplitudB1, 1, 3) + " · Cos(" + nf(w1, 1, 3) + " · t)]" + " + [" + nf(amplitudB2, 1, 3) + " · Cos(" + nf(w2, 1, 3) + " · t)]",  xResultados + 68, yResultados + 185);
	//modos de vibracion
	fill(150);
	rect(xResultados + 455, yResultados + 20, 2, 160);
	textSize(14);
	fill(50);
	text("Modos de Vibración",  xResultados + 480, yResultados + 65);
	textSize(9);
	fill(80);
	text("2",  xResultados + 500, yResultados + 95);
	text("2",  xResultados + 500, yResultados + 155);
	textSize(12);
	//primer modo
	text("W1 = 3 · T",  xResultados + 480, yResultados + 105);
	text("= " + nf(Math.pow(w1,2),1,3),  xResultados + 560, yResultados + 105);
	text("____",  xResultados + 515, yResultados + 110);
	text("m · l",  xResultados + 520, yResultados + 125);
	//segundo modo
	text("W2 =    T",  xResultados + 480, yResultados + 165);
	text("= " + nf(Math.pow(w2,2),1,3),  xResultados + 560, yResultados + 165);
	text("____",  xResultados + 515, yResultados + 170);
	text("m · l",  xResultados + 520, yResultados + 185);

	//relacion entre amplitudes
	fill(150);
	rect(xResultados + 715, yResultados + 20, 2, 160);
	textSize(14);
	fill(50);
	text("Relación entre Amplitudes",  xResultados + 740, yResultados + 65);
	textSize(9);
	fill(80);
	textSize(12);
	//primera relacion
	text("A1 = -1",  xResultados + 740, yResultados + 105);
	text("__",  xResultados + 740, yResultados + 110);
	text("B1",  xResultados + 740, yResultados + 125);
	//segunda relacion
	text("A2 =  1",  xResultados + 740, yResultados + 165);
	text("__",  xResultados + 740, yResultados + 170);
	text("B2",  xResultados + 740, yResultados + 185);

	//#endregion
	//#region Dibujar la simulacion y los graficos
	calcPosiciones();
	stroke(20);
	strokeWeight(2);
	line(xSimulacion + 250 + xMargen / 6, ySimulacion + 125 - posXa, xSimulacion + 450 - xMargen / 6, 225 - posXb);
	DibujarMasa1();
	DibujarMasa2();
	//grafico de posicion xa
	calcPosWave(amplitudA1,amplitudA2);
	fill(210, 44, 255);
	renderWave(xGraficos + 100, yGraficos+70);
	//grafico de posicion xb
	calcPosWave(amplitudB1,amplitudB2);
	renderWave(xGraficos + 100,yGraficos + 330);
	//graficos de velocidad xa
	calcVelWave(amplitudA1, amplitudA2);
	fill(45, 195, 255);
	renderWave(xGraficos + 100, yGraficos+140);
	//graficos de velocidad xb
	calcVelWave(amplitudB1, amplitudB2);
	renderWave(xGraficos + 100, yGraficos+400);
	//graficos de aceleracion xa
	calcAcelWave(amplitudA1, amplitudA2);
	fill(255, 195, 45);
	renderWave(xGraficos + 100, yGraficos+210);
	//graficos de aceleracion xb
	calcAcelWave(amplitudB1, amplitudB2);
	renderWave(xGraficos + 100, yGraficos+470);
	//#endregion
	tiempo++;
}

function windowResized() { 
	resizeCanvas(windowWidth, windowHeight);
}


function mouseDragged(){
	estadoInicial();
}

function mousePressed(){
	estadoInicial();
}

function estadoInicial(){
	l = sliderLongitud.value();
	masa = sliderMasa.value();
	tension = sliderTension.value();
	posInicialXa = sliderposInicialXa.value();
	posInicialXb = sliderposInicialXb.value();
	lTotal = 3 * l * 100;
	xMargen = 600 - lTotal;
	w1 = Math.sqrt((3 * tension) / (masa * l));
	w2 = Math.sqrt(tension / (masa * l));
	calcAmplitudes();
	tiempo = 0;
}

function calcAmplitudes() {
	amplitudA1 = (posInicialXa - posInicialXb) / 2;
	amplitudA2 = (posInicialXa + posInicialXb) / 2;
	amplitudB1 = -amplitudA1;
	amplitudB2 = amplitudA2;
}

function calcPosiciones() {
	posXa = 100 * ((amplitudA1 * cos(w1 * tiempo)) + (amplitudA2 * cos(w2 * tiempo)));
	posXb = 100 * ((amplitudB1 * cos(w1 * tiempo)) + (amplitudB2 * cos(w2 * tiempo)));
}

function DibujarMasa1() {
	stroke(20);
	line(xSimulacion + 50 + xMargen / 2, ySimulacion + 125, xSimulacion + 250 + xMargen / 6, ySimulacion + 125 - posXa);
	fill(250, 25, 115);
	ellipse(xSimulacion + 250 + xMargen / 6, ySimulacion + 125 - posXa, radio / 2);
}

function DibujarMasa2() {
	stroke(20);
	line(xSimulacion + 450 - xMargen / 6, 225 - posXb, xSimulacion + 650 - xMargen / 2, ySimulacion + 125);
	fill(250, 25, 115);
	ellipse(xSimulacion + 450 - xMargen / 6, 225 - posXb, radio / 2);
}

function calcPosWave(amplitud1, amplitud2){
	var modo1 = w1 * tiempo;
	var modo2 = w2 * tiempo;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 100*(amplitud1*cos(modo1) + amplitud2*cos(modo2));
		modo1 += dx;
		modo2 += dx;
	}
}

function calcVelWave(amplitud1, amplitud2){
	var modo1 = w1 * tiempo;
	var modo2 = w2 * tiempo;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 100*(-amplitud1*w1*sin(modo1) - amplitud2*w2*sin(modo2));
		modo1 += dx;
		modo2 += dx;
	}
}

function calcAcelWave(amplitud1, amplitud2){
	var modo1 = w1 * tiempo;
	var modo2 = w2 * tiempo;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 100*(-amplitud1*w1*w1*cos(modo1) - amplitud2*w2*w2*cos(modo2));
		modo1 += dx;
		modo2 += dx;
	}
}

function calcPosX2Wave(){
	modo1 = w1 * tiempo;
	modo2 = w2 * tiempo;
	for (let i = 0; i < yvalues.length; i++) {
		yvalues[i] = 100*(amplitudB1*cos(modo1) + amplitudB2*cos(modo2));
		modo1 += dx;
		modo2 += dx;
	}
}

function renderWave(xMargen, yMargen) {
	noStroke();
	for (let i = 0; i < yvalues.length; i++) {
		ellipse(xMargen + (i * xspacing), yMargen - yvalues[i], 2);
	}
}
