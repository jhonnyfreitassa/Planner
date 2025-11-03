// --- SCRIPT DE NAVEGAÇÃO POR ABAS ---
function showSection(sectionId) {
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  document
    .querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // --- SCRIPT DA AGENDA DINÂMICA ---
  if (document.getElementById("agenda")) {
    const agenda = document.getElementById("agenda");

    // Grade de 5h até 3h da manhã (total 22 células de altura)
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

      // Lógica para eventos que cruzam a meia-noite (ex: 23:00 -> 01:00)
      if (r < d && r < HORA_INICIO_AGENDA) {
        r += 24; // Converte 1 para 25
      }

      // Lógica para eventos que começam na madrugada (ex: 01:00)
      if (d >= 0 && d < HORA_INICIO_AGENDA) {
        d += 24; // Converte 1 para 25
        if (r < d) r += 24; // Converte 3 para 27
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

    // CORES DAS ATIVIDADES
    const corCrossfit = "#FF4500";
    const corPython = "#5856d6";
    const corCienciaDados = "#8e44ad"; // Roxo
    const corAcademia = "#e74c3c";
    const corProgramacao = "#f39c12";
    const corParadigmas = "#4169E1";

    // CORES PARA O CONCURSO
    const corPortugues = "#007bff";
    const corMatematica = "#28a745";
    const corBancarios = "#20c997";
    const corInformatica = "#6c757d";
    const corAtendimento = "#17a2b8";
    const corAtualidades = "#fd7e14";
    const corProbabilidade = "#e83e8c";
    const corRevisaoGeral = "#ffc107";

    // Textos das Aulas
    const textoProgramacao = `<strong>BASES DE PROGRAMAÇÃO</strong><br><small>SALA 2013 (prédio ll. Nível 2)</small>`;
    const textoParadigmas = `<strong>PARADIGMAS DE LING. DE PROGRAMAÇÃO</strong><br><small>SALA 2013 (prédio ll. Nível 2)</small>`;
    const textoCienciaDados = `<strong>CURSO CIÊNCIA DE DADOS</strong><br><small>Online (Google Meet)</small>`;

    // --- ROTINA COM HORÁRIOS DE TREINO CORRIGIDOS ---

    // Segunda (Manhã Livre / Academia 15:00)
    adicionarAtividade(
      "<strong>Revisão: Português</strong>",
      1,
      "10:00",
      "10:30",
      corRevisaoGeral
    );
    adicionarAtividade(
      "<strong>Língua Portuguesa</strong>",
      1,
      "10:30",
      "12:30",
      corPortugues
    );
    adicionarAtividade(
      "<strong>Academia</strong>",
      1,
      "15:00",
      "17:00",
      corAcademia
    ); // MOVIDO
    adicionarAtividade(
      "<strong>CrossFit</strong>",
      1,
      "18:35",
      "19:05",
      corCrossfit
    );
    adicionarAtividade(
      "<strong>Atendimento Bancário</strong>",
      1,
      "20:30",
      "22:30",
      corAtendimento
    );

    // Terça (Manhã Livre / Academia 13:30 - JEJUM)
    adicionarAtividade(
      "<strong>Revisão: C. Bancários</strong>",
      2,
      "10:00",
      "10:30",
      corRevisaoGeral
    );
    adicionarAtividade(
      "<strong>Conhecimentos Bancários</strong>",
      2,
      "10:30",
      "12:30",
      corBancarios
    );
    adicionarAtividade(
      "<strong>Academia</strong>",
      2,
      "13:30",
      "15:30",
      corAcademia
    ); // Em jejum
    adicionarAtividade(
      "<strong>Python (Online)</strong>",
      2,
      "15:40",
      "17:40",
      corPython
    );
    adicionarAtividade(textoCienciaDados, 2, "18:00", "22:00", corCienciaDados);
    adicionarAtividade(
      "<strong>Probabilidade e Estatística</strong>",
      2,
      "23:00",
      "01:00",
      corProbabilidade
    );

    // Quarta (Manhã Ocupada / Academia 15:00)
    adicionarAtividade(textoParadigmas, 3, "11:10", "12:50", corParadigmas);
    adicionarAtividade(
      "<strong>Academia</strong>",
      3,
      "15:00",
      "17:00",
      corAcademia
    ); // MOVIDO
    adicionarAtividade(
      "<strong>CrossFit</strong>",
      3,
      "18:35",
      "19:05",
      corCrossfit
    );
    adicionarAtividade(
      "<strong>Revisão: Prob. e Estatística</strong>",
      3,
      "20:30",
      "21:00",
      corRevisaoGeral
    ); // CORRIGIDO
    adicionarAtividade(
      "<strong>Matemática Financeira</strong>",
      3,
      "21:00",
      "23:00",
      corMatematica
    );
    adicionarAtividade(
      "<strong>Probabilidade e Estatística (Bloco 2)</strong>",
      3,
      "23:30",
      "01:30",
      corProbabilidade
    );

    // Quinta (Manhã Livre / Academia 13:30 - JEJUM)
    adicionarAtividade(
      "<strong>Língua Portuguesa (Bloco 2)</strong>",
      4,
      "10:00",
      "12:00",
      corPortugues
    );
    adicionarAtividade(
      "<strong>Academia</strong>",
      4,
      "13:30",
      "15:30",
      corAcademia
    ); // Em jejum
    adicionarAtividade(
      "<strong>Python (Online)</strong>",
      4,
      "15:40",
      "17:40",
      corPython
    );
    adicionarAtividade(textoCienciaDados, 4, "18:00", "22:00", corCienciaDados);
    adicionarAtividade(
      "<strong>Revisão: Matemática</strong>",
      4,
      "23:00",
      "23:30",
      corRevisaoGeral
    ); // RESTAURADO (1h break)
    adicionarAtividade(
      "<strong>Matemática Financeira (Bloco 2)</strong>",
      4,
      "23:30",
      "01:30",
      corMatematica
    );

    // Sexta (SÓ REVISÃO / Academia 15:00)
    adicionarAtividade(textoProgramacao, 5, "07:30", "11:05", corProgramacao);
    adicionarAtividade(textoParadigmas, 5, "11:10", "12:50", corParadigmas);
    adicionarAtividade(
      "<strong>Academia</strong>",
      5,
      "15:00",
      "17:00",
      corAcademia
    ); // MOVIDO
    adicionarAtividade(
      "<strong>CrossFit</strong>",
      5,
      "18:35",
      "19:05",
      corCrossfit
    );
    adicionarAtividade(
      "<strong>Revisão Geral + Simulados</strong>",
      5,
      "20:30",
      "22:30",
      corRevisaoGeral
    );

    // Sábado (Tarde Livre / Academia 15:00)
    adicionarAtividade(
      "<strong>Academia</strong>",
      6,
      "15:00",
      "17:00",
      corAcademia
    );
    adicionarAtividade(
      "<strong>Revisão: Informática</strong>",
      6,
      "18:00",
      "18:30",
      corRevisaoGeral
    );
    adicionarAtividade(
      "<strong>Conhecimentos de Informática</strong>",
      6,
      "18:30",
      "20:30",
      corInformatica
    );
    adicionarAtividade(
      "<strong>Atualidades Mercado Financeiro</strong>",
      6,
      "21:30",
      "23:30",
      corAtualidades
    ); // 1h break

    // Domingo (ACADEMIA 12H - JEJUM / ESTUDO À TARDE)
    adicionarAtividade(
      "<strong>Academia</strong>",
      7,
      "12:00",
      "14:00",
      corAcademia
    ); // Em jejum
    adicionarAtividade(
      "<strong>Revisão: Atendimento</strong>",
      7,
      "14:30",
      "15:00",
      corRevisaoGeral
    ); // CORRIGIDO
    adicionarAtividade(
      "<strong>Conhecimentos Bancários (Bloco 2)</strong>",
      7,
      "15:00",
      "17:00",
      corBancarios
    );
    adicionarAtividade(
      "<strong>Atendimento Bancário (Bloco 2)</strong>",
      7,
      "18:00",
      "20:00",
      corAtendimento
    ); // 1h break
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
      textarea.addEventListener("input", () => {
        localStorage.setItem(id, textarea.value);
      });
    }
  });

  if (
    document.getElementById("treino-section") ||
    document.getElementById("aerobico-core-section")
  ) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const storageKey = "workoutProgress";

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

  if (document.getElementById("bem-estar-section")) {
    // --- SCRIPT PARA DIÁRIO DE ANOTAÇÕES ---
    const dateInput = document.getElementById("journal-date");
    const textInput = document.getElementById("journal-text");
    const addButton = document.getElementById("add-note-button");
    const historyContainer = document.getElementById(
      "journal-history-container"
    );
    const journalStorageKey = "datedWellnessJournal";

    dateInput.value = new Date().toISOString().slice(0, 10);

    function deleteJournalEntry(event) {
      const entryId = event.target.dataset.id;
      let entries = JSON.parse(localStorage.getItem(journalStorageKey)) || [];
      entries = entries.filter((entry) => entry.id != entryId);
      localStorage.setItem(journalStorageKey, JSON.stringify(entries));
      loadJournalEntries();
    }

    function loadJournalEntries() {
      historyContainer.innerHTML = "<h3>Histórico</h3>";
      const entries = JSON.parse(localStorage.getItem(journalStorageKey)) || [];
      entries.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (entries.length === 0) {
        const noEntryMessage = document.createElement("p");
        noEntryMessage.textContent = "Nenhuma anotação encontrada.";
        noEntryMessage.style.color = "#a0a0a0";
        historyContainer.appendChild(noEntryMessage);
        return;
      }

      entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "journal-entry";
        const headerDiv = document.createElement("div");
        headerDiv.className = "entry-header";
        const entryDate = document.createElement("p");
        entryDate.className = "entry-date";
        const [year, month, day] = entry.date.split("-");
        entryDate.textContent = `${day}/${month}/${year}`;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-note-btn";
        deleteButton.textContent = "Remover";
        deleteButton.dataset.id = entry.id;
        deleteButton.addEventListener("click", deleteJournalEntry);
        headerDiv.appendChild(entryDate);
        headerDiv.appendChild(deleteButton);
        const entryText = document.createElement("p");
        entryText.className = "entry-text";
        entryText.textContent = entry.text;
        entryDiv.appendChild(headerDiv);
        entryDiv.appendChild(entryText);
        historyContainer.appendChild(entryDiv);
      });
    }

    function addJournalEntry() {
      const date = dateInput.value;
      const text = textInput.value.trim();
      if (!date || !text) {
        alert("Por favor, preencha a data e a anotação.");
        return;
      }
      const newEntry = {
        id: Date.now().toString(),
        date,
        text,
      };
      let entries = JSON.parse(localStorage.getItem(journalStorageKey)) || [];
      entries.push(newEntry);
      localStorage.setItem(journalStorageKey, JSON.stringify(entries));
      textInput.value = "";
      loadJournalEntries();
    }

    addButton.addEventListener("click", addJournalEntry);
    loadJournalEntries();

    // --- SCRIPT PARA DIÁRIO DOS SONHOS ---
    const dreamDateInput = document.getElementById("dream-journal-date");
    const dreamTextInput = document.getElementById("dream-journal-text");
    const dreamAddButton = document.getElementById("add-dream-button");
    const dreamHistoryContainer = document.getElementById(
      "dream-history-container"
    );
    const dreamJournalStorageKey = "datedWellnessDreamJournal";

    dreamDateInput.value = new Date().toISOString().slice(0, 10);

    function deleteDreamEntry(event) {
      const entryId = event.target.dataset.id;
      let entries =
        JSON.parse(localStorage.getItem(dreamJournalStorageKey)) || [];
      entries = entries.filter((entry) => entry.id != entryId);
      localStorage.setItem(dreamJournalStorageKey, JSON.stringify(entries));
      loadDreamEntries();
    }

    function loadDreamEntries() {
      dreamHistoryContainer.innerHTML = "<h3>Histórico</h3>";
      const entries =
        JSON.parse(localStorage.getItem(dreamJournalStorageKey)) || [];
      entries.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (entries.length === 0) {
        const noEntryMessage = document.createElement("p");
        noEntryMessage.textContent = "Nenhum sonho encontrado.";
        noEntryMessage.style.color = "#a0a0a0";
        dreamHistoryContainer.appendChild(noEntryMessage);
        return;
      }

      entries.forEach((entry) => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "journal-entry";
        const headerDiv = document.createElement("div");
        headerDiv.className = "entry-header";
        const entryDate = document.createElement("p");
        entryDate.className = "entry-date";
        const [year, month, day] = entry.date.split("-");
        entryDate.textContent = `${day}/${month}/${year}`;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-note-btn";
        deleteButton.textContent = "Remover";
        deleteButton.dataset.id = entry.id;
        deleteButton.addEventListener("click", deleteDreamEntry);
        headerDiv.appendChild(entryDate);
        headerDiv.appendChild(deleteButton);
        const entryText = document.createElement("p");
        entryText.className = "entry-text";
        entryText.textContent = entry.text;
        entryDiv.appendChild(headerDiv);
        entryDiv.appendChild(entryText);
        dreamHistoryContainer.appendChild(entryDiv);
      });
    }

    function addDreamEntry() {
      const date = dreamDateInput.value;
      const text = dreamTextInput.value.trim();
      if (!date || !text) {
        alert("Por favor, preencha a data e o sonho.");
        return;
      }
      const newEntry = {
        id: Date.now().toString(),
        date,
        text,
      };
      let entries =
        JSON.parse(localStorage.getItem(dreamJournalStorageKey)) || [];
      entries.push(newEntry);
      localStorage.setItem(dreamJournalStorageKey, JSON.stringify(entries));
      dreamTextInput.value = "";
      loadDreamEntries();
    }

    dreamAddButton.addEventListener("click", addDreamEntry);
    loadDreamEntries();
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
