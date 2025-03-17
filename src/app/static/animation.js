const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let CANVAS_WIDTH = canvas.width;
let CANVAS_HEIGHT = canvas.height;
let centerX = CANVAS_WIDTH / 2;
let centerY = CANVAS_HEIGHT / 2;
let radiusX = 100;
let radiusY = 50;
let angle = 0;
const ellipses = [
    { speed: 0.0009, rotateAngle: Math.PI / 4 },
    { speed: 0.00045, rotateAngle: Math.PI / 2 },
    { speed: 0.0009, rotateAngle: -Math.PI / 4 },
    { speed: 0.00045, rotateAngle: Math.PI },
];

function draw() {
    ctx.fillStyle = "#000111"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ellipses.forEach((ellipse) => {
        ctx.translate(centerX, centerY);
        ctx.rotate(ellipse.rotateAngle);
        // Draw the ellipse
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ddd";
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();
        // Calculate circle position based on time
        const currentAngle = Date.now() * ellipse.speed;
        const circleX = radiusX * Math.cos(currentAngle);
        const circleY = radiusY * Math.sin(currentAngle);
        // Draw the rotating circle
        ctx.beginPath();
        ctx.arc(circleX, circleY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        // Reset transformations
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
    requestAnimationFrame(draw);
}
draw();