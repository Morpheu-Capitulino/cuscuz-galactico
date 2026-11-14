ASTRO MISSION
Junior Astronaut Mission Trainer
NASA Space Apps Challenge — Documento de Escopo do Projeto
Versão: 1.0
Tipo: Jogo educacional interativo (Web Game)
Público-alvo: Crianças de 8 a 13 anos
Prazo de desenvolvimento: 36 horas
Plataforma: Web (Desktop e Mobile)
________________________________________
1. VISÃO GERAL DO PROJETO
1.1. Conceito
Astro Mission é um jogo educacional interativo que coloca crianças no papel de jovens astronautas responsáveis por ajudar a construir e administrar uma pequena base humana na Lua.
Por meio de exploração, coleta de recursos, construção de estruturas e resolução de problemas, os jogadores aprendem conceitos fundamentais de ciência, tecnologia, engenharia e matemática (STEM).
O jogo transforma desafios reais da exploração espacial em experiências lúdicas e acessíveis.
1.2. Problema identificado
Grande parte dos conteúdos educacionais sobre exploração espacial apresenta conceitos científicos de maneira excessivamente teórica ou complexa para crianças.
Além disso, muitos jogos espaciais priorizam o entretenimento sem representar adequadamente os desafios de engenharia envolvidos na manutenção de uma missão espacial.
O Astro Mission busca aproximar esses dois universos, oferecendo uma experiência na qual aprender e jogar acontecem simultaneamente.
1.3. Solução proposta
Desenvolver um jogo web no qual a criança precisa:
1.	Explorar o ambiente lunar.
2.	Encontrar e coletar recursos.
3.	Construir uma base espacial.
4.	Administrar recursos essenciais.
5.	Resolver situações inesperadas.
6.	Manter sua tripulação em segurança.
7.	Concluir uma missão e descobrir o que aprendeu.
1.4. Objetivo principal
Ensinar crianças sobre os desafios da sobrevivência humana fora da Terra por meio de uma experiência interativa que estimule curiosidade científica, pensamento crítico, resolução de problemas e tomada de decisões.
________________________________________
2. PÚBLICO-ALVO
Público principal: Crianças entre 8 e 13 anos.
Características da experiência
•	Linguagem simples e acessível.
•	Instruções curtas.
•	Elementos visuais intuitivos.
•	Personagens carismáticos.
•	Feedback imediato.
•	Desafios progressivos.
•	Recompensas por conquistas.
•	Ausência de punições excessivamente frustrantes.
A experiência deve ser compreensível mesmo para crianças que nunca tiveram contato com conceitos de engenharia espacial.
________________________________________
3. IDENTIDADE DO PRODUTO
3.1. Nome
ASTRO MISSION
3.2. Slogan
"Your decisions. Their survival."
3.3. Personagem principal
LUMI — Lunar Utility Mission Intelligence
LUMI é um pequeno robô assistente que acompanha o jogador durante toda a missão.
Funções do personagem
•	Apresentar os objetivos.
•	Explicar os desafios.
•	Oferecer dicas.
•	Reagir às decisões.
•	Apresentar curiosidades científicas.
•	Comemorar conquistas.
LUMI terá diálogos previamente programados. Não será implementada inteligência artificial generativa no MVP.
3.4. Direção artística
Estética de aventura espacial infantil, com elementos visuais inspirados em jogos de exploração e construção.
Características:
•	Personagens estilizados.
•	Cenários lunares coloridos.
•	Elementos 2D com perspectiva isométrica.
•	Animações suaves.
•	Ilustrações de alta qualidade.
•	Interface amigável e intuitiva.
________________________________________
4. ESCOPO FUNCIONAL
O sistema será dividido em cinco etapas principais.
4.1. MÓDULO 01 — LANDING PAGE
Objetivo: Apresentar o jogo e incentivar o início da experiência.
Elementos obrigatórios
•	Logotipo Astro Mission.
•	Ilustração da superfície lunar.
•	Personagem LUMI.
•	Apresentação da proposta.
•	Botão START MISSION.
•	Pequena seção HOW TO PLAY.
Comportamento
Ao clicar em START MISSION, o jogador será direcionado para a apresentação da missão.
Não haverá necessidade de cadastro ou autenticação.
________________________________________
4.2. MÓDULO 02 — MISSION BRIEFING
Objetivo: Apresentar o contexto da missão e preparar o jogador.
Informações da missão
Característica	Definição
Destino	Lua
Localização	Região do Polo Sul Lunar
Tripulação	4 astronautas
Duração	7 dias simulados
Objetivo	Construir uma base funcional
Dificuldade	Progressiva
Narrativa
A humanidade está preparando novas missões para estabelecer presença na Lua.
O jogador foi selecionado como cadete espacial para ajudar uma equipe de astronautas a construir uma pequena base.
Entretanto, os recursos são limitados e o ambiente lunar apresenta desafios.
LUMI será responsável por explicar cada etapa.
Botão
DEPLOY YOUR BASE.
Ao clicar, o jogador inicia a exploração.
________________________________________
4.3. MÓDULO 03 — MOON EXPLORATION
Objetivo: Permitir que a criança explore a superfície lunar e colete recursos.
Mecânicas
O jogador terá acesso a um cenário lunar interativo.
Funcionalidades:
•	Explorar pontos do cenário.
•	Identificar locais de interesse.
•	Coletar recursos.
•	Encontrar possíveis depósitos de gelo.
•	Descobrir locais adequados para construção.
Recursos coletáveis
Recurso	Utilização
Regolito	Material para proteção e construção
Gelo	Fonte potencial de água
Energia solar	Fonte de energia da base
Interações
Ao clicar em determinados objetos, o jogador recebe informações e pode realizar ações.
Exemplo:
Ao encontrar uma região com indícios de gelo:
LUMI apresenta:
"Great discovery! Water ice could help astronauts obtain water for future lunar missions."
O jogador coleta o recurso e recebe pontos.
Limitação do MVP
A exploração será representada por um cenário 2D interativo, com pontos clicáveis e pequenas animações.
Não será desenvolvido um mundo aberto tridimensional.
________________________________________
4.4. MÓDULO 04 — BUILD YOUR BASE
Objetivo: Permitir que o jogador construa uma base lunar utilizando os recursos disponíveis.
Estruturas disponíveis
Estrutura	Custo ilustrativo	Função
Lunar Habitat	100	Abriga a tripulação
Solar Panels	100	Produz energia
Water Recycler	120	Recupera água
Greenhouse	100	Produz alimentos
Radiation Shelter	150	Protege contra radiação
Os custos serão definidos em unidades fictícias de recursos do jogo, não em valores monetários ou científicos.
Mecânica de construção
1.	O jogador acessa o catálogo.
2.	Seleciona uma estrutura.
3.	Visualiza sua função e custo.
4.	Arrasta ou posiciona a estrutura no cenário.
5.	Confirma a construção.
6.	A estrutura passa a modificar os indicadores da base.
Regras
•	O jogador começa com recursos limitados.
•	Não poderá construir todas as estruturas imediatamente.
•	Cada construção possui uma função específica.
•	Algumas estruturas dependem de outras para funcionar adequadamente.
Objetivo educacional
Ensinar planejamento, priorização e administração de recursos.
________________________________________
4.5. MÓDULO 05 — SAVE YOUR CREW
Objetivo: Apresentar desafios que exigem decisões estratégicas.
Durante a missão, o jogador receberá eventos que poderão comprometer a sobrevivência da tripulação.
Indicadores da base
Indicador	Significado
Oxygen	Disponibilidade de oxigênio
Water	Disponibilidade de água
Energy	Energia disponível
Food	Estoque de alimentos
Protection	Capacidade de proteção contra radiação
Os indicadores serão apresentados visualmente por barras e ícones.
Eventos programados
EVENTO 01 — SOLAR STORM
Uma tempestade solar está se aproximando.
O jogador deverá escolher entre:
•	Entrar no abrigo protegido.
•	Desligar equipamentos não essenciais.
•	Ignorar o alerta.
Cada decisão terá consequências diferentes.
EVENTO 02 — WATER SHORTAGE
O estoque de água está diminuindo.
Possíveis decisões:
•	Economizar água.
•	Utilizar o sistema de reciclagem.
•	Continuar consumindo normalmente.
EVENTO 03 — POWER FAILURE
A produção de energia foi comprometida.
Possíveis decisões:
•	Desligar equipamentos secundários.
•	Utilizar a energia armazenada.
•	Priorizar os sistemas de suporte à vida.
Sistema de consequências
As decisões precisam modificar os indicadores do jogo.
Exemplo:
Ao utilizar o abrigo durante uma tempestade solar:
•	Reduz o risco de exposição à radiação.
•	Aumenta o consumo de energia.
O sistema deve demonstrar que decisões positivas também podem gerar custos.
________________________________________
5. SISTEMA DE SIMULAÇÃO
Esta é a principal lógica técnica do jogo.
Os recursos devem funcionar de maneira interdependente.
Exemplos de relações
Sistema	Dependência
Gerador de oxigênio	Consome energia
Estufa	Consome água e energia
Reciclador	Recupera parte da água
Painéis solares	Produzem energia
Abrigo	Reduz exposição à radiação
Ciclo de simulação
Cada rodada representa um dia da missão.
A cada novo dia:
1.	O sistema calcula o consumo dos recursos.
2.	Aplica os benefícios das estruturas.
3.	Verifica os indicadores.
4.	Identifica possíveis situações críticas.
5.	Apresenta eventos programados.
6.	Atualiza o estado da missão.
Condições de derrota
A missão será considerada comprometida quando um recurso essencial atingir um nível crítico e a situação não puder ser corrigida.
A derrota deve ser acompanhada de uma explicação educativa.
Condições de vitória
O jogador precisa completar os sete dias mantendo os quatro astronautas em segurança.
________________________________________
6. MÓDULO 06 — MISSION REPORT
Objetivo: Apresentar os resultados da experiência e reforçar o aprendizado.
Ao terminar a missão, o jogador recebe um relatório.
Informações apresentadas
•	Dias sobrevividos.
•	Estado da tripulação.
•	Recursos utilizados.
•	Estruturas construídas.
•	Decisões mais importantes.
•	Desempenho geral.
Classificação
Classificação	Resultado
S	Space Commander
A	Excellent Engineer
B	Mission Specialist
C	Junior Explorer
Relatório educacional
O jogo apresentará explicações relacionadas às decisões do jogador.
Exemplo:
"Você construiu um sistema de reciclagem de água. Essa foi uma escolha importante! Em missões espaciais reais, recuperar e reutilizar água ajuda a reduzir a quantidade de recursos que precisam ser transportados da Terra."
Recompensa
O jogador receberá:
•	Medalha de conclusão.
•	Pontuação final.
•	Título de jovem explorador.
•	Certificado digital de conclusão da missão.
________________________________________
7. MECÂNICAS DE GAMIFICAÇÃO
O sistema utilizará recompensas simples para estimular o progresso.
Pontuação
O jogador receberá pontos por:
•	Coletar recursos.
•	Construir estruturas.
•	Resolver eventos.
•	Preservar recursos.
•	Manter a tripulação segura.
Medalhas
•	First Explorer: primeira exploração.
•	Master Builder: primeira construção.
•	Water Guardian: boa administração da água.
•	Energy Hero: gestão eficiente de energia.
•	Lunar Commander: conclusão da missão.
Não será desenvolvido ranking online no MVP.
________________________________________
8. EXPERIÊNCIA EDUCACIONAL
O Astro Mission precisa ensinar conceitos científicos durante a própria experiência.
Competências trabalhadas
Área STEM	Aplicação no jogo
Ciência	Condições ambientais da Lua
Tecnologia	Sistemas de suporte à vida
Engenharia	Construção da base
Matemática	Administração de recursos
Sustentabilidade	Reciclagem e reutilização
Pensamento crítico	Decisões e consequências
Sistema de curiosidades
Durante o jogo, LUMI apresentará pequenas explicações científicas.
Exemplo:
"Did you know? The Moon has almost no atmosphere to protect astronauts from the space environment. That's why habitats need special protection!"
As explicações devem ser curtas, compreensíveis e cientificamente fundamentadas.
________________________________________
9. REQUISITOS NÃO FUNCIONAIS
Responsividade
O jogo deverá funcionar em computadores, tablets e celulares.
Usabilidade
Os controles devem ser simples, com botões grandes e instruções claras.
Desempenho
As animações e ilustrações devem ser otimizadas para funcionar em dispositivos comuns.
Acessibilidade
•	Contraste adequado.
•	Textos legíveis.
•	Informações não dependentes apenas de cores.
•	Instruções visuais.
•	Controles intuitivos.
Segurança e privacidade
O MVP não coletará informações pessoais de crianças.
Não haverá cadastro, login, chat público ou compartilhamento de dados pessoais.
________________________________________
10. ARQUITETURA TECNOLÓGICA
A aplicação será desenvolvida como um jogo web, sem necessidade de backend.
Tecnologia	Responsabilidade
React	Estrutura da aplicação
Vite	Ambiente de desenvolvimento
TypeScript	Tipagem e lógica
Tailwind CSS	Estilização
Framer Motion	Animações de interface
Phaser	Exploração e interações 2D
Zustand	Gerenciamento do estado
Lucide React	Ícones
Vercel	Hospedagem
Organização sugerida
astro-mission/
│
├── public/
│   ├── images/
│   ├── characters/
│   └── sounds/
│
├── src/
│   ├── components/
│   │   ├── LumiCharacter/
│   │   ├── DialogBox/
│   │   ├── ResourceBar/
│   │   ├── MissionCard/
│   │   └── EventModal/
│   │
│   ├── pages/
│   │   ├── Landing/
│   │   ├── Briefing/
│   │   ├── Exploration/
│   │   ├── BaseBuilder/
│   │   └── MissionReport/
│   │
│   ├── engine/
│   │   ├── simulation.ts
│   │   ├── resourceManager.ts
│   │   ├── eventManager.ts
│   │   └── scoring.ts
│   │
│   ├── data/
│   │   ├── structures.ts
│   │   ├── events.ts
│   │   └── dialogues.ts
│   │
│   ├── store/
│   │   └── gameStore.ts
│   │
│   └── App.tsx
│
└── package.json
________________________________________
11. ESCOPO DO MVP
Considerando o prazo de 36 horas, as funcionalidades serão divididas por prioridade.
Funcionalidade	Prioridade
Landing Page	Obrigatória
Personagem LUMI	Obrigatória
Mission Briefing	Obrigatória
Exploração lunar	Obrigatória
Coleta de recursos	Obrigatória
Construção da base	Obrigatória
Indicadores dinâmicos	Obrigatória
Três eventos interativos	Obrigatória
Sistema de consequências	Obrigatória
Vitória e derrota	Obrigatória
Relatório final	Obrigatória
Animações	Alta
Medalhas	Alta
Certificado digital	Média
Efeitos sonoros	Média
Sistema de níveis	Baixa
Ranking online	Fora do escopo
Multiplayer	Fora do escopo
Inteligência artificial	Fora do escopo
Mundo 3D aberto	Fora do escopo
Missão em Marte	Fora do escopo
________________________________________
12. CRONOGRAMA DE DESENVOLVIMENTO
Prazo total: 36 horas.
Etapa	Atividade	Tempo
01	Setup, identidade e estrutura	3h
02	Landing e briefing	3h
03	Cenário de exploração	5h
04	Coleta e construção	6h
05	Sistema de recursos	5h
06	Eventos e consequências	5h
07	Relatório e gamificação	3h
08	Animações e polimento	3h
09	Testes e apresentação	3h
	TOTAL	36h
