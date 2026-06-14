// ── ÁUDIO ────────────────────────────────────────────────────
const muteBtn = document.getElementById('muteBtn');
let isMuted = false;
let widget = null;
let playRequested = false;

// Carrega a Widget API do SoundCloud
const scScript = document.createElement('script');
scScript.src = 'https://w.soundcloud.com/player/api.js';
scScript.onload = () => {
  widget = SC.Widget(document.getElementById('sc-player'));
  widget.bind(SC.Widget.Events.READY, () => {
    widget.setVolume(70);
    if (playRequested) widget.play();
  });
  widget.bind(SC.Widget.Events.FINISH, () => {
    widget.seekTo(0);
    widget.play();
  });
};
document.head.appendChild(scScript);

muteBtn.addEventListener('click', () => {
  if (!widget) return;
  isMuted = !isMuted;
  widget.setVolume(isMuted ? 0 : 70);
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
});

// ── SPLASH ───────────────────────────────────────────────────
document.getElementById('startBtn').addEventListener('click', () => {
  playRequested = true;
  if (widget) {
    widget.play(); 
  }

  const splash = document.getElementById('splash');
  splash.style.transition = 'opacity 0.4s';
  splash.style.opacity = '0';
  setTimeout(() => { splash.style.display = 'none'; }, 400);
  muteBtn.style.display = '';
  placeNoBtnInitial();
  buildStrip("inicial");
});

// ── APP ──────────────────────────────────────────────────────
const noBtn     = document.getElementById("noBtn");
const yesBtn    = document.getElementById("yesBtn");
const counterEl = document.getElementById("counter");
const messageEl = document.getElementById("message");
const gifStrip  = document.getElementById("gifStrip");
let attempts = 0, accepted = false;
const isMobile = () => window.innerWidth <= 760;

const tenorIds = {
  inicial:   ["8023375962562896665","9564734588490477444","22943889"],
  curioso:   ["4949175452921770639","4945187863853828630","1758892759135530608","10626306622428962331","26460229","26120904","16784154248293789822","12970300424118838869","26549668"],
  triste:    ["4039458479414525499","15002220653059324455","7129322921597303799","6201273413503704856","16981853561659227565","16323706835709464647","9923548506936371434","14996793103711794122","5615448034870358971","15528176692501895710","4716295728219206700"],
  assustado: ["17587562105375975896","6106505422079660447","16776805577673100346","1407771759511089766","1324250380970391046","13915030680164467039","1121968557075982145","4967158879950281061","14694837655139442668","12399896746204620132","26975047","23234520","1044692698631280233","16277256843387900019"],
  raiva:     ["2705734597917929395","4800304132219651964","12316836123741229413","4225685497916849339","9742000569423889376","7147230546703871997","4569316364612894994","5016118126108679217","6445865066770613703","16084285","2827452577062723602","17168247071099265484"],
};

function buildStrip(phase) {
  const ids = tenorIds[phase] || [];
  gifStrip.innerHTML = "";
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  const count = isMobile() ? Math.min(shuffled.length, 2) : Math.min(shuffled.length, 3);
  const positions = isMobile() ? ["gif-left", "gif-right"] : ["gif-left", "gif-right", "gif-bottom"];
  
  for (let i = 0; i < count; i++) {
    const slot = document.createElement("div");
    slot.className = `gif-slot ${positions[i]}`;
    const iframe = document.createElement("iframe");
    iframe.src = `https://tenor.com/embed/${shuffled[i]}`;
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay");
    slot.appendChild(iframe);
    gifStrip.appendChild(slot);
  }
}

