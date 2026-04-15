const STORAGE_KEY = "training-flow-v1";
const DAY_NAMES = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const DEFAULT_WORKOUTS = {
  1: {
    title: "День 1 — Верх A",
    subtitle: "Жим + горизонтальная тяга",
    exercises: [
      { id: "d1e1", name: "Отжимания на упорах с резиной", sets: 4, reps: "6-10", description: "Корпус прямой, локти под 30-45 градусов, опускайся плавно и без боли в локте." },
      { id: "d1e2", name: "Австралийские подтягивания", sets: 4, reps: "8-12", description: "Сначала сведи лопатки, затем тянись грудью к перекладине." },
      { id: "d1e3", name: "Жим резины над головой", sets: 3, reps: "8-12", description: "Пресс напряжен, поясницу не прогибай, руки выжимай вверх контролируемо." },
      { id: "d1e4", name: "Тяга резины к поясу в наклоне", sets: 3, reps: "10-15", description: "Тяни локти назад к тазу, спина нейтральная, без раскачки." },
      { id: "d1e5", name: "Разведение резины в стороны", sets: 3, reps: "12-20", description: "Легкий сгиб в локтях, поднимай до уровня плеч, не зажимай шею." },
      { id: "d1e6", name: "Планка + боковая планка", sets: 3, reps: "40-60с + 30-40с/сторона", description: "Держи корпус жестким, таз не провисает, дыхание спокойное." }
    ]
  },
  2: {
    title: "День 2 — Низ A",
    subtitle: "Квадрицепс + ягодицы + пресс",
    exercises: [
      { id: "d2e1", name: "Болгарские сплит-приседы", sets: 4, reps: "8-12/нога", description: "Шаг комфортный, опускайся вертикально вниз, колено по направлению носка." },
      { id: "d2e2", name: "Присед с резиной (front style)", sets: 4, reps: "10-15", description: "Спина ровная, колени не заваливай внутрь, поднимайся через пятки." },
      { id: "d2e3", name: "Румынская тяга с резиной", sets: 4, reps: "10-15", description: "Отводи таз назад, сохраняй нейтральную спину, чувствуя заднюю поверхность бедра." },
      { id: "d2e4", name: "Ягодичный мост с резиной", sets: 3, reps: "12-20", description: "Верхняя точка с акцентом на ягодицы, не перегибай поясницу." },
      { id: "d2e5", name: "Подъемы на носки стоя", sets: 4, reps: "15-25", description: "Полная амплитуда, пауза вверху 1 сек, опускайся медленно." },
      { id: "d2e6", name: "Dead bug", sets: 3, reps: "10-12/сторона", description: "Поясницу держи прижатой к полу, работай медленно и симметрично." }
    ]
  },
  4: {
    title: "День 3 — Верх B",
    subtitle: "Тяга + осанка + руки",
    exercises: [
      { id: "d3e1", name: "Подтягивания / с резиной / негативы", sets: 5, reps: "4-8", description: "Без рывка, контролируй спуск 2-5 секунд, работай в комфортном хвате." },
      { id: "d3e2", name: "Отжимания на упорах узким/средним", sets: 4, reps: "8-15", description: "Локти ближе к корпусу, корпус прямой, без резкой блокировки локтя." },
      { id: "d3e3", name: "Face pull с резиной", sets: 4, reps: "12-20", description: "Тяни к уровню лица, в конце своди лопатки и раскрывай грудной отдел." },
      { id: "d3e4", name: "Тяга резины одной рукой к тазу", sets: 3, reps: "10-15/сторона", description: "Стабилизируй корпус, тянущий локоть веди назад и вниз." },
      { id: "d3e5", name: "Сгибания на бицепс с резиной", sets: 3, reps: "10-15", description: "Локти у корпуса, подъем без раскачки, опускание медленное." },
      { id: "d3e6", name: "Разгибания на трицепс с резиной", sets: 3, reps: "12-15", description: "Локти фиксированы, двигай только предплечьями, избегай боли в локте." }
    ]
  },
  6: {
    title: "День 4 — Низ B",
    subtitle: "Задняя цепь + стабильность спины",
    exercises: [
      { id: "d4e1", name: "Выпады назад", sets: 4, reps: "10-14/нога", description: "Шаг назад под контроль, корпус ровный, подъем через переднюю ногу." },
      { id: "d4e2", name: "Good morning с резиной", sets: 4, reps: "10-15", description: "Отводи таз назад, сохраняй спину прямой, возвращайся силой ягодиц." },
      { id: "d4e3", name: "Одноногая румынская тяга", sets: 3, reps: "8-12/нога", description: "Держи таз ровно, свободную ногу уводи назад, движение медленное." },
      { id: "d4e4", name: "Ягодичный мост с паузой 2 сек", sets: 3, reps: "12-18", description: "В верхней точке пауза 2 секунды и плотное напряжение ягодиц." },
      { id: "d4e5", name: "Подтягивание коленей к груди", sets: 3, reps: "12-20", description: "Делай плавно, без маха, держи пресс напряженным." },
      { id: "d4e6", name: "Bird-dog", sets: 3, reps: "10/сторона", description: "На четвереньках вытягивай противоположные руку и ногу без вращения таза." }
    ]
  }
};

