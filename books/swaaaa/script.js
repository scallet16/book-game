const soundWords = [
  {
    word: "쏴아아아",
    desc: "비가 아주 세게 내리는 소리예요.",
    example: "비가 쏴아아아 내려요.",
    hint: "굵고 긴 선을 여러 개 그리면 비가 많이 오는 느낌이 나요.",
    finish: "와, 비가 쏴아아아 내리는 것 같아요!",
    scene: "rain",
    effect: "rain"
  },
  {
    word: "주르륵",
    desc: "물이나 눈물이 길게 흘러내리는 소리예요.",
    example: "창문에 빗물이 주르륵 흘러요.",
    hint: "위에서 아래로 길게 흘러내리는 선을 그려 봐요.",
    finish: "물이 주르륵 흘러내리는 것 같아요!",
    scene: "stream",
    effect: "stream"
  },
  {
    word: "졸졸졸",
    desc: "물이 작고 부드럽게 흐르는 소리예요.",
    example: "시냇물이 졸졸졸 흘러요.",
    hint: "작은 물결선을 옆으로 이어 그려 봐요.",
    finish: "작은 물이 졸졸졸 흐르는 느낌이에요!",
    scene: "brook",
    effect: "brook"
  },
  {
    word: "톡톡",
    desc: "작은 물방울이 가볍게 떨어지는 소리예요.",
    example: "빗방울이 창문을 톡톡 두드려요.",
    hint: "작은 점을 띄엄띄엄 찍어 봐요.",
    finish: "물방울이 톡톡 떨어지는 것 같아요!",
    scene: "tap",
    effect: "tap"
  },
  {
    word: "통통",
    desc: "가볍게 튀거나 두드리는 소리예요.",
    example: "공이 통통 튀어요.",
    hint: "위아래로 튀는 동그라미를 그려 봐요.",
    finish: "그림이 통통 튀는 느낌이에요!",
    scene: "bounce",
    effect: "bounce"
  },
  {
    word: "풍덩",
    desc: "큰 것이 물에 빠지는 소리예요.",
    example: "돌멩이가 물에 풍덩 빠졌어요.",
    hint: "큰 동그라미와 물결을 그려 봐요.",
    finish: "물이 풍덩 하고 퍼지는 것 같아요!",
    scene: "splash",
    effect: "splash"
  },
  {
    word: "첨벙",
    desc: "물속에 들어가며 물이 튀는 소리예요.",
    example: "발이 물웅덩이에 첨벙 들어갔어요.",
    hint: "가운데에서 밖으로 튀는 선을 그려 봐요.",
    finish: "물이 첨벙 튀는 느낌이에요!",
    scene: "puddle",
    effect: "puddle"
  },
  {
    word: "찰싹찰싹",
    desc: "물이 넓은 곳에 부딪치는 소리예요.",
    example: "파도가 바위에 찰싹찰싹 부딪쳐요.",
    hint: "넓은 파도선을 크게 그려 봐요.",
    finish: "파도가 찰싹찰싹 움직이는 것 같아요!",
    scene: "wave",
    effect: "wave"
  }
];

const state = {
  view: "start",
  index: 0,
  drawing: false,
  lastPoint: null,
  savedImage: null
};

const views = document.querySelectorAll("[data-view]");
const wordLists = document.querySelectorAll("[data-word-list]");
const curiousWord = document.querySelector("[data-curious-word]");
const gameWord = document.querySelector("[data-game-word]");
const wordLabel = document.querySelector("[data-word-label]");
const wordDesc = document.querySelector("[data-word-desc]");
const wordExample = document.querySelector("[data-word-example]");
const sceneSlot = document.querySelector("[data-scene]");
const exampleSlot = document.querySelector("[data-example]");
const drawHint = document.querySelector("[data-draw-hint]");
const effectStage = document.querySelector("[data-effect-stage]");
const hintBubble = document.querySelector("[data-hint-bubble]");
const examplePanel = document.querySelector("[data-example-panel]");
const canvas = document.getElementById("soundCanvas");
const ctx = canvas.getContext("2d");

const effectClasses = soundWords.map((item) => `effect-${item.effect}`);

