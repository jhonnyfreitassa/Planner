// --- SCRIPT DE NAVEGAÇÃO E LÓGICA GERAL ---
function showSection(sectionId) {
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".tab-button")
    .forEach((b) => b.classList.remove("active"));
  const btn = document.querySelector(
    `.tab-button[onclick="showSection('${sectionId}')"]`,
  );
  if (btn) btn.classList.add("active");
  const section = document.getElementById(sectionId);
  if (section) section.classList.add("active");
}

// --- CONFIGURAÇÃO DOS EXERCÍCIOS ---
const EXERCICIOS_CONFIG = {
  // CORE E ABDÔMEN (Foco Hipertrofia Supra/Infra, Anti-rotação e Abd Wheel)
  "🌪️ Stomach Vacuum": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "⚙️ Crunch na Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🧱 Supra Solo (c/ Anilha)": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 1,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🔪 Canivete (V-up)": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🔄 Abdominal Reverso no Solo": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "⬇️ Infra no Banco Reto": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🪵 Prancha Lateral": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "📏 Extensão Lombar Banco": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🪵 Prancha Frontal": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🦸‍♂️ Superman Isométrico": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🐕 Perdigueiro": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "🛞 Roda Abdominal (Ab Wheel)": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },
  "✋ Prancha c/ Toque no Ombro": {
    type: "isolador",
    cargaTipo: "corpo",
    incremento: 0,
    seriesMax: 4,
    seriesMin: 4,
  },

  // PUSH 1
  "📐 Supino Inclinado c/ Halteres": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 50,
  },
  "💥 Supino Reto c/ Halteres": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 60,
  },
  "⚙️ Supino Sentado (Máquina)": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "🦅 Crucifixo na Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🙅‍♂️ Crossover Polia Alta --> Baixa": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 3,
  },
  "🆙 Desenvolvimento Arnold": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🥥 Elevação Lateral Halter": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 1,
    seriesMax: 6,
    seriesMin: 5,
  },
  "🔱 Tríceps Testa": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🪜 Tríceps Corda": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 4,
  },

  // PULL 1
  "🚣 Remada Máquina (Neutra)": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "🦖 Remada Curvada": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 120,
  },
  "⏬ Puxada Alta": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "🦅 Crucifixo Inverso Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🦾 Rosca Direta": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🕷️ Rosca Spider (Banco 45º)": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🔄 Rosca Inversa": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 4,
    seriesMin: 3,
  },

  // LEGS 1
  "🏋️‍♂️ Agachamento Livre": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 180,
  },
  "☠️ Levantamento Terra": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 220,
  },
  "🍑 Elevação Pélvica": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 200,
  },
  "🇧🇬 Agachamento Búlgaro": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🦵 Cadeira Extensora": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 5,
    seriesMin: 3,
  },
  "🦶 Panturrilha em Pé Unilateral": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 5,
  },

  // PUSH 2
  "🛫 Crossover Polia Baixa": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🦋 Crucifixo na Máquina (Fly)": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🧗 Flexão de Braço": {
    type: "composto",
    cargaTipo: "corpo",
    incremento: 0,
    cargaMax: 0,
  },
  "🥥 Elevação Lateral no Cabo": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 1,
    seriesMax: 5,
    seriesMin: 4,
  },
  "💿 Elevação Frontal c/ Anilha": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 1,
    seriesMax: 4,
    seriesMin: 3,
  },
  "🪜 Mergulho (Banco/Dips)": {
    type: "composto",
    cargaTipo: "corpo",
    incremento: 0,
    cargaMax: 0,
  },
  "⏬ Tríceps Pulley": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 4,
  },

  // PULL 2
  "🧗 Barra Fixa / Graviton": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 100,
  },
  "⏬ Puxada Alta Aberta": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "⛷️ Pulldown Corda": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🪚 Remada Serrote": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 50,
  },
  "👺 Face Pull": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🔨 Rosca Martelo": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 5,
    seriesMin: 4,
  },
  "📐 Rosca Inclinada (Banco 45º)": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 5,
    seriesMin: 4,
  },

  // LEGS 2
  "📏 Stiff com Barra": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 150,
  },
  "⏮️ Recuo com Halteres": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🛌 Mesa Flexora": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 5,
    seriesMin: 4,
  },
  "👐 Cadeira Abdutora": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 5,
  },
  "🪑 Panturrilha Sentado (ou Burrinho)": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 5,
  },
};