const state = loadState();

const refs = {
  todayLabel: document.getElementById("todayLabel"),
  todayWorkoutTitle: document.getElementById("todayWorkoutTitle"),
  todayWorkoutSubtitle: document.getElementById("todayWorkoutSubtitle"),
  todayExercises: document.getElementById("todayExercises"),
  programDays: document.getElementById("programDays"),
  completeWorkoutBtn: document.getElementById("completeWorkoutBtn"),
  reminderTime: document.getElementById("reminderTime"),
  reminderDays: document.getElementById("reminderDays"),
  notifyBtn: document.getElementById("notifyBtn"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  toast: document.getElementById("toast"),
  weeklyCount: document.getElementById("weeklyCount"),
  streakCount: document.getElementById("streakCount"),
  totalCount: document.getElementById("totalCount"),
  progressChart: document.getElementById("progressChart")
};

init();

function init() {
  setupTabs();
  renderReminderDays();
  applySettingsToUi();
  renderToday();
  renderProgram();
  renderProgress();
  wireEvents();
  startReminderWatcher();
  registerServiceWorker();
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return {
    settings: { reminderTime: "19:00", reminderDays: [1, 2, 4, 6] },
    workouts: structuredClone(DEFAULT_WORKOUTS),
    completion: {},
    reminderMeta: {}
  };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isoDate(date = new Date()) {
  return date.toISOString().split("T")[0];
}

function getWorkoutForToday() {
  return state.workouts[new Date().getDay()] || null;
}

function renderToday() {
  const now = new Date();
  refs.todayLabel.textContent = `${DAY_NAMES[now.getDay()]}, ${now.toLocaleDateString("ru-RU")}`;
  const workout = getWorkoutForToday();
  if (!workout) {
    refs.todayWorkoutTitle.textContent = "Сегодня отдых";
    refs.todayWorkoutSubtitle.textContent = "Легкая прогулка и восстановление";
    refs.todayExercises.innerHTML = "";
    refs.completeWorkoutBtn.disabled = true;
    return;
  }
  refs.todayWorkoutTitle.textContent = workout.title;
  refs.todayWorkoutSubtitle.textContent = workout.subtitle;
  refs.completeWorkoutBtn.disabled = false;
  const dayKey = isoDate();
  const completed = state.completion[dayKey]?.exercises || {};
  refs.todayExercises.innerHTML = workout.exercises
    .map((ex) => {
      const done = Boolean(completed[ex.id]);
      return `<div class="exercise-item ${done ? "done" : ""}" data-exercise-id="${ex.id}">
          <input class="exercise-check" type="checkbox" ${done ? "checked" : ""} />
          <div>
            <div class="exercise-top"><div class="exercise-title">${escapeHtml(ex.name)}</div></div>
            <p class="exercise-desc">${escapeHtml(ex.description)}</p>
            <div class="exercise-controls">
              <label class="input-group">Подходы<input class="sets-input" type="number" min="1" max="15" value="${ex.sets}" /></label>
              <label class="input-group">Повторы<input class="reps-input" type="text" value="${escapeHtml(ex.reps)}" /></label>
            </div>
          </div>
        </div>`;
    })
    .join("");
}

function renderProgram() {
  const sequence = [1, 2, 4, 6];
  refs.programDays.innerHTML = sequence
    .map((day) => {
      const workout = state.workouts[day];
      return `<article class="program-day">
          <h3>${DAY_NAMES[day]}</h3>
          <p class="muted">${escapeHtml(workout.title)}</p>
          <ul>${workout.exercises.map((ex) => `<li>${escapeHtml(ex.name)} (${ex.sets}x${escapeHtml(ex.reps)})</li>`).join("")}</ul>
        </article>`;
    })
    .join("");
}

function renderReminderDays() {
  refs.reminderDays.innerHTML = [1, 2, 3, 4, 5, 6, 0]
    .map((day) => {
      const short = DAY_NAMES[day].slice(0, 2);
      const checked = state.settings.reminderDays.includes(day) ? "checked" : "";
      return `<label class="day-chip"><input type="checkbox" data-reminder-day="${day}" ${checked} />${short}</label>`;
    })
    .join("");
}

function applySettingsToUi() {
  refs.reminderTime.value = state.settings.reminderTime;
}

function wireEvents() {
  refs.todayExercises.addEventListener("input", onTodayExerciseInput);
  refs.todayExercises.addEventListener("change", onTodayExerciseInput);
  refs.completeWorkoutBtn.addEventListener("click", () => {
    const dateKey = isoDate();
    if (!state.completion[dateKey]) state.completion[dateKey] = { exercises: {}, done: true };
    else state.completion[dateKey].done = true;
    persistState();
    renderProgress();
    toast("Тренировка отмечена как выполненная");
  });
  refs.notifyBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();
    toast(permission === "granted" ? "Уведомления включены" : "Уведомления не разрешены");
  });
  refs.saveSettingsBtn.addEventListener("click", () => {
    const selectedDays = Array.from(document.querySelectorAll("[data-reminder-day]:checked")).map((el) => Number(el.dataset.reminderDay));
    state.settings.reminderDays = selectedDays;
    state.settings.reminderTime = refs.reminderTime.value || "19:00";
    persistState();
    toast("Настройки сохранены");
  });
  refs.exportBtn.addEventListener("click", exportData);
  refs.importInput.addEventListener("change", importData);
}

