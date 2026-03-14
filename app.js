
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


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, runTransaction, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOTYED5F2vFicKsOiVnAVLW8vW_dsv-U",
  authDomain: "euzey-8da83.firebaseapp.com",
  databaseURL: "https://euzey-8da83-default-rtdb.firebaseio.com",
  projectId: "euzey-8da83"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const contadorRef = ref(db, "visitas");

/* tempo mínimo entre contagens (24h) */
const TEMPO_LIMITE = 24 * 60 * 60 * 1000;

const ultimaVisita = localStorage.getItem("ultimaVisita");
const agora = Date.now();

if (!ultimaVisita || (agora - ultimaVisita) > TEMPO_LIMITE) {

  runTransaction(contadorRef,(current)=>{
    return (current || 4658) + 1;
  });

  localStorage.setItem("ultimaVisita", agora);
}

onValue(contadorRef,(snapshot)=>{
  const valor = snapshot.val() || 0;
  const el = document.getElementById("contador");

  el.textContent = valor;

  el.classList.add("update");
  setTimeout(()=>el.classList.remove("update"),300);
});
