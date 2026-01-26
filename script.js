// --- SCRIPT DE NAVEGAÇÃO E LÓGICA ---
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

  const adminBtn = document.getElementById("admin-history");
  if (adminBtn) {
    if (sectionId === "treino-section") {
      adminBtn.style.display = "block";
    } else {
      adminBtn.style.display = "none";
    }
  }
}

// CONFIGURAÇÃO DOS EXERCÍCIOS
const EXERCICIOS_CONFIG = {
  // --- PUSH ---
  "💥 Supino com Halteres": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 50,
  },
  "📐 Supino Inclinado (Halteres)": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 50,
  },
  "⚙️ Supino Sentado Máquina": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "🦅 Crucifixo na Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🙅‍♂️ Crossover na Polia (Alto → Baixo)": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🆙 Desenvolvimento Halteres": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🥥 Elevação Lateral": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "↕️ Elevação Frontal": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🔱 Tríceps Testa (Barra EZ)": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🪜 Tríceps Mergulho Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 4,
  },

  // --- PULL ---
  "🧗 Barra Fixa no Graviton": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 100,
  },
  "🚣 Remada Curvada (Barra)": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 4,
    cargaMax: 120,
  },
  "🪚 Remada Unilateral (Halter)": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 60,
  },
  "⏬ Puxada Neutra Máquina": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 5,
    cargaMax: 120,
  },
  "🦾 Rosca Direta (Barra)": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🧠 Rosca Concentrada": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🔨 Rosca Martelo": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🔄 Rosca Inversa (Barra EZ)": {
    type: "isolador",
    cargaTipo: "barra",
    incremento: 2,
    seriesMax: 6,
    seriesMin: 4,
  },
  "👺 Face Pull na Polia": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 2.5,
    seriesMax: 4,
    seriesMin: 4,
  },

  // --- LEGS ---
  "🏋️‍♂️ Agachamento com Barra": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 200,
  },
  "⚙️ Hack Machine": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 10,
    cargaMax: 300,
  },
  "🦶 Leg Press": {
    type: "composto",
    cargaTipo: "maquina",
    incremento: 10,
    cargaMax: 400,
  },
  "🇧🇬 Afundo Búlgaro": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🍑 Elevação Pélvica (Barra)": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 200,
  },
  "🦵 Cadeira Extensora": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🏗️ RDL (Terra Romeno)": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 200,
  },
  "📏 Stiff com Barra": {
    type: "composto",
    cargaTipo: "barra",
    incremento: 5,
    cargaMax: 150,
  },
  "🚶 Passada Longa (Halteres)": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 40,
  },
  "🛌 Mesa Flexora": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 4,
  },
  "👐 Abdutor na Máquina": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 5,
    seriesMax: 6,
    seriesMin: 4,
  },

  // --- NOVOS ADICIONADOS (ANTEBRAÇO & ABS) ---
  "🍫 Abdominal Supra Curto (Crunch)": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 0,
    seriesMax: 6,
    seriesMin: 4,
  },
  "🏗️ Abdominal Infra Pendurado (Barra)": {
    type: "isolador",
    cargaTipo: "maquina",
    incremento: 0,
    seriesMax: 6,
    seriesMin: 4,
  },
  "✊ Flexão de Punho (Halteres)": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 1,
    seriesMax: 5,
    seriesMin: 4,
  },
  "🖐️ Extensão de Punho (Halteres)": {
    type: "isolador",
    cargaTipo: "halter",
    incremento: 1,
    seriesMax: 5,
    seriesMin: 3,
  },
  "🧗 Sustentação Isométrica (Halteres)": {
    type: "composto",
    cargaTipo: "halter",
    incremento: 2,
    cargaMax: 100,
  },
};

// --- PALETA DE CORES EXCLUSIVA ---
const COLORS = {
  sono: "#2f3542",
  cardio: "#ff4757",
  gym: "#2ed573",
  almoco: "#ffa502",
  refeicao: "#eccc68",
  livre: "#747d8c",

  conc_port: "#d35400",
  conc_matfin: "#8e44ad",
  conc_bancario: "#27ae60",
  conc_vendas: "#c0392b",
  conc_info: "#2980b9",
  conc_estat: "#7f8c8d",
  conc_redacao: "#e84393",

  fac_metodos: "#1abc9c",
  fac_jogos: "#9b59b6",
  fac_calculo: "#3498db",
  fac_web: "#00cec9",
  fac_estrut: "#6c5ce7",
  fac_algo: "#fd79a8",
  fac_sist: "#0984e3",
  carreira: "#fdcb6e",
};