function svgForScene(type) {
  const scenes = {
    rain: `<svg viewBox="0 0 520 210" aria-hidden="true"><path d="M65 148c48-45 101-50 150-14 30-55 105-64 150-20 34-7 69 17 73 51 4 31-21 56-54 56H96c-35 0-57-34-31-73Z" fill="#e7f6ff"/><path d="M155 52c16 50 11 102-14 145M250 47c12 56 5 110-25 157M342 60c9 46 0 93-27 136" stroke="#67ace2" stroke-width="14" stroke-linecap="round" fill="none"/></svg>`,
    stream: `<svg viewBox="0 0 520 210" aria-hidden="true"><path d="M84 115c74-56 137 51 207-4 58-45 99-30 147 16" stroke="#72b7e7" stroke-width="24" stroke-linecap="round" fill="none"/><path d="M88 154c73-37 145 33 216-7 45-25 92-20 132 8" stroke="#b9e5ff" stroke-width="18" stroke-linecap="round" fill="none"/></svg>`,
    brook: `<svg viewBox="0 0 520 210" aria-hidden="true"><path d="M80 112c30-24 56-24 83 0s56 24 86 0 56-24 86 0 56 24 86 0" stroke="#85c9ed" stroke-width="18" stroke-linecap="round" fill="none"/><circle cx="145" cy="74" r="14" fill="#d8f1ff"/><circle cx="305" cy="154" r="11" fill="#d8f1ff"/></svg>`,
    tap: `<svg viewBox="0 0 520 210" aria-hidden="true"><circle cx="140" cy="74" r="24" fill="#9ed4f2"/><circle cx="260" cy="124" r="20" fill="#b9e5ff"/><circle cx="382" cy="84" r="26" fill="#9ed4f2"/><path d="M120 150h285" stroke="#e7f6ff" stroke-width="20" stroke-linecap="round"/></svg>`,
    bounce: `<svg viewBox="0 0 520 210" aria-hidden="true"><path d="M88 158c48-88 98-88 148 0s99 88 148 0" stroke="#9ac8ee" stroke-width="14" stroke-linecap="round" fill="none"/><circle cx="150" cy="94" r="32" fill="#ffd28d"/><circle cx="305" cy="92" r="32" fill="#d9f1e7"/></svg>`,
    splash: `<svg viewBox="0 0 520 210" aria-hidden="true"><ellipse cx="260" cy="154" rx="145" ry="34" fill="#cdeeff"/><path d="M205 132l-30-54 55 34 30-64 34 64 55-34-30 54" fill="#8ac9ef"/></svg>`,
    puddle: `<svg viewBox="0 0 520 210" aria-hidden="true"><ellipse cx="260" cy="150" rx="156" ry="38" fill="#cdeeff"/><path d="M178 118c25-18 42-18 65 0M278 113c28-22 52-22 78 0" stroke="#78bde8" stroke-width="14" stroke-linecap="round" fill="none"/></svg>`,
    wave: `<svg viewBox="0 0 520 210" aria-hidden="true"><path d="M74 136c50-50 100-50 150 0s100 50 150 0 75-38 92-18" stroke="#76bde8" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M84 166c44-28 88-28 132 0s88 28 132 0 75-22 96-10" stroke="#cdeeff" stroke-width="18" stroke-linecap="round" fill="none"/></svg>`
  };
  return scenes[type] || scenes.rain;
}

function svgForExample(type) {
  const examples = {
    rain: `<svg viewBox="0 0 200 160"><path d="M56 22c10 38 4 77-18 118M102 18c9 43 1 86-24 124M148 24c6 37-2 76-25 114" stroke="#5aa9f3" stroke-width="11" stroke-linecap="round" fill="none"/></svg>`,
    stream: `<svg viewBox="0 0 200 160"><path d="M25 78c34-35 67 35 104 0 22-20 37-18 51-4" stroke="#5aa9f3" stroke-width="12" stroke-linecap="round" fill="none"/></svg>`,
    brook: `<svg viewBox="0 0 200 160"><path d="M20 84c18-16 34-16 52 0s34 16 52 0 34-16 52 0" stroke="#5aa9f3" stroke-width="10" stroke-linecap="round" fill="none"/></svg>`,
    tap: `<svg viewBox="0 0 200 160"><circle cx="58" cy="58" r="13" fill="#5aa9f3"/><circle cx="106" cy="96" r="10" fill="#8bd0f1"/><circle cx="150" cy="62" r="14" fill="#5aa9f3"/></svg>`,
    bounce: `<svg viewBox="0 0 200 160"><path d="M24 120c25-64 51-64 77 0s51 64 76 0" stroke="#5aa9f3" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="75" cy="58" r="17" fill="#ffd28d"/></svg>`,
    splash: `<svg viewBox="0 0 200 160"><ellipse cx="100" cy="120" rx="72" ry="18" fill="#cdeeff"/><path d="M72 103l-18-46 34 25 14-50 20 50 34-25-18 46" fill="#5aa9f3"/></svg>`,
    puddle: `<svg viewBox="0 0 200 160"><ellipse cx="100" cy="116" rx="75" ry="20" fill="#cdeeff"/><path d="M60 88c18-13 32-13 50 0M112 86c18-13 34-13 52 0" stroke="#5aa9f3" stroke-width="9" stroke-linecap="round" fill="none"/></svg>`,
    wave: `<svg viewBox="0 0 200 160"><path d="M20 94c28-32 56-32 84 0s56 32 84 0" stroke="#5aa9f3" stroke-width="12" stroke-linecap="round" fill="none"/></svg>`
  };
  return examples[type] || examples.rain;
}

