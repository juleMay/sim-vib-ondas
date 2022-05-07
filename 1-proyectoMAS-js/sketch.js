//Condiciones iniciales
let radius, posAngle0, speedAngle0;
//Input
let sliderRadius, sliderPos0, sliderSpeed0;
let time, omega0, phi, amplitud;
let circle, graph1, graph2, graph3;
const g = 9.8;

function setup() {
	createCanvas(1366, 768);

	//Sliders
	sliderRadius = createSlider(50, 150, 150);
	sliderRadius.position(440, 510);

	sliderPos0 = createSlider(-0.4, 0.4, 0, 0.05);
	sliderPos0.position(440, 550);

	sliderSpeed0 = createSlider(-0.16, 0.16, 0, 0.02);
	sliderSpeed0.position(440, 590);

	radius = sliderRadius.value();

	posAngle0 = sliderPos0.value();
	speedAngle0 = sliderSpeed0.value();
	frameRate(24);
	initialState();
}


function draw() {
	background(250);

	fill(50);
	textSize(22);
	rect(width/2, 460, width, 50);
	fill(250);
	text("Condiciones iniciales", 50, 470);
	text("Resultados", width / 2 + 50, 470);

	fill(10);
	textSize(18);
	text("Radio de la Esfera Pequeña - r", 50, 530);
	text("Amplitud Angular Inicial - θ(0)", 50, 570);
	text("Velocidad Angular Inicial - θ'(0)", 50, 610);

	text("Ecuación de movimiento", width / 2 + 50, 530);

	text("r   :", width / 2 + 360, 530);
	text("R  :", width / 2 + 360, 570);
	text("R/r :", width / 2 + 360, 610);

	text("θ  :", width / 2 + 480, 530);
	text("w  :", width / 2 + 480, 570);
	text("Φ  :", width / 2 + 480, 610);

	textSize(12);
	text("0", width / 2 + 492, 530);
	text("0", width / 2 + 495, 570);

	fill(80);
	textSize(18);
	text(radius + " m", 340, 530);
	text(posAngle0 + " rad", 340, 570);
	text(speedAngle0 + " rad/s", 340, 610);

	text(nf(amplitud, 1, 3) + " Cos(" + nf(omega0, 1, 3) + "t + " + nf(phi, 1, 3) + ")", width / 2 + 50, 560);

	text(radius + " m", width / 2 + 400, 530);
	text(radius* 5 + " m", width / 2 + 400, 570);
	text((radius*5)/radius , width / 2 + 400, 610);

	text(nf(amplitud, 1, 3) + " rad", width / 2 + 520, 530);
	text(nf(omega0, 1, 3) + " rad/s", width / 2 + 520, 570);
	text(nf(phi, 1, 3) + " rad", width / 2 + 520, 610);

	text("Movimiento : " + nf(amplitud*cos(omega0*time + phi),1,2) + " rad", width / 2 + 360, 48);
	text("Velocidad : " + nf(-amplitud*omega0*sin(omega0*time + phi),1,2) + " rad/s", width / 2 + 360, 190);
	text("Aceleración : " + nf(-amplitud*cos(omega0*time + phi),1,2) + " rad/s^2", width / 2 + 360, 330);
	
	circle.show();
	graph1.show();
	time++;
}

function mouseDragged() {
	initialState();
}

function mousePressed() {
	initialState();
}

function initialState() {
	radius = sliderRadius.value();
	posAngle0 = sliderPos0.value();
	speedAngle0 = sliderSpeed0.value();

	omega0 = 0;
	phi = 0;
	time = 0;
	amplitud = 0;
	
	if (posAngle0 != 0 || speedAngle0 != 0) {
		calcOmega0();
		calcPhi();
		calcAmplitud();
	}
	circle = new CircleGraph(width / 4, height / 4)
	graph1 = new PositionGraph(width / 2, height / 16);
}

function calcOmega0() {
	omega0 = sqrt((5 * g) / (28 * radius));
}

function calcPhi() {
	//Hallamos el valor de phi en Radianes
	if (posAngle0 == 0) {
		phi = Math.PI / 2;
		if (speedAngle0 > 0)
			phi *= 3;
	}
	else if (speedAngle0 == 0) {
		phi = 0;
		if(posAngle0 < 0)
			phi = Math.PI;
	}
	else if (posAngle0 != 0 && speedAngle0 != 0) {
		phi = Math.abs(atan((-speedAngle0) / (posAngle0 * omega0)));

		//Hallamos el signo de Sin y Cos
		var cosValue = 1, sinVal = 1;
		if (posAngle0 < 0)
			cosValue = -1;
		if (speedAngle0 > 0)
			sinVal = -1;

		//Hallamos el Cuadrante
		var cuadrante;
		if (cosValue == 1 && sinVal == 1) {
			cuadrante = 1;
		} else if (cosValue == 1 && sinVal == -1) {
			cuadrante = 4;
			phi = 2 * Math.PI - phi;
		} else if (cosValue == -1 && sinVal == 1) {
			cuadrante = 2;
			phi = Math.PI - phi;
		} else if (cosValue == -1 && sinVal == -1) {
			cuadrante = 3;
			phi = Math.PI + phi;
		}
	}
}

function calcAmplitud() {
	if (phi != Math.PI / 2 && phi != 3*Math.PI / 2)
		amplitud = posAngle0 / cos(phi);
	else
		amplitud = (-speedAngle0) / (omega0 * sin(phi));
}