const DATA_INICIO_AULAS = new Date("2026-02-09T00:00:00");
const DATA_FIM_CURTAS = new Date("2026-04-25T00:00:00");

document.addEventListener("DOMContentLoaded", function () {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataFormatada = `${ano}-${mes}-${dia}`;

  // --- LÓGICA DE RESET AUTOMÁTICO (ANTI-ESQUECIMENTO) ---
  const lastVisit = localStorage.getItem("last_app_visit_date");

  // Se for um novo dia (visitou ontem e hoje abriu de novo)
  if (lastVisit && lastVisit !== dataFormatada) {
    const savedProgress =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    let trainedYesterday = false;

    // Verifica se houve PELO MENOS UM exercício marcado
    for (const key in savedProgress) {
      if (savedProgress[key].done === true) {
        trainedYesterday = true;
        break;
      }
    }

    // SÓ REGISTRA SE TIVER ALGO MARCADO
    if (trainedYesterday) {
      let historico = JSON.parse(localStorage.getItem("frog_admin_log")) || [];
      historico.push({
        data: lastVisit, // Registra na data da última visita (ontem/anteontem)
        ex: "AUTO",
        carga: "-",
        s: "-",
        msg: "Treino Auto-Finalizado (Esquecimento)",
        up: true,
      });
      localStorage.setItem("frog_admin_log", JSON.stringify(historico));
    }

    // RESET LIMPO (Mantém Cargas)
    for (const key in savedProgress) {
      savedProgress[key].done = false;
      // Zera as séries (todas false)
      if (savedProgress[key].series) {
        savedProgress[key].series = savedProgress[key].series.map(() => false);
      }
    }
    localStorage.setItem(
      "workout_progress_v2026",
      JSON.stringify(savedProgress),
    );
  }

  // Atualiza a data da última visita para hoje
  localStorage.setItem("last_app_visit_date", dataFormatada);

  const inputSonho = document.getElementById("dream-journal-date");
  const inputNota = document.getElementById("journal-date");
  if (inputSonho) inputSonho.value = dataFormatada;
  if (inputNota) inputNota.value = dataFormatada;

  const adminBtn = document.getElementById("admin-history");
  if (adminBtn) adminBtn.style.display = "none";

  // REMOVENDO BLOCOS DE CARDIO (SOMENTE CARDIO)
  // CORE A e CORE B são RESTAURADOS
  const elementsToHide = [
    "cardio-block",
    "cardio-tracker-container",
    "cardio-daily-container",
  ];

  elementsToHide.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const trackerContainer = document.querySelector(".cardio-tracker-container");
  if (trackerContainer) trackerContainer.style.display = "none";

  const containerAgenda = document.querySelector("#agenda-section .container");
  if (containerAgenda) {
    const btnPreview = document.createElement("button");
    btnPreview.id = "btn-preview-rotina";
    btnPreview.textContent = "👁️ Ver Semestre";
    btnPreview.className = "toggle-btn";
    btnPreview.style.marginBottom = "10px";
    btnPreview.style.fontSize = "0.8em";
    btnPreview.style.padding = "5px 10px";
    btnPreview.style.backgroundColor = "#333";

    const divBotoes = containerAgenda.querySelector(
      "div[style*='text-align: center']",
    );
    if (divBotoes) divBotoes.insertBefore(btnPreview, divBotoes.firstChild);

    btnPreview.onclick = () => {
      const estadoAtual = localStorage.getItem("preview_mode") === "true";
      localStorage.setItem("preview_mode", !estadoAtual);
      location.reload();
    };

    if (localStorage.getItem("preview_mode") === "true") {
      btnPreview.style.backgroundColor = "#e74c3c";
      btnPreview.textContent = "❌ Sair do Preview";
    }
  }

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
        } else {
          gradeWrapper.classList.add("hidden-workout");
          containerHoje.classList.remove("hidden-workout");
          wrapperPrincipal.classList.remove("agenda-layout-full");
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

    const HORA_INICIO = 0;
    const HORA_FIM = 24;
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
      for (let o = HORA_INICIO; o < HORA_FIM; o++) {
        const e = document.createElement("div");
        e.className = "grid-item celula-hora";
        e.textContent = `${o.toString().padStart(2, "0")}:00`;
        e.style.gridRow = `${o - HORA_INICIO + 2}`;
        agendaGrid.appendChild(e);
      }
      for (let e = 0; e < 7; e++) {
        const o = document.createElement("div");
        o.className = "coluna-dia";
        o.dataset.diaIndex = e + 1;
        o.style.gridColumn = `${e + 2}`;
        o.style.gridRow = `2 / span ${HORA_FIM - HORA_INICIO}`;
        agendaGrid.appendChild(o);
      }
    }

    let atividadesHoje = [];

    function adicionarAtividade(nome, diaIndex, horaInicio, horaFim, cor) {
      let [hIni, mIni] = horaInicio.split(":").map(Number);
      let [hFim, mFim] = horaFim.split(":").map(Number);

      let topo = (hIni * 60 + mIni) / 60;
      let duracao = 0;

      if (hFim < hIni) {
        let duracaoParte1 = (24 * 60 - (hIni * 60 + mIni)) / 60;
        renderBloco(topo, duracaoParte1);
        let duracaoParte2 = (hFim * 60 + mFim) / 60;
        renderBloco(0, duracaoParte2);
      } else {
        duracao = (hFim * 60 + mFim - (hIni * 60 + mIni)) / 60;
        renderBloco(topo, duracao);
      }

      function renderBloco(topPos, durationTime) {
        const bloco = document.createElement("div");
        bloco.className = "atividade-bloco";
        bloco.style.top = `${topPos * ALTURA_HORA}px`;
        bloco.style.height = `${durationTime * ALTURA_HORA}px`;
        bloco.style.backgroundColor = cor;
        bloco.style.zIndex = durationTime < 1 ? "10" : "1";
        bloco.innerHTML = `<strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nome}</strong><span style="font-size:0.9em; opacity:0.9;">${horaInicio}-${horaFim}</span>`;
        const coluna = agendaGrid.querySelector(
          `.coluna-dia[data-dia-index='${diaIndex}']`,
        );
        if (coluna) coluna.appendChild(bloco);
      }

      if (diaIndex === diaSemana) {
        atividadesHoje.push({
          nome: nome,
          horaInicio: horaInicio,
          horaFim: horaFim,
          cor: cor,
          taskId: `task_${diaIndex}_${nome.replace(/\s/g, "")}_${horaInicio.replace(":", "")}`,
        });
      }
    }

    gerarGrade();

    const isPreview = localStorage.getItem("preview_mode") === "true";
    const dataAtual = new Date();

    if (isPreview) {
      carregarRotinaSemestre(true);
    } else {
      if (dataAtual < DATA_INICIO_AULAS) {
        carregarRotinaFerias();
      } else if (
        dataAtual >= DATA_INICIO_AULAS &&
        dataAtual <= DATA_FIM_CURTAS
      ) {
        carregarRotinaSemestre(true);
      } else {
        carregarRotinaSemestre(false);
      }
    }

    // --- ROTINA ATUAL (FÉRIAS) ---
    function carregarRotinaFerias() {
      console.log("Modo Férias");
      for (let d = 1; d <= 7; d++) {
        // SONO REMOVIDO DA GRADE VISUAL

        if (d <= 5) {
          // Seg-Sex
          adicionarAtividade("🏃 Cardio", d, "10:00", "11:00", COLORS.cardio);
          adicionarAtividade("Almoço", d, "13:00", "14:00", COLORS.almoco);

          if (d === 2) {
            adicionarAtividade(
              "💪 Musculação",
              2,
              "15:00",
              "17:00",
              COLORS.gym,
            );
          } else if (d === 5) {
            // Sexta
            adicionarAtividade(
              "💪 Musculação",
              5,
              "16:00",
              "18:00",
              COLORS.gym,
            );
          } else {
            adicionarAtividade(
              "💪 Musculação",
              d,
              "15:00",
              "17:00",
              COLORS.gym,
            );
          }

          // NOITE
          const materias = [
            {
              d: 1,
              m1: "💼 Vendas",
              c1: COLORS.conc_vendas,
              m2: "📚 Português",
              c2: COLORS.conc_port,
            },
            {
              d: 2,
              m1: "💻 Informática",
              c1: COLORS.conc_info,
              m2: "💰 Mat. Financeira",
              c2: COLORS.conc_matfin,
            },
            {
              d: 3,
              m1: "🏦 C. Bancários",
              c1: COLORS.conc_bancario,
              m2: "💼 Vendas",
              c2: COLORS.conc_vendas,
            },
            {
              d: 4,
              m1: "💻 Informática",
              c1: COLORS.conc_info,
              m2: "📚 Português",
              c2: COLORS.conc_port,
            },
            {
              d: 5,
              m1: "🏦 C. Bancários",
              c1: COLORS.conc_bancario,
              m2: "💼 Vendas",
              c2: COLORS.conc_vendas,
            },
          ];

          materias.forEach((item) => {
            if (item.d === d) {
              if (d === 5) {
                // Sexta Deslocada 1h
                adicionarAtividade(item.m1, d, "19:00", "21:00", item.c1);
                adicionarAtividade(
                  "🍲 Jantar",
                  d,
                  "21:00",
                  "21:30",
                  COLORS.refeicao,
                );
                adicionarAtividade(item.m2, d, "21:30", "23:30", item.c2);
              } else {
                // Seg-Qui
                adicionarAtividade(item.m1, d, "18:00", "20:00", item.c1);
                adicionarAtividade(
                  "🍲 Jantar",
                  d,
                  "20:00",
                  "20:30",
                  COLORS.refeicao,
                );
                adicionarAtividade(item.m2, d, "20:30", "22:30", item.c2);
              }
            }
          });
        } else {
          // FDS
          adicionarAtividade("🏃 Cardio", d, "10:00", "11:30", COLORS.cardio);
          adicionarAtividade("Almoço", d, "13:00", "14:00", COLORS.almoco);
          if (d === 6) {
            adicionarAtividade(
              "💪 Musculação",
              6,
              "16:00",
              "18:00",
              COLORS.gym,
            );
          }
        }
      }
    }

    // --- ROTINA SEMESTRE (09/02+) ---
    function carregarRotinaSemestre(isFase1) {
      console.log(`Rotina Semestre. Fase 1: ${isFase1}`);

      // SEGUNDA
      adicionarAtividade("🏃 Cardio", 1, "07:00", "08:30", COLORS.cardio);
      adicionarAtividade(
        "🎓 M. Matemáticos (P1-312)",
        1,
        "10:15",
        "12:00",
        COLORS.fac_metodos,
      );
      adicionarAtividade("Almoço", 1, "13:00", "14:00", COLORS.almoco);
      adicionarAtividade("💪 Musculação", 1, "15:00", "17:00", COLORS.gym);

      const diasSufoco = isFase1 ? [2, 3, 4, 5] : [2, 4];
      const diasLivres = isFase1 ? [] : [3, 5];

      // TERÇA A SEXTA (Manhã)
      diasSufoco.forEach((d) => {
        // Cardio 05:30 removido. Início direto na aula 07:30.

        if (d === 2) {
          adicionarAtividade(
            "🎓 Jogos Dig. (P1-203)",
            2,
            "07:30",
            "09:10",
            COLORS.fac_jogos,
          );
          adicionarAtividade(
            "🎓 Cálc. V.V. (P1-202)",
            2,
            "09:25",
            "11:05",
            COLORS.fac_calculo,
          );
        }
        if (d === 3) {
          adicionarAtividade(
            "🎓 Desenv. Web (P1-610)",
            3,
            "07:30",
            "11:05",
            COLORS.fac_web,
          );
          adicionarAtividade(
            "🎓 Estruturas (P1-314)",
            3,
            "10:15",
            "12:50",
            COLORS.fac_estrut,
          );
        }
        if (d === 4) {
          adicionarAtividade(
            "🎓 Algoritmos (P1-202)",
            4,
            "07:30",
            "10:15",
            COLORS.fac_algo,
          );
          adicionarAtividade(
            "🎓 Desenv. Web (P1-201)",
            4,
            "09:25",
            "12:50",
            COLORS.fac_web,
          );
        }
        if (d === 5) {
          adicionarAtividade(
            "🎓 Sist. Comp. (P1-210)",
            5,
            "07:30",
            "11:05",
            COLORS.fac_sist,
          );
        }
      });

      diasLivres.forEach((d) => {
        adicionarAtividade("🏃 Cardio", d, "07:00", "08:30", COLORS.cardio);
        if (d === 3) {
          adicionarAtividade(
            "🎓 Estruturas (P1-314)",
            3,
            "10:15",
            "12:50",
            COLORS.fac_estrut,
          );
        }
      });

      // TARDE (QUA/QUI)
      for (let d = 3; d <= 4; d++) {
        adicionarAtividade("Almoço", d, "13:00", "14:00", COLORS.almoco);
        adicionarAtividade("💪 Musculação", d, "14:00", "17:00", COLORS.gym);
      }

      // TERÇA & SEXTA (Estratégia Dias Curtos)
      [2, 5].forEach((d) => {
        adicionarAtividade("🏃 Cardio", d, "12:00", "13:00", COLORS.cardio);
        adicionarAtividade("Almoço", d, "13:00", "14:00", COLORS.almoco);

        if (d === 2) {
          adicionarAtividade("💪 Musculação", 2, "15:00", "17:00", COLORS.gym);
        }
        if (d === 5) {
          adicionarAtividade("💪 Musculação", 5, "16:00", "18:00", COLORS.gym);
        }
      });

      // NOITE PADRONIZADA
      const cronogramaNoite = [
        {
          d: 1,
          m1: "💼 Vendas",
          c1: COLORS.conc_vendas,
          m2: "📚 Português",
          c2: COLORS.conc_port,
        },
        {
          d: 2,
          m1: "💻 Informática",
          c1: COLORS.conc_info,
          m2: "💰 Mat. Financeira",
          c2: COLORS.conc_matfin,
        },
        {
          d: 3,
          m1: "🏦 C. Bancários",
          c1: COLORS.conc_bancario,
          m2: "💼 Vendas",
          c2: COLORS.conc_vendas,
        },
        {
          d: 4,
          m1: "💻 Informática",
          c1: COLORS.conc_info,
          m2: "📊 Estatística",
          c2: COLORS.conc_estat,
        },
        {
          d: 5,
          m1: "🏦 C. Bancários",
          c1: COLORS.conc_bancario,
          m2: "💼 Vendas",
          c2: COLORS.conc_vendas,
        },
      ];

      cronogramaNoite.forEach((item) => {
        if (item.d === 5) {
          // Sexta Deslocada
          adicionarAtividade(item.m1, item.d, "19:00", "21:00", item.c1);
          adicionarAtividade(
            "🍲 Jantar",
            item.d,
            "21:00",
            "21:30",
            COLORS.refeicao,
          );
          adicionarAtividade(item.m2, item.d, "21:30", "23:30", item.c2);
        } else {
          // Seg-Qui
          adicionarAtividade(item.m1, item.d, "18:00", "20:00", item.c1);
          adicionarAtividade(
            "🍲 Jantar",
            item.d,
            "20:00",
            "20:30",
            COLORS.refeicao,
          );
          adicionarAtividade(item.m2, item.d, "20:30", "22:30", item.c2);
        }
      });

      // FIM DE SEMANA
      adicionarAtividade("🏃 Cardio", 6, "08:00", "09:00", COLORS.cardio);
      adicionarAtividade("Almoço", 6, "13:00", "14:00", COLORS.almoco);
      adicionarAtividade("🚀 Roadmap", 6, "14:30", "16:00", COLORS.carreira);
      adicionarAtividade("💪 Musculação", 6, "16:00", "18:00", COLORS.gym);
      adicionarAtividade("🍲 Jantar", 6, "19:00", "20:00", COLORS.refeicao);

      adicionarAtividade("🏃 Cardio", 7, "08:00", "09:30", COLORS.cardio);
      adicionarAtividade("Almoço", 7, "13:00", "14:00", COLORS.almoco);
      adicionarAtividade("🚀 Roadmap", 7, "14:00", "18:00", COLORS.carreira);
      adicionarAtividade("🍲 Jantar", 7, "19:00", "20:00", COLORS.refeicao);
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

  // LÓGICA DO TREINO
  if (document.getElementById("treino-section")) {
    const exerciseItems = document.querySelectorAll(".exercise-item");
    const toggleBtn = document.getElementById("toggle-all-workouts-btn");
    const specificWorkoutBlocks = document.querySelectorAll(
      ".workout-day[data-day-index]",
    );

    // RESTAURADO: Referência aos blocos de CORE A e B
    const coreABlocks = document.getElementById("core-a-block");
    const coreBBlocks = document.getElementById("core-b-block");

    function processarProgressao(nomeExercicioRaw, seriesFeitas, seriesTotais) {
      const nomeLimpo = nomeExercicioRaw
        .replace(/<[^>]*>/g, "")
        .trim()
        .split("\n")[0]
        .trim();
      const config = EXERCICIOS_CONFIG[nomeLimpo];
      if (!config) return;

      let historico = JSON.parse(localStorage.getItem("frog_admin_log")) || [];
      let progresso =
        JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};

      if (!progresso[nomeLimpo]) {
        progresso[nomeLimpo] = { carga: 0, series: seriesTotais, falhas: 0 };
      }

      let dados = progresso[nomeLimpo];
      let subiu = false;
      let mensagem = "";

      if (config.type === "composto") {
        if (seriesFeitas >= seriesTotais) {
          dados.carga = (dados.carga || 0) + config.incremento;
          dados.falhas = 0;
          subiu = true;
          mensagem = `Carga Aumentada (+${config.incremento}kg)`;
        } else {
          dados.falhas++;
          if (dados.falhas >= 2) {
            let novaCarga = dados.carga * 0.9;
            if (config.cargaTipo === "halter") {
              novaCarga =
                Math.floor(novaCarga / config.incremento) * config.incremento;
            } else {
              novaCarga = Math.round(novaCarga);
            }
            dados.carga = novaCarga;
            dados.falhas = 0;
            mensagem = "Deload Aplicado (-10%)";
          }
        }
      } else if (config.type === "isolador") {
        if (seriesFeitas >= seriesTotais) {
          if (
            dados.series < config.seriesMax &&
            config.seriesMax > config.seriesMin
          ) {
            dados.series++;
            mensagem = `Volume Aumentado para ${dados.series} séries`;
          } else {
            dados.carga = (dados.carga || 0) + config.incremento;
            dados.series = config.seriesMin;
            subiu = true;
            mensagem = `Carga Aumentada (+${config.incremento}kg). Reset Séries.`;
          }
        }
      }

      progresso[nomeLimpo] = dados;
      localStorage.setItem("frog_progresso_cargas", JSON.stringify(progresso));

      historico.push({
        data: new Date().toLocaleDateString(),
        ex: nomeLimpo,
        carga: dados.carga,
        s: seriesFeitas,
        msg: mensagem,
        up: subiu,
      });
      localStorage.setItem("frog_admin_log", JSON.stringify(historico));
    }

    let showAll = false;
    function updateVisibility() {
      const today = new Date().getDay() || 7;
      specificWorkoutBlocks.forEach((b) => {
        const idx = parseInt(b.dataset.dayIndex);
        if (showAll || idx === today) b.classList.remove("hidden-workout");
        else b.classList.add("hidden-workout");
      });

      // RESTAURADO: Lógica de alternância do Core
      if (showAll) {
        if (coreABlocks) coreABlocks.classList.remove("hidden-workout");
        if (coreBBlocks) coreBBlocks.classList.remove("hidden-workout");
      } else {
        if (today % 2 !== 0) {
          // Ímpar = A
          if (coreABlocks) coreABlocks.classList.remove("hidden-workout");
          if (coreBBlocks) coreBBlocks.classList.add("hidden-workout");
        } else {
          // Par = B
          if (coreABlocks) coreABlocks.classList.add("hidden-workout");
          if (coreBBlocks) coreBBlocks.classList.remove("hidden-workout");
        }
      }
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

    function saveWorkout(triggeredByCheckbox, exerciseItem) {
      const data = {};
      exerciseItems.forEach((item) => {
        const id = item.dataset.exerciseId;
        const checkbox = item.querySelector(".exercise-checkbox");
        if (id && checkbox) {
          if (checkbox.checked) item.classList.add("completed");
          else item.classList.remove("completed");

          data[id] = {
            done: checkbox.checked,
            weight: item.querySelector(".weight-input")?.value,
            series: Array.from(item.querySelectorAll(".series-dot")).map((d) =>
              d.classList.contains("completed"),
            ),
          };
        }
      });
      localStorage.setItem("workout_progress_v2026", JSON.stringify(data));
      if (triggeredByCheckbox && exerciseItem) {
        const checkbox = exerciseItem.querySelector(".exercise-checkbox");
        if (checkbox.checked) {
          const nomeLabel = exerciseItem.querySelector("label").textContent;
          const seriesDots = exerciseItem.querySelectorAll(".series-dot");
          const seriesFeitas = Array.from(seriesDots).filter((d) =>
            d.classList.contains("completed"),
          ).length;
          const seriesTotais = seriesDots.length;
          if (seriesTotais > 0) {
            processarProgressao(nomeLabel, seriesFeitas, seriesTotais);
          }
        }
      }
    }

    const saved =
      JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    const progressoCargas =
      JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};

    exerciseItems.forEach((item) => {
      const id = item.dataset.exerciseId;
      const counter = item.querySelector(".series-counter");
      const labelText = item
        .querySelector("label")
        .textContent.replace(/<[^>]*>/g, "")
        .trim()
        .split("\n")[0]
        .trim();

      let seriesCount = 3;
      if (progressoCargas[labelText] && progressoCargas[labelText].series) {
        seriesCount = progressoCargas[labelText].series;
      } else {
        const match = item
          .querySelector("small")
          ?.textContent.match(/(\d+)\s*séries/);
        if (!match && item.querySelector("small")?.textContent.includes("Iso"))
          seriesCount = 4;
        else seriesCount = match ? parseInt(match[1]) : 0;
      }

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
        if (
          progressoCargas[labelText] &&
          progressoCargas[labelText].carga > 0
        ) {
          wi.value = progressoCargas[labelText].carga;
        } else if (saved[id]) {
          wi.value = saved[id].weight || "";
        }
      }
      cb?.addEventListener("change", () => saveWorkout(true, item));
      wi?.addEventListener("input", () => saveWorkout(false, null));
    });

    updateVisibility();

    // RESTAURADO: Botão de RESET Manual do Dia
    document.querySelectorAll(".reset-button").forEach((btn) => {
      btn.onclick = function () {
        const container = this.closest(".workout-day");
        container
          .querySelectorAll(".exercise-checkbox")
          .forEach((c) => (c.checked = false));
        container
          .querySelectorAll(".exercise-item")
          .forEach((item) => item.classList.remove("completed"));
        container
          .querySelectorAll(".series-dot")
          .forEach((d) => d.classList.remove("completed"));
        saveWorkout(false, null);
      };
    });

    document.querySelectorAll(".finish-workout-btn").forEach((btn) => {
      btn.onclick = function () {
        const parent = this.closest(".workout-day");
        const hintDiv = parent.querySelector(".workout-hint");
        const dayName = parent.getAttribute("data-day-name");
        localStorage.setItem(
          `last_workout_${dayName}`,
          new Date().toLocaleDateString(),
        );

        parent
          .querySelectorAll(".exercise-checkbox")
          .forEach((c) => (c.checked = false));
        parent
          .querySelectorAll(".exercise-item")
          .forEach((item) => item.classList.remove("completed"));
        parent
          .querySelectorAll(".series-dot")
          .forEach((d) => d.classList.remove("completed"));
        saveWorkout(false, null);

        if (hintDiv) {
          hintDiv.textContent = `Treino de ${dayName} registrado!`;
          hintDiv.style.color = "#4caf50";
          setTimeout(() => (hintDiv.textContent = ""), 3000);
        }
      };
    });

    if (adminBtn) {
      adminBtn.onclick = () => {
        const log = JSON.parse(localStorage.getItem("frog_admin_log")) || [];
        if (log.length === 0) {
          alert("Sem histórico.");
        } else {
          console.table(log);
          alert("Histórico no Console.");
        }
      };
    }
  }

  // --- REZAS NA ABA BEM-ESTAR ---
  if (document.getElementById("bem-estar-section")) {
    const section = document.getElementById("bem-estar-section");
    const container = section.querySelector(".container");

    if (container && !document.getElementById("rezas-container")) {
      const rezasHTML = `
        <div id="rezas-container" class="protocol-card" style="border-left: 5px solid #fff;">
            <h2 style="color: #fff;">📿 Rezas de Alinhamento e Força</h2>
            <div style="display: grid; gap: 15px;">
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">1. Reza de Orí (Alinhamento)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Orí, cabeça que escolhe meu caminho, alinha meus pensamentos ao meu destino. Que eu não confunda desejo com propósito nem aceite trilhas que me afastam de mim. Que minha cabeça reconheça o que é certo e sustente essa escolha até o fim."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">2. Reza de Orí (Despertar)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Orí, desperta em mim o que adormeceu. A coragem de decidir, a força de sustentar e a disciplina de continuar. Que eu não abandone meu destino por medo, cansaço ou distração."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">3. Reza de Orí (Proteção Mental)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Orí, protege minha mente de pensamentos que me sabotam. Que eu não repita padrões que já provaram não servir. Fecha minha cabeça para o que me enfraquece e abre para aquilo que me fortalece e organiza."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">4. Reza a Exu (Caminhos)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Exu, senhor do movimento e da comunicação, organiza meus caminhos. Que eu não desperdice energia em conflitos vazios nem caminhe onde não há crescimento. Abre o que é meu por direito e fecha o que nasce da confusão."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">5. Reza a Ògún (Ação)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Ògún, dá firmeza às minhas atitudes. Corta a procrastinação, a preguiça e a dúvida excessiva. Que minha força seja direcionada e minha ação constante até a conclusão."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">6. Reza a Òṣun (Equilíbrio)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Òṣun, acalma meu coração sem enfraquecer minha postura. Que eu saiba sentir sem me perder e cuidar sem me anular. Dá-me equilíbrio para não reagir no impulso nem endurecer diante da vida."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">7. Reza a Oyá (Mudança)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Oyá, movimenta o que estagnou. Leva o que já cumpriu seu ciclo e fortalece-me para atravessar mudanças sem medo de recomeçar."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">8. Reza a Òbàlúayé (Cura)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Òbàlúayé, cura o que é visível e o que carrego em silêncio. Ensina-me a respeitar meus limites e a compreender o tempo de cada processo."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">9. Reza a Òrúnmìlà (Sabedoria)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Òrúnmìlà, ensina-me a ouvir antes de agir. Que eu não confunda pressa com urgência nem opinião com verdade. Que minhas escolhas nasçam da consciência."</p>
                </details>
                <details style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px;">
                    <summary style="cursor: pointer; font-weight: bold;">10. Reza de Orí (Fechamento)</summary>
                    <p style="margin-top: 10px; font-style: italic;">"Orí, recolhe o aprendizado do dia. Corrige meus excessos, fortalece meus acertos e limpa minha cabeça do que não me pertence. Prepara-me para o amanhã com clareza e direção."</p>
                </details>
            </div>
        </div>`;

      const firstCard = container.querySelector(".protocol-card");
      if (firstCard) {
        firstCard.insertAdjacentHTML("afterend", rezasHTML);
      } else {
        container.innerHTML += rezasHTML;
      }
    }
  }

  // OUTROS MÓDULOS (DIETA, CARREIRA, SABOTAGEM)
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
        const parent = box.closest(".checklist-item");
        if (parent) {
          if (box.checked) parent.classList.add("completed");
          else parent.classList.remove("completed");
        }
      });
    }
    roadmapCheckboxes.forEach((box) => {
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;
      const parent = box.closest(".checklist-item");
      if (parent && isChecked) parent.classList.add("completed");
      box.addEventListener("change", updateRoadmapProgress);
    });
    updateRoadmapProgress();
  }

  if (document.getElementById("dieta-section")) {
    const shoppingChecks = document.querySelectorAll(".shopping-check");
    function saveDietState() {
      shoppingChecks.forEach((box) => {
        localStorage.setItem(box.id, box.checked);
        const parent = box.closest(".checklist-item");
        if (parent) {
          if (box.checked) parent.classList.add("completed");
          else parent.classList.remove("completed");
        }
      });
    }
    shoppingChecks.forEach((box) => {
      const isChecked = localStorage.getItem(box.id) === "true";
      box.checked = isChecked;
      const parent = box.closest(".checklist-item");
      if (parent && isChecked) parent.classList.add("completed");
      box.addEventListener("change", saveDietState);
    });
  }

  window.deleteSabotageItem = function (index, type) {
    if (confirm("Apagar?")) {
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
      li.innerHTML = `<span class="history-content" style="color: #4caf50;">🏆 Vitória: ${winText}</span><button class="delete-btn" onclick="deleteSabotageItem(${index}, 'win')">🗑️</button>`;
      container.appendChild(li);
    });
    list.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "history-item-wrapper";
      li.innerHTML = `<span class="history-content" style="color: #e74c3c;">⚠️ Fuga: ${item.action}</span><button class="delete-btn" onclick="deleteSabotageItem(${index}, 'sab')">🗑️</button>`;
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
    if (confirm("Apagar?")) {
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
      div.innerHTML = `<div class="history-content"><div style="font-size:0.8em; color:#a0a0a0;">${item.date} - 🌙 Sonho</div><div>${item.text}</div></div><button class="delete-btn" onclick="deleteJournalItem(${index}, 'dream')">🗑️</button>`;
      container.appendChild(div);
    });
    notes.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "history-item-wrapper";
      div.style.borderBottom = "1px solid #333";
      div.style.marginBottom = "10px";
      div.innerHTML = `<div class="history-content"><div style="font-size:0.8em; color:#a0a0a0;">${item.date} - 📓 Nota</div><div>${item.text}</div></div><button class="delete-btn" onclick="deleteJournalItem(${index}, 'note')">🗑️</button>`;
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
