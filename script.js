const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SUCCESS_TEXT = [
  "Awesome!",
  "You got it!",
  "Great job!",
  "Super!",
  "Nice work!"
];
const SPARKLE_COLORS = ["#ffd166", "#79c7f3", "#89d8a4", "#ffb3a7", "#c9b6ff"];

const targetEl = document.getElementById("target-number");
const feedbackEl = document.getElementById("feedback");
const choicesEl = document.getElementById("choices");
const selectorGridEl = document.getElementById("selector-grid");
const sayBtn = document.getElementById("say-btn");
const nextBtn = document.getElementById("next-btn");
const gamePanelEl = document.querySelector(".game-panel");

let target = 1;
let options = [];
let roundLocked = false;
let resetTimeoutId = null;
let audioCtx = null;

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildOptions(correct) {
  const remaining = NUMBERS.filter((n) => n !== correct);
  const wrongA = randomItem(remaining);
  const wrongBPool = remaining.filter((n) => n !== wrongA);
  const wrongB = randomItem(wrongBPool);
  return shuffle([correct, wrongA, wrongB]);
}

function speakNumber(number) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(number));
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playSuccessSound() {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const notes = [523.25, 659.25, 783.99];

  notes.forEach((freq, index) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.09;
    const end = start + 0.16;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(start);
    osc.stop(end);
  });
}

function renderSelector() {
  selectorGridEl.innerHTML = "";
  NUMBERS.forEach((number) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "selector-btn";
    button.textContent = String(number);
    button.setAttribute("aria-label", `Practice number ${number}`);
    if (number === target) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      newRound({ targetNumber: number, announce: true });
    });
    selectorGridEl.appendChild(button);
  });
}

function setFeedback(text, tone) {
  feedbackEl.textContent = text;
  feedbackEl.classList.remove("good", "try");
  if (tone) feedbackEl.classList.add(tone);
}

function renderChoices() {
  choicesEl.innerHTML = "";
  options.forEach((number) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.setAttribute("aria-label", `Number ${number} with ${number} shapes`);

    const numberLabel = document.createElement("span");
    numberLabel.className = "choice-number";
    numberLabel.textContent = String(number);

    const shapes = document.createElement("div");
    shapes.className = "option-shapes";
    shapes.setAttribute("aria-hidden", "true");
    for (let index = 0; index < number; index += 1) {
      const dot = document.createElement("span");
      dot.className = "shape-dot";
      shapes.appendChild(dot);
    }

    button.appendChild(numberLabel);
    button.appendChild(shapes);
    button.addEventListener("click", () => onChoice(number, button));
    choicesEl.appendChild(button);
  });
}

function triggerCelebration() {
  gamePanelEl.classList.remove("celebrate");
  void gamePanelEl.offsetWidth;
  gamePanelEl.classList.add("celebrate");

  for (let i = 0; i < 14; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.background = randomItem(SPARKLE_COLORS);
    sparkle.style.left = `${12 + Math.random() * 76}%`;
    sparkle.style.top = `${20 + Math.random() * 56}%`;
    sparkle.style.setProperty("--dx", `${Math.round(Math.random() * 130 - 65)}px`);
    sparkle.style.setProperty("--dy", `${Math.round(-40 - Math.random() * 90)}px`);
    gamePanelEl.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 700);
  }
}

function newRound({ targetNumber = null, announce = false } = {}) {
  if (resetTimeoutId) {
    clearTimeout(resetTimeoutId);
    resetTimeoutId = null;
  }
  roundLocked = false;
  target = targetNumber ?? randomItem(NUMBERS);
  options = buildOptions(target);
  targetEl.textContent = String(target);
  setFeedback("Count the shapes below each number, then tap the match.", "");
  renderChoices();
  renderSelector();
  if (announce) speakNumber(target);
}

function onChoice(number, button) {
  if (roundLocked) return;
  if (number === target) {
    roundLocked = true;
    button.classList.add("correct");
    playSuccessSound();
    triggerCelebration();
    setFeedback(`${randomItem(SUCCESS_TEXT)} Number ${target}!`, "good");
    resetTimeoutId = setTimeout(() => {
      newRound({ targetNumber: null, announce: true });
    }, 900);
    return;
  }

  setFeedback(`Nice try. Find ${target}.`, "try");
}

sayBtn.addEventListener("click", () => speakNumber(target));
nextBtn.addEventListener("click", () => newRound({ targetNumber: null, announce: false }));

renderSelector();
newRound({ targetNumber: null, announce: true });
