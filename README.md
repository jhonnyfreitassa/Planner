📅 Planner Pessoal 2026 - PWA
Um Personal Planner & Tracker desenvolvido como uma Progressive Web App (PWA). Este projeto é um dashboard centralizado para gestão de rotina, treinos de musculação, dieta, estudos (Concurso/Faculdade) e transição de carreira para Ciência de Dados.

O aplicativo foi projetado com filosofia Offline-First, utilizando LocalStorage para persistência de dados e Service Workers para funcionamento sem internet.

📱 Funcionalidades Principais
O Planner é dividido em 5 pilares estratégicos:

1. 📅 Agenda Inteligente
Visualização Híbrida: Alterna entre uma lista resumida ("Hoje") em formato de cards e uma grade semanal completa.

Color Coding: Cores específicas para cada categoria (Cardio, Faculdade, Concurso, Trabalho, etc.).

Blocos de Tempo: Renderização dinâmica baseada em horário de início e fim.

2. 💪 Treino (Bodybuilding Focus)
Rotina PPL: Divisão Push/Pull/Legs + Abdômen e Mobilidade diária.

Progressão de Carga: Lógica automática que sugere aumento de carga ou repetições com base no desempenho anterior.

Contador de Séries: Marcadores visuais (bolinhas) para controlar o volume de treino.

Histórico Local: Salva quais exercícios foram concluídos e as cargas utilizadas.

3. 🥗 Dieta & Nutrição
Plano Cutting: Cardápio focado em preservação de massa magra (~1.700 kcal).

Checklist de Refeições: Visualização vertical limpa com horários e macros.

Lista de Compras: Checklist interativo para supermercado semanal.

4. 🧘 Bem-estar & Mentalidade
Protocolos: Ferramentas estoicas e espirituais para alinhamento diário.

Anti-Autossabotagem: Registro de micro-vitórias e monitoramento de gatilhos de fuga.

Diários: Espaço para anotação de sonhos e pensamentos diários.

5. 🚀 Roadmap de Carreira (Data Science)
Gamificação: Barra de progresso visual baseada em tópicos concluídos.

Trilha de Estudo: Python, SQL, Power BI, Engenharia de Dados e Projetos Práticos.

🛠️ Tecnologias Utilizadas
HTML5 Semântico: Estrutura das seções.

CSS3 Moderno:

Variáveis CSS (:root) para temas e cores.

Grid & Flexbox: Para layouts complexos e responsivos.

Dark Mode Nativo: Interface com alto contraste (#121212 e cinzas).

Design Responsivo: Layout adaptativo que transforma tabelas e grades em Cards para melhor experiência mobile.

Vanilla JavaScript (ES6+):

Manipulação de DOM.

Lógica de renderização da agenda.

Gestão de estado com localStorage (sem banco de dados externo).

PWA (Service Worker):

Estratégia de Cache Stale-While-Revalidate.

Arquivo manifest.json para instalação na tela inicial (Android/iOS).

🚀 Como Executar o Projeto
Como é um projeto estático, você pode rodá-lo de qualquer servidor simples ou hospedá-lo gratuitamente.

Opção 1: Rodando Localmente
Clone o repositório.

Abra o arquivo index.html no seu navegador.

Recomendado: Use uma extensão como "Live Server" no VS Code para simular um servidor real e testar o Service Worker.

Opção 2: Hospedagem (GitHub Pages)
Suba os arquivos para um repositório no GitHub.

Vá em Settings > Pages.

Selecione a branch main e salve.

O site estará disponível em https://seu-usuario.github.io/seu-repositorio.

📲 Instalação no Celular (PWA)
Acesse o link do projeto pelo navegador do celular (Chrome/Safari).

Abra o menu do navegador.

Selecione "Adicionar à Tela Inicial" ou "Instalar Aplicativo".

O ícone aparecerá no seu menu como um app nativo.

🎨 Design System
O projeto utiliza uma paleta de cores escura para conforto visual e economia de bateria em telas OLED:

🌑 Background: #121212

🌚 Surface (Cards): #1e1e1e (Mobile) / #1f2937 (Desktop)

🔴 Destaque Treino: #e74c3c

🟢 Destaque Dieta: #4caf50

🟣 Destaque Carreira: #9b59b6
