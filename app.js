const STORAGE_KEY = "training-flow-v2";
const DAY_NAMES = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const MOTIVATION_MESSAGES = [
  "Разогрев уже сделан. Сегодняшняя версия тебя будет сильнее вчерашней.",
  "Мощный день: спокойный темп, четкая техника, уверенный прогресс.",
  "Каждый подход - вклад в форму и энергию. Ты в отличном ритме.",
  "Осталось только начать первый подход, дальше пойдет легче.",
  "Собранно, симметрично, красиво. Тренировка под контролем."
];

const DEFAULT_STATE = {
  settings: {
    reminderTime: "19:00",
    schedule: {
      0: "rest",
      1: "upperA",
      2: "lowerA",
      3: "rest",
      4: "upperB",
      5: "rest",
      6: "lowerB"
    }
  },
  workouts: {
    upperA: {
      title: "Верх A",
      subtitle: "Жим + горизонтальная тяга",
      exercises: [
        {
          id: "uA1",
          name: "Отжимания на упорах с резиной",
          sets: 4,
          reps: "6-10",
          description:
            "Упрись руками в упоры, резину расположи за спиной. Держи корпус ровным, не проваливай таз, опускайся 2-3 секунды и поднимайся без рывка, не выпрямляя локти в жесткий замок."
        },
        {
          id: "uA2",
          name: "Австралийские подтягивания",
          sets: 4,
          reps: "8-12",
          description:
            "Ляг под низкий турник, держи тело прямым. Сначала сведи лопатки, затем подтяни грудь к перекладине. Внизу полностью контролируй опускание и не расслабляй корпус."
        },
        {
          id: "uA3",
          name: "Жим резины над головой",
          sets: 3,
          reps: "8-12",
          description:
            "Наступи на резину, ручки у плеч. Выжми вверх по дуге, держи пресс в напряжении и не выгибай поясницу. Опускай резину плавно и симметрично."
        }
      ]
    },
    lowerA: {
      title: "Низ A",
      subtitle: "Квадрицепс + ягодицы + пресс",
      exercises: [
        {
          id: "lA1",
          name: "Болгарские сплит-приседы",
          sets: 4,
          reps: "8-12/нога",
          description:
            "Заднюю ногу поставь на опору, передняя нога устойчиво на полу. Опускайся строго вниз, колено направляй по линии носка, поднимайся через пятку передней ноги."
        },
        {
          id: "lA2",
          name: "Присед с резиной (front style)",
          sets: 4,
          reps: "10-15",
          description:
            "Резину держи у плеч, корпус слегка наклонен вперед. Колени и носки смотрят в одну сторону, спина нейтральна, в нижней точке не теряй контроль."
        },
        {
          id: "lA3",
          name: "Румынская тяга с резиной",
          sets: 4,
          reps: "10-15",
          description:
            "Отводи таз назад, а не вниз, сохраняй спину прямой. В нижней точке чувствуй растяжение задней поверхности бедра и возвращайся за счет ягодиц."
        }
      ]
    },
    upperB: {
      title: "Верх B",
      subtitle: "Тяга + осанка + руки",
      exercises: [
        {
          id: "uB1",
          name: "Подтягивания / негативы",
          sets: 5,
          reps: "4-8",
          description:
            "Начинай с включения лопаток, тянись грудью вверх без рывка, спускайся медленно 3-5 секунд. Если тяжело - используй резину и не раскачивай корпус."
        },
        {
          id: "uB2",
          name: "Отжимания на упорах узким/средним",
          sets: 4,
          reps: "8-15",
          description:
            "Локти держи ближе к корпусу, грудь направляй между упоров. Контролируй плечи, не проваливайся внизу, движение должно быть равномерным."
        },
        {
          id: "uB3",
          name: "Face pull с резиной",
          sets: 4,
          reps: "12-20",
          description:
            "Тяни резину к верхней части лица, локти в стороны. В конечной точке своди лопатки и слегка разворачивай плечи наружу."
        }
      ]
    },
    lowerB: {
      title: "Низ B",
      subtitle: "Задняя цепь + стабильность спины",
      exercises: [
        {
          id: "lB1",
          name: "Выпады назад",
          sets: 4,
          reps: "10-14/нога",
          description:
            "Шаг назад делай достаточной длины, чтобы колено передней ноги оставалось стабильным. Поднимайся, сохраняя вертикальный корпус и опору на всю стопу."
        },
        {
          id: "lB2",
          name: "Good morning с резиной",
          sets: 4,
          reps: "10-15",
          description:
            "Резина под стопами и за плечами. Мягко сгибай колени, отводи таз назад и сохраняй длинную спину, затем возвращайся усилием ягодиц."
        },
        {
          id: "lB3",
          name: "Bird-dog",
          sets: 3,
          reps: "10/сторона",
          description:
            "На четвереньках вытягивай противоположные руку и ногу, не разворачивая таз. Задержись на 1-2 секунды и плавно вернись в исходное положение."
        }
      ]
    }
  },
  completion: {}
};