const phrases = {
  inicial:   ["Tenho algo muito especial pra te propor... 💕","Olha, preciso de coragem pra perguntar isso... 🌹"],
  curioso:   ["👀 Hmm... você tá pensando, né? Bom sinal!","🤨 Esse 'não' não pareceu muito convicto...","😏 Tô vendo que você tá com vontade de dizer sim","🔍 Detectei um sorrisinho aí enquanto lia...","🧐 Será que é um 'não' ou só tá fazendo charminho?","👉👈 Vai... pode aceitar, eu sei que você quer","🤔 Você clicou aí só para me ver de novo, né?","😼 Tô de olho nessa sua hesitação...","🫢 Aposto que você já tá sorrindo aí","🕵️ Suspeito, muito suspeito esse 'não'...","😌 Pode demorar, eu espero o tempo que for preciso","🙃 Esse botão não engana ninguém, sabia?"],
  triste:    ["😿 Meu coraçãozinho partiu com esse 'não'...","💔 Tô arrasado aqui, você não tá vendo?","🥺 Só uma chance, eu prometo que vai ser incrível","🌧️ Até o céu ficou nublado com sua negativa...","😢 Mais um 'não'? Vou fingir que não doeu...","🥹 Eu só queria um sim, sabe...","📉 Minha autoestima caiu mais um pouquinho agora","😞 Tá difícil assim me dar uma chance?","🫠 Sinto que tô derretendo de tanta tristeza aqui","🎻 Já tô até ouvindo uma música triste de fundo","😔 Vou anotar mais um 'não' na minha listinha...","🥀 Essa flor aqui murchou com seu 'não'"],
  assustado: ["😱 PERAÍ! Você não pode me deixar assim!","😨 Fiquei em choque com esse 'não'...","🙀 Meu coração quase parou aqui!","😰 Vai me deixar sem chão não, por favor!","😳 Quantos 'nãos' ainda cabem nesse seu coração?!","😵 Tá rolando um terremoto na minha confiança agora","🫣 Não vou nem fingir, isso me assustou de verdade","😬 Cada clique nesse botão me dá um treco","👻 Esse botão de recusar parece assombrado, só pode","😖 Socorro, minha esperança tá em queda livre!","🫨 Isso foi um abalo sísmico no meu coração","🚨 Alerta vermelho: muitos 'nãos' detectados!"],
  raiva:     ["😡 Tá bom, mas eu voy continuar tentando!","🔥 Nem me conformo com esse 'não'!","💢 Olha o tamanho do 'sim' aí, vai negar isso?!","😤 Eu MEREÇO uma chance e você sabe disso!","👹 Recusar de novo? Essa raiva tá ficando grande...","🌋 Tô prestes a entrar em erupção de tanto 'não'!","😠 Esse botão de recusar já era pra ter sumido!","🥊 Tá testando minha paciência, hein?!","💥 BOOM! Mais um 'não' explodindo minha paciência","😾 Tá de sacanagem com esse tanto de 'não'?","😡 Quanto mais você recusa, mais eu insisto!","👊 Tô ficando teimoso igual você agora"],
};

function getPhase() {
  if (attempts === 0) return "inicial";
  if (attempts <= 2)  return "curioso";
  if (attempts <= 5)  return "triste";
  if (attempts <= 9)  return "assustado";
  return "raiva";
}

function getCardRect() {
  const card = document.querySelector(".card");
  return card ? card.getBoundingClientRect() : null;
}

function getForbiddenRects() {
  const pad = 18, rects = [];
  const cr = getCardRect();
  if (cr) rects.push({x:cr.left-pad, y:cr.top-pad, w:cr.width+pad*2, h:cr.height+pad*2});
  const yr = yesBtn.getBoundingClientRect();
  if (yr.width) rects.push({x:yr.left-pad, y:yr.top-pad, w:yr.width+pad*2, h:yr.height+pad*2});
  document.querySelectorAll(".gif-slot").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.height) rects.push({x:r.left-pad, y:r.top-pad, w:r.width+pad*2, h:r.height+pad*2});
  });
  return rects;
}

function overlapsAny(cx,cy,cw,ch,fbs) {
  return fbs.some(f => !(cx+cw<f.x||cx>f.x+f.w||cy+ch<f.y||cy>f.y+f.h));
}

function placeNoBtnInitial() {
  const bw = noBtn.offsetWidth||130, bh = noBtn.offsetHeight||48;
  let sx, sy;
  if (isMobile()) {
    sx = (window.innerWidth - bw) / 2;
    sy = window.innerHeight - bh - clamp(140, 28 * window.innerWidth / 100, 180);
    const cr = getCardRect();
    if (cr && sy < cr.bottom + 20) sy = cr.bottom + 20;
    if (sy + bh > window.innerHeight - 150) sy = window.innerHeight - bh - 150;
  } else {
    sx = (window.innerWidth - bw) / 2;
    sy = Math.max(12, (window.innerHeight - bh) / 2 + 110);
  }
  noBtn.style.left = sx + 'px';
  noBtn.style.top  = sy + 'px';
  if (overlapsAny(sx, sy, bw, bh, getForbiddenRects())) moveNoBtn();
}

function clamp(min, val, max) { return Math.min(Math.max(val, min), max); }

function moveNoBtn() {
  const bw = noBtn.offsetWidth||130, bh = noBtn.offsetHeight||48, mg = 14;
  const maxX = Math.max(mg, window.innerWidth  - bw - mg);
  const curX = parseInt(noBtn.style.left,10)||window.innerWidth/2;
  const curY = parseInt(noBtn.style.top, 10)||window.innerHeight/2;
  const fbs  = getForbiddenRects();

  let minY, maxY;
  if (isMobile()) {
    const cr = getCardRect();
    minY = cr ? cr.bottom + 10 : window.innerHeight * 0.45;
    maxY = window.innerHeight - bh - clamp(130, 26 * window.innerWidth / 100, 170);
    if (maxY < minY) maxY = minY + 10;
  } else {
    minY = mg;
    maxY = Math.max(mg, window.innerHeight - bh - mg);
  }

  let nx, ny, tries = 0;
  do {
    nx = mg + Math.random() * (maxX - mg);
    ny = minY + Math.random() * Math.max(1, maxY - minY);
    tries++;
    if (Math.hypot(nx-curX, ny-curY) >= 90 && !overlapsAny(nx,ny,bw,bh,fbs)) break;
  } while (tries < 100);

  noBtn.style.left = nx + 'px';
  noBtn.style.top  = ny + 'px';
}