// --- PALETA DE CORES ATUALIZADA (SEM REPETIÇÕES) ---
const COLORS = {
  cardio: "#ff4757",
  gym: "#b30000",
  almoco: "#ffa502",
  conc_port: "#e67e22",
  conc_mat: "#8e44ad",
  conc_info: "#2980b9",
  conc_vendas: "#e84393",
  conc_banc: "#27ae60",
  conc_atual: "#16a085",
  conc_rlm: "#d35400",
  conc_estat: "#7f8c8d",
  conc_estudo: "#f1c40f",
  fac_calculo: "#3498db",
  fac_metodos: "#2c3e50",
  fac_sist: "#34495e",
  fac_estrut: "#9b59b6",
  fac_algo: "#e91e63",
  fac_estudos: "#6c5ce7",
  carreira: "#fdcb6e",
};

document.addEventListener("DOMContentLoaded", function () {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataFormatada = `${ano}-${mes}-${dia}`;

  // --- TIMER DE FOCO 50/15 ---
  const timerDisplay = document.getElementById("timer-display");
  const btnTimerAction = document.getElementById("btn-timer-action");
  const btnTimerReset = document.getElementById("btn-timer-reset");

  let focusTimerInterval;
  let isFocusMode = true;
  let timerSeconds = 50 * 60;
  let isTimerRunning = false;

  function updateTimerDisplay() {
    if (!timerDisplay) return;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function playAlertBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.frequency.value = 600;
      osc.start();
      setTimeout(() => osc.stop(), 800);
    } catch (e) {
      console.log("Áudio não suportado");
    }
  }

  if (btnTimerAction && btnTimerReset) {
    updateTimerDisplay();
    btnTimerAction.onclick = () => {
      if (isTimerRunning) {
        clearInterval(focusTimerInterval);
        isTimerRunning = false;
        btnTimerAction.textContent = isFocusMode
          ? "Retomar Bloco (50m)"
          : "Retomar Pausa (15m)";
        document.body.classList.remove("modo-foco-ativo");
      } else {
        isTimerRunning = true;
        btnTimerAction.textContent = "Pausar Timer";
        if (isFocusMode) document.body.classList.add("modo-foco-ativo");

        focusTimerInterval = setInterval(() => {
          timerSeconds--;
          updateTimerDisplay();
          if (timerSeconds <= 0) {
            clearInterval(focusTimerInterval);
            isTimerRunning = false;
            playAlertBeep();
            document.body.classList.remove("modo-foco-ativo");
            isFocusMode = !isFocusMode;
            timerSeconds = isFocusMode ? 50 * 60 : 15 * 60;
            updateTimerDisplay();
            btnTimerAction.textContent = isFocusMode
              ? "Iniciar Bloco (50m)"
              : "Iniciar Pausa (15m)";
            setTimeout(
              () =>
                alert(
                  isFocusMode
                    ? "Pausa encerrada! Hora de voltar ao foco."
                    : "Bloco concluído! Descanse.",
                ),
              100,
            );
          }
        }, 1000);
      }
    };

    btnTimerReset.onclick = () => {
      clearInterval(focusTimerInterval);
      isTimerRunning = false;
      isFocusMode = true;
      timerSeconds = 50 * 60;
      updateTimerDisplay();
      btnTimerAction.textContent = "Iniciar Bloco (50m)";
      document.body.classList.remove("modo-foco-ativo");
    };
  }

  // --- TRACKER DA VERDADE DIÁRIO ---
  const btnEncerrarDia = document.getElementById("btn-encerrar-dia");
  const truthChecks = document.querySelectorAll(".truth-check");
  const logFalhasContainer = document.getElementById("log-falhas-container");
  const logFalhasText = document.getElementById("log-falhas-text");
  const trackerMsg = document.getElementById("tracker-msg");

  if (btnEncerrarDia) {
    const todayString = new Date().toLocaleDateString();
    const savedTrackerDate = localStorage.getItem("tracker_date");

    if (savedTrackerDate === todayString) {
      const savedChecks = JSON.parse(
        localStorage.getItem("tracker_checks") || "[]",
      );
      truthChecks.forEach((chk, idx) => {
        chk.checked = savedChecks[idx] || false;
      });
      if (localStorage.getItem("tracker_finished") === "true") {
        btnEncerrarDia.textContent = "Dia Encerrado 🔒";
        btnEncerrarDia.disabled = true;
        btnEncerrarDia.style.opacity = "0.5";
        truthChecks.forEach((c) => (c.disabled = true));
      }
    } else {
      localStorage.removeItem("tracker_finished");
      localStorage.removeItem("tracker_checks");
      localStorage.setItem("tracker_date", todayString);
    }

    truthChecks.forEach((chk) => {
      chk.addEventListener("change", () => {
        const checksState = Array.from(truthChecks).map((c) => c.checked);
        localStorage.setItem("tracker_checks", JSON.stringify(checksState));
        const allChecked = Array.from(truthChecks).every((c) => c.checked);
        if (allChecked) {
          logFalhasContainer.style.display = "none";
          trackerMsg.textContent = "";
        }
      });
    });

    btnEncerrarDia.onclick = () => {
      const allChecked = Array.from(truthChecks).every((c) => c.checked);
      if (!allChecked) {
        logFalhasContainer.style.display = "block";
        if (logFalhasText.value.trim() === "") {
          trackerMsg.textContent = "Preencha o Log de Falhas para prosseguir.";
          trackerMsg.style.color = "#e74c3c";
          logFalhasText.focus();
          return;
        }
      }
      localStorage.setItem("tracker_finished", "true");
      if (!allChecked && logFalhasText.value.trim() !== "") {
        const history =
          JSON.parse(localStorage.getItem("journalEntries")) || [];
        history.unshift({
          date: todayString,
          text: `[Log de Falhas] ${logFalhasText.value.trim()}`,
        });
        localStorage.setItem("journalEntries", JSON.stringify(history));
        if (typeof loadJournalHistory === "function") loadJournalHistory();
      }
      logFalhasContainer.style.display = "none";
      btnEncerrarDia.textContent = "Dia Encerrado 🔒";
      btnEncerrarDia.disabled = true;
      btnEncerrarDia.style.opacity = "0.5";
      truthChecks.forEach((c) => (c.disabled = true));
      trackerMsg.textContent = allChecked
        ? "Parabéns pela disciplina hoje! 🚀"
        : "Dia encerrado. Falha registrada para aprendizado.";
      trackerMsg.style.color = "#4caf50";
    };
  }

  // RESET DIÁRIO AUTOMÁTICO
  const lastVisit = localStorage.getItem("last_app_visit_date");
  if (lastVisit && lastVisit !== dataFormatada) {
    const savedProgress =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    for (const key in savedProgress) {
      savedProgress[key].done = false;
      if (savedProgress[key].series)
        savedProgress[key].series = savedProgress[key].series.map(() => false);
    }
    localStorage.setItem(
      "workout_progress_v2026",
      JSON.stringify(savedProgress),
    );
  }
  localStorage.setItem("last_app_visit_date", dataFormatada);

  // SETAR DATA NOS INPUTS
  const inputSonho = document.getElementById("dream-journal-date");
  const inputNota = document.getElementById("journal-date");
  if (inputSonho) inputSonho.value = dataFormatada;
  if (inputNota) inputNota.value = dataFormatada;

  // LÓGICA DA AGENDA (06:00 as 00:00)
  if (document.getElementById("agenda")) {
    const agendaGrid = document.getElementById("agenda");
    const listaHoje = document.getElementById("lista-atividades-hoje");
    const tituloHoje = document.getElementById("titulo-dia-hoje");
    const toggleBtn = document.getElementById("toggle-agenda-view-btn");
    const gradeWrapper = document.getElementById("agenda-grade-wrapper");
    const containerHoje = document.getElementById("agenda-hoje-container");
    const wrapperPrincipal = document.getElementById("agenda-wrapper");

    let showGrid = false;
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        showGrid = !showGrid;
        if (showGrid) {
          gradeWrapper.classList.remove("hidden-workout");
          containerHoje.classList.add("hidden-workout");
          wrapperPrincipal.classList.remove("agenda-layout-daily");
          wrapperPrincipal.classList.add("agenda-layout-full");
          toggleBtn.textContent = "Ver Apenas Hoje";
          if (window.innerWidth < 768) {
            setTimeout(() => {
              gradeWrapper.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }
        } else {
          gradeWrapper.classList.add("hidden-workout");
          containerHoje.classList.remove("hidden-workout");
          wrapperPrincipal.classList.remove("agenda-layout-daily");
          wrapperPrincipal.classList.add("agenda-layout-daily");
          toggleBtn.textContent = "Ver Grade Semanal Completa";
        }
      };
    }

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
    if (listaHoje) listaHoje.innerHTML = "";

    const HORA_INICIO = 6;
    const HORA_FIM = 24;
    const ALTURA_HORA = 80;

    function gerarGrade() {
      agendaGrid.innerHTML = "";
      const t = document.createElement("div");
      t.className = "grid-item";
      t.style.borderLeft = "none";
      t.style.borderBottom = "1px solid #333";
      agendaGrid.appendChild(t);

      ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].forEach((e) => {
        const o = document.createElement("div");
        o.className = "grid-item header-dia";
        o.textContent = e;
        agendaGrid.appendChild(o);
      });

      for (let o = HORA_INICIO; o <= HORA_FIM; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        e.textContent =
          o === 24 ? "00:00" : `${o.toString().padStart(2, "0")}:00`;
        e.style.gridRow = `${o - HORA_INICIO + 2}`;
        if (o === HORA_FIM) {
          e.style.height = "30px";
          e.style.alignSelf = "start";
          e.style.borderBottom = "none";
          e.style.lineHeight = "15px";
        }
        agendaGrid.appendChild(e);
      }

      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        o.className = "coluna-dia";
        o.dataset.diaIndex = e + 1;
        o.style.gridColumn = `${e + 2}`;
        o.style.gridRow = `2 / 21`;
        agendaGrid.appendChild(o);
      }
    }

    let atividadesHoje = [];

    function adicionarAtividade(nome, diaIndex, horaInicio, horaFim, cor) {
      let [hIni, mIni] = horaInicio.split(":").map(Number);
      let [hFim, mFim] = horaFim.split(":").map(Number);
      let topo = hIni + mIni / 60;
      let fimDecimal = hFim + mFim / 60;
      if (hFim === 0 && mFim === 0) fimDecimal = 24;
      if (fimDecimal < topo) fimDecimal = 24;
      let duracao = fimDecimal - topo;

      function renderBloco(topPos, durationTime) {
        const bloco = document.createElement("div");
        bloco.className = "atividade-bloco";
        bloco.style.top = `${(topPos - HORA_INICIO) * ALTURA_HORA}px`;
        bloco.style.height = `${durationTime * ALTURA_HORA}px`;
        bloco.style.backgroundColor = cor;
        bloco.style.zIndex = durationTime < 1 ? "15" : "10";
        bloco.innerHTML = `<strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nome}</strong><span style="font-size:0.9em; opacity:0.9;">${horaInicio}-${horaFim}</span>`;
        const coluna = agendaGrid.querySelector(
          `.coluna-dia[data-dia-index='${diaIndex}']`,
        );
        if (coluna) coluna.appendChild(bloco);
      }

      if (topo >= HORA_INICIO && topo < HORA_FIM) renderBloco(topo, duracao);

      if (diaIndex === diaSemana)
        atividadesHoje.push({
          nome: nome,
          horaInicio: horaInicio,
          horaFim: horaFim,
          cor: cor,
          taskId: `task_${diaIndex}_${nome.replace(/\s/g, "")}_${horaInicio.replace(":", "")}`,
        });
    }

    gerarGrade();
    carregarRotinaSemestre();

    // ==========================================
    // NOVA ESTRUTURA DE ROTINA
    // ==========================================
    function carregarRotinaSemestre() {
      const limitSist = new Date("2026-04-25");
      const isSistActive = hoje <= limitSist;

      // Mapeamento de 1 matéria por dia para o BB
      const bbSubjects = {
        1: { nome: "BB: Vendas e Neg", cor: COLORS.conc_vendas },
        2: { nome: "BB: Informática", cor: COLORS.conc_info },
        3: { nome: "BB: Conh. Bancários", cor: COLORS.conc_banc },
        4: { nome: "BB: Português", cor: COLORS.conc_port },
        5: { nome: "BB: Mat. Financeira", cor: COLORS.conc_mat },
        6: { nome: "BB: Matemática Básica", cor: COLORS.conc_mat },
        7: { nome: "BB: Inglês/Atualidades", cor: COLORS.conc_atual },
      };

      for (let d = 1; d <= 7; d++) {
        // Vida de Atleta (Inegociável)
        adicionarAtividade("Cardio", d, "08:00", "09:30", COLORS.cardio);
        if (d !== 7) {
          // Musculação de Seg a Sáb
          adicionarAtividade("Academia", d, "15:30", "17:30", COLORS.gym);
        }

        // Bloco 1: Concurso BB (2 horas/dia)
        adicionarAtividade(
          bbSubjects[d].nome,
          d,
          "10:00",
          "12:00",
          bbSubjects[d].cor,
        );

        // Bloco 2: Roadmap (apenas carreira) (2 horas/dia)
        adicionarAtividade(
          "Roadmap (Desenv. Carreira)",
          d,
          "13:00",
          "15:00",
          COLORS.carreira,
        );
      }

      // Grade de Aulas Reais da Faculdade (Noturno)
      // Segunda
      adicionarAtividade(
        "Cálculo V.V",
        1,
        "19:00",
        "20:40",
        COLORS.fac_calculo,
      );
      adicionarAtividade(
        "Métodos Mat.",
        1,
        "20:55",
        "22:35",
        COLORS.fac_metodos,
      );

      // Terça
      if (isSistActive)
        adicionarAtividade(
          "Sist. Computacionais",
          2,
          "19:00",
          "22:35",
          COLORS.fac_sist,
        );

      // Quarta - Livre

      // Quinta
      adicionarAtividade(
        "Estrutura de Dados",
        4,
        "19:00",
        "21:45",
        COLORS.fac_estrut,
      );

      // Sexta
      adicionarAtividade("Algoritmos", 5, "19:00", "21:45", COLORS.fac_algo);

      // Fim de Semana - Novo bloco exclusivo para Faculdade/TCC (2 horas)
      adicionarAtividade(
        "Estudos Faculdade",
        6,
        "18:00",
        "20:00",
        COLORS.fac_estudos,
      );
      adicionarAtividade(
        "Estudos Faculdade",
        7,
        "16:00",
        "18:00",
        COLORS.fac_estudos,
      );
    }

    atividadesHoje.sort(
      (a, b) =>
        parseInt(a.horaInicio.replace(":", "")) -
        parseInt(b.horaInicio.replace(":", "")),
    );
    atividadesHoje.forEach((atividade) => {
      const idUnico = `list_today_${atividade.taskId}`;
      if (document.getElementById(idUnico)) return;
      const card = document.createElement("div");
      card.id = idUnico;
      card.className = "today-activity-card";
      card.style.borderLeftColor = atividade.cor;
      if (localStorage.getItem(atividade.taskId) === "done")
        card.classList.add("completed");
      card.onclick = function () {
        this.classList.toggle("completed");
        localStorage.setItem(
          atividade.taskId,
          this.classList.contains("completed") ? "done" : "",
        );
      };
      card.innerHTML = `<div class="today-activity-info"><h4>${atividade.nome}</h4><div class="today-activity-time">🕒 ${atividade.horaInicio} - ${atividade.horaFim}</div></div><div style="font-size: 1.5em; opacity: 0.5;">✅</div>`;
      listaHoje.appendChild(card);
    });
    if (listaHoje.children.length === 0)
      listaHoje.innerHTML =
        '<p style="text-align: center; padding: 20px; color: #666;">Dia Livre!</p>';
  }

  // --- PROGRESSÃO + CHECKBOX + HISTORICOS DE TREINO ---
  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const toggleBtn = document.getElementById("toggle-all-workouts-btn");
    const specificWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]",
    );

    function getCleanExerciseName(item) {
      const label = item.querySelector("label");
      if (!label) return "";
      return label.innerHTML
        .split("<br>")[0]
        .replace(/<[^>]*>/g, "")
        .trim();
    }

    function processarProgressao(nomeLimpo, seriesFeitas, seriesTotais) {
      const config = EXERCICIOS_CONFIG[nomeLimpo];
      if (!config) return;
      let progresso =
        JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};
      if (!progresso[nomeLimpo])
        progresso[nomeLimpo] = { carga: 0, series: seriesTotais, falhas: 0 };
      let dados = progresso[nomeLimpo];

      if (config.type === "composto") {
        if (seriesFeitas >= seriesTotais) {
          dados.carga = (dados.carga || 0) + config.incremento;
          dados.falhas = 0;
        } else {
          dados.falhas++;
          if (dados.falhas >= 2) {
            let novaCarga = dados.carga * 0.9;
            dados.carga =
              config.cargaTipo === "halter"
                ? Math.floor(novaCarga / config.incremento) * config.incremento
                : Math.round(novaCarga);
            dados.falhas = 0;
          }
        }
      } else if (config.type === "isolador") {
        if (seriesFeitas >= seriesTotais) {
          if (dados.series < config.seriesMax) dados.series++;
          else {
            dados.carga = (dados.carga || 0) + config.incremento;
            dados.series = config.seriesMin;
          }
        }
      }
      progresso[nomeLimpo] = dados;
      localStorage.setItem("frog_progresso_cargas", JSON.stringify(progresso));
    }

    let showAll = false;
    function updateVisibility() {
      const today = new Date().getDay() || 7;
      specificWorkoutBlocks.forEach((b) => {
        const idx = parseInt(b.dataset.dayIndex);
        if (showAll || idx === today) b.classList.remove("hidden-workout");
        else b.classList.add("hidden-workout");
      });
      document.querySelectorAll(".core-day-list").forEach((list) => {
        const coreDayIdx = parseInt(list.getAttribute("data-core-day"));
        if (showAll || coreDayIdx === today)
          list.classList.remove("hidden-workout");
        else list.classList.add("hidden-workout");
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

    function saveWorkout(triggered, item) {
      const data = {};
      exerciseItems.forEach((i) => {
        const id = i.dataset.exerciseId;
        const cb = i.querySelector(".exercise-checkbox");
        if (id && cb) {
          if (cb.checked) i.classList.add("completed");
          else i.classList.remove("completed");
          data[id] = {
            done: cb.checked,
            weight: i.querySelector(".weight-input")?.value,
            series: Array.from(i.querySelectorAll(".series-dot")).map((d) =>
              d.classList.contains("completed"),
            ),
          };
        }
      });
      localStorage.setItem("workout_progress_v2026", JSON.stringify(data));
      if (triggered && item) {
        const cb = item.querySelector(".exercise-checkbox");
        if (cb.checked) {
          const nomeLimpo = getCleanExerciseName(item);
          const dots = item.querySelectorAll(".series-dot");
          const done = Array.from(dots).filter((d) =>
            d.classList.contains("completed"),
          ).length;
          const total = dots.length;
          if (total > 0) processarProgressao(nomeLimpo, done, total);
        }
      }
    }

    const saved =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    const progressoCargas =
      JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};

    exerciseItems.forEach((item) => {
      const id = item.dataset.exerciseId;
      const labelText = getCleanExerciseName(item);
      let seriesCount = 3;
      if (progressoCargas[labelText]?.series)
        seriesCount = progressoCargas[labelText].series;
      else {
        const m = item
          .querySelector("small")
          ?.textContent.match(/(\d+)\s*séries/);
        seriesCount = m ? parseInt(m[1]) : 3;
      }
      const counter = item.querySelector(".series-counter");
      if (counter && seriesCount > 0) {
        counter.innerHTML = "";
        for (let i = 0; i < seriesCount; i++) {
          const dot = document.createElement("div");
          dot.className = "series-dot";
          if (saved[id]?.series?.[i]) dot.classList.add("completed");
          dot.onclick = () => {
            dot.classList.toggle("completed");
            saveWorkout(false, null);
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
      if (wi) {
        if (progressoCargas[labelText]?.carga > 0)
          wi.value = progressoCargas[labelText].carga;
        else if (saved[id]) wi.value = saved[id].weight || "";
      }
      cb?.addEventListener("change", () => saveWorkout(true, item));
      wi?.addEventListener("input", () => saveWorkout(false, null));
    });

    updateVisibility();

    document.querySelectorAll(".reset-button").forEach((btn) => {
      btn.onclick = function () {
        const c = this.closest(".workout-day");
        c.querySelectorAll(".exercise-checkbox").forEach(
          (x) => (x.checked = false),
        );
        c.querySelectorAll(".exercise-item").forEach((x) =>
          x.classList.remove("completed"),
        );
        c.querySelectorAll(".series-dot").forEach((x) =>
          x.classList.remove("completed"),
        );
        saveWorkout(false, null);
      };
    });

    document.querySelectorAll(".finish-workout-btn").forEach((btn) => {
      btn.onclick = function () {
        const p = this.closest(".workout-day");
        const h = p.querySelector(".workout-hint");
        const d = p.getAttribute("data-day-name");
        localStorage.setItem(
          `last_workout_${d}`,
          new Date().toLocaleDateString(),
        );
        p.querySelectorAll(".exercise-checkbox").forEach(
          (x) => (x.checked = false),
        );
        p.querySelectorAll(".exercise-item").forEach((x) =>
          x.classList.remove("completed"),
        );
        p.querySelectorAll(".series-dot").forEach((x) =>
          x.classList.remove("completed"),
        );
        saveWorkout(false, null);
        if (h) {
          h.textContent = `Treino de ${d} registrado!`;
          h.style.color = "#4caf50";
          setTimeout(() => (h.textContent = ""), 3000);
        }
      };
    });
  }

  // --- PROGRESSÃO DE CARREIRA E DIETA ---
  if (document.getElementById("carreira-section")) {
    const roadmapCheckboxes = document.querySelectorAll(".roadmap-check");
    const roadmapProgressBar = document.getElementById("roadmapProgressBar");
    function updateRoadmapProgress() {
      const total = roadmapCheckboxes.length;
      const checked = document.querySelectorAll(
        ".roadmap-check:checked",
      ).length;
      const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
      if (roadmapProgressBar) {
        roadmapProgressBar.style.width = percentage + "%";
        roadmapProgressBar.textContent = percentage + "%";
      }
      roadmapCheckboxes.forEach((box) => {
        localStorage.setItem(box.id, box.checked);
        const p = box.closest(".checklist-item");
        if (p) {
          if (box.checked) p.classList.add("completed");
          else p.classList.remove("completed");
        }
      });
    }
    roadmapCheckboxes.forEach((box) => {
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;
      const p = box.closest(".checklist-item");
      if (p && isChecked) p.classList.add("completed");
      box.addEventListener("change", updateRoadmapProgress);
    });
    updateRoadmapProgress();
  }

  if (document.getElementById("dieta-section")) {
    const shoppingChecks = document.querySelectorAll(".shopping-check");
    function saveDietState() {
      shoppingChecks.forEach((box) => {
        localStorage.setItem(box.id, box.checked);
        const p = box.closest(".checklist-item");
        if (p) {
          if (box.checked) p.classList.add("completed");
          else p.classList.remove("completed");
        }
      });
    }
    shoppingChecks.forEach((box) => {
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;
      const p = box.closest(".checklist-item");
      if (p && isChecked) p.classList.add("completed");
      box.addEventListener("change", saveDietState);
    });
  }

  // --- HISTÓRICOS E DIÁRIOS ---
  window.deleteSabotageItem = function (i, t) {
    if (confirm("Apagar?")) {
      if (t === "sab") {
        const l = JSON.parse(localStorage.getItem("sabotageList")) || [];
        l.splice(i, 1);
        localStorage.setItem("sabotageList", JSON.stringify(l));
      } else {
        const l = JSON.parse(localStorage.getItem("microWins")) || [];
        l.splice(i, 1);
        localStorage.setItem("microWins", JSON.stringify(l));
      }
      loadSabotageHistory();
    }
  };
  function loadSabotageHistory() {
    const l = JSON.parse(localStorage.getItem("sabotageList")) || [];
    const w = JSON.parse(localStorage.getItem("microWins")) || [];
    const c = document.getElementById("combined-sabotage-history");
    if (!c) return;
    c.innerHTML = "";
    w.forEach((x, i) => {
      const li = document.createElement("li");
      li.className = "history-item-wrapper";
      li.innerHTML = `<span class="history-content" style="color:#4caf50;">🏆 ${x}</span><button class="delete-btn" onclick="deleteSabotageItem(${i},'win')">🗑️</button>`;
      c.appendChild(li);
    });
    l.forEach((x, i) => {
      const li = document.createElement("li");
      li.className = "history-item-wrapper";
      li.innerHTML = `<span class="history-content" style="color:#e74c3c;">⚠️ ${x.action}</span><button class="delete-btn" onclick="deleteSabotageItem(${i},'sab')">🗑️</button>`;
      c.appendChild(li);
    });
  }
  const addWinBtn = document.getElementById("add-micro-win-btn");
  if (addWinBtn)
    addWinBtn.onclick = () => {
      const i = document.getElementById("micro-win-input");
      if (i.value) {
        const w = JSON.parse(localStorage.getItem("microWins")) || [];
        w.unshift(i.value);
        localStorage.setItem("microWins", JSON.stringify(w));
        i.value = "";
        loadSabotageHistory();
      }
    };
  const addSabBtn = document.getElementById("add-sabotage-btn");
  if (addSabBtn)
    addSabBtn.onclick = () => {
      const i = document.getElementById("sabotage-action");
      if (i.value) {
        const l = JSON.parse(localStorage.getItem("sabotageList")) || [];
        l.unshift({ action: i.value });
        localStorage.setItem("sabotageList", JSON.stringify(l));
        i.value = "";
        loadSabotageHistory();
      }
    };
  loadSabotageHistory();

  window.deleteJournalItem = function (i, t) {
    if (confirm("Apagar?")) {
      if (t === "dream") {
        const l = JSON.parse(localStorage.getItem("dreamEntries")) || [];
        l.splice(i, 1);
        localStorage.setItem("dreamEntries", JSON.stringify(l));
      } else {
        const l = JSON.parse(localStorage.getItem("journalEntries")) || [];
        l.splice(i, 1);
        localStorage.setItem("journalEntries", JSON.stringify(l));
      }
      loadJournalHistory();
    }
  };
  function loadJournalHistory() {
    const d = JSON.parse(localStorage.getItem("dreamEntries")) || [];
    const n = JSON.parse(localStorage.getItem("journalEntries")) || [];
    const c = document.getElementById("combined-journal-history");
    if (!c) return;
    c.innerHTML = "";
    d.forEach((x, i) => {
      const div = document.createElement("div");
      div.className = "history-item-wrapper";
      div.style.borderBottom = "1px solid #333";
      div.innerHTML = `<div class="history-content"><div style="font-size:0.8em;color:#a0a0a0;">${x.date} - 🌙</div><div>${x.text}</div></div><button class="delete-btn" onclick="deleteJournalItem(${i},'dream')">🗑️</button>`;
      c.appendChild(div);
    });
    n.forEach((x, i) => {
      const div = document.createElement("div");
      div.className = "history-item-wrapper";
      div.style.borderBottom = "1px solid #333";
      div.innerHTML = `<div class="history-content"><div style="font-size:0.8em;color:#a0a0a0;">${x.date} - 📓</div><div>${x.text}</div></div><button class="delete-btn" onclick="deleteJournalItem(${i},'note')">🗑️</button>`;
      c.appendChild(div);
    });
  }
  const addDBtn = document.getElementById("add-dream-button");
  if (addDBtn)
    addDBtn.onclick = () => {
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
  const addNBtn = document.getElementById("add-note-button");
  if (addNBtn)
    addNBtn.onclick = () => {
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
  loadJournalHistory();
});