let state = loadState();
let activeWorkoutKey = Object.keys(state.workouts)[0] || "upperA";
const expandedExercises = new Set();

const refs = {
  todayLabel: document.getElementById("todayLabel"),
  todayWorkoutTitle: document.getElementById("todayWorkoutTitle"),
  todayWorkoutSubtitle: document.getElementById("todayWorkoutSubtitle"),
  todayExercises: document.getElementById("todayExercises"),
  completeWorkoutBtn: document.getElementById("completeWorkoutBtn"),
  resetTodayBtn: document.getElementById("resetTodayBtn"),
  reminderTime: document.getElementById("reminderTime"),
  scheduleEditor: document.getElementById("scheduleEditor"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  notifyBtn: document.getElementById("notifyBtn"),
  setsRepsEditor: document.getElementById("setsRepsEditor"),
  workoutSelect: document.getElementById("workoutSelect"),
  workoutEditor: document.getElementById("workoutEditor"),
  addWorkoutBtn: document.getElementById("addWorkoutBtn"),
  deleteWorkoutBtn: document.getElementById("deleteWorkoutBtn"),
  addExerciseBtn: document.getElementById("addExerciseBtn"),
  exportBtn: document.getElementById("exportBtn"),
  importInput: document.getElementById("importInput"),
  weeklyCount: document.getElementById("weeklyCount"),
  streakCount: document.getElementById("streakCount"),
  totalCount: document.getElementById("totalCount"),
  todayDonut: document.getElementById("todayDonut"),
  todayDonutLabel: document.getElementById("todayDonutLabel"),
  weeklyBarChart: document.getElementById("weeklyBarChart"),
  monthlyDonut: document.getElementById("monthlyDonut"),
  heatmapGrid: document.getElementById("heatmapGrid"),
  motivationText: document.getElementById("motivationText"),
  toast: document.getElementById("toast")
};

init();

function init() {
  setupTabs();
  setupSettingsTabs();
  wireEvents();
  renderAll();
  startReminderWatcher();
  registerServiceWorker();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(DEFAULT_STATE);
  try {
    const saved = JSON.parse(raw);
    const merged = structuredClone(DEFAULT_STATE);
    merged.settings = { ...merged.settings, ...(saved.settings || {}) };
    merged.workouts = saved.workouts || merged.workouts;
    merged.completion = saved.completion || {};
    return merged;
  } catch (_error) {
    return structuredClone(DEFAULT_STATE);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getWorkoutKeyByDay(dayIndex) {
  return state.settings.schedule[String(dayIndex)] || "rest";
}

function getTodayWorkout() {
  const dayIndex = new Date().getDay();
  const key = getWorkoutKeyByDay(dayIndex);
  if (key === "rest") return { key: "rest", workout: null };
  return { key, workout: state.workouts[key] || null };
}

function renderAll() {
  refs.todayLabel.textContent = `${DAY_NAMES[new Date().getDay()]}, ${new Date().toLocaleDateString("ru-RU")}`;
  refs.reminderTime.value = state.settings.reminderTime;
  renderScheduleEditor();
  renderToday();
  renderSetsRepsEditor();
  renderWorkoutSelect();
  renderWorkoutEditor();
  renderStatsAndCharts();
}

function renderToday() {
  const todayKey = getTodayKey();
  const { key, workout } = getTodayWorkout();
  if (!workout) {
    refs.todayWorkoutTitle.textContent = "Сегодня день отдыха";
    refs.todayWorkoutSubtitle.textContent = "В расписании на этот день выбрано восстановление.";
    refs.todayExercises.innerHTML = "";
    refs.motivationText.textContent = "Сегодня восстановление. Легкая активность и сон помогут вернуться еще сильнее.";
    refs.completeWorkoutBtn.disabled = true;
    drawDonut(refs.todayDonut, 0, "#4f8df8", "#1a294c");
    refs.todayDonutLabel.textContent = "0%";
    return;
  }

  refs.todayWorkoutTitle.textContent = `${workout.title}`;
  refs.todayWorkoutSubtitle.textContent = workout.subtitle;
  refs.completeWorkoutBtn.disabled = false;

  if (!state.completion[todayKey]) {
    state.completion[todayKey] = { workoutKey: key, done: false, exercises: {} };
  } else {
    state.completion[todayKey].workoutKey = key;
  }
  const dayCompletion = state.completion[todayKey];

  refs.todayExercises.innerHTML = workout.exercises
    .map((ex) => {
      const checked = Boolean(dayCompletion.exercises[ex.id]);
      const expanded = expandedExercises.has(ex.id);
      return `<article class="exercise-item ${checked ? "done" : ""} ${expanded ? "expanded" : ""}" data-exercise-id="${ex.id}">
        <div class="exercise-main">
          <input class="exercise-check" type="checkbox" aria-label="Отметить упражнение ${escapeHtml(ex.name)}" ${checked ? "checked" : ""} />
          <p class="exercise-title">${escapeHtml(ex.name)}</p>
          <p class="exercise-meta">${escapeHtml(`${ex.sets} x ${ex.reps}`)}</p>
          <button class="exercise-toggle" type="button" aria-expanded="${expanded}" aria-label="Показать описание упражнения">▸</button>
        </div>
        <p class="exercise-desc ${expanded ? "expanded" : ""}">${escapeHtml(ex.description)}</p>
      </article>`;
    })
    .join("");

  const doneCount = workout.exercises.filter((ex) => dayCompletion.exercises[ex.id]).length;
  const percent = workout.exercises.length ? Math.round((doneCount / workout.exercises.length) * 100) : 0;
  refs.motivationText.textContent = getMotivationText(percent, doneCount, workout.exercises.length);
  refs.todayDonutLabel.textContent = `${percent}%`;
  drawDonut(refs.todayDonut, percent, "#34d399", "#1a294c");
}

function renderScheduleEditor() {
  const workoutOptions = Object.entries(state.workouts)
    .map(([key, w]) => `<option value="${key}">${escapeHtml(w.title)}</option>`)
    .join("");
  refs.scheduleEditor.innerHTML = DAY_NAMES.map((day, idx) => {
    const current = getWorkoutKeyByDay(idx);
    return `<label class="schedule-row">
      <span>${day}</span>
      <select data-schedule-day="${idx}">
        <option value="rest" ${current === "rest" ? "selected" : ""}>День отдыха</option>
        ${workoutOptions.replace(`value="${current}"`, `value="${current}" selected`)}
      </select>
    </label>`;
  }).join("");
}

function renderSetsRepsEditor() {
  const cards = [];
  for (const [key, workout] of Object.entries(state.workouts)) {
    workout.exercises.forEach((ex) => {
      cards.push(`<article class="editor-card" data-sets-reps-workout="${key}" data-sets-reps-ex="${ex.id}">
        <p class="exercise-title">${escapeHtml(workout.title)}: ${escapeHtml(ex.name)}</p>
        <div class="editor-grid">
          <label>Подходы <input type="number" min="1" max="20" value="${ex.sets}" data-field="sets" /></label>
          <label>Повторы <input type="text" value="${escapeHtml(ex.reps)}" data-field="reps" /></label>
        </div>
      </article>`);
    });
  }
  refs.setsRepsEditor.innerHTML = cards.join("");
}

function renderWorkoutSelect() {
  const entries = Object.entries(state.workouts);
  if (!entries.length) {
    refs.workoutSelect.innerHTML = "";
    activeWorkoutKey = null;
    return;
  }
  if (!state.workouts[activeWorkoutKey]) activeWorkoutKey = entries[0][0];
  refs.workoutSelect.innerHTML = entries
    .map(([key, workout]) => `<option value="${key}" ${key === activeWorkoutKey ? "selected" : ""}>${escapeHtml(workout.title)}</option>`)
    .join("");
}

function renderWorkoutEditor() {
  if (!activeWorkoutKey || !state.workouts[activeWorkoutKey]) {
    refs.workoutEditor.innerHTML = "<p class='muted'>Нет тренировок. Создай новую.</p>";
    return;
  }
  const workout = state.workouts[activeWorkoutKey];
  refs.workoutEditor.innerHTML = `<article class="editor-card">
      <p class="exercise-title">Общие поля тренировки</p>
      <div class="editor-grid">
        <label>Название <input type="text" data-workout-field="title" value="${escapeHtml(workout.title)}" /></label>
        <label>Подзаголовок <input type="text" data-workout-field="subtitle" value="${escapeHtml(workout.subtitle || "")}" /></label>
      </div>
    </article>
    ${workout.exercises
      .map(
        (ex) => `<article class="editor-card" data-editor-exercise-id="${ex.id}">
        <div class="settings-row">
          <p class="exercise-title">Упражнение</p>
          <button class="danger-btn" data-action="delete-exercise" data-exercise-id="${ex.id}">Удалить</button>
        </div>
        <div class="editor-grid">
          <label>Название <input type="text" data-ex-field="name" value="${escapeHtml(ex.name)}" data-exercise-id="${ex.id}" /></label>
          <label>Подходы <input type="number" min="1" max="20" data-ex-field="sets" value="${ex.sets}" data-exercise-id="${ex.id}" /></label>
          <label>Повторы <input type="text" data-ex-field="reps" value="${escapeHtml(ex.reps)}" data-exercise-id="${ex.id}" /></label>
        </div>
        <label>Подробное описание техники
          <textarea data-ex-field="description" data-exercise-id="${ex.id}">${escapeHtml(ex.description)}</textarea>
        </label>
      </article>`
      )
      .join("")}`;
}

function renderStatsAndCharts() {
  const doneDates = Object.entries(state.completion)
    .filter(([, v]) => v.done)
    .map(([d]) => d)
    .sort();
  refs.totalCount.textContent = String(doneDates.length);
  refs.weeklyCount.textContent = String(countLastDays(doneDates, 7));
  refs.streakCount.textContent = String(calculateStreak(doneDates));

  drawWeeklyBar(doneDates);
  drawMonthlyDoneDonut(doneDates);
  drawHeatmap(doneDates);
}

function wireEvents() {
  refs.todayExercises.addEventListener("click", (event) => {
    const toggle = event.target.closest(".exercise-toggle");
    if (!toggle) return;
    const card = toggle.closest(".exercise-item");
    const desc = card?.querySelector(".exercise-desc");
    const exId = card?.dataset.exerciseId;
    if (!card || !desc || !exId) return;
    const isOpen = card.classList.toggle("expanded");
    desc.classList.toggle("expanded", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) expandedExercises.add(exId);
    else expandedExercises.delete(exId);
  });

  refs.todayExercises.addEventListener("change", (event) => {
    const checkbox = event.target.closest(".exercise-check");
    if (!checkbox) return;
    const card = checkbox.closest(".exercise-item");
    const exId = card?.dataset.exerciseId;
    if (!exId) return;
    const key = getTodayKey();
    if (!state.completion[key]) state.completion[key] = { workoutKey: getTodayWorkout().key, done: false, exercises: {} };
    state.completion[key].exercises[exId] = checkbox.checked;
    card.classList.toggle("done", checkbox.checked);
    syncTodayDoneStatus();
    persist();
    renderToday();
    renderStatsAndCharts();
    if (checkbox.checked) toast("Отличный подход. Держи темп!");
  });

  refs.completeWorkoutBtn.addEventListener("click", () => {
    const key = getTodayKey();
    const { workout } = getTodayWorkout();
    if (!workout) return;
    if (!state.completion[key]) state.completion[key] = { workoutKey: getTodayWorkout().key, done: false, exercises: {} };
    workout.exercises.forEach((ex) => {
      state.completion[key].exercises[ex.id] = true;
    });
    state.completion[key].done = true;
    persist();
    renderAll();
    toast("Огонь! Тренировка закрыта. Ты сегодня на высоте!");
  });

  refs.resetTodayBtn.addEventListener("click", () => {
    const key = getTodayKey();
    if (state.completion[key]) {
      state.completion[key].exercises = {};
      state.completion[key].done = false;
      persist();
      renderAll();
      toast("Отметки за сегодня сброшены.");
    }
  });

  refs.notifyBtn.addEventListener("click", async () => {
    const permission = await Notification.requestPermission();
    toast(permission === "granted" ? "Уведомления включены." : "Уведомления не разрешены.");
  });

  refs.saveSettingsBtn.addEventListener("click", () => {
    state.settings.reminderTime = refs.reminderTime.value || "19:00";
    document.querySelectorAll("[data-schedule-day]").forEach((el) => {
      state.settings.schedule[String(el.dataset.scheduleDay)] = el.value;
    });
    persist();
    renderAll();
    toast("Расписание и напоминания сохранены.");
  });

  refs.setsRepsEditor.addEventListener("input", (event) => {
    const field = event.target.dataset.field;
    if (!field) return;
    const card = event.target.closest("[data-sets-reps-workout]");
    if (!card) return;
    const workoutKey = card.dataset.setsRepsWorkout;
    const exId = card.dataset.setsRepsEx;
    const ex = state.workouts[workoutKey]?.exercises.find((item) => item.id === exId);
    if (!ex) return;
    if (field === "sets") ex.sets = Number(event.target.value || ex.sets);
    if (field === "reps") ex.reps = event.target.value;
    persist();
    renderToday();
    renderWorkoutEditor();
  });

  refs.workoutSelect.addEventListener("change", () => {
    activeWorkoutKey = refs.workoutSelect.value;
    renderWorkoutEditor();
  });

  refs.workoutEditor.addEventListener("input", (event) => {
    const workout = state.workouts[activeWorkoutKey];
    if (!workout) return;

    const workoutField = event.target.dataset.workoutField;
    if (workoutField) {
      workout[workoutField] = event.target.value;
      persist();
      renderScheduleEditor();
      renderWorkoutSelect();
      renderToday();
      return;
    }

    const exField = event.target.dataset.exField;
    const exId = event.target.dataset.exerciseId;
    if (!exField || !exId) return;
    const ex = workout.exercises.find((item) => item.id === exId);
    if (!ex) return;
    if (exField === "sets") ex.sets = Number(event.target.value || ex.sets);
    else ex[exField] = event.target.value;
    persist();
    renderSetsRepsEditor();
    renderToday();
  });

  refs.workoutEditor.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='delete-exercise']");
    if (!button) return;
    const exId = button.dataset.exerciseId;
    const workout = state.workouts[activeWorkoutKey];
    workout.exercises = workout.exercises.filter((ex) => ex.id !== exId);
    persist();
    renderAll();
    toast("Упражнение удалено.");
  });

  refs.addExerciseBtn.addEventListener("click", () => {
    const workout = state.workouts[activeWorkoutKey];
    if (!workout) return;
    const id = `ex${Date.now()}`;
    workout.exercises.push({
      id,
      name: "Новое упражнение",
      sets: 3,
      reps: "10-12",
      description: "Опиши технику: исходное положение, амплитуда, темп и частые ошибки."
    });
    persist();
    renderAll();
    toast("Новое упражнение добавлено.");
  });

  refs.addWorkoutBtn.addEventListener("click", () => {
    const key = `workout${Date.now()}`;
    state.workouts[key] = {
      title: "Новая тренировка",
      subtitle: "Отредактируй под свою цель",
      exercises: []
    };
    activeWorkoutKey = key;
    persist();
    renderAll();
    toast("Новая тренировка создана.");
  });

  refs.deleteWorkoutBtn.addEventListener("click", () => {
    if (!activeWorkoutKey || Object.keys(state.workouts).length <= 1) {
      toast("Нельзя удалить последнюю тренировку.");
      return;
    }
    delete state.workouts[activeWorkoutKey];
    Object.keys(state.settings.schedule).forEach((day) => {
      if (state.settings.schedule[day] === activeWorkoutKey) state.settings.schedule[day] = "rest";
    });
    activeWorkoutKey = Object.keys(state.workouts)[0];
    persist();
    renderAll();
    toast("Тренировка удалена.");
  });

  refs.exportBtn.addEventListener("click", exportData);
  refs.importInput.addEventListener("change", importData);
}