function showView(name) {
  state.view = name;
  views.forEach((view) => view.classList.toggle("is-active", view.dataset.view === name));
  closeHint();
  closeExample();
  if (name === "game") {
    requestAnimationFrame(() => resizeCanvas(true));
  }
}

function renderWordLists() {
  wordLists.forEach((list) => {
    list.innerHTML = "";
    soundWords.forEach((item, index) => {
      const button = document.createElement("button");
      button.className = "word-button";
      button.type = "button";
      button.textContent = item.word;
      button.classList.toggle("is-active", index === state.index);
      button.addEventListener("click", () => {
        state.index = index;
        renderCurrent();
      });
      list.appendChild(button);
    });
  });
}

function renderCurrent() {
  const item = soundWords[state.index];
  curiousWord.textContent = item.word;
  gameWord.textContent = item.word;
  wordLabel.textContent = item.word;
  wordDesc.textContent = item.desc;
  wordExample.textContent = item.example;
  drawHint.textContent = item.hint;
  hintBubble.textContent = item.hint;
  sceneSlot.innerHTML = svgForScene(item.scene);
  exampleSlot.innerHTML = svgForExample(item.scene);
  renderWordLists();
  clearEffect();
  clearCanvas();
  closeHint();
  closeExample();
}

function move(delta) {
  state.index = (state.index + delta + soundWords.length) % soundWords.length;
  renderCurrent();
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function speakCurrent() {
  const item = soundWords[state.index];
  speakText(`${item.word}. ${item.desc}. ${item.example}`);
}

function resizeCanvas(restore = false) {
  const previous = restore ? snapshotCanvas() : null;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  setupBrush();
  if (previous) {
    const image = new Image();
    image.onload = () => ctx.drawImage(image, 0, 0, rect.width, rect.height);
    image.src = previous;
  }
}

function snapshotCanvas() {
  try {
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

function setupBrush() {
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#4f9dd8";
}

function clearCanvas() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  setupBrush();
  state.savedImage = null;
  clearEffect();
}

function pointFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDrawing(event) {
  event.preventDefault();
  clearEffect();
  closeHint();
  canvas.setPointerCapture(event.pointerId);
  state.drawing = true;
  state.lastPoint = pointFromEvent(event);
}

function draw(event) {
  if (!state.drawing || !state.lastPoint) return;
  event.preventDefault();
  const nextPoint = pointFromEvent(event);
  ctx.beginPath();
  ctx.moveTo(state.lastPoint.x, state.lastPoint.y);
  ctx.lineTo(nextPoint.x, nextPoint.y);
  ctx.stroke();
  state.lastPoint = nextPoint;
}

function stopDrawing(event) {
  if (!state.drawing) return;
  event.preventDefault();
  state.drawing = false;
  state.lastPoint = null;
}

function clearEffect() {
  effectStage.classList.remove(...effectClasses);
}

function markFinished() {
  const item = soundWords[state.index];
  state.savedImage = snapshotCanvas();
  clearEffect();
  window.requestAnimationFrame(() => {
    effectStage.classList.add(`effect-${item.effect}`);
    speakText(item.finish);
  });
}

function toggleHint() {
  hintBubble.classList.toggle("is-open");
}

function closeHint() {
  hintBubble.classList.remove("is-open");
}

function toggleExample() {
  examplePanel.classList.toggle("is-open");
}

function closeExample() {
  examplePanel.classList.remove("is-open");
}

document.querySelectorAll("[data-open-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.openView));
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => move(1));
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => move(-1));
});

document.querySelectorAll("[data-speak-current]").forEach((button) => {
  button.addEventListener("click", speakCurrent);
});

document.querySelector("[data-clear]").addEventListener("click", clearCanvas);
document.querySelector("[data-finish]").addEventListener("click", markFinished);
document.querySelectorAll("[data-toggle-hint]").forEach((button) => {
  button.addEventListener("click", toggleHint);
});
document.querySelectorAll("[data-toggle-example]").forEach((button) => {
  button.addEventListener("click", toggleExample);
});

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);
canvas.addEventListener("lostpointercapture", stopDrawing);
window.addEventListener("resize", () => resizeCanvas(true));

renderCurrent();
resizeCanvas();
