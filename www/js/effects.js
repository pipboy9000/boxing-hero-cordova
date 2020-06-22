let particles = [];

let canvas, ctx;
let width = window.innerWidth;
let height = window.innerHeight;

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function spawnParticles(amount, dir) {
    for (let i = 0; i < amount; i++) {
        let p = particles.find(p => !p.active)
        if (!p) return;

        p.x = Math.random() * 50 - 100 + width / 2;
        p.y = Math.random() * 50 - 100 + height / 2;
        p.vx = Math.random() * 20 - 10;
        p.vy = Math.random() * 20 - 10;
        p.active = true;
        p.age = 0;
    }
}

function moveParticles() {
    particles.forEach(p => {
        if (p.active) {
            p.x += p.vx;
            p.y += p.vy;

            p.vx *= 0.96;
            p.vy = p.vy * 0.96 + 2;
            p.age += 1;

            if (p.age > 100) {
                p.active = false;
            }
        }
    })
}

function initParticles() {
    for (let i = 0; i < 30; i++) {
        let p = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            age: 0,
            active: false
        }
        particles.push(p);
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fill();
    })
}

function testSpawnParticles() {
    spawnParticles(10);
}

function init() {
    canvas = document.getElementsByClassName("effects")[0];
    canvas.addEventListener('click', testSpawnParticles, false);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    canvas.width = width;
    canvas.height = height;

    initParticles();

    requestAnimationFrame(render)
}

function render() {

    moveParticles();

    clear();
    drawParticles();

    requestAnimationFrame(render)
}

export default {
    spawnParticles
}

init();