function syncTodayDoneStatus() {
  const key = getTodayKey();
  const entry = state.completion[key];
  const { workout } = getTodayWorkout();
  if (!entry || !workout) return;
  entry.done = workout.exercises.length > 0 && workout.exercises.every((ex) => entry.exercises[ex.id]);
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

function drawDonut(canvas, percent, color, bg) {
  prepareCanvas(canvas, 260);
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2 - 16;
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 16;
  ctx.strokeStyle = bg;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * percent) / 100);
  ctx.stroke();
}

function drawWeeklyBar(doneDates) {
  const canvas = refs.weeklyBarChart;
  prepareCanvas(canvas, 280);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const weeks = getLastWeeks(8);
  const values = weeks.map(({ start, end }) => doneDates.filter((d) => new Date(d) >= start && new Date(d) <= end).length);
  const max = Math.max(4, ...values);
  const padding = 26;
  const chartW = canvas.width - padding * 2;
  const chartH = canvas.height - padding * 2;
  const barW = chartW / values.length - 10;
  ctx.fillStyle = "#7fb3ff";
  ctx.font = "12px sans-serif";
  values.forEach((v, i) => {
    const x = padding + i * (barW + 10);
    const h = ((chartH - 26) * v) / max;
    const y = canvas.height - padding - h;
    ctx.fillStyle = "#4f8df8";
    ctx.fillRect(x, y, barW, h);
    ctx.fillStyle = "#dbeafe";
    ctx.fillText(String(v), x + barW / 2 - 3, y - 6);
  });
}

