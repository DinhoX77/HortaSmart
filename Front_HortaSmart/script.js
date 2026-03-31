// ─── STATE ───────────────────────────────────────────────
const state = {
  humidity: 28,
  pumpOn: false,
  mode: "auto",
  dark: false,
  alerts: [
    {
      id: 1,
      type: "warning",
      msg: "Solo muito seco!",
      detail: "Umidade abaixo de 25%",
      time: "14:05",
    },
    {
      id: 2,
      type: "info",
      msg: "Bomba acionada automaticamente.",
      detail: "Modo automático ativo",
      time: "15:00",
    },
    {
      id: 3,
      type: "success",
      msg: "Umidade normalizada.",
      detail: "Umidade atingiu 55%",
      time: "15:45",
    },
    {
      id: 4,
      type: "warning",
      msg: "Temperatura elevada detectada.",
      detail: "Ambiente quente",
      time: "12:30",
    },
  ],
};

const historyData = [
  { time: "08:00", v: 45 },
  { time: "09:00", v: 42 },
  { time: "10:00", v: 38 },
  { time: "11:00", v: 33 },
  { time: "12:00", v: 28 },
  { time: "13:00", v: 24 },
  { time: "14:00", v: 22 },
  { time: "15:00", v: 55 },
  { time: "16:00", v: 62 },
  { time: "17:00", v: 58 },
  { time: "18:00", v: 52 },
  { time: "19:00", v: 47 },
];

// ─── HELPERS ────────────────────────────────────────────
function getMoistureStyle(v) {
  if (v < 30) return { cls: "dry", color: "#ef4444", label: "Solo Seco" };
  if (v < 60) return { cls: "medium", color: "#f59e0b", label: "Solo Médio" };
  return { cls: "wet", color: "#22c55e", label: "Solo Úmido" };
}

function nowStr() {
  const d = new Date();
  return (
    d.toLocaleDateString("pt-BR") +
    " " +
    d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  );
}

