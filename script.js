// Contador de dias
function calcularDias(data) {
  const hoje = new Date();
  const inicio = new Date(data);
  const diffTime = Math.abs(hoje - inicio);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function calcularTempoDecorrido(data) {
  const agora = new Date();
  const inicio = new Date(data);
  let diffMs = agora - inicio;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutos * (1000 * 60);

  const segundos = Math.floor(diffMs / 1000);

  return { dias, horas, minutos, segundos };
}

function formatarTempo({ dias, horas, minutos, segundos }) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${dias}d ${pad(horas)}h ${pad(minutos)}m ${pad(segundos)}s`;
}

function atualizarContadores() {
  const contadorConhecer = document.getElementById("contadorConhecer");
  const contadorNamoro = document.getElementById("contadorNamoro");
  const contador = document.getElementById("contador");

  const tempoConhecer = calcularTempoDecorrido("2024-07-04");
  const tempoNamoro = calcularTempoDecorrido("2024-10-13");

  contadorConhecer.innerHTML = `💫  <strong>${formatarTempo(tempoConhecer)}</strong> desde que nos conhecemos!`;
  contadorNamoro.innerHTML = `💖 Estamos namorando há <strong>${formatarTempo(tempoNamoro)}</strong>!`;
  contador.innerHTML = `Já se passaram <strong>${formatarTempo(tempoConhecer)}</strong> desde que nos conhecemos! 💖`;
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContadores();
  setInterval(atualizarContadores, 1000);
});

// Cartinha surpresa
function abrirCarta() {
  const carta = document.querySelector(".carta");
  carta.classList.toggle("aberta");
}

// Botão "Te Amo"
const botao = document.getElementById("teAmoBtn");
botao.addEventListener("click", () => {
  alert("Eu te amo mais do que tudo ❤️");
});

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
    size: Math.random() * 10 + 10,
    speed: Math.random() * 1 + 0.5,
    alpha: Math.random() * 0.5 + 0.5,
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
  ctx.globalAlpha = 1;
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
function abrirCarta() {
  const envelope = document.querySelector(".envelope");
  envelope.classList.toggle("aberto");
}

// Carrossel automático
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider-inner");
  const imagens = document.querySelectorAll(".slider-inner img");

  let index = 0;
  const tempo = 3000; // 3 segundos entre transições

  function moverCarrossel() {
    index++;
    if (index >= imagens.length) index = 0;

    const larguraImg = imagens[0].offsetWidth + 16; // largura + gap
    slider.style.transform = `translateX(-${index * larguraImg}px)`;
  }

  setInterval(moverCarrossel, tempo);
});

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musicaTema");

  // Remove o mute e inicia a música assim que possível
  const tentarTocarMusica = () => {
    audio.muted = false;
    audio.volume = 0.5; // volume mais baixo para evitar bloqueio
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Música começou a tocar automaticamente!");
        })
        .catch((error) => {
          console.warn("Autoplay bloqueado pelo navegador:", error);
        });
    }
  };

  tentarTocarMusica();
});