function drawMonthlyDoneDonut(doneDates) {
  const last28 = [];
  const now = new Date();
  for (let i = 27; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    last28.push(d.toISOString().split("T")[0]);
  }
  const done = last28.filter((d) => doneDates.includes(d)).length;
  const percent = Math.round((done / 28) * 100);
  prepareCanvas(refs.monthlyDonut, 320);
  drawDonut(refs.monthlyDonut, percent, "#5d9eff", "#1a294c");
}

function drawHeatmap(doneDates) {
  const now = new Date();
  const cells = [];
  for (let i = 55; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().split("T")[0];
    cells.push(`<div class="heat-cell ${doneDates.includes(key) ? "heat-3" : "heat-0"}" title="${key}"></div>`);
  }
  refs.heatmapGrid.innerHTML = cells.join("");
}

function getLastWeeks(count) {
  const now = new Date();
  const weeks = [];
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
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
    const selected = getWorkoutKeyByDay(day);
    if (selected === "rest") return;
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const key = getTodayKey();
    if (hhmm !== state.settings.reminderTime) return;
    if (state.completion[key]?.notificationSent) return;
    if (!state.completion[key]) state.completion[key] = { workoutKey: selected, done: false, exercises: {} };
    state.completion[key].notificationSent = true;
    persist();
    new Notification("Пора на тренировку", { body: `Сегодня по расписанию: ${state.workouts[selected]?.title || "тренировка"}`, icon: "./icon.svg" });
    toast("Напоминание отправлено.");
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

function setupSettingsTabs() {
  document.querySelectorAll(".settings-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".settings-tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".settings-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(`settings-panel-${btn.dataset.settingsTab}`);
      if (panel) panel.classList.add("active");
    });
  });
}

