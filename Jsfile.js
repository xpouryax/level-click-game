"use strict";

let c1, c2, ctx, ctx2,  W, H, lastTimeCalled, fps, interval;
let cpt = 0;
let color = 'white';
let level = 1;
let speed = 100;
let moins = 0;


window.onload = () => {
	W = window.innerWidth;
	H = window.innerHeight;
	c1 = document.getElementById("canvas1");
	c1.width = W;
	c1.height = H - 80;
	c2 = document.getElementById("canvas2");
	c2.width = W;
	c2.height = 80;
	ctx = c1.getContext("2d");
	ctx2 = c2.getContext("2d");
	interval = setInterval(contrainte, speed);
	
	animate();
	contrainte();
	eventUser();
	textClick();
};

const clear = () => { ctx.clearRect(0, 0, W, H); };

const contrainte = () => { cpt -= moins };

const eventUser = () => { c2.addEventListener("click", function(event){	cpt++; }); };

const calcFPS = () => {
	let timeDiff = Date.now() - lastTimeCalled;
	lastTimeCalled = Date.now();
	fp.innerText = "fps: " + Math.round(1000/timeDiff);

const  drawCircle = () => {
	let angle = cpt/20*6.28;
	for(let i=0;i<angle;i+=0.01){
		let posX = W/2+(100*Math.cos(i-Math.PI/2));
		let posY = H/2+(100*Math.sin(i-Math.PI/2));
		let rad = 10;
		ctx.beginPath(); 
		ctx.fillStyle = 'teal';
		ctx.arc(posX, posY, rad, 0, Math.PI * 2, true);
		ctx.fill();
	}
};

const  drawBorder = () => {
		ctx.lineWidth = 25;
		ctx.strokeStyle = 'white';
		ctx.arc(W/2, H/2, 100, 0, Math.PI * 2, true);
		ctx.stroke();
};

const  drawPourcentage = () => {
	let pourcentage = (cpt/20*100).toFixed(0);
	ctx.textBaseline = 'middle';
	ctx.textAlign = "center";
	ctx.font = '30px serif';
	ctx.fillStyle = 'white';
	ctx.fillText(pourcentage + "%", W/2, H/2);
};

const  drawlevel = () => {
	ctx.textAlign = "center";
	ctx.font = 'bold 30px serif';
	ctx.fillStyle = color;
	ctx.fillText("Level " + level, W/2, H/2-180);
};

const  check = () => {
	if(cpt<=0)cpt = 0;
	if(cpt>=20){
		color = 'black';
		cpt = 0;
		level++;
		moins += 0.05;
		setTimeout(function() { color = "white"; }, 200);
	}
};

const  textClick = () => {
	ctx2.beginPath();
	ctx2.textBaseline = 'middle';
	ctx2.textAlign = "center";
	ctx2.font = '30px serif';
	ctx2.fillStyle = 'white';
	ctx2.fillText("Click here !", W/2, 35);
};

const animate = () => {
	clear();
	calcFPS();
	check();
	ctx.beginPath();
	drawBorder();
	drawCircle();
	drawlevel();
	drawPourcentage();

	window.requestAnimationFrame(animate);
};




