// Corações caindo
const canvas = document.getElementById("coracoes");
const ctx = canvas.getContext("2d");

let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 2 + 10,
        speed: Math.random() * 0.5 + 0.5,
        alpha: Math.random() * 0.1 + 0.3,
    };
}

function drawHeart(heart) {
    ctx.globalAlpha = heart.alpha;
    ctx.fillStyle = "#ff69b4";
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(
        heart.x - heart.size / 2,
        heart.y - heart.size / 2,
        heart.x - heart.size,
        heart.y + heart.size / 2,
        heart.x,
        heart.y + heart.size
    );
    ctx.bezierCurveTo(
        heart.x + heart.size,
        heart.y + heart.size / 2,
        heart.x + heart.size / 2,
        heart.y - heart.size / 2,
        heart.x,
        heart.y
    );
    ctx.fill();
    ctx.globalAlpha = 10;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.1) hearts.push(createHeart());
    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart);
        if (heart.y > canvas.height) hearts.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", () => {
  const tocar = localStorage.getItem("tocarMusica");
  const audio = document.getElementById("musica");

  if (tocar === "sim") {
    audio.play().catch(() => {
      // Caso o navegador bloqueie autoplay, exibe botão ou ignora
      console.log("Autoplay bloqueado. Interação necessária.");
    });
    localStorage.removeItem("tocarMusica"); // Limpa após tocar
  }
});