function timeStr() {
  const d = new Date();
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

// ─── GAUGE ───────────────────────────────────────────────
function updateGauge() {
  const { humidity: v } = state;
  const { cls, color, label } = getMoistureStyle(v);
  const R = 70;
  const C = 2 * Math.PI * R;
  const offset = C - (v / 100) * C;

  document.getElementById("gauge-fill").style.strokeDashoffset = offset;
  document.getElementById("gauge-fill").style.stroke = color;
  document.getElementById("gauge-value").textContent = v + "%";
  document.getElementById("gauge-value").className = "gauge-value color-" + cls;
  document.getElementById("gauge-icon").style.color = color;
  document.getElementById("gauge-label-text").textContent = label;
  document.getElementById("gauge-label-text").className =
    "gauge-label color-" + cls;
  document.getElementById("gauge-wrap").className = "gauge-wrap " + cls;
  document.getElementById("moisture-current").textContent = v + "%";
  document.getElementById("moisture-current").style.color = color;
}

// ─── PUMP ────────────────────────────────────────────────
function updatePump() {
  const { pumpOn, mode } = state;
  const box = document.getElementById("pump-status-box");
  const orb = document.getElementById("pump-orb");
  const stat = document.getElementById("pump-state-text");
  const sub = document.getElementById("pump-sub-text");
  const btn = document.getElementById("btn-pump");
  const hint = document.getElementById("pump-hint");

  box.className = "pump-status-box" + (pumpOn ? " on" : "");
  orb.className = "pump-orb" + (pumpOn ? " on" : " off");
  stat.className = "pump-state" + (pumpOn ? " on" : " off");
  stat.textContent = pumpOn ? "Ligada" : "Desligada";
  sub.textContent = pumpOn ? "Irrigando..." : "Em standby";

  btn.textContent = pumpOn ? "Desligar Bomba" : "Ligar Bomba";
  btn.className = "btn-pump " + (pumpOn ? "turn-off" : "turn-on");
  btn.disabled = mode === "auto";

  hint.style.display = mode === "auto" ? "block" : "none";
}

// ─── MODE ─────────────────────────────────────────────────
function updateMode() {
  const { mode } = state;
  document.getElementById("btn-auto").className =
    "mode-btn" + (mode === "auto" ? " active" : "");
  document.getElementById("btn-manual").className =
    "mode-btn" + (mode === "manual" ? " active" : "");

  const hint = document.getElementById("mode-hint");
  const hintText = document.getElementById("mode-hint-text");
  hint.className = "mode-hint " + mode;

  if (mode === "auto") {
    hintText.textContent =
      "A bomba será acionada automaticamente quando a umidade cair abaixo de 30%.";
    hint.querySelector("svg").innerHTML = `
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`;
  } else {
    hintText.textContent =
      "Controle manual ativo. Você pode ligar e desligar a bomba manualmente.";
    hint.querySelector("svg").innerHTML = `
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`;
  }
}

// ─── ALERTS ───────────────────────────────────────────────
function alertIcon(type) {
  if (type === "warning")
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  if (type === "success")
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M7 10.5C7.5 9 9.5 8 11 9.5c.5.5.7 1.2.5 1.8-.5 1.5-2.3 2-3 3.5"/><path d="M13.5 7.5C14.5 6 16.5 5 18 6.5"/><path d="M8 17h.01"/></svg>`;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
}

function renderAlerts() {
  const list = document.getElementById("alerts-list");
  const warningCount = state.alerts.filter((a) => a.type === "warning").length;
  document.getElementById("alerts-count").textContent = warningCount;

  list.innerHTML = state.alerts
    .map(
      (a) => `
    <div class="alert-item ${a.type}">
      <div class="alert-icon">${alertIcon(a.type)}</div>
      <div class="alert-body">
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-detail">${a.detail}</div>
      </div>
      <div class="alert-time">${a.time}</div>
    </div>
  `,
    )
    .join("");
}

function addAlert(type, msg, detail) {
  state.alerts.unshift({ id: Date.now(), type, msg, detail, time: timeStr() });
  if (state.alerts.length > 6) state.alerts.pop();
  renderAlerts();
}

// ─── CHART ───────────────────────────────────────────────
function drawChart() {
  const canvas = document.getElementById("chart-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.parentElement.clientWidth;
  const H = 220;

  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.scale(dpr, dpr);

  const isDark = state.dark;
  const primary =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "#2d8a55";
  const borderColor = isDark ? "#243528" : "#e2ede7";
  const textColor = isDark ? "#6fa882" : "#6b8a77";
  const gridColor = isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)";
  const chartColor = "#2d8a55";
  const chartColorDk = "#3aad6a";
  const lineColor = isDark ? chartColorDk : chartColor;

  const PAD = { top: 12, right: 12, bottom: 36, left: 46 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const min = 0;
  const max = 100;
  const data = historyData;

  ctx.clearRect(0, 0, W, H);

  // grid lines
  const steps = [0, 25, 50, 75, 100];
  ctx.font = `11px Inter, sans-serif`;
  ctx.textAlign = "right";
  ctx.fillStyle = textColor;
  steps.forEach((s) => {
    const y = PAD.top + cH - ((s - min) / (max - min)) * cH;
    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.moveTo(PAD.left, y);
    ctx.lineTo(PAD.left + cW, y);
    ctx.stroke();
    ctx.fillText(s + "%", PAD.left - 6, y + 4);
  });

  // x labels
  ctx.textAlign = "center";
  const step = Math.max(1, Math.floor(data.length / 6));
  data.forEach((d, i) => {
    if (i % step !== 0 && i !== data.length - 1) return;
    const x = PAD.left + (i / (data.length - 1)) * cW;
    ctx.fillStyle = textColor;
    ctx.fillText(d.time, x, H - PAD.bottom + 18);
  });

  // zone backgrounds
  const zoneRanges = [
    {
      from: 60,
      to: 100,
      color: isDark ? "rgba(34,197,94,.04)" : "rgba(34,197,94,.05)",
    },
    {
      from: 30,
      to: 60,
      color: isDark ? "rgba(245,158,11,.04)" : "rgba(245,158,11,.05)",
    },
    {
      from: 0,
      to: 30,
      color: isDark ? "rgba(239,68,68,.05)" : "rgba(239,68,68,.06)",
    },
  ];
  zoneRanges.forEach((z) => {
    const y1 = PAD.top + cH - ((z.to - min) / (max - min)) * cH;
    const y2 = PAD.top + cH - ((z.from - min) / (max - min)) * cH;
    ctx.fillStyle = z.color;
    ctx.fillRect(PAD.left, y1, cW, y2 - y1);
  });

  // points
  const pts = data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * cW,
    y: PAD.top + cH - ((d.v - min) / (max - min)) * cH,
  }));

  // gradient fill
  const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + cH);
  grad.addColorStop(0, lineColor + "40");
  grad.addColorStop(1, lineColor + "05");

  ctx.beginPath();
  pts.forEach((p, i) =>
    i === 0
      ? ctx.moveTo(p.x, p.y)
      : ctx.bezierCurveTo(
          (pts[i - 1].x + p.x) / 2,
          pts[i - 1].y,
          (pts[i - 1].x + p.x) / 2,
          p.y,
          p.x,
          p.y,
        ),
  );
  ctx.lineTo(pts[pts.length - 1].x, PAD.top + cH);
  ctx.lineTo(pts[0].x, PAD.top + cH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // line
  ctx.beginPath();
  pts.forEach((p, i) =>
    i === 0
      ? ctx.moveTo(p.x, p.y)
      : ctx.bezierCurveTo(
          (pts[i - 1].x + p.x) / 2,
          pts[i - 1].y,
          (pts[i - 1].x + p.x) / 2,
          p.y,
          p.x,
          p.y,
        ),
  );
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // dots
  pts.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.strokeStyle = isDark ? "#152019" : "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

// ─── DARK MODE ───────────────────────────────────────────
function applyDark() {
  document.body.classList.toggle("dark", state.dark);
  const btn = document.getElementById("btn-dark");
  btn.innerHTML = state.dark
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  setTimeout(drawChart, 50);
}

// ─── UPDATE TIMESTAMP ────────────────────────────────────
function updateTimestamp() {
  const s = nowStr();
  document.querySelectorAll(".ts-value").forEach((el) => (el.textContent = s));
}

// ─── EVENTS ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // dark mode
  document.getElementById("btn-dark").addEventListener("click", () => {
    state.dark = !state.dark;
    applyDark();
  });

  // pump
  document.getElementById("btn-pump").addEventListener("click", () => {
    if (state.mode === "auto") return;
    state.pumpOn = !state.pumpOn;
    updatePump();
    updateTimestamp();
    addAlert(
      state.pumpOn ? "info" : "success",
      state.pumpOn
        ? "Bomba ligada manualmente."
        : "Bomba desligada manualmente.",
      "Ação manual do operador",
    );
  });

  // mode
  document.getElementById("btn-auto").addEventListener("click", () => {
    state.mode = "auto";
    updateMode();
    updatePump();
  });

  document.getElementById("btn-manual").addEventListener("click", () => {
    state.mode = "manual";
    updateMode();
    updatePump();
  });

  // init gauge circumference
  const R = 70;
  const C = 2 * Math.PI * R;
  document.getElementById("gauge-fill").style.strokeDasharray = C;

  // initial render
  updateGauge();
  updatePump();
  updateMode();
  renderAlerts();
  drawChart();
  applyDark();

  // redraw chart on resize
  window.addEventListener("resize", drawChart);

  // simulate live updates every 30s
  setInterval(() => {
    state.humidity = Math.max(
      10,
      Math.min(95, (state.humidity + (Math.random() * 4 - 2)) | 0),
    );
    updateGauge();
    updateTimestamp();
  }, 30000);
});
