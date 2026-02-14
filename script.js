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

// --- CONFIGURAÇÃO DOS EXERCÍCIOS (PROGRESSÃO DE CARGA) ---
const EXERCICIOS_CONFIG = {
  // SEGUNDA (PUSH 1)
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
  "🙅‍♂️ Crossover Polia Alta": {
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
  // TERÇA (PULL 1)
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
  // QUARTA (LEGS A)
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
  // QUINTA (PUSH 2)
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
  // SEXTA (PULL 2)
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
  "🪑 Remada Serrote": {
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
  // SÁBADO (LEGS B)
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

// --- VARIÁVEIS GLOBAIS ---
const LINK_GRAN =
  "https://www.grancursosonline.com.br/aluno/curso/s/banco-do-brasil-conhecimentos-basicos-para-escriturario-agente-comercial-pre-edital-134918-duplicado";
const COLORS = {
  cardio: "#ff4757",
  gym: "#b30000",
  almoco: "#ffa502",
  // Cores de Estudo
  hackers: "#16a085", // Verde Tech para Hackers do Bem
  espiritual: "#9b59b6", // Roxo para Espiritualidade
  fac_calculo: "#3498db",
  fac_metodos: "#2c3e50",
  fac_sist: "#34495e",
  fac_estrut: "#8e44ad",
  fac_algo: "#e91e63",
  carreira: "#fdcb6e",
};

// --- INICIALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", function () {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataFormatada = `${ano}-${mes}-${dia}`;

  // 1. RESET DIÁRIO AUTOMÁTICO
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

  // 2. SETAR DATA NOS INPUTS
  const inputSonho = document.getElementById("dream-journal-date");
  const inputNota = document.getElementById("journal-date");
  if (inputSonho) inputSonho.value = dataFormatada;
  if (inputNota) inputNota.value = dataFormatada;

  // 3. LÓGICA DA AGENDA (ATUALIZADA)
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
          wrapperPrincipal.classList.add("agenda-layout-full");
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

    // CONFIGURAÇÃO DA GRADE (AJUSTADO PARA IR ATÉ MEIA-NOITE)
    const HORA_INICIO = 8;
    const HORA_FIM = 24; // Vai até 24:00
    const ALTURA_HORA = 80;

    function gerarGrade() {
      agendaGrid.innerHTML = "";
      const t = document.createElement("div");
      t.className = "grid-item";
      t.style.borderLeft = "none";
      agendaGrid.appendChild(t);
      ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].forEach((e) => {
        const o = document.createElement("div");
        o.className = "grid-item header-dia";
        o.textContent = e;
        agendaGrid.appendChild(o);
      });
      // Loop até HORA_FIM para incluir a linha final
      for (let o = HORA_INICIO; o <= HORA_FIM; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        // Se for 24, exibe 00:00 (opcional, ou 24:00)
        e.textContent = `${o === 24 ? "00" : o.toString().padStart(2, "0")}:00`;
        e.style.gridRow = `${o - HORA_INICIO + 2}`;
        agendaGrid.appendChild(e);
      }
      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        o.className = "coluna-dia";
        o.dataset.diaIndex = e + 1;
        o.style.gridColumn = `${e + 2}`;
        // Ajuste do span para cobrir todas as horas + a linha final
        o.style.gridRow = `2 / span ${HORA_FIM - HORA_INICIO + 1}`;
        agendaGrid.appendChild(o);
      }
    }

    let atividadesHoje = [];
    function adicionarAtividade(nome, diaIndex, horaInicio, horaFim, cor) {
      let [hIni, mIni] = horaInicio.split(":").map(Number);
      let [hFim, mFim] = horaFim.split(":").map(Number);
      // Tratamento para meia-noite (24:00 ou 00:00)
      if (hFim === 0) hFim = 24;
      
      let topo = (hIni * 60 + mIni) / 60;
      let duracao = 0;
      
      if (hFim < hIni && hFim !== 24) {
        // Caso atravesse a meia noite (ex: 23:00 as 01:00) - simplificado para cortar na meia noite
        let duracaoParte1 = (24 * 60 - (hIni * 60 + mIni)) / 60;
        renderBloco(topo, duracaoParte1);
      } else {
        duracao = (hFim * 60 + mFim - (hIni * 60 + mIni)) / 60;
        renderBloco(topo, duracao);
      }
      
      function renderBloco(topPos, durationTime) {
        const bloco = document.createElement("div");
        bloco.className = "atividade-bloco";
        bloco.style.top = `${(topPos - HORA_INICIO) * ALTURA_HORA}px`;
        bloco.style.height = `${durationTime * ALTURA_HORA}px`;
        bloco.style.backgroundColor = cor;
        bloco.style.zIndex = durationTime < 1 ? "10" : "1";
        bloco.innerHTML = `<strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nome}</strong><span style="font-size:0.9em; opacity:0.9;">${horaInicio}-${horaFim}</span>`;
        const coluna = agendaGrid.querySelector(
          `.coluna-dia[data-dia-index='${diaIndex}']`,
        );
        if (coluna) coluna.appendChild(bloco);
      }
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

    function carregarRotinaSemestre() {
      const limitSist = new Date("2026-04-25");
      const isSistActive = hoje <= limitSist;

      // --- ROTINA SEMANAL (Seg-Sex) ---
      for (let d = 1; d <= 5; d++) {
        // 1. Manhã: Cardio + Bloco 1 (10h-12h)
        adicionarAtividade("Cardio", d, "08:00", "09:30", COLORS.cardio);
        adicionarAtividade("Hackers do Bem (1/3)", d, "10:00", "12:00", COLORS.hackers);

        // 2. Tarde: Bloco 2 (13h-15h) + Academia
        adicionarAtividade("Hackers do Bem (2/3)", d, "13:00", "15:00", COLORS.hackers);
        adicionarAtividade("Academia", d, "15:30", "17:30", COLORS.gym);

        // 3. Noite: Lógica do 3º Bloco vs Faculdade
        if (d === 1) { // Segunda
          adicionarAtividade("Cálculo V.V", 1, "19:00", "20:40", COLORS.fac_calculo);
          adicionarAtividade("Métodos Mat.", 1, "20:55", "22:35", COLORS.fac_metodos);
        } else if (d === 2) { // Terça
          if (isSistActive)
            adicionarAtividade("Sist. Computacionais", 2, "19:00", "22:35", COLORS.fac_sist);
        } else if (d === 3) { // Quarta (LIVRE de Faculdade -> Entra Bloco 3)
           adicionarAtividade("Hackers do Bem (3/3)", 3, "19:00", "21:00", COLORS.hackers);
        } else if (d === 4) { // Quinta
          adicionarAtividade("Estrutura de Dados", 4, "19:00", "21:45", COLORS.fac_estrut);
        } else if (d === 5) { // Sexta
          adicionarAtividade("Algoritmos", 5, "19:00", "21:45", COLORS.fac_algo);
        }
      }

      // --- SÁBADO (Dia 6) - 3 Blocos ---
      adicionarAtividade("Cardio", 6, "08:00", "09:30", COLORS.cardio);
      adicionarAtividade("Hackers do Bem (1/3)", 6, "10:00", "12:00", COLORS.hackers);
      adicionarAtividade("Hackers do Bem (2/3)", 6, "13:00", "15:00", COLORS.hackers);
      adicionarAtividade("Academia", 6, "15:30", "17:30", COLORS.gym);
      adicionarAtividade("Hackers do Bem (3/3)", 6, "19:00", "21:00", COLORS.hackers);

      // --- DOMINGO (Dia 7) - 3 Blocos ---
      adicionarAtividade("Cardio", 7, "08:00", "09:30", COLORS.cardio);
      adicionarAtividade("Hackers do Bem (1/3)", 7, "10:00", "12:00", COLORS.hackers);
      adicionarAtividade("Hackers do Bem (2/3)", 7, "13:00", "15:00", COLORS.hackers);
      // Tarde livre/marmita (15h-19h)
      adicionarAtividade("Hackers do Bem (3/3)", 7, "19:00", "21:00", COLORS.hackers);
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

  // 4. PROGRESSÃO + CHECKBOX
  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const toggleBtn = document.getElementById("toggle-all-workouts-btn");
    const specificWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]",
    );
    function processarProgressao(nome, seriesFeitas, seriesTotais) {
      const nomeLimpo = nome
        .replace(/<[^>]*>/g, "")
        .trim()
        .split("\n")[0]
        .trim();
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
            if (config.cargaTipo === "halter")
              novaCarga =
                Math.floor(novaCarga / config.incremento) * config.incremento;
            else novaCarga = Math.round(novaCarga);
            dados.carga = novaCarga;
            dados.falhas = 0;
          }
        }
      } else if (config.type === "isolador") {
        if (seriesFeitas >= seriesTotais) {
          if (dados.series < config.seriesMax) {
            dados.series++;
          } else {
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
          const lbl = item.querySelector("label").textContent;
          const dots = item.querySelectorAll(".series-dot");
          const done = Array.from(dots).filter((d) =>
            d.classList.contains("completed"),
          ).length;
          const total = dots.length;
          if (total > 0) processarProgressao(lbl, done, total);
        }
      }
    }
    const saved =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    const progressoCargas =
      JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};
    exerciseItems.forEach((item) => {
      const id = item.dataset.exerciseId;
      const labelText = item
        .querySelector("label")
        .textContent.replace(/<[^>]*>/g, "")
        .trim()
        .split("\n")[0]
        .trim();
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

  // 5. HISTÓRICOS (SABOTAGEM / DIÁRIOS)
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
