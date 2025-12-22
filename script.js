// --- SCRIPT DE NAVEGAÇÃO POR ABAS ---
function showSection(sectionId) {
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((b) => b.classList.remove("active"));

  const btn = document.querySelector(
    `.tab-button[onclick="showSection('${sectionId}')"]`
  );
  if (btn) btn.classList.add("active");

  const section = document.getElementById(sectionId);
  if (section) section.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // ========================================================
  // 1. SCRIPT DO ROADMAP PROFISSIONAL (Carreira)
  // ========================================================
  if (document.getElementById("carreira-section")) {
    const roadmapCheckboxes = document.querySelectorAll(".roadmap-check");
    const roadmapProgressBar = document.getElementById("roadmapProgressBar");

    function updateRoadmapProgress() {
      const totalItems = roadmapCheckboxes.length;
      const checkedItems = document.querySelectorAll(
        ".roadmap-check:checked"
      ).length;
      const percentage =
        totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

      if (roadmapProgressBar) {
        roadmapProgressBar.style.width = percentage + "%";
        roadmapProgressBar.textContent = percentage + "%";
      }

      roadmapCheckboxes.forEach((box) => {
        localStorage.setItem(box.id, box.checked);
      });
    }

    function loadRoadmapProgress() {
      roadmapCheckboxes.forEach((box) => {
        const isChecked = localStorage.getItem(box.id) === "true";
        box.checked = isChecked;
      });
      updateRoadmapProgress();
    }

    roadmapCheckboxes.forEach((box) => {
      box.addEventListener("change", updateRoadmapProgress);
    });

    loadRoadmapProgress();
  }

  // ========================================================
  // 2. SCRIPT DA AGENDA DINÂMICA
  // ========================================================
  if (document.getElementById("agenda")) {
    const agenda = document.getElementById("agenda");
    const HORA_INICIO_AGENDA = 5,
      HORA_FIM_AGENDA = 27, // Vai até 03:00 da manhã visualmente
      ALTURA_HORA = 60;

    function gerarGrade() {
      agenda.innerHTML = "";
      const t = document.createElement("div");
      t.className = "grid-item";
      t.style.borderLeft = "none";
      t.style.borderBottom = "1px solid #333";
      agenda.appendChild(t);

      ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].forEach((e) => {
        const o = document.createElement("div");
        o.className = "grid-item header-dia";
        o.textContent = e;
        agenda.appendChild(o);
      });

      for (let o = HORA_INICIO_AGENDA; o < HORA_FIM_AGENDA; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        const horaMostrada = o % 24;
        e.textContent = `${horaMostrada.toString().padStart(2, "0")}:00`;
        e.style.gridRow = `${o - HORA_INICIO_AGENDA + 2}`;
        agenda.appendChild(e);
      }

      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        o.className = "coluna-dia";
        o.dataset.diaIndex = e + 1;
        o.style.gridColumn = `${e + 2}`;
        o.style.gridRow = `2 / span ${HORA_FIM_AGENDA - HORA_INICIO_AGENDA}`;
        agenda.appendChild(o);
      }
    }

    function adicionarAtividade(t, e, o, i, n, customClass) {
      let [d, a] = o.split(":").map(Number);
      let [r, s] = i.split(":").map(Number);

      // Tratamento para horários pós-meia noite (ex: 27h = 03h)
      if (r < d && r < HORA_INICIO_AGENDA) r += 24;
      if (d >= 0 && d < HORA_INICIO_AGENDA) {
        d += 24;
        if (r < d) r += 24;
      }

      const l = (d * 60 + a - HORA_INICIO_AGENDA * 60) / 60;
      const c = (r * 60 + s - (d * 60 + a)) / 60;

      if (d < HORA_INICIO_AGENDA && r < HORA_INICIO_AGENDA) return;

      const h = document.createElement("div");
      h.className = "atividade-bloco";
      if (customClass) h.classList.add(customClass);
      h.style.top = `${l * ALTURA_HORA}px`;
      h.style.height = `${c * ALTURA_HORA}px`;
      h.style.backgroundColor = n;
      h.style.borderLeftColor = ajustarCor(n, -40);
      h.innerHTML = `${t} <br><small>${o} - ${i}</small>`;
      agenda
        .querySelector(`.coluna-dia[data-dia-index='${e}']`)
        ?.appendChild(h);
    }

    function ajustarCor(t, e) {
      let o = parseInt(t.slice(1, 3), 16),
        i = parseInt(t.slice(3, 5), 16),
        n = parseInt(t.slice(5, 7), 16);
      return `#${Math.max(0, Math.min(255, o + e))
        .toString(16)
        .padStart(2, "0")}${Math.max(0, Math.min(255, i + e))
        .toString(16)
        .padStart(2, "0")}${Math.max(0, Math.min(255, n + e))
        .toString(16)
        .padStart(2, "0")}`;
    }

    gerarGrade();

    // CORES E ATIVIDADES
    const corCardio = "#00ced1"; // Turquesa
    const corAcademia = "#e74c3c"; // Vermelho
    const corPortugues = "#3498db"; // Azul
    const corMatematica = "#d63384"; // Rosa
    const corBancarios = "#27ae60"; // Verde
    const corVendas = "#f1c40f"; // Amarelo
    const corInformatica = "#8e44ad"; // Roxo
    const corIngles = "#e67e22"; // Laranja
    const corSimulado = "#95a5a6"; // Cinza

    // 1. CARDIO (Seg-Sex + Dom) -> 10:00 às 11:00
    [1, 2, 3, 4, 5, 7].forEach((dia) => {
      adicionarAtividade(
        "<strong>🏃 Cardio</strong>",
        dia,
        "10:00",
        "11:00",
        corCardio
      );
    });

    // 2. ACADEMIA (Seg-Sáb) -> 15:00 às 17:00
    [1, 2, 3, 4, 5, 6].forEach((dia) => {
      adicionarAtividade(
        "<strong>💪 Academia</strong>",
        dia,
        "15:00",
        "17:00",
        corAcademia
      );
    });

    // 3. ESTUDOS - TURNO DA NOITE (19h - 00h)

    // --- BLOCO 1: BASE (19:00 - 21:00) ---
    // Seg, Qua, Sex: Português
    [1, 3, 5].forEach((dia) => {
      adicionarAtividade(
        "<strong>📚 Português</strong>",
        dia,
        "19:00",
        "21:00",
        corPortugues
      );
    });
    // Ter, Qui: Matemática
    [2, 4].forEach((dia) => {
      adicionarAtividade(
        "<strong>📐 Matemática</strong>",
        dia,
        "19:00",
        "21:00",
        corMatematica
      );
    });
    // Sábado: Matemática
    adicionarAtividade(
      "<strong>📐 Matemática Fin.</strong>",
      6,
      "19:00",
      "21:00",
      corMatematica
    );

    // --- BLOCO 2: ESPECÍFICAS (22:00 - 00:00) ---
    // Seg, Qui: Conhecimentos Bancários
    [1, 4].forEach((dia) => {
      adicionarAtividade(
        "<strong>🏦 C. Bancários</strong>",
        dia,
        "22:00",
        "00:00",
        corBancarios
      );
    });
    // Ter, Sex: Vendas e Negociação / Atualidades
    [2, 5].forEach((dia) => {
      adicionarAtividade(
        "<strong>💼 Vendas/Negoc.</strong>",
        dia,
        "22:00",
        "00:00",
        corVendas
      );
    });
    // Qua, Sáb: Informática
    [3, 6].forEach((dia) => {
      adicionarAtividade(
        "<strong>💻 Informática</strong>",
        dia,
        "22:00",
        "00:00",
        corInformatica
      );
    });

    // --- DOMINGO (ESPECIAL) ---
    adicionarAtividade(
      "<strong>✍️ Redação + Inglês</strong>",
      7,
      "19:00",
      "21:00",
      corIngles
    );
    adicionarAtividade(
      "<strong>📝 Simulado/Revisão</strong>",
      7,
      "22:00",
      "00:00",
      corSimulado
    );
  }

  // Salvamento dos Textareas da Agenda
  const textareasToSave = [
    "provas-textarea",
    "atividades-textarea",
    "consultas-textarea",
  ];
  textareasToSave.forEach((id) => {
    const textarea = document.getElementById(id);
    if (textarea) {
      textarea.value = localStorage.getItem(id) || "";
      textarea.addEventListener("input", () =>
        localStorage.setItem(id, textarea.value)
      );
    }
  });

  // ========================================================
  // 3. SCRIPT DO TREINO (PPL)
  // ========================================================
  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const allWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]"
    );
    const toggleAllWorkoutsBtn = document.getElementById(
      "toggle-all-workouts-btn"
    );
    let showAllWorkoutsMode = false;
    const storageKey = "workoutProgress";
    const currentDayIndex = new Date().getDay(); // 0=Dom, 1=Seg...

    function updateWorkoutVisibilityByDay() {
      allWorkoutBlocks.forEach((dayBlock) => {
        const dayIndex = parseInt(dayBlock.dataset.dayIndex, 10);
        if (dayIndex === currentDayIndex) {
          dayBlock.classList.remove("hidden-workout");
        } else {
          dayBlock.classList.add("hidden-workout");
        }
      });
    }

    function toggleAllWorkouts() {
      showAllWorkoutsMode = !showAllWorkoutsMode;
      if (showAllWorkoutsMode) {
        allWorkoutBlocks.forEach((b) => b.classList.remove("hidden-workout"));
        toggleAllWorkoutsBtn.textContent = "Ver Treino do Dia";
      } else {
        updateWorkoutVisibilityByDay();
        toggleAllWorkoutsBtn.textContent = "Ver Todos os Treinos";
      }
    }

    if (toggleAllWorkoutsBtn) {
      toggleAllWorkoutsBtn.addEventListener("click", toggleAllWorkouts);
    }

    function saveProgress() {
      const progressData = {};
      exerciseItems.forEach((item) => {
        const id = item.dataset.exerciseId;
        if (id) {
          const seriesDots = item.querySelectorAll(".series-dot");
          const completedSeries = [];
          seriesDots.forEach((dot, index) => {
            if (dot.classList.contains("completed"))
              completedSeries.push(index);
          });
          progressData[id] = {
            completed:
              item.querySelector(".exercise-checkbox")?.checked ?? false,
            weight: item.querySelector(".weight-input")?.value ?? null,
            series: completedSeries,
          };
        }
      });
      localStorage.setItem(storageKey, JSON.stringify(progressData));
    }

    function loadProgress() {
      const savedData = JSON.parse(localStorage.getItem(storageKey));
      if (savedData) {
        exerciseItems.forEach((item) => {
          const id = item.dataset.exerciseId;
          if (id && savedData[id]) {
            const checkbox = item.querySelector(".exercise-checkbox");
            const weightInput = item.querySelector(".weight-input");
            if (checkbox) {
              checkbox.checked = savedData[id].completed;
              item.classList.toggle("completed", checkbox.checked);
            }
            if (weightInput) weightInput.value = savedData[id].weight;
            if (savedData[id].series) {
              const seriesDots = item.querySelectorAll(".series-dot");
              seriesDots.forEach((dot, index) => {
                if (savedData[id].series.includes(index))
                  dot.classList.add("completed");
              });
            }
          }
        });
      }
      // Inicializar visualização
      updateWorkoutVisibilityByDay();
    }

    // Inicialização dos itens de exercício
    exerciseItems.forEach((item) => {
      const checkbox = item.querySelector(".exercise-checkbox");
      const weightInput = item.querySelector(".weight-input");
      const seriesCounter = item.querySelector(".series-counter");
      const smallText = item.querySelector("small")?.textContent || "";

      if (seriesCounter) {
        seriesCounter.innerHTML = "";
        let seriesCount = 0;
        const seriesMatch = smallText.match(/(\d+)\s*séries/);
        if (seriesMatch) seriesCount = parseInt(seriesMatch[1], 10);
        else if (smallText.includes("até a falha")) seriesCount = 3;

        // Default caso não ache o número
        if (seriesCount === 0) seriesCount = 3;

        for (let i = 0; i < seriesCount; i++) {
          const dot = document.createElement("div");
          dot.className = "series-dot";
          dot.addEventListener("click", () => {
            dot.classList.toggle("completed");
            saveProgress();
          });
          seriesCounter.appendChild(dot);
        }
      }

      if (checkbox) {
        checkbox.addEventListener("change", () => {
          item.classList.toggle("completed", checkbox.checked);
          saveProgress();
        });
      }
      if (weightInput) {
        weightInput.addEventListener("input", saveProgress);
      }
    });

    // Reset Buttons
    document.querySelectorAll(".reset-button").forEach((button) => {
      button.addEventListener("click", function () {
        const workoutDay = this.closest(".workout-day");
        if (workoutDay) {
          workoutDay.querySelectorAll(".exercise-item").forEach((item) => {
            const checkbox = item.querySelector(".exercise-checkbox");
            if (checkbox) checkbox.checked = false;
            item.classList.remove("completed");
            item
              .querySelectorAll(".series-dot")
              .forEach((dot) => dot.classList.remove("completed"));
          });
          saveProgress();
        }
      });
    });

    loadProgress();
  }

  // ========================================================
  // 4. BEM-ESTAR & DIÁRIOS
  // ========================================================
  // Identidade
  const idInput = document.getElementById("identity-input");
  const saveIdBtn = document.getElementById("save-identity-btn");
  const idDisplay = document.getElementById("identity-display");
  const idContainer = document.getElementById("identity-display-container");
  const idInputContainer = document.getElementById("identity-input-container");
  const deleteIdBtn = document.getElementById("delete-identity-btn");

  if (saveIdBtn) {
    function loadIdentity() {
      const savedId = localStorage.getItem("novaIdentidade");
      if (savedId) {
        idDisplay.textContent = savedId;
        idInputContainer.style.display = "none";
        idContainer.style.display = "flex";
      }
    }
    saveIdBtn.addEventListener("click", () => {
      if (idInput.value) {
        localStorage.setItem("novaIdentidade", idInput.value);
        loadIdentity();
      }
    });
    deleteIdBtn.addEventListener("click", () => {
      localStorage.removeItem("novaIdentidade");
      idInput.value = "";
      idInputContainer.style.display = "flex";
      idContainer.style.display = "none";
    });
    loadIdentity();
  }

  // Micro Vitórias
  const winInput = document.getElementById("micro-win-input");
  const addWinBtn = document.getElementById("add-micro-win-btn");
  const winsList = document.getElementById("micro-wins-list");

  if (addWinBtn) {
    function loadWins() {
      const wins = JSON.parse(localStorage.getItem("microWins")) || [];
      winsList.innerHTML = "";
      wins.forEach((win) => {
        const li = document.createElement("li");
        li.textContent = `🏆 ${win}`;
        winsList.appendChild(li);
      });
    }
    addWinBtn.addEventListener("click", () => {
      if (winInput.value) {
        const wins = JSON.parse(localStorage.getItem("microWins")) || [];
        wins.push(winInput.value);
        localStorage.setItem("microWins", JSON.stringify(wins));
        winInput.value = "";
        loadWins();
      }
    });
    loadWins();
  }

  // Diários Gerais
  function setupJournal(dateId, textId, btnId, storageKey, containerId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener("click", () => {
      const date = document.getElementById(dateId).value;
      const text = document.getElementById(textId).value;
      if (date && text) {
        const entries = JSON.parse(localStorage.getItem(storageKey)) || [];
        entries.unshift({ date, text }); // Adiciona no topo
        localStorage.setItem(storageKey, JSON.stringify(entries));
        renderJournal(storageKey, containerId);
        document.getElementById(textId).value = "";
      }
    });
    renderJournal(storageKey, containerId);
  }

  function renderJournal(storageKey, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const entries = JSON.parse(localStorage.getItem(storageKey)) || [];
    container.innerHTML = "";
    entries.forEach((entry, index) => {
      const div = document.createElement("div");
      div.className = "journal-entry";
      div.innerHTML = `<div class="entry-date">${entry.date}</div><p>${entry.text}</p>`;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Apagar";
      delBtn.style.cssText =
        "background: #c0392b; border:none; color:white; padding:5px; border-radius:3px; float:right; cursor:pointer;";
      delBtn.onclick = () => {
        entries.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(entries));
        renderJournal(storageKey, containerId);
      };

      div.prepend(delBtn);
      container.appendChild(div);
    });
  }

  setupJournal(
    "journal-date",
    "journal-text",
    "add-note-button",
    "journalEntries",
    "journal-history-container"
  );
  setupJournal(
    "dream-journal-date",
    "dream-journal-text",
    "add-dream-button",
    "dreamEntries",
    "dream-history-container"
  );
});

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("Service Worker registrado."))
      .catch((err) => console.log("Falha no SW:", err));
  });
}
