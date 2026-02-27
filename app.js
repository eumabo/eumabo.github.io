
const snap = document.getElementById("snap");
const dots = document.querySelectorAll(".dot");
const panels = document.querySelectorAll(".panel");

function goTo(index){
  panels[index].scrollIntoView({behavior:"smooth"});
  dots.forEach((d,i)=>d.classList.toggle("is-active",i===index));
}

dots.forEach((btn)=>{
  btn.addEventListener("click",()=>{
    goTo(Number(btn.dataset.to));
  });
});

snap.addEventListener("scroll",()=>{
  const index = Math.round(snap.scrollTop / window.innerHeight);
  dots.forEach((d,i)=>d.classList.toggle("is-active",i===index));
});

const bgm = document.getElementById("bgm");
const soundBtn = document.getElementById("soundBtn");

// volume inicial (0.0 a 1.0)
bgm.volume = 0.35;

// tenta autoplay ao entrar
(async () => {
  try {
    await bgm.play();
    soundBtn.hidden = true;
  } catch (e) {
    // Autoplay bloqueado -> mostra botão
    soundBtn.hidden = false;
  }
})();

// clique para liberar som quando autoplay for bloqueado
soundBtn.addEventListener("click", async () => {
  try {
    await bgm.play();
    soundBtn.hidden = true;
  } catch (e) {
    // se ainda falhar, não faz nada
  }
});

// opcional: se a pessoa clicar em qualquer lugar, tenta tocar
window.addEventListener("pointerdown", async () => {
  if (!bgm.paused) return;
  try {
    await bgm.play();
    soundBtn.hidden = true;
  } catch (e) {}
}, { once: true });