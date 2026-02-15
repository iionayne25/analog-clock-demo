const DOM = {};
const FULL_ROTATION = 360;
const HALF_ROTATION = 180;
const DEG_TO_RAD = Math.PI / 180;

const CONFIG = {
  LIGHT_ANGLE: 345,
  SHADOW_DISTANCE: 15,
  MAX_OPACITY: 0.8,
  BASE_BLUR: 4,
  BLUR_RANGE: 4,
};

function cacheDOM() {
  DOM.clock = document.querySelector(".clock-number");

  DOM.secondHand = document.querySelector(".clock-hand.second");
  DOM.minuteHand = document.querySelector(".clock-hand.minute");
  DOM.hourHand = document.querySelector(".clock-hand.hour");

  DOM.digitalTime = document.getElementById("digital-time");

  DOM.numbers = document.getElementById("clock-numbers");
  DOM.dots = document.getElementById("clock-dots");
  DOM.ticks = document.getElementById("clock-ticks");
}

function normalizeAngle(angle) {
  return (
    ((angle + FULL_ROTATION + HALF_ROTATION) % FULL_ROTATION) - HALF_ROTATION
  );
}

function getShadowFromLight(handDeg) {
  let diffDeg = normalizeAngle(handDeg - CONFIG.LIGHT_ANGLE);

  const diffRad = diffDeg * DEG_TO_RAD;

  const cos = Math.cos(diffRad);
  const sin = Math.sin(diffRad);

  const x = sin * CONFIG.SHADOW_DISTANCE;
  const y = -cos * CONFIG.SHADOW_DISTANCE;

  const intensity = (1 - cos) / 2;

  const opacity = CONFIG.MAX_OPACITY * intensity;
  const blur = CONFIG.BASE_BLUR + CONFIG.BLUR_RANGE * intensity;

  return `${x}px ${y}px ${blur}px rgba(0,0,0,${opacity})`;
}

function renderClockNumbers() {
  const clock = DOM.clock;
  const numbersEl = DOM.numbers;
  const dotsEl = DOM.dots;
  const tickEl = DOM.ticks;

  const clockSize = clock.clientWidth;
  const radius = clockSize / 2;

  const numberRadius =
    radius -
    parseFloat(getComputedStyle(clock).getPropertyValue("--number-padding"));

  const dotRadius =
    radius -
    parseFloat(getComputedStyle(clock).getPropertyValue("--dot-padding"));

  const tickRadius =
    radius -
    parseFloat(getComputedStyle(clock).getPropertyValue("--tick-padding"));

  const transformAt = (deg, r) =>
    `translate(-50%, -50%) rotate(${deg}deg) translateY(-${r}px)`;

  numbersEl.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const number = i === 0 ? 12 : i;
    const deg = i * 30;

    return `
    <div class="clock-item number"
      style="transform:${transformAt(deg, numberRadius)} rotate(${-deg}deg)">
      <span style="transform:rotate(-${deg}deg)">${number}</span>
    </div>
  `;
  }).join("");

  dotsEl.innerHTML = Array.from({ length: 12 }, (_, i) => {
    const deg = i * 30;

    return `
    <div class="clock-item dot"
      style="transform:${transformAt(deg, dotRadius)}">
    </div>
  `;
  }).join("");

  tickEl.innerHTML = Array.from({ length: 60 }, (_, i) => {
    const deg = i * 6;
    const isHourTick = i % 5 === 0;
    return `
    <div class="clock-item tick ${isHourTick ? "hour" : ""}" 
    style="transform:${transformAt(deg, tickRadius)}">
    </div>
    `;
  }).join("");
}

function applyRotation(el, deg) {
  el.style.transform = `translate(-50%, -100%) rotate(${deg}deg)`;
}

function updateHands(now) {
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  applyRotation(DOM.secondHand, secondDeg);
  applyRotation(DOM.minuteHand, minuteDeg);
  applyRotation(DOM.hourHand, hourDeg);

  DOM.secondHand.style.filter = `drop-shadow(${getShadowFromLight(secondDeg)})`;
  DOM.minuteHand.style.filter = `drop-shadow(${getShadowFromLight(minuteDeg)})`;
  DOM.hourHand.style.filter = `drop-shadow(${getShadowFromLight(hourDeg)})`;
}

function updateDigital(now) {
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  DOM.digitalTime.textContent = `${h}:${m}:${s}`;
}

function tick() {
  const now = new Date();

  updateHands(now);
  updateDigital(now);

  const delay = 1000 - now.getMilliseconds();
  setTimeout(tick, delay);
}

function startClock() {
  tick();
}

function initClockResizeObserver() {
  if (!DOM.clock) return;

  const observer = new ResizeObserver(renderClockNumbers);
  observer.observe(DOM.clock);
}

document.addEventListener("DOMContentLoaded", () => {
  cacheDOM();
  renderClockNumbers();
  initClockResizeObserver();
  startClock();
});