________________________________________
13. CRITÉRIOS DE ACEITAÇÃO
O projeto será considerado funcional quando:
1.	O jogador conseguir iniciar uma missão sem cadastro.
2.	O jogador conseguir explorar o ambiente lunar.
3.	O jogador conseguir coletar recursos.
4.	O jogador conseguir construir estruturas.
5.	As construções alterarem os indicadores.
6.	Os recursos forem consumidos e recuperados conforme as regras.
7.	Os eventos apresentarem escolhas diferentes.
8.	As decisões produzirem consequências verificáveis.
9.	O jogador conseguir vencer ou perder.
10.	O relatório final apresentar resultados e explicações educacionais.
________________________________________
14. REFERÊNCIAS CIENTÍFICAS
O jogo deverá utilizar informações científicas confiáveis para fundamentar suas mecânicas.
Fontes recomendadas:
•	NASA Artemis Program: https://www.nasa.gov/humans-in-space/artemis/
•	NASA Space Radiation: https://www.nasa.gov/space-radiation/
•	NASA Environmental Control and Life Support System: https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/
•	NASA Lunar Exploration: https://science.nasa.gov/moon/
As mecânicas serão simplificações educacionais de desafios reais, e não simulações de engenharia certificadas.
________________________________________
15. DIFERENCIAL COMPETITIVO
O Astro Mission não será apenas um jogo de exploração espacial.
Seu diferencial está na combinação de três elementos:
1. Aprendizado por experimentação
A criança aprende tomando decisões, testando soluções e observando consequências.
2. Interdependência dos sistemas
Os recursos não funcionam isoladamente. Uma decisão sobre energia pode afetar a produção de alimentos, a geração de oxigênio e a sobrevivência da tripulação.
3. Ciência transformada em diversão
Conceitos reais de engenharia espacial são apresentados por meio de personagens, desafios e situações acessíveis ao público infantil.
________________________________________
16. DEFINIÇÃO FINAL DO PRODUTO
O Astro Mission será um jogo educacional web de aventura e gerenciamento de recursos, no qual crianças assumem o papel de cadetes espaciais responsáveis por ajudar a estabelecer uma base humana na Lua.
Por meio de exploração, coleta, construção e resolução de desafios, os jogadores experimentarão os principais problemas relacionados à sobrevivência humana fora da Terra.
O produto busca despertar o interesse pela ciência e pela exploração espacial, demonstrando que a construção de uma missão bem-sucedida depende de planejamento, conhecimento, criatividade e trabalho em equipe.
MISSÃO DO PROJETO
Transformar crianças em pequenos engenheiros espaciais, permitindo que experimentem os desafios de construir um futuro além da Terra.
