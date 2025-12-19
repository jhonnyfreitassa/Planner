// --- SCRIPT DE NAVEGAÇÃO POR ABAS ---
function showSection(sectionId) {
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");
  document.getElementById(sectionId).classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // ========================================================
  // SCRIPT DO ROADMAP PROFISSIONAL
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

      // Salvar no LocalStorage
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

    // Listeners
    roadmapCheckboxes.forEach((box) => {
      box.addEventListener("change", updateRoadmapProgress);
    });

    loadRoadmapProgress();
  }

  // ========================================================
  // SCRIPT DA AGENDA DINÂMICA (MANTIDO)
  // ========================================================
  if (document.getElementById("agenda")) {
    const agenda = document.getElementById("agenda");
    const HORA_INICIO_AGENDA = 5,
      HORA_FIM_AGENDA = 27,
      ALTURA_HORA = 60;

    function gerarGrade() {
      agenda.innerHTML = "";
      const t = document.createElement("div");
      (t.className = "grid-item"),
        (t.style.borderLeft = "none"),
        (t.style.borderBottom = "1px solid #333"),
        agenda.appendChild(t);

      ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].forEach((e) => {
        const o = document.createElement("div");
        (o.className = "grid-item header-dia"),
          (o.textContent = e),
          agenda.appendChild(o);
      });

      for (let o = HORA_INICIO_AGENDA; o < HORA_FIM_AGENDA; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        const horaMostrada = o % 24;
        e.textContent = `${horaMostrada.toString().padStart(2, "0")}:00`;
        (e.style.gridRow = `${o - HORA_INICIO_AGENDA + 2}`),
          agenda.appendChild(e);
      }

      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        (o.className = "coluna-dia"),
          (o.dataset.diaIndex = e + 1),
          (o.style.gridColumn = `${e + 2}`);
        (o.style.gridRow = `2 / span ${HORA_FIM_AGENDA - HORA_INICIO_AGENDA}`),
          agenda.appendChild(o);
      }
    }

    function adicionarAtividade(t, e, o, i, n, customClass) {
      let [d, a] = o.split(":").map(Number);
      let [r, s] = i.split(":").map(Number);

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
      (h.style.top = `${l * ALTURA_HORA}px`),
        (h.style.height = `${c * ALTURA_HORA}px`),
        (h.style.backgroundColor = n),
        (h.style.borderLeftColor = ajustarCor(n, -40)),
        (h.innerHTML = `${t} <br><small>${o} - ${i}</small>`),
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

    // --- PALETA DE CORES ---
    const corCardio = "#00ced1"; // Ciano
    const corAcademia = "#e74c3c"; // Vermelho
    const corCore = "#007bff"; // Azul para CORE (No agendamento)

    // Cores Estudos
    const corPortugues = "#3498db"; // Azul
    const corBancarios = "#27ae60"; // Verde
    const corVendas = "#f1c40f"; // Amarelo
    const corInformatica = "#8e44ad"; // Roxo
    const corMatematica = "#d63384"; // Rosa
    const corIngles = "#4b4b8f"; // Indigo
    const corSimulado = "#636e72"; // Cinza
    const corRoadmap = "#00b899"; // MINT/Ciano Claro

    // --- ROTINA SEMANAL (SEG-SEX) - MANTIDO ---
    for (let dia = 1; dia <= 5; dia++) {
      // Cardio AEJ 08:00 - 09:00
      // ALTERADO: Removido "(AEJ)" do nome.
      adicionarAtividade(
        "<strong>🏃 Cardio</strong>",
        dia,
        "08:00",
        "09:00",
        corCardio
      );

      // Academia 15:00 - 17:00 (PPL)
      adicionarAtividade(
        "<strong>💪 Academia (PPL)</strong>",
        dia,
        "15:00",
        "17:00",
        corAcademia
      );

      // Estudos Roadmap 22:00 - 00:00 (MANTIDO)
      adicionarAtividade(
        "<strong>🚀 Estudos Roadmap</strong><br><small>Novo Conteúdo</small>",
        dia,
        "22:00",
        "00:00", // 00:00 é 24:00 (ou 27 na agenda)
        corRoadmap
      );
    }

    // REMOVIDO: Blocos de Core da Agenda (Segunda, Quarta, Sexta)

    // --- MATÉRIAS BANCO DO BRASIL (SEG-DOM) - MANTIDO ---
    // (Lógica de agendamento das matérias mantida)
    // SEGUNDA-FEIRA (Dia 1)
    adicionarAtividade(
      "<strong>📚 Português</strong><br><small>Gramática/Texto</small>",
      1,
      "10:00",
      "12:00", // Bloco 1 (Manhã)
      corPortugues
    );
    adicionarAtividade(
      "<strong>🏦 C. Bancários</strong><br><small>Sistema Financeiro</small>",
      1,
      "19:30",
      "21:30", // Bloco 2 (Noite)
      corBancarios
    );

    // TERÇA-FEIRA (Dia 2)
    adicionarAtividade(
      "<strong>📐 Matemática</strong><br><small>Lógica/Probabilidade</small>",
      2,
      "10:00",
      "12:00", // Bloco 1 (Manhã)
      corMatematica
    );
    adicionarAtividade(
      "<strong>💼 Vendas e Negociação</strong><br><small>Técnicas/CDC</small>",
      2,
      "19:30",
      "21:30", // Bloco 2 (Noite)
      corVendas
    );

    // QUARTA-FEIRA (Dia 3)
    adicionarAtividade(
      "<strong>💻 Informática</strong><br><small>Segurança/Office</small>",
      3,
      "10:00",
      "12:00", // Bloco 1 (Manhã)
      corInformatica
    );
    adicionarAtividade(
      "<strong>📐 Matemática</strong><br><small>Lógica/Probabilidade</small>",
      3,
      "19:30",
      "21:30", // Bloco 2 (Noite)
      corMatematica
    );

    // QUINTA-FEIRA (Dia 4)
    adicionarAtividade(
      "<strong>📈 Mat. Financeira</strong><br><small>Juros/Taxas</small>",
      4,
      "10:00",
      "12:00", // Bloco 1 (Manhã)
      corMatematica
    );
    adicionarAtividade(
      "<strong>🏦 C. Bancários</strong><br><small>Produtos/Serviços</small>",
      4,
      "19:30",
      "21:30", // Bloco 2 (Noite)
      corBancarios
    );

    // SEXTA-FEIRA (Dia 5)
    adicionarAtividade(
      "<strong>💻 Informática</strong><br><small>Teoria + Questões</small>",
      5,
      "10:00",
      "12:00", // Bloco 1 (Manhã)
      corInformatica
    );
    adicionarAtividade(
      "<strong>💼 Vendas e Negociação</strong><br><small>Teoria + Questões</small>",
      5,
      "19:30",
      "21:30", // Bloco 2 (Noite)
      corVendas
    );

    // --- FIM DE SEMANA (MANTIDO) ---
    // Sábado
    adicionarAtividade(
      "<strong>📚 Português</strong><br><small>Foco Total</small>",
      6,
      "10:00",
      "12:00",
      corPortugues
    );
    adicionarAtividade(
      "<strong>📐 Matemática</strong><br><small>Foco Total</small>",
      6,
      "13:00",
      "15:00",
      corMatematica
    );
    adicionarAtividade(
      "<strong>💪 Academia (LEGS 2)</strong>",
      6,
      "16:00",
      "18:00",
      corAcademia
    );
    adicionarAtividade(
      "<strong>📰 Atualidades Mercado</strong><br><small>Mundo Financeiro</small>",
      6,
      "19:00",
      "20:00",
      corBancarios
    );

    // Domingo (APENAS ESTUDO E DESCANSO TOTAL)
    // Inglês 13-14
    adicionarAtividade(
      "<strong>🇺🇸 Inglês</strong><br><small>Interpretação</small>",
      7,
      "13:00",
      "14:00",
      corIngles
    );

    // Revisão 15-16
    adicionarAtividade(
      "<strong>🔄 Revisão Geral</strong><br><small>Antes do Simulado</small>",
      7,
      "15:00",
      "16:00",
      corSimulado
    );

    // Simulado 17-19:30
    adicionarAtividade(
      "<strong>📝 SIMULADÃO</strong><br><small>Prova Completa</small>",
      7,
      "17:00",
      "19:30",
      corSimulado
    );

    // Redação 20:30-21:30
    adicionarAtividade(
      "<strong>✍️ Redação + Correção</strong><br><small>Pós-Simulado</small>",
      7,
      "20:30",
      "21:30",
      corPortugues
    );
  }

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

  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    // Seleciona todos os blocos de treino PPL e os blocos de Core (que possuem data-day-index)
    const allWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]"
    );
    const toggleAllWorkoutsBtn = document.getElementById(
      "toggle-all-workouts-btn"
    );

    // Variável de estado para controlar a visualização
    let showAllWorkoutsMode = false;

    const storageKey = "workoutProgress";

    // Obter o dia da semana atual (0=domingo, 1=segunda, 6=sábado)
    const currentDayIndex = new Date().getDay();

    // Função para mostrar apenas o treino do dia atual
    function updateWorkoutVisibilityByDay() {
      allWorkoutBlocks.forEach((dayBlock) => {
        const dayIndex = parseInt(dayBlock.dataset.dayIndex, 10);

        // Mostrar o bloco APENAS se o data-day-index for o dia atual.
        if (dayIndex === currentDayIndex) {
          dayBlock.classList.remove("hidden-workout");
        } else {
          dayBlock.classList.add("hidden-workout");
        }
      });
    }

    // NOVA FUNÇÃO: Alterna a visualização entre o dia e a semana completa
    function toggleAllWorkouts() {
      showAllWorkoutsMode = !showAllWorkoutsMode;

      if (showAllWorkoutsMode) {
        // Mostrar todos os blocos
        allWorkoutBlocks.forEach((dayBlock) => {
          dayBlock.classList.remove("hidden-workout");
        });
        toggleAllWorkoutsBtn.textContent = "Ver Treino do Dia";
      } else {
        // Voltar a mostrar apenas o treino do dia atual
        updateWorkoutVisibilityByDay();
        toggleAllWorkoutsBtn.textContent = "Ver Todos os Treinos";
      }
    }

    // Adicionar listener ao botão de alternância
    if (toggleAllWorkoutsBtn) {
      toggleAllWorkoutsBtn.addEventListener("click", toggleAllWorkouts);
    }

    // Lógica de séries e peso (mantida)

    function saveProgress() {
      const progressData = {};
      exerciseItems.forEach((item) => {
        const id = item.dataset.exerciseId;
        if (id) {
          const seriesDots = item.querySelectorAll(".series-dot");
          const completedSeries = [];
          seriesDots.forEach((dot, index) => {
            if (dot.classList.contains("completed")) {
              completedSeries.push(index);
            }
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
            if (weightInput) {
              weightInput.value = savedData[id].weight;
            }
            if (savedData[id].series) {
              const seriesDots = item.querySelectorAll(".series-dot");
              seriesDots.forEach((dot, index) => {
                if (savedData[id].series.includes(index)) {
                  dot.classList.add("completed");
                }
              });
            }
          }
        });
      }

      // Aplica a visibilidade inicial: apenas o treino do dia
      updateWorkoutVisibilityByDay();
    }

    exerciseItems.forEach((item) => {
      const checkbox = item.querySelector(".exercise-checkbox");
      const weightInput = item.querySelector(".weight-input");
      const seriesCounter = item.querySelector(".series-counter");
      const smallText = item.querySelector("small")?.textContent || "";

      if (seriesCounter) {
        seriesCounter.innerHTML = "";
        let seriesCount = 0;
        const seriesMatch = smallText.match(/(\d+)\s*séries/);
        if (seriesMatch) {
          seriesCount = parseInt(seriesMatch[1], 10);
        } else if (smallText.includes("até a falha")) {
          seriesCount = 3;
        }
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

    loadProgress();

    const resetButtons = document.querySelectorAll(".reset-button");
    resetButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const workoutDay = this.closest(".workout-day");
        if (workoutDay) {
          const itemsToReset = workoutDay.querySelectorAll(".exercise-item");
          itemsToReset.forEach((item) => {
            const checkbox = item.querySelector(".exercise-checkbox");
            if (checkbox) {
              checkbox.checked = false;
            }
            item.classList.remove("completed");
            const seriesDots = item.querySelectorAll(".series-dot");
            seriesDots.forEach((dot) => {
              dot.classList.remove("completed");
            });
          });
          saveProgress();
        }
      });
    });
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) =>
        console.log("Service Worker registrado com sucesso.")
      )
      .catch((error) =>
        console.log("Falha ao registrar o Service Worker:", error)
      );
  });
}
