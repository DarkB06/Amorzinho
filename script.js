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


    const tempoConhecer = calcularTempoDecorrido("2024-07-04");
    const tempoNamoro = calcularTempoDecorrido("2024-10-13");

    contadorConhecer.innerHTML = `💫  <strong>${formatarTempo(tempoConhecer)}</strong> desde que nos conhecemos!`;
    contadorNamoro.innerHTML = `💖 Estamos namorando há <strong>${formatarTempo(tempoNamoro)}</strong>!`;

}

document.addEventListener("DOMContentLoaded", () => {
    atualizarContadores();
    setInterval(atualizarContadores, 1000);
});


const audio = new Audio("musica/Papoulas.mp3");
audio.loop = true;
audio.volume = 0.15; // Ajuste o volume conforme necessário
function abrirCarta() {
    const envelope = document.querySelector(".envelope");
    envelope.classList.toggle("aberto");
    audio.play();
}
//--------------------------------------------/// Carrossel de imagens
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const imgs = Array.from(track.children);

  // Clona a primeira e a última imagem
  const primeiro = imgs[0].cloneNode(true);
  const ultimo = imgs[imgs.length - 1].cloneNode(true);
  track.appendChild(primeiro);
  track.insertBefore(ultimo, imgs[0]);

  const todasImagens = document.querySelectorAll(".carousel-track img");
  let index = 1;

  // Largura da imagem + margem (20px total, 10px de cada lado)
  const largura = todasImagens[0].offsetWidth + 20;
  const offset = -9;

  // Inicializa com a imagem do meio visível e previews iguais
  track.style.transform = `translateX(-${index * largura + offset}px)`;

  function mover() {
    index++;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * largura + offset}px)`;

    setTimeout(() => {
      if (index === todasImagens.length - 1) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${index * largura + offset }px)`;
      }
    }, 510);
  }

  setInterval(mover, 3000);
});
