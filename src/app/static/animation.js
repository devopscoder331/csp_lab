const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Устанавливаем размеры canvas (квадрат 300x300)
canvas.width = 300;
canvas.height = 300;
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
    // Очищаем canvas (светлый фон)
    ctx.fillStyle = "#f0f0f0"; // Светло-серый фон для canvas
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Рисуем эллипсы и круги
    ellipses.forEach((ellipse) => {
        ctx.save(); // Сохраняем текущее состояние контекста
        ctx.translate(centerX, centerY);
        ctx.rotate(ellipse.rotateAngle);

        // Рисуем эллипс
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#333"; // Темно-серый цвет для линий
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();

        // Вычисляем позицию круга на основе времени
        const currentAngle = Date.now() * ellipse.speed;
        const circleX = radiusX * Math.cos(currentAngle);
        const circleY = radiusY * Math.sin(currentAngle);

        // Рисуем вращающийся круг
        ctx.beginPath();
        ctx.arc(circleX, circleY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff'; // Синий цвет для кругов
        ctx.fill();

        ctx.restore(); // Восстанавливаем состояние контекста
    });

    requestAnimationFrame(draw);
}

draw();