function prepareCanvas(canvas, targetHeight) {
  const ratio = window.devicePixelRatio || 1;
  const cssWidth = Math.max(220, Math.floor(canvas.clientWidth || 320));
  const cssHeight = targetHeight;
  canvas.width = Math.floor(cssWidth * ratio);
  canvas.height = Math.floor(cssHeight * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "training-flow-backup.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported.settings || !imported.workouts || !imported.completion) throw new Error("invalid");
      state = imported;
      activeWorkoutKey = Object.keys(state.workouts)[0] || null;
      persist();
      renderAll();
      toast("Данные импортированы.");
    } catch (_error) {
      toast("Ошибка импорта JSON.");
    }
  };
  reader.readAsText(file);
}

function toast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  setTimeout(() => refs.toast.classList.remove("show"), 2000);
}

function getMotivationText(percent, doneCount, totalCount) {
  if (totalCount === 0) return "Добавь упражнения в эту тренировку и начни путь к серии сильных дней.";
  if (percent >= 100) return "Легендарно! Все упражнения выполнены. Восстановись и забирай следующий день.";
  if (percent >= 75) return `Финиш близко: ${doneCount} из ${totalCount} уже закрыто. Добей красиво!`;
  if (percent >= 40) return `Хороший ритм: ${doneCount} из ${totalCount} выполнено. Продолжай в том же духе.`;
  return MOTIVATION_MESSAGES[new Date().getDate() % MOTIVATION_MESSAGES.length];
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