const GROW_STEP = 3, EDGE_PAD = 16, ELEM_GAP = 16;

function wouldHitSomething(testFs) {
  const prev = yesBtn.style.fontSize, prevT = yesBtn.style.transition;
  yesBtn.style.transition = "none";
  yesBtn.style.fontSize   = testFs + 'px';
  void yesBtn.offsetWidth;
  const r = yesBtn.getBoundingClientRect();
  yesBtn.style.fontSize   = prev;
  yesBtn.style.transition = prevT;
  void yesBtn.offsetWidth;
  if (r.left<EDGE_PAD||r.top<EDGE_PAD||r.right>window.innerWidth-EDGE_PAD||r.bottom>window.innerHeight-EDGE_PAD) return true;
  for (const sel of [".card h1","#message",".stats"]) {
    const el = document.querySelector(sel); if (!el) continue;
    const o  = el.getBoundingClientRect(); if (!o.width||!o.height) continue;
    if (!(r.right+ELEM_GAP<o.left||r.left-ELEM_GAP>o.right||r.bottom+ELEM_GAP<o.top||r.top-ELEM_GAP>o.bottom)) return true;
  }
  for (const el of document.querySelectorAll(".gif-slot")) {
    const o = el.getBoundingClientRect(); if (!o.width||!o.height) continue;
    if (!(r.right+ELEM_GAP<o.left||r.left-ELEM_GAP>o.right||r.bottom+ELEM_GAP<o.top||r.top-ELEM_GAP>o.bottom)) return true;
  }
  const nb = noBtn.getBoundingClientRect();
  if (nb.width&&!(r.right+ELEM_GAP<nb.left||r.left-ELEM_GAP>nb.right||r.bottom+ELEM_GAP<nb.top||r.top-ELEM_GAP>nb.bottom)) return true;
  return false;
}

function tryGrowYesBtn() {
  const curFs  = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  const nextFs = curFs + GROW_STEP;
  if (!wouldHitSomething(nextFs)) {
    yesBtn.style.fontSize = nextFs + 'px';
    yesBtn.addEventListener("transitionend", () => {
      yesBtn.style.animation = "pulse 2.4s ease-in-out infinite";
    }, {once:true});
  }
}

function onEvade() {
  if (accepted) return;
  attempts++;
  counterEl.textContent = attempts;
  moveNoBtn();
  const phase = getPhase(), pool = phrases[phase]||phrases.curioso;
  messageEl.style.opacity = "0";
  setTimeout(() => {
    messageEl.textContent   = pool[Math.floor(Math.random()*pool.length)];
    messageEl.style.opacity = "1";
    messageEl.style.animation = "msgFade 0.35s ease both";
  }, 180);
  buildStrip(phase);
  tryGrowYesBtn();
}

noBtn.addEventListener("mouseover",  onEvade);
noBtn.addEventListener("touchstart", e => { e.preventDefault(); onEvade(); }, {passive:false});
window.addEventListener("resize",    () => { if (!accepted) placeNoBtnInitial(); });

function createHearts(n) {
  const icons = ["❤️","💖","💗","💘","💝","🌹","✨","💫","🎉","🥳"];
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div");
    h.textContent = icons[Math.floor(Math.random()*icons.length)];
    h.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-40px;font-size:${16+Math.random()*26}px;opacity:.9;z-index:9999;pointer-events:none;animation:fall ${3+Math.random()*2.5}s linear forwards;`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }
}

yesBtn.addEventListener("click", () => {
  if (accepted) return;
  accepted = true;
  noBtn.style.display    = "none";
  gifStrip.style.display = "none";
  messageEl.textContent  = "🎉 ELA DISSE SIM! Preparando o date perfeito...";
  createHearts(80);
  setTimeout(() => {
    document.body.innerHTML = `
      <div class="success-screen">
        <div class="success-emoji">🥰</div>
        <h1>🎉 ELA DISSE SIM! 🎉</h1>
        <h2>Você acabou de fazer meu dia mais feliz ❤️</h2>
        <div class="success-gif-wrap">
          <iframe src="https://tenor.com/embed/10230631546810298783" allowfullscreen allow="autoplay"></iframe>
        </div>
        <div class="rewards">
          <p>☕ Café gostoso juntos</p>
          <p>🍕 Jantar + sobremesa</p>
          <p>😂 Risadas à beça</p>
          <p>✨ Uma noite inesquecível</p>
          <p>💕 Começo de algo lindo</p>
        </div>
        <button onclick="location.reload()" class="restart-btn">Perguntar de novo 💖</button>
      </div>`;
  }, 2500);
});
