// --- SCRIPT DE NAVEGAÇÃO E LÓGICA GERAL ---
function showSection(sectionId) {
  document.querySelectorAll(".content-section").forEach((s) => s.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("active"));
  const btn = document.querySelector(`.tab-button[onclick="showSection('${sectionId}')"]`);
  if (btn) btn.classList.add("active");
  const section = document.getElementById(sectionId);
  if (section) section.classList.add("active");
}

// =============================================================
// CONFIGURAÇÃO DOS EXERCÍCIOS
// =============================================================
const EXERCICIOS_CONFIG = {
  // ── CORE / ABDÔMEN (Reabilitação — único exercício permitido) ─────────────────
  "🌀 Stomach Vacuum":                          { type: "isolador", cargaTipo: "corpo",   incremento: 0,   seriesMax: 4, seriesMin: 4 },
  "⬆️ Abdominal Superior — Crunch na Polia Alta": { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },
  "⬇️ Abdominal Inferior — Elevação de Joelhos na Cadeira Romana": { type: "isolador", cargaTipo: "corpo", incremento: 0, seriesMax: 3, seriesMin: 3 },
  "📏 Lombar — Extensão Lombar na Máquina":     { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },

  // ── PUSH (Domingo) ──────────────────────────────────────────────────────────
  "🪑 Supino Sentado Máquina":                  { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦋 Voador Máquina":                          { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },
  "🆙 Desenvolvimento Máquina":                 { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🥥 Elevação Lateral Polia Baixa":            { type: "isolador", cargaTipo: "maquina", incremento: 1,   seriesMax: 3, seriesMin: 3 },
  "⏬ Tríceps Pulley":                          { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },
  "🪜 Tríceps Corda":                           { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },

  // ── PULL (Segunda) ──────────────────────────────────────────────────────────
  "⏫ Puxada Alta Frente":                      { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🚣 Remada Sentada Máquina (Neutra)":         { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦅 Crucifixo Inverso Máquina":               { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦾 Rosca Direta Polia Baixa":                { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },
  "🔨 Rosca Martelo Halteres (leves)":          { type: "isolador", cargaTipo: "halter",  incremento: 1,   seriesMax: 3, seriesMin: 3 },
  "📏 Extensão Lombar Banco (peso do corpo)":   { type: "isolador", cargaTipo: "corpo",   incremento: 0,   seriesMax: 3, seriesMin: 3 },
  "🤜 Rosca de Punho c/ Halteres (Antebraço)":  { type: "isolador", cargaTipo: "halter",  incremento: 1,   seriesMax: 3, seriesMin: 3 },
  "🔄 Rosca Inversa de Punho (Antebraço)":      { type: "isolador", cargaTipo: "halter",  incremento: 1,   seriesMax: 3, seriesMin: 3 },

  // ── LEGS (Terça) ────────────────────────────────────────────────────────────
  "🦿 Leg Press 45º (pés no meio)":             { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦵 Cadeira Extensora":                       { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🛌 Cadeira Flexora":                         { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "👐 Cadeira Abdutora":                        { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦶 Panturrilha Leg Press":                   { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 4, seriesMin: 4 },

  // ── UPPER (Quinta) ──────────────────────────────────────────────────────────
  "📐 Supino Inclinado com Halteres (ou Barra)": { type: "composto", cargaTipo: "halter",  incremento: 2,   seriesMax: 3, seriesMin: 3 },
  "🔺 Puxada Alta Triângulo":                   { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦖 Remada Curvada Halteres (apoiado no banco)": { type: "composto", cargaTipo: "halter", incremento: 2, seriesMax: 3, seriesMin: 3 },
  "🥥 Elevação Lateral Halter":                 { type: "isolador", cargaTipo: "halter",  incremento: 1,   seriesMax: 3, seriesMin: 3 },
  "🔱 Tríceps Francês Polia":                   { type: "isolador", cargaTipo: "maquina", incremento: 2.5, seriesMax: 3, seriesMin: 3 },
  "💪 Rosca Alternada Halter":                  { type: "isolador", cargaTipo: "halter",  incremento: 1,   seriesMax: 3, seriesMin: 3 },

  // ── LOWER (Sexta) ───────────────────────────────────────────────────────────
  "🛌 Mesa Flexora":                            { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🦿 Leg Press 45º (pés altos)":               { type: "composto", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🍑 Elevação Pélvica com Barra (no chão)":    { type: "composto", cargaTipo: "barra",   incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "👐 Cadeira Abdutora (tronco inclinado)":     { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 3, seriesMin: 3 },
  "🪑 Panturrilha Sentado (Solear)":            { type: "isolador", cargaTipo: "maquina", incremento: 5,   seriesMax: 4, seriesMin: 4 },
};

// =============================================================
// PALETA DE CORES
// =============================================================
const COLORS = {
  cardio:               "#f87171",
  expediente:           "#38bdf8",
  academia:             "#4ade80",
  estudos_independentes:"#60a5fa",
  fac_aoo:              "#a78bfa",
  fac_soc:              "#fb923c",
  fac_eletri:           "#f472b6",
  fac_poo:              "#34d399",
  fac_modelagem:        "#facc15",
  reuniao_liga:         "#f59e0b",
  reuniao_nite:         "#ef4444",
  reuniao_liau:         "#eab308",
  terreiro:             "#e5e7eb",
};

// =============================================================
// DOMContentLoaded
// =============================================================
document.addEventListener("DOMContentLoaded", function () {
  const hoje = new Date();
  const ano  = hoje.getFullYear();
  const mes  = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia  = String(hoje.getDate()).padStart(2, "0");
  const dataFormatada = `${ano}-${mes}-${dia}`;

  // RESET DIÁRIO AUTOMÁTICO DOS TREINOS
  const lastVisit = localStorage.getItem("last_app_visit_date");
  if (lastVisit && lastVisit !== dataFormatada) {
    const savedProgress = JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    for (const key in savedProgress) {
      savedProgress[key].done = false;
      if (savedProgress[key].series)
        savedProgress[key].series = savedProgress[key].series.map(() => false);
    }
    localStorage.setItem("workout_progress_v2026", JSON.stringify(savedProgress));
  }
  localStorage.setItem("last_app_visit_date", dataFormatada);

  // ===========================================================
  // AGENDA
  // ===========================================================
  if (document.getElementById("agenda")) {
    const agendaGrid       = document.getElementById("agenda");
    const listaHoje        = document.getElementById("lista-atividades-hoje");
    const tituloHoje       = document.getElementById("titulo-dia-hoje");
    const toggleBtn        = document.getElementById("toggle-agenda-view-btn");
    const gradeWrapper     = document.getElementById("agenda-grade-wrapper");
    const containerHoje    = document.getElementById("agenda-hoje-container");
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
            setTimeout(() => gradeWrapper.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
          }
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
    const diasNomes = ["", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    if (tituloHoje) tituloHoje.textContent = `Agenda de: ${diasNomes[diaSemana]}`;
    if (listaHoje) listaHoje.innerHTML = "";

    const HORA_INICIO  = 6;
    const HORA_FIM     = 24;
    const ALTURA_HORA  = 80;

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
        e.textContent = o === 24 ? "00:00" : `${o.toString().padStart(2, "0")}:00`;
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
        o.style.gridRow = "2 / 21";
        agendaGrid.appendChild(o);
      }
    }

    let atividadesHoje = [];

    function adicionarAtividade(nome, diaIndex, horaInicio, horaFim, cor) {
      let [hIni, mIni] = horaInicio.split(":").map(Number);
      let [hFim, mFim] = horaFim.split(":").map(Number);
      let topo       = hIni + mIni / 60;
      let fimDecimal = hFim + mFim / 60;
      if (hFim === 0 && mFim === 0) fimDecimal = 24;
      if (fimDecimal < topo) fimDecimal = 24;
      let duracao = fimDecimal - topo;

      function renderBloco(topPos, durationTime) {
        const bloco = document.createElement("div");
        bloco.className = "atividade-bloco";
        bloco.style.top             = `${(topPos - HORA_INICIO) * ALTURA_HORA}px`;
        bloco.style.height          = `${durationTime * ALTURA_HORA}px`;
        bloco.style.backgroundColor = cor;
        bloco.style.zIndex          = durationTime < 1 ? "15" : "10";
        bloco.innerHTML = `<strong style="display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${nome}</strong><span style="font-size:0.9em; opacity:0.9;">${horaInicio}-${horaFim}</span>`;

        const coluna = agendaGrid.querySelector(`.coluna-dia[data-dia-index='${diaIndex}']`);
        if (coluna) coluna.appendChild(bloco);
      }

      if (topo >= HORA_INICIO && topo < HORA_FIM) renderBloco(topo, duracao);

      if (diaIndex === diaSemana)
        atividadesHoje.push({
          nome,
          horaInicio,
          horaFim,
          cor,
          taskId: `task_${diaIndex}_${nome.replace(/\s/g, "")}_${horaInicio.replace(":", "")}`,
        });
    }

    gerarGrade();
    carregarRotinaSemestre();

    function carregarRotinaSemestre() {
      // Segunda, Terça, Quinta, Sexta — padrão de expediente + treino
      // Split: Domingo=Push, Segunda=Pull, Terça=Legs, Quinta=Upper, Sexta=Lower
      const diasExpediente = [1, 2, 4, 5];
      const splitMusculacao = { 1: "Pull", 2: "Legs", 4: "Upper", 5: "Lower" };
      diasExpediente.forEach((d) => {
        adicionarAtividade("🏃 Cardio",  d, "07:00", "08:00", COLORS.cardio);
        adicionarAtividade("💼 Expediente (SENAI Cimatec)", d, "09:00", "15:00", COLORS.expediente);
        adicionarAtividade(`🏋️ Musculação (${splitMusculacao[d]})`, d, "15:30", "17:30", COLORS.academia);
      });

      // Estudos Independentes — Segunda, Terça e Sexta (Quinta tem Reunião NITE no lugar)
      [1, 2, 5].forEach((d) => {
        adicionarAtividade("📚 Estudos Independentes", d, "17:30", "18:30", COLORS.estudos_independentes);
      });

      // Quinta — Reunião NITE no lugar do bloco de estudos
      adicionarAtividade("🤝 Reunião NITE", 4, "17:00", "19:00", COLORS.reuniao_nite);

      adicionarAtividade("🎓 Análise Orientada a Objetos (Sala 512)",            1, "19:00", "22:35", COLORS.fac_aoo);
      adicionarAtividade("🎓 Arquitetura, Org. de Computadores e SO (Sala 512)", 2, "19:00", "22:35", COLORS.fac_soc);
      adicionarAtividade("🎓 Eletricidade e Propagações (Sala 512)",            4, "19:00", "22:35", COLORS.fac_eletri);
      adicionarAtividade("🎓 POO (Sala 512)",                                   5, "19:00", "22:35", COLORS.fac_poo);

      // Quarta — só Cardio; expediente normal; sem musculação e sem faculdade; Terreiro à tarde
      adicionarAtividade("🏃 Cardio",   3, "07:00", "08:00", COLORS.cardio);
      adicionarAtividade("💼 Expediente (SENAI Cimatec)",  3, "09:00", "15:00", COLORS.expediente);
      adicionarAtividade("🕊️ Terreiro",                    3, "15:00", "23:59", COLORS.terreiro);

      // Sábado — faculdade virtual pela manhã, Terreiro
      adicionarAtividade("🎓 Modelagem e Simulação Matemática (Virtual)", 6, "08:00", "10:00", COLORS.fac_modelagem);
      adicionarAtividade("🕊️ Terreiro",                                   6, "13:00", "23:59", COLORS.terreiro);

      // Domingo — sem cardio; academia abre às 11h; Push
      adicionarAtividade("🤝 Reunião da Liga",     7, "10:00", "11:00", COLORS.reuniao_liga);
      adicionarAtividade("🏋️ Musculação (Push)", 7, "11:00", "13:00", COLORS.academia);
    }

    atividadesHoje.sort((a, b) =>
      parseInt(a.horaInicio.replace(":", "")) - parseInt(b.horaInicio.replace(":", ""))
    );
    atividadesHoje.forEach((atividade) => {
      const idUnico = `list_today_${atividade.taskId}`;
      if (document.getElementById(idUnico)) return;
      const card = document.createElement("div");
      card.id = idUnico;
      card.className = "today-activity-card";
      card.style.borderLeftColor = atividade.cor;
      if (localStorage.getItem(atividade.taskId) === "done") card.classList.add("completed");
      card.onclick = function () {
        this.classList.toggle("completed");
        localStorage.setItem(atividade.taskId, this.classList.contains("completed") ? "done" : "");
      };
      card.innerHTML = `<div class="today-activity-info"><h4>${atividade.nome}</h4><div class="today-activity-time">🕒 ${atividade.horaInicio} - ${atividade.horaFim}</div></div><div style="font-size: 1.5em; opacity: 0.5;">✅</div>`;
      listaHoje.appendChild(card);
    });
    if (listaHoje.children.length === 0)
      listaHoje.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Dia Livre!</p>';
  }

  // ===========================================================
  // TREINO — PROGRESSÃO + CHECKBOX + HISTÓRICO
  // ===========================================================
  if (document.getElementById("treino-section")) {
    const exerciseItems         = document.querySelectorAll(".exercise-item");
    const toggleBtn             = document.getElementById("toggle-all-workouts-btn");
    const specificWorkoutBlocks = document.querySelectorAll(".workout-day[data-day-index]");

    function getCleanExerciseName(item) {
      const label = item.querySelector("label");
      if (!label) return "";
      return label.innerHTML.split("<br>")[0].replace(/<[^>]*>/g, "").trim();
    }

    function processarProgressao(nomeLimpo, seriesFeitas, seriesTotais) {
      const config = EXERCICIOS_CONFIG[nomeLimpo];
      if (!config) return;
      let progresso = JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};
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
            dados.carga = config.cargaTipo === "halter"
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
    }

    if (toggleBtn) {
      toggleBtn.onclick = () => {
        showAll = !showAll;
        toggleBtn.textContent = showAll ? "Ver Treino do Dia" : "Ver Todos os Treinos";
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
          const wi = i.querySelector(".weight-input");
          const weightToSave = (wi?.dataset.userTyped === "true") ? (wi.value ?? "") : (saved[id]?.weight ?? "");
          data[id] = {
            done:   cb.checked,
            weight: weightToSave,
            series: Array.from(i.querySelectorAll(".series-dot")).map((d) =>
              d.classList.contains("completed")
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
          const done  = Array.from(dots).filter((d) => d.classList.contains("completed")).length;
          const total = dots.length;
          if (total > 0) processarProgressao(nomeLimpo, done, total);
        }
      }
    }

    const saved           = JSON.parse(localStorage.getItem("workout_progress_v2026")) || {};
    const progressoCargas = JSON.parse(localStorage.getItem("frog_progresso_cargas")) || {};

    exerciseItems.forEach((item) => {
      const id        = item.dataset.exerciseId;
      const labelText = getCleanExerciseName(item);
      let seriesCount = 3;
      if (progressoCargas[labelText]?.series)
        seriesCount = progressoCargas[labelText].series;
      else {
        const m = item.querySelector("small")?.textContent.match(/(\d+)\s*séries/i);
        seriesCount = m ? parseInt(m[1]) : 3;
      }

      const smallTag = item.querySelector("small");
      if (smallTag) {
        smallTag.innerHTML = smallTag.innerHTML.replace(/\d+\s*séries/i, seriesCount + " séries");
      }

      const counter = item.querySelector(".series-counter");
      if (counter && seriesCount > 0) {
        counter.innerHTML = "";
        for (let i = 0; i < seriesCount; i++) {
          const dot = document.createElement("div");
          dot.className = "series-dot";
          if (saved[id]?.series?.[i]) dot.classList.add("completed");
          dot.onclick = () => { dot.classList.toggle("completed"); saveWorkout(false, null); };
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
        if (saved[id]?.weight !== undefined && saved[id].weight !== "") {
          wi.value = saved[id].weight;
          wi.dataset.userTyped = "true";
        } else if (progressoCargas[labelText]?.carga > 0) {
          wi.value = progressoCargas[labelText].carga;
          wi.dataset.userTyped = "false";
        }
      }
      cb?.addEventListener("change", () => saveWorkout(true, item));
      wi?.addEventListener("input", () => {
        if (wi) wi.dataset.userTyped = "true";
        saveWorkout(false, null);
      });
    });

    updateVisibility();

    document.querySelectorAll(".reset-button").forEach((btn) => {
      btn.onclick = function () {
        const c = this.closest(".workout-day");
        c.querySelectorAll(".exercise-checkbox").forEach((x) => (x.checked = false));
        c.querySelectorAll(".exercise-item").forEach((x) => x.classList.remove("completed"));
        c.querySelectorAll(".series-dot").forEach((x) => x.classList.remove("completed"));
        saveWorkout(false, null);
      };
    });

    document.querySelectorAll(".finish-workout-btn").forEach((btn) => {
      btn.onclick = function () {
        const p = this.closest(".workout-day");
        const h = p.querySelector(".workout-hint");
        const d = p.getAttribute("data-day-name");
        localStorage.setItem(`last_workout_${d}`, new Date().toLocaleDateString());
        p.querySelectorAll(".exercise-checkbox").forEach((x) => (x.checked = false));
        p.querySelectorAll(".exercise-item").forEach((x) => x.classList.remove("completed"));
        p.querySelectorAll(".series-dot").forEach((x) => x.classList.remove("completed"));
        saveWorkout(false, null);
        if (h) {
          h.textContent = `Treino de ${d} registrado!`;
          h.style.color = "#4caf50";
          setTimeout(() => (h.textContent = ""), 3000);
        }
      };
    });
  }

  // ===========================================================
  // DIETA — SUPLEMENTAÇÃO (PERSISTÊNCIA SIMPLES)
  // ===========================================================
  const boxSuplementos = document.getElementById("box-suplementos");
  if (boxSuplementos) {
    boxSuplementos.value = localStorage.getItem("box_suplementos") || "";
    boxSuplementos.addEventListener("input", () => {
      localStorage.setItem("box_suplementos", boxSuplementos.value);
    });
  }

});
