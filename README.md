📅 Planner Pessoal 2026 - PWA

Um Personal Planner & Tracker desenvolvido como uma Progressive Web App (PWA). Este projeto é um dashboard centralizado e focado em produtividade para gestão de rotina, treinos de musculação, dieta, estudos acadêmicos e transição de carreira.

O aplicativo foi projetado com a filosofia Offline-First, utilizando o LocalStorage do navegador para persistência de dados e Service Workers para garantir o funcionamento completo mesmo sem acesso à internet.

📱 Funcionalidades Principais

O Planner é dividido em pilares estratégicos para abranger todas as áreas do desenvolvimento pessoal:

1. 📅 Agenda Inteligente

Visualização Híbrida: Alterna dinamicamente entre uma lista resumida ("Hoje") em formato de cards interativos e uma grade semanal completa.

Color Coding: Cores específicas e visuais para cada categoria (Expediente, Academia, Estudos, Disciplinas da Faculdade, Reuniões, etc.).

Blocos de Tempo: Renderização visual precisa baseada nos horários de início e fim de cada atividade.

Gestão de Tarefas Diárias: Checklists rápidos com foco no dia atual e painéis para pendências, focos e datas importantes.

2. 💪 Treino (Foco em Força e Hipertrofia)

Rotina Híbrida Avançada: Divisão estratégica misturando Push/Pull/Legs com Fullbody e foco em progressão (Força vs. Hipertrofia). Inclui blocos diários de Mobilidade Pélvica e Core.

Progressão Automática de Carga: Lógica algorítmica (via JavaScript) que sugere aumento de carga ou repetições baseada no sucesso das séries e falhas do treino anterior.

Contador de Séries Tátil: Marcadores visuais interativos (bolinhas) para controlar o volume e a execução de cada série durante o treino.

Histórico e Persistência Local: Salva automaticamente quais exercícios foram concluídos, as cargas exatas utilizadas e reseta a rotina diariamente.

3. 🥗 Dieta & Nutrição

Plano Estratégico (1.800 kcal): Cardápio focado em flexibilidade e preservação de massa magra, dividido em 5 módulos (Café, Almoço, Pré-Treino, Pós-Treino e Ceia).

Opções Modulares: Visualização limpa e vertical com escolhas dinâmicas de carboidratos, proteínas e digestivos em cada refeição.

Lista de Compras Inteligente: Resumo semanal quantificado para facilitar a ida ao supermercado.

4. 🚀 Roadmap de Carreira (Data Science)

Trilha de Estudo: Acompanhamento prático focado em Python, SQL, Power BI e Engenharia de Dados.

Gamificação: Barra de progresso visual baseada em tópicos concluídos para manter a motivação na transição de carreira.

🛠️ Tecnologias Utilizadas

O projeto foi construído sem frameworks pesados, focando em performance e simplicidade:

HTML5 Semântico: Estruturação lógica e acessível das seções.

CSS3 Moderno:

Uso intenso de Variáveis CSS (:root) para temas, paletas e consistência.

Layouts complexos gerenciados com CSS Grid e Flexbox.

Dark Mode Nativo: Interface de alto contraste focado no conforto visual (#121212 e superfícies em cinza escuro).

Design totalmente Responsivo (Mobile-First adaptativo).

Vanilla JavaScript (ES6+):

Manipulação ágil do DOM.

Lógica matemática de renderização da agenda e progressão de treino.

Gestão de estado 100% Client-Side via localStorage.

PWA (Progressive Web App):

Estratégia de Cache Stale-While-Revalidate via Service Worker.

manifest.json configurado para instalação nativa na tela inicial (Android/iOS).

🚀 Como Executar o Projeto

Como é um projeto estático (Client-Side Rendered), você pode rodá-lo através de qualquer servidor HTTP simples ou hospedá-lo gratuitamente na nuvem.

Opção 1: Rodando Localmente

Clone este repositório.

Abra a pasta do projeto no seu editor de código (ex: VS Code).

Utilize a extensão "Live Server" para simular um servidor HTTP real (necessário para registrar o Service Worker corretamente).

O app abrirá no seu navegador, geralmente na porta :5500.

Opção 2: Hospedagem Gratuita (GitHub Pages)

Suba os arquivos para um repositório no seu GitHub.

Vá em Settings > Pages.

Selecione a branch main (ou master) e salve.

O site estará disponível em https://seu-usuario.github.io/seu-repositorio.

📲 Instalação no Celular (Modo App)

Para ter a experiência completa de aplicativo (tela cheia, funcionamento offline, ícone nativo):

Acesse o link de produção do projeto pelo navegador do celular (Chrome no Android, Safari no iOS).

Abra o menu de opções do navegador.

Selecione "Adicionar à Tela Inicial" (ou "Instalar Aplicativo").

Pronto! O ícone aparecerá na sua gaveta de aplicativos como um App nativo.

🎨 Design System

O projeto utiliza uma paleta de cores estritamente escura para proporcionar conforto visual (redução de fadiga ocular) e garantir máxima economia de bateria em dispositivos com telas OLED/AMOLED.

🌑 Background Principal: #121212

🌚 Surface (Cards/Componentes): #1e1e1e (Mobile) / #1a1a1a (Desktop)

🔴 Destaque Treino: #e74c3c

🟢 Destaque Dieta: #4caf50

🟣 Destaque Carreira: #9b59b6

🔵 Destaque Agenda/Faculdade: Tons variados em azul e roxo (ex: #38bdf8, #a78bfa)
