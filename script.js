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
  // --- DATA AUTOMÁTICA NOS DIÁRIOS ---
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataFormatada = `${ano}-${mes}-${dia}`;

  const inputSonho = document.getElementById("dream-journal-date");
  const inputNota = document.getElementById("journal-date");

  if (inputSonho) inputSonho.value = dataFormatada;
  if (inputNota) inputNota.value = dataFormatada;

  // =======================================================
  // 1. CARREIRA (ROADMAP)
  // =======================================================
  if (document.getElementById("carreira-section")) {
    const roadmapCheckboxes = document.querySelectorAll(".roadmap-check");
    const roadmapProgressBar = document.getElementById("roadmapProgressBar");

    function updateRoadmapProgress() {
      const total = roadmapCheckboxes.length;
      const checked = document.querySelectorAll(
        ".roadmap-check:checked"
      ).length;
      const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

      if (roadmapProgressBar) {
        roadmapProgressBar.style.width = percentage + "%";
        roadmapProgressBar.textContent = percentage + "%";
      }

      roadmapCheckboxes.forEach((box) => {
        // Salva estado
        localStorage.setItem(box.id, box.checked);
        // Aplica visual riscado no pai
        const parent = box.closest(".checklist-item");
        if (parent) {
          if (box.checked) parent.classList.add("completed");
          else parent.classList.remove("completed");
        }
      });
    }

    roadmapCheckboxes.forEach((box) => {
      // Carrega estado inicial
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;

      // Aplica visual inicial
      const parent = box.closest(".checklist-item");
      if (parent && isChecked) parent.classList.add("completed");

      box.addEventListener("change", updateRoadmapProgress);
    });
    updateRoadmapProgress();
  }

  // =======================================================
  // 2. DIETA (LISTAS DE COMPRAS E VERIFICAÇÃO)
  // =======================================================
  if (document.getElementById("dieta-section")) {
    const shoppingChecks = document.querySelectorAll(".shopping-check");

    function saveDietState() {
      shoppingChecks.forEach((box) => {
        localStorage.setItem(box.id, box.checked);

        // Lógica visual de riscar
        const parent = box.closest(".checklist-item");
        if (parent) {
          if (box.checked) parent.classList.add("completed");
          else parent.classList.remove("completed");
        }
      });
    }

    shoppingChecks.forEach((box) => {
      // Carregar
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;

      // Visual inicial
      const parent = box.closest(".checklist-item");
      if (parent && isChecked) parent.classList.add("completed");

      // Evento
      box.addEventListener("change", saveDietState);
    });
  }

  // =======================================================
  // 3. AGENDA DINÂMICA (ATUALIZADO: HOJE vs GRADE + LAYOUT)
  // =======================================================
  if (document.getElementById("agenda")) {
    const agendaGrid = document.getElementById("agenda");
    const listaHoje = document.getElementById("lista-atividades-hoje");
    const tituloHoje = document.getElementById("titulo-dia-hoje");
    const toggleBtn = document.getElementById("toggle-agenda-view-btn");
    const gradeWrapper = document.getElementById("agenda-grade-wrapper");
    const containerHoje = document.getElementById("agenda-hoje-container");
    const wrapperPrincipal = document.getElementById("agenda-wrapper");

    // Lógica do botão Toggle (Agora controla a classe do Wrapper)
    let showGrid = false;
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        showGrid = !showGrid;
        if (showGrid) {
          // Modo Grade Completa: Mostra grade, esconde hoje
          gradeWrapper.classList.remove("hidden-workout");
          containerHoje.classList.add("hidden-workout");

          // Muda o layout para Vertical (Caixas no topo)
          wrapperPrincipal.classList.remove("agenda-layout-daily");
          wrapperPrincipal.classList.add("agenda-layout-full");

          toggleBtn.textContent = "Ver Apenas Hoje";
        } else {
          // Modo Diário: Mostra hoje, esconde grade
          gradeWrapper.classList.add("hidden-workout");
          containerHoje.classList.remove("hidden-workout");

          // Muda o layout para Lado a Lado
          wrapperPrincipal.classList.remove("agenda-layout-full");
          wrapperPrincipal.classList.add("agenda-layout-daily");

          toggleBtn.textContent = "Ver Grade Semanal Completa";
        }
      };
    }

    // Descobrir dia da semana (Dom=0, Seg=1... mas nosso sistema usa Dom=7)
    let diaSemana = new Date().getDay();
    if (diaSemana === 0) diaSemana = 7;

    const diasNomes = [
      "",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];
    if (tituloHoje)
      tituloHoje.textContent = `Agenda de: ${diasNomes[diaSemana]}`;
    if (listaHoje) listaHoje.innerHTML = ""; // Limpa lista

    // Configuração Grade
    const HORA_INICIO = 10,
      HORA_FIM = 25, // Vai até 01:00 da manhã
      ALTURA_HORA = 60;

    function gerarGrade() {
      agendaGrid.innerHTML = "";
      // Canto vazio
      const t = document.createElement("div");
      t.className = "grid-item";
      t.style.borderLeft = "none";
      t.style.borderBottom = "1px solid #333";
      agendaGrid.appendChild(t);

      // Cabeçalho Dias
      ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].forEach((e) => {
        const o = document.createElement("div");
        o.className = "grid-item header-dia";
        o.textContent = e;
        agendaGrid.appendChild(o);
      });

      // Células Horas (Lateral)
      for (let o = HORA_INICIO; o < HORA_FIM; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        e.textContent = `${(o % 24).toString().padStart(2, "0")}:00`;
        e.style.gridRow = `${o - HORA_INICIO + 2}`;
        agendaGrid.appendChild(e);
      }

      // Colunas dos Dias
      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        o.className = "coluna-dia";
        o.dataset.diaIndex = e + 1;
        o.style.gridColumn = `${e + 2}`;
        o.style.gridRow = `2 / span ${HORA_FIM - HORA_INICIO}`;
        agendaGrid.appendChild(o);
      }
    }

    // Função Unificada: Adiciona na Grade E na Lista de Hoje
    function adicionarAtividade(nome, diaIndex, horaInicio, horaFim, cor) {
      // 1. Adicionar na Grade
      let [hIni, mIni] = horaInicio.split(":").map(Number);
      let [hFim, mFim] = horaFim.split(":").map(Number);

      if (hFim < hIni && hFim < HORA_INICIO) hFim += 24;
      if (hIni >= 0 && hIni < HORA_INICIO) {
        hIni += 24;
        if (hFim < hIni) hFim += 24;
      }

      const topo = (hIni * 60 + mIni - HORA_INICIO * 60) / 60;
      const duracao = (hFim * 60 + mFim - (hIni * 60 + mIni)) / 60;

      if (topo >= 0) {
        const bloco = document.createElement("div");
        bloco.className = "atividade-bloco";
        bloco.style.top = `${topo * ALTURA_HORA}px`;
        bloco.style.height = `${duracao * ALTURA_HORA}px`;
        bloco.style.backgroundColor = cor;
        bloco.innerHTML = `${nome} <br><small>${horaInicio} - ${horaFim}</small>`;

        const coluna = agendaGrid.querySelector(
          `.coluna-dia[data-dia-index='${diaIndex}']`
        );
        if (coluna) coluna.appendChild(bloco);
      }

      // 2. Adicionar na Lista "Hoje" (Se for o dia atual)
      if (diaIndex === diaSemana) {
        const card = document.createElement("div");
        card.className = "today-activity-card";
        card.style.borderLeftColor = cor;

        // ID único para salvar estado
        const taskId = `task_${diaIndex}_${nome.replace(
          /\s/g,
          ""
        )}_${horaInicio}`;

        // Verifica se já estava concluído
        if (localStorage.getItem(taskId) === "done") {
          card.classList.add("completed");
        }

        // Evento de clique para marcar/desmarcar
        card.onclick = function () {
          this.classList.toggle("completed");
          if (this.classList.contains("completed")) {
            localStorage.setItem(taskId, "done");
          } else {
            localStorage.removeItem(taskId);
          }
        };

        card.innerHTML = `
            <div class="today-activity-info">
                <h4>${nome}</h4>
                <div class="today-activity-time">🕒 ${horaInicio} - ${horaFim}</div>
            </div>
            <div style="font-size: 1.5em; opacity: 0.5;">✅</div>
        `;
        listaHoje.appendChild(card);
      }
    }

    gerarGrade();

    const colors = {
      cardio: "#00ced1",
      gym: "#e74c3c",
      port: "#3498db",
      mat: "#d63384",
      bank: "#27ae60",
      sales: "#f1c40f",
      info: "#8e44ad",
      eng: "#e67e22",
      sim: "#95a5a6",
    };

    [1, 2, 3, 4, 5, 7].forEach((d) =>
      adicionarAtividade("🏃 Cardio", d, "10:00", "11:00", colors.cardio)
    );
    [1, 2, 3, 4, 5, 6].forEach((d) =>
      adicionarAtividade("💪 Academia", d, "15:00", "17:00", colors.gym)
    );
    [1, 3, 5].forEach((d) =>
      adicionarAtividade("📚 Português", d, "19:00", "21:00", colors.port)
    );
    [2, 4, 6].forEach((d) =>
      adicionarAtividade("📐 Matemática", d, "19:00", "21:00", colors.mat)
    );
    [1, 4].forEach((d) =>
      adicionarAtividade("🏦 C. Bancários", d, "22:00", "00:00", colors.bank)
    );
    [2, 5].forEach((d) =>
      adicionarAtividade("💼 Vendas", d, "22:00", "00:00", colors.sales)
    );
    [3, 6].forEach((d) =>
      adicionarAtividade("💻 Informática", d, "22:00", "00:00", colors.info)
    );
    adicionarAtividade("✍️ Inglês/Red", 7, "19:00", "21:00", colors.eng);
    adicionarAtividade("📝 Simulado", 7, "22:00", "00:00", colors.sim);

    if (listaHoje.children.length === 0) {
      listaHoje.innerHTML =
        '<p style="text-align: center; padding: 20px; color: #666;">Dia Livre! Nenhuma atividade agendada.</p>';
    }
  }

  // =======================================================
  // 4. TREINO PPL
  // =======================================================
  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const toggleBtn = document.getElementById("toggle-all-workouts-btn");
    const allWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]"
    );
    let showAll = false;

    // Alternar visibilidade dos dias
    function updateVisibility() {
      const today = new Date().getDay() || 7;
      allWorkoutBlocks.forEach((b) => {
        const idx = parseInt(b.dataset.dayIndex);
        if (showAll || idx === today) b.classList.remove("hidden-workout");
        else b.classList.add("hidden-workout");
      });
    }

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        showAll = !showAll;
        toggleBtn.textContent = showAll
          ? "Ver Treino do Dia"
          : "Ver Todos os Treinos";
        updateVisibility();
      };
    }

    function saveWorkout() {
      const data = {};
      exerciseItems.forEach((item) => {
        const id = item.dataset.exerciseId;
        const checkbox = item.querySelector(".exercise-checkbox");

        if (id && checkbox) {
          if (checkbox.checked) {
            item.classList.add("completed");
          } else {
            item.classList.remove("completed");
          }

          data[id] = {
            done: checkbox.checked,
            weight: item.querySelector(".weight-input")?.value,
            series: Array.from(item.querySelectorAll(".series-dot")).map((d) =>
              d.classList.contains("completed")
            ),
          };
        }
      });
      localStorage.setItem("workout_progress_v2026", JSON.stringify(data));
    }

    const saved =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};

    exerciseItems.forEach((item) => {
      const id = item.dataset.exerciseId;

      const counter = item.querySelector(".series-counter");
      if (counter) {
        counter.innerHTML = "";
        const match = item
          .querySelector("small")
          .textContent.match(/(\d+)\s*séries/);
        const count = match ? parseInt(match[1]) : 3;
        for (let i = 0; i < count; i++) {
          const dot = document.createElement("div");
          dot.className = "series-dot";
          if (saved[id]?.series?.[i]) dot.classList.add("completed");
          dot.onclick = () => {
            dot.classList.toggle("completed");
            saveWorkout();
          };
          counter.appendChild(dot);
        }
      }

      const cb = item.querySelector(".exercise-checkbox");
      if (cb && saved[id]) {
        cb.checked = saved[id].done;
        if (saved[id].done) item.classList.add("completed");
      }

      const wi = item.querySelector(".weight-input");
      if (wi && saved[id]) wi.value = saved[id].weight || "";

      cb?.addEventListener("change", saveWorkout);
      wi?.addEventListener("input", saveWorkout);
    });

    updateVisibility();

    document.querySelectorAll(".reset-button").forEach((btn) => {
      btn.onclick = function () {
        const container = this.closest(".workout-day");
        container.querySelectorAll(".exercise-checkbox").forEach((c) => {
          c.checked = false;
        });
        container.querySelectorAll(".exercise-item").forEach((item) => {
          item.classList.remove("completed");
        });
        container
          .querySelectorAll(".series-dot")
          .forEach((d) => d.classList.remove("completed"));
        saveWorkout();
      };
    });
  }

  // =======================================================
  // 5. BEM-ESTAR
  // =======================================================
  window.deleteSabotageItem = function (index, type) {
    if (confirm("Tem certeza que deseja apagar este registro?")) {
      if (type === "sab") {
        const list = JSON.parse(localStorage.getItem("sabotageList")) || [];
        list.splice(index, 1);
        localStorage.setItem("sabotageList", JSON.stringify(list));
      } else if (type === "win") {
        const list = JSON.parse(localStorage.getItem("microWins")) || [];
        list.splice(index, 1);
        localStorage.setItem("microWins", JSON.stringify(list));
      }
      loadSabotageHistory();
    }
  };

  function loadSabotageHistory() {
    const list = JSON.parse(localStorage.getItem("sabotageList")) || [];
    const wins = JSON.parse(localStorage.getItem("microWins")) || [];
    const container = document.getElementById("combined-sabotage-history");

    if (!container) return;
    container.innerHTML = "";

    wins.forEach((winText, index) => {
      const li = document.createElement("li");
      li.className = "history-item-wrapper";
      li.innerHTML = `
            <span class="history-content" style="color: #4caf50;">🏆 Vitória: ${winText}</span>
            <button class="delete-btn" onclick="deleteSabotageItem(${index}, 'win')">🗑️</button>
        `;
      container.appendChild(li);
    });

    list.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "history-item-wrapper";
      li.innerHTML = `
            <span class="history-content" style="color: #e74c3c;">⚠️ Fuga: ${item.action}</span>
            <button class="delete-btn" onclick="deleteSabotageItem(${index}, 'sab')">🗑️</button>
        `;
      container.appendChild(li);
    });
  }

  const addWinBtn = document.getElementById("add-micro-win-btn");
  if (addWinBtn) {
    addWinBtn.onclick = () => {
      const input = document.getElementById("micro-win-input");
      if (input.value) {
        const wins = JSON.parse(localStorage.getItem("microWins")) || [];
        wins.unshift(input.value);
        localStorage.setItem("microWins", JSON.stringify(wins));
        input.value = "";
        loadSabotageHistory();
      }
    };
  }

  const addSabBtn = document.getElementById("add-sabotage-btn");
  if (addSabBtn) {
    addSabBtn.onclick = () => {
      const action = document.getElementById("sabotage-action");
      if (action.value) {
        const list = JSON.parse(localStorage.getItem("sabotageList")) || [];
        list.unshift({ action: action.value });
        localStorage.setItem("sabotageList", JSON.stringify(list));
        action.value = "";
        loadSabotageHistory();
      }
    };
  }

  window.deleteJournalItem = function (index, type) {
    if (confirm("Apagar este diário?")) {
      if (type === "dream") {
        const list = JSON.parse(localStorage.getItem("dreamEntries")) || [];
        list.splice(index, 1);
        localStorage.setItem("dreamEntries", JSON.stringify(list));
      } else if (type === "note") {
        const list = JSON.parse(localStorage.getItem("journalEntries")) || [];
        list.splice(index, 1);
        localStorage.setItem("journalEntries", JSON.stringify(list));
      }
      loadJournalHistory();
    }
  };

  function loadJournalHistory() {
    const dreams = JSON.parse(localStorage.getItem("dreamEntries")) || [];
    const notes = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const container = document.getElementById("combined-journal-history");

    if (!container) return;
    container.innerHTML = "";

    dreams.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "history-item-wrapper";
      div.style.borderBottom = "1px solid #333";
      div.style.marginBottom = "10px";
      div.innerHTML = `
        <div class="history-content">
            <div style="font-size:0.8em; color:#a0a0a0;">${item.date} - 🌙 Sonho</div>
            <div>${item.text}</div>
        </div>
        <button class="delete-btn" onclick="deleteJournalItem(${index}, 'dream')">🗑️</button>
      `;
      container.appendChild(div);
    });

    notes.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "history-item-wrapper";
      div.style.borderBottom = "1px solid #333";
      div.style.marginBottom = "10px";
      div.innerHTML = `
          <div class="history-content">
              <div style="font-size:0.8em; color:#a0a0a0;">${item.date} - 📓 Nota</div>
              <div>${item.text}</div>
          </div>
          <button class="delete-btn" onclick="deleteJournalItem(${index}, 'note')">🗑️</button>
        `;
      container.appendChild(div);
    });
  }

  const addDreamBtn = document.getElementById("add-dream-button");
  if (addDreamBtn) {
    addDreamBtn.onclick = () => {
      const d = document.getElementById("dream-journal-date").value;
      const t = document.getElementById("dream-journal-text").value;
      if (d && t) {
        const l = JSON.parse(localStorage.getItem("dreamEntries")) || [];
        l.unshift({ date: d, text: t });
        localStorage.setItem("dreamEntries", JSON.stringify(l));
        document.getElementById("dream-journal-text").value = "";
        loadJournalHistory();
      }
    };
  }

  const addNoteBtn = document.getElementById("add-note-button");
  if (addNoteBtn) {
    addNoteBtn.onclick = () => {
      const d = document.getElementById("journal-date").value;
      const t = document.getElementById("journal-text").value;
      if (d && t) {
        const l = JSON.parse(localStorage.getItem("journalEntries")) || [];
        l.unshift({ date: d, text: t });
        localStorage.setItem("journalEntries", JSON.stringify(l));
        document.getElementById("journal-text").value = "";
        loadJournalHistory();
      }
    };
  }

  loadSabotageHistory();
  loadJournalHistory();
});