function onTodayExerciseInput(event) {
  const item = event.target.closest(".exercise-item");
  if (!item) return;
  const exerciseId = item.dataset.exerciseId;
  const workout = getWorkoutForToday();
  if (!workout) return;
  const exercise = workout.exercises.find((x) => x.id === exerciseId);
  if (!exercise) return;
  if (event.target.classList.contains("sets-input")) exercise.sets = Number(event.target.value || exercise.sets);
  if (event.target.classList.contains("reps-input")) exercise.reps = event.target.value;
  if (event.target.classList.contains("exercise-check")) {
    const checked = event.target.checked;
    const dateKey = isoDate();
    if (!state.completion[dateKey]) state.completion[dateKey] = { exercises: {}, done: false };
    state.completion[dateKey].exercises[exerciseId] = checked;
    item.classList.toggle("done", checked);
    if (allTodayExercisesDone()) state.completion[dateKey].done = true;
  }
  persistState();
  renderProgram();
  renderProgress();
}

function allTodayExercisesDone() {
  const workout = getWorkoutForToday();
  if (!workout) return false;
  const day = state.completion[isoDate()];
  if (!day) return false;
  return workout.exercises.every((ex) => day.exercises[ex.id]);
}

function renderProgress() {
  const doneDates = Object.entries(state.completion).filter(([, v]) => v.done).map(([d]) => d).sort();
  refs.totalCount.textContent = String(doneDates.length);
  refs.weeklyCount.textContent = String(countLastDays(doneDates, 7));
  refs.streakCount.textContent = String(calculateStreak(doneDates));
  drawChart(doneDates);
}

function countLastDays(dates, days) {
  const limit = new Date();
  limit.setDate(limit.getDate() - (days - 1));
  return dates.filter((d) => new Date(d) >= limit).length;
}

function calculateStreak(dates) {
  const set = new Set(dates);
  let streak = 0;
  const cursor = new Date();
  while (set.has(cursor.toISOString().split("T")[0])) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function drawChart(doneDates) {
  const canvas = refs.progressChart;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const weeks = getLastWeeks(8);
  const values = weeks.map(({ start, end }) => doneDates.filter((date) => { const d = new Date(date); return d >= start && d <= end; }).length);
  const maxVal = Math.max(4, ...values);
  const padding = 26;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const barWidth = chartWidth / weeks.length - 14;
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#9fb0df";
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();
  values.forEach((value, i) => {
    const x = padding + i * (barWidth + 14);
    const h = (value / maxVal) * (chartHeight - 22);
    const y = height - padding - h;
    ctx.fillStyle = "#4f8cf7";
    ctx.fillRect(x, y, barWidth, h);
    ctx.fillStyle = "#ecf0ff";
    ctx.fillText(String(value), x + barWidth / 2 - 3, y - 6);
    ctx.fillStyle = "#9fb0df";
    ctx.fillText(`W${i + 1}`, x + barWidth / 2 - 8, height - 8);
  });
}

function getLastWeeks(count) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const weeks = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const weekEnd = new Date(end);
    weekEnd.setDate(end.getDate() - i * 7);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    weeks.push({ start: weekStart, end: weekEnd });
  }
  return weeks;
}

function startReminderWatcher() {
  setInterval(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const now = new Date();
    const day = now.getDay();
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const todayKey = isoDate(now);
    if (!state.settings.reminderDays.includes(day) || hhmm !== state.settings.reminderTime) return;
    if (state.reminderMeta[todayKey]) return;
    state.reminderMeta[todayKey] = true;
    persistState();
    new Notification("Пора на тренировку", { body: "Открой Training Flow и отмечай упражнения по очереди.", icon: "./icon.svg" });
    toast("Напоминание отправлено");
  }, 30000);
}

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

function toast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  setTimeout(() => refs.toast.classList.remove("show"), 2000);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "training-flow-backup.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported.settings || !imported.workouts || !imported.completion) throw new Error("invalid");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      Object.assign(state, imported);
      renderReminderDays();
      applySettingsToUi();
      renderToday();
      renderProgram();
      renderProgress();
      toast("Данные импортированы");
    } catch (_error) {
      toast("Ошибка импорта файла");
    }
  };
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("./sw.js");
  } catch (_error) {
    return null;
  }
}
