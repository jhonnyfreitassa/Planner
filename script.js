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
  // SCRIPT DA AGENDA DINÂMICA
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
    const corCrossfit = "#FF4500"; // Laranja
    const corCore = "#007bff"; // Azul para CORE

    // Cores Estudos
    const corPortugues = "#3498db"; // Azul
    const corBancarios = "#27ae60"; // Verde
    const corVendas = "#f1c40f"; // Amarelo
    const corInformatica = "#8e44ad"; // Roxo
    const corMatematica = "#d63384"; // Rosa
    const corIngles = "#4b4b8f"; // Indigo
    const corSimulado = "#636e72"; // Cinza
    const corRoadmap = "#00b894"; // MINT

    // --- ROTINA SEMANAL (SEG-SEX) ---
    for (let dia = 1; dia <= 5; dia++) {
      adicionarAtividade(
        "<strong>🏃 Cardio</strong>",
        dia,
        "08:00",
        "09:00",
        corCardio
      );
      // CORRIGIDO: Removida a entrada duplicada de Core Matinal da agenda.
      adicionarAtividade(
        "<strong>💪 Academia</strong>",
        dia,
        "13:00",
        "15:00",
        corAcademia
      );
      adicionarAtividade(
        "<strong>🏋️ CrossFit</strong>",
        dia,
        "18:35",
        "19:05",
        corCrossfit
      );
      adicionarAtividade(
        "<strong>🚀 Estudos Roadmap</strong><br><small>Novo Conteúdo</small>",
        dia,
        "20:00",
        "22:00",
        corRoadmap
      );
    }

    // --- MATÉRIAS BANCO DO BRASIL (SEG-SEX) ---
    adicionarAtividade(
      "<strong>📚 Português</strong><br><small>Gramática/Texto</small>",
      1,
      "10:00",
      "12:00",
      corPortugues
    );
    adicionarAtividade(
      "<strong>🏦 C. Bancários</strong><br><small>Sistema Financeiro</small>",
      1,
      "16:00",
      "18:00",
      corBancarios
    );

    adicionarAtividade(
      "<strong>📐 Matemática</strong><br><small>Lógica/Probabilidade</small>",
      2,
      "10:00",
      "12:00",
      corMatematica
    );
    adicionarAtividade(
      "<strong>💼 Vendas e Negociação</strong><br><small>Técnicas/CDC</small>",
      2,
      "16:00",
      "18:00",
      corVendas
    );

    adicionarAtividade(
      "<strong>💻 Informática</strong><br><small>Segurança/Office</small>",
      3,
      "10:00",
      "12:00",
      corInformatica
    );
    adicionarAtividade(
      "<strong>📐 Matemática</strong><br><small>Lógica/Probabilidade</small>",
      3,
      "16:00",
      "18:00",
      corMatematica
    );

    adicionarAtividade(
      "<strong>📈 Mat. Financeira</strong><br><small>Juros/Taxas</small>",
      4,
      "10:00",
      "12:00",
      corMatematica
    );
    adicionarAtividade(
      "<strong>🏦 C. Bancários</strong><br><small>Produtos/Serviços</small>",
      4,
      "16:00",
      "18:00",
      corBancarios
    );

    adicionarAtividade(
      "<strong>💻 Informática</strong><br><small>Teoria + Questões</small>",
      5,
      "10:00",
      "12:00",
      corInformatica
    );
    adicionarAtividade(
      "<strong>💼 Vendas e Negociação</strong><br><small>Teoria + Questões</small>",
      5,
      "16:00",
      "18:00",
      corVendas
    );

    // --- FIM DE SEMANA ---
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
      "<strong>💪 Academia</strong>",
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

    // Domingo
    // Academia 10-12 (Novo Horário)
    adicionarAtividade(
      "<strong>💪 Academia</strong>",
      7,
      "10:00",
      "12:00",
      corAcademia
    );

    // Inglês 13-14 (Novo Horário)
    adicionarAtividade(
      "<strong>🇺🇸 Inglês</strong><br><small>Interpretação</small>",
      7,
      "13:00",
      "14:00",
      corIngles
    );

    // Revisão 15-16 (1h Intervalo)
    adicionarAtividade(
      "<strong>🔄 Revisão Geral</strong><br><small>Antes do Simulado</small>",
      7,
      "15:00",
      "16:00",
      corSimulado
    );

    // Simulado 17-19:30 (1h Intervalo)
    adicionarAtividade(
      "<strong>📝 SIMULADÃO</strong><br><small>Prova Completa</small>",
      7,
      "17:00",
      "19:30",
      corSimulado
    );

    // Redação 20:30-21:30 (1h Intervalo)
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

  // ========================================================
  // SCRIPT DO RASTREADOR DE ÁGUA (ATUALIZADO PARA VERDE + LOGICA)
  // ========================================================
  if (document.getElementById("dieta-section")) {
    const waterCheckboxes = document.querySelectorAll(".water-check");
    const waterProgressBar = document.getElementById("water-progress-bar");
    const resetWaterBtn = document.getElementById("reset-water-btn");
    const TOTAL_GOAL = 4500; // Meta Diária Exata

    function updateWaterProgress() {
      let currentMl = 0;
      waterCheckboxes.forEach((box) => {
        if (box.checked) {
          // Converte o valor de data-ml para número e soma
          currentMl += parseInt(box.dataset.ml);
        }
        // Salvar estado no localStorage
        localStorage.setItem(box.id, box.checked);
      });

      // Calcula a porcentagem (limitada a 100% visualmente)
      const percentage = Math.min(
        100,
        Math.round((currentMl / TOTAL_GOAL) * 100)
      );

      if (waterProgressBar) {
        waterProgressBar.style.width = percentage + "%";
        waterProgressBar.textContent = `${percentage}% (${currentMl}ml)`;

        // Cor Verde mais escura quando completa a meta
        if (currentMl >= TOTAL_GOAL) {
          waterProgressBar.style.backgroundColor = "#2e7d32";
          waterProgressBar.textContent = `META BATIDA! (${currentMl}ml)`;
        } else {
          waterProgressBar.style.backgroundColor = "#4caf50";
        }
      }
    }

    function loadWaterProgress() {
      waterCheckboxes.forEach((box) => {
        const isChecked = localStorage.getItem(box.id) === "true";
        box.checked = isChecked;
      });
      updateWaterProgress();
    }

    // Evento de Reset
    if (resetWaterBtn) {
      resetWaterBtn.addEventListener("click", function () {
        if (confirm("Deseja resetar o contador de água de hoje?")) {
          waterCheckboxes.forEach((box) => {
            box.checked = false;
            localStorage.setItem(box.id, false);
          });
          updateWaterProgress();
        }
      });
    }

    // Listeners para cada checkbox
    waterCheckboxes.forEach((box) => {
      box.addEventListener("change", updateWaterProgress);
    });

    // Carregar ao iniciar
    loadWaterProgress();
  }

  if (document.getElementById("bem-estar-section")) {
    const identityInput = document.getElementById("identity-input");
    const identityDisplay = document.getElementById("identity-display");
    const saveIdentityBtn = document.getElementById("save-identity-btn");
    const deleteIdentityBtn = document.getElementById("delete-identity-btn");
    const identityInputContainer = document.getElementById(
      "identity-input-container"
    );
    const identityDisplayContainer = document.getElementById(
      "identity-display-container"
    );

    function saveIdentity() {
      const text = identityInput.value.trim();
      if (text) {
        localStorage.setItem("antiSabotageIdentity", text);
        identityDisplay.textContent = text;
        identityInputContainer.style.display = "none";
        identityDisplayContainer.style.display = "flex";
      }
    }

    function deleteIdentity() {
      if (confirm("Deseja apagar sua frase de identidade e criar uma nova?")) {
        localStorage.removeItem("antiSabotageIdentity");
        identityInput.value = "";
        identityDisplayContainer.style.display = "none";
        identityInputContainer.style.display = "flex";
      }
    }

    if (identityInput && identityDisplay) {
      const savedIdentity = localStorage.getItem("antiSabotageIdentity");
      if (savedIdentity) {
        identityDisplay.textContent = savedIdentity;
        identityInputContainer.style.display = "none";
        identityDisplayContainer.style.display = "flex";
      } else {
        identityInputContainer.style.display = "flex";
        identityDisplayContainer.style.display = "none";
      }

      saveIdentityBtn.addEventListener("click", saveIdentity);
      identityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") saveIdentity();
      });
      deleteIdentityBtn.addEventListener("click", deleteIdentity);
    }

    const microInput = document.getElementById("micro-win-input");
    const microBtn = document.getElementById("add-micro-win-btn");
    const microList = document.getElementById("micro-wins-list");

    function loadMicroWins() {
      const wins = JSON.parse(localStorage.getItem("microWins")) || [];
      microList.innerHTML = "";
      wins.forEach((win, index) => {
        const li = document.createElement("li");
        li.style.padding = "8px";
        li.style.borderBottom = "1px solid #333";
        li.innerHTML = `✅ ${win} <span style="float:right; cursor:pointer; color:#e74c3c;" onclick="removeMicroWin(${index})">✕</span>`;
        microList.appendChild(li);
      });
    }

    window.removeMicroWin = function (index) {
      let wins = JSON.parse(localStorage.getItem("microWins")) || [];
      wins.splice(index, 1);
      localStorage.setItem("microWins", JSON.stringify(wins));
      loadMicroWins();
    };

    if (microBtn) {
      microBtn.addEventListener("click", () => {
        const text = microInput.value.trim();
        if (text) {
          let wins = JSON.parse(localStorage.getItem("microWins")) || [];
          wins.unshift(
            `${new Date().toLocaleTimeString().slice(0, 5)} - ${text}`
          );
          if (wins.length > 5) wins.pop();
          localStorage.setItem("microWins", JSON.stringify(wins));
          microInput.value = "";
          loadMicroWins();
        }
      });
      loadMicroWins();
    }

    const sabTask = document.getElementById("sabotage-task");
    const sabAction = document.getElementById("sabotage-action");
    const sabFeeling = document.getElementById("sabotage-feeling");
    const sabBtn = document.getElementById("add-sabotage-btn");
    const sabHistory = document.getElementById("sabotage-history");

    function loadSabotageHistory() {
      const history = JSON.parse(localStorage.getItem("sabotageMap")) || [];
      sabHistory.innerHTML = "";
      history.forEach((item, index) => {
        const div = document.createElement("div");
        div.style.backgroundColor = "#2c2c2c";
        div.style.borderLeft = "3px solid #e74c3c";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        div.style.marginBottom = "10px";
        div.style.position = "relative";
        div.innerHTML = `
          <span style="position:absolute; right:10px; top:10px; cursor:pointer; color:#e74c3c; font-weight:bold;" onclick="removeSabotageEntry(${index})">✕</span>
          <small style="color:#a0a0a0">${item.date}</small><br>
          <strong>Deveria:</strong> ${item.task}<br>
          <strong>Fugi fazendo:</strong> ${item.action}<br>
          <strong>Senti:</strong> ${item.feeling}
        `;
        sabHistory.appendChild(div);
      });
    }

    window.removeSabotageEntry = function (index) {
      let history = JSON.parse(localStorage.getItem("sabotageMap")) || [];
      history.splice(index, 1);
      localStorage.setItem("sabotageMap", JSON.stringify(history));
      loadSabotageHistory();
    };

    if (sabBtn) {
      sabBtn.addEventListener("click", () => {
        if (sabTask.value && sabAction.value && sabFeeling.value) {
          const entry = {
            date:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString().slice(0, 5),
            task: sabTask.value,
            action: sabAction.value,
            feeling: sabFeeling.value,
          };
          let history = JSON.parse(localStorage.getItem("sabotageMap")) || [];
          history.unshift(entry);
          localStorage.setItem("sabotageMap", JSON.stringify(history));

          sabTask.value = "";
          sabAction.value = "";
          sabFeeling.value = "";
          loadSabotageHistory();
        } else {
          alert("Preencha os 3 campos para mapear a sabotagem.");
        }
      });
      loadSabotageHistory();
    }

    const voiceCheckboxes = document.querySelectorAll(".voice-check");

    function loadVoiceProgress() {
      voiceCheckboxes.forEach((box) => {
        const isChecked = localStorage.getItem(box.id) === "true";
        box.checked = isChecked;
      });
    }

    voiceCheckboxes.forEach((box) => {
      box.addEventListener("change", () => {
        localStorage.setItem(box.id, box.checked);
      });
    });
    loadVoiceProgress();

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
