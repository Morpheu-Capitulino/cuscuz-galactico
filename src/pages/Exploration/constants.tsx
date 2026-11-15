import React from 'react';
import { BookOpen, AlertTriangle, ShieldAlert, Zap } from 'lucide-react';

export const TARGET_DISTANCE = 3000;

export const DICTIONARY = {
  pt: {
    arrival: "Pouso perfeito! Bem-vindo à sua nova base espacial, Capitão!",
    tut1: "SISTEMA LIGADO! Oi! Bem-vindo à sua nave de exploração.",
    tut2: "Para sobreviver, você precisa ficar de olho no Ar (O2), Água (H2O) e Bateria.",
    tut3: "OLHA LÁ: Um meteoro cinza! Atire nele (Espaço) para pegar Pedras de construção.",
    tut4: "OLHA LÁ: Um cometa azul (Gelo)! Pegue para encher sua Água e seu Ar AUTOMATICAMENTE.",
    tut5: "OLHA LÁ: Lixo espacial laranja (Sucata)! Atire para pegar Peças de Engenharia.",
    tut6: "CUIDADO: Atirar gasta sua Bateria! Pegue a Estrela Amarela para recarregar sua energia.",
    tut7: "BÔNUS: O recurso roxo é um Super Nitro! Ela faz a nave voar super rápido por alguns segundos.",
    tut8: "PERIGO: Meteoros gigantes de pedra! Se bater, machuca a nave. Atire para quebrar!",
    tut9: "PERIGO MÁXIMO: Fogo vermelho! Desvie ou atire logo. Eles quebram a nave e causam super problemas!",
    tut10: "DICA: Pegue os itens bem rápido um atrás do outro para fazer um COMBO e ganhar muito mais!",
    tut11: "ALERTA: Fique sempre de olho nas suas barras. Se elas esvaziarem, a missão acaba.",
    tut12: "CONSERTOS: Se a nave quebrar, clique no botão CONSERTAR ali em cima, é necessário material suficiente.",
    tut13: "Falta muito para chegar? Olhe a barra de 'Distância' lá no topo da tela.",
    tut14: "DICA MESTRE: Comprar melhorias de Radar e Motor ajuda você a chegar mais rápido e seguro.",
    tut15: "DEFESA: Escudos e Torreta de Defesa protegem sua nave contra as batidas no espaço.",
    tut16: "Esqueceu algo? Clique no livro ali em cima (MANUAL) para lembrar como jogar!",
    tut17: "LOJA: Clique no botão piscando 'LOJA' para melhorar sua nave!",
    tut18: "Tudo pronto! Vamos começar a viagem de verdade. Boa sorte, Capitão!",
    hazardHit: "AI! BATEMOS!",
    repair: "CONSERTAR",
    upgrades: "LOJA",
    manual: "MANUAL",
    btnScan: "INICIAR VOO",
    distanceTitle: "Faltam",
    shopTerminal: "Oficina Espacial",
    shopSubtitle: "Melhore sua nave aqui!",
    sysOk: "[TUDO PRONTO]",
    fundsReq: "Custa",
    lvl: "NÍVEL",
    skipTutorial: "PULAR TUTORIAL",
    destroyed: "DESTRUÍDO!",
    collected: "COLETADO!",
    noEnergy: "SEM BATERIA!",
    nitroActive: "NITRO ATIVADO!",
    systemStabilized: "SISTEMA ESTÁVEL",
    structuralFailure: "FALHA ESTRUTURAL!",
    insufficientResources: "FALTAM RECURSOS!",
    batteryPlus: "+BATERIA",
    dronesPlus: "DRONES",
    catastrophicFailure: "FALHA CATASTRÓFICA",
    catastrophicDesc: "Despressurização crítica no vácuo espacial. A falta de recursos resultou no colapso da nave.",
    restartSimulation: "REINICIAR SIMULAÇÃO",
    landingSuccess: "POUSO REALIZADO COM SUCESSO",
    initiatingProtocols: "Iniciando protocolos da Base Planetária...",
    eventAnomaly: "Anomalia Estrutural",
    eventReport: "Relatório de Diagnóstico",
    eventConsumption: "Prejuízo de Consumo:",
    eventCompromised: "Integridade Estrutural Comprometida",
    eventDamage: "DANO:",
    eventMitigated: "(Dano mitigado por Blindagem Térmica)",
    eventSafe: "Procedimento Seguro. Nenhuma avaria na lataria.",
    eventConfirm: "Confirmar Leitura",
    eventTimeout: "FALHA NO SISTEMA: TEMPO ESGOTADO! ",
    upgLaser: "Super Laser",
    upgLaserDesc: "O laser fica mais forte e tira mais recursos das pedras espaciais.",
    upgRadar: "Radar Mágico",
    upgRadarDesc: "Acha mais meteoros e cometas brilhantes no seu caminho.",
    upgDrone: "Robôs Ajudantes",
    upgDroneDesc: "Drones voam em volta da nave pegando pedrinhas e gelo para você.",
    upgCargo: "Mochilão Espacial",
    upgCargoDesc: "Deixa você guardar mais bônus quando faz combos bem rápidos.",
    upgShield: "Escudo de Força",
    upgShieldDesc: "Cria uma bolha de proteção que às vezes bloqueia os grandes acidentes no espaço.",
    upgEngine: "Foguete Turbo",
    upgEngineDesc: "Deixa a nave muito mais veloz para você chegar no planeta rapidinho.",
    upgArmor: "Lataria de Aço",
    upgArmorDesc: "Deixa a nave dura feito pedra! Você perde menos vida nos acidentes.",
    upgCore: "Coração de Energia",
    upgCoreDesc: "Faz o seu laser e a sua bateria trabalharem juntos para soltar mais prêmios.",
    upgScoop: "Ímã Gigante",
    upgScoopDesc: "Puxa um pouquinho a mais de cada prêmio toda vez que você acerta um tiro.",
    upgTurret: "Canhão Automático",
    upgTurretDesc: "Um canhãozinho extra que atira sozinho e ajuda a defender a nave."
  },
  en: {
    arrival: "Perfect landing! Welcome to your new space base, Captain!",
    tut1: "SYSTEM ON! Hi! Welcome to your exploration ship.",
    tut2: "To survive, you need to watch your Air (O2), Water (H2O), and Battery.",
    tut3: "LOOK: A gray meteor! Shoot it (Spacebar) to get Building Rocks.",
    tut4: "LOOK: A blue comet (Ice)! Shoot it to AUTOMATICALLY fill your Air and Water.",
    tut5: "LOOK: Orange space junk (Scrap)! Shoot it to get Engineering Parts.",
    tut6: "CAREFUL: Shooting drains your Battery! Catch the Yellow Star to recharge your energy.",
    tut7: "BONUS: The purple anomaly is a Super Nitro! It makes the ship fly super fast.",
    tut8: "DANGER: Giant rock meteors! If you hit them, it hurts. Shoot to break them!",
    tut9: "EXTREME DANGER: Red fire! Dodge or shoot. They break the ship and cause big problems!",
    tut10: "TIP: Catch items super fast one after another to make a COMBO and win more!",
    tut11: "ALERT: Always watch your bars. If they empty out, the mission is over.",
    tut12: "REPAIRS: If the ship breaks, click the REPAIR button up there.",
    tut13: "Are we there yet? Check the 'Distance' bar at the top of the screen.",
    tut14: "PRO TIP: Buying Radar and Engine upgrades helps you arrive faster and safer.",
    tut15: "DEFENSE: Shields and Defense Turrets protect your ship from crashing in space.",
    tut16: "Forgot something? Click the book icon (MANUAL) to remember how to play!",
    tut17: "SHOP: Click the blinking 'SHOP' button to improve your ship!",
    tut18: "All set! Let's start the real journey. Good luck, Captain!",
    hazardHit: "OUCH! WE HIT IT!",
    repair: "REPAIR",
    upgrades: "SHOP",
    manual: "MANUAL",
    btnScan: "START FLIGHT",
    distanceTitle: "Remaining",
    shopTerminal: "Space Workshop",
    shopSubtitle: "Upgrade your ship here!",
    sysOk: "[ALL GOOD]",
    fundsReq: "Cost",
    lvl: "LEVEL",
    skipTutorial: "SKIP TUTORIAL",
    destroyed: "DESTROYED!",
    collected: "COLLECTED!",
    noEnergy: "NO BATTERY!",
    nitroActive: "NITRO ACTIVE!",
    systemStabilized: "SYSTEM STABLE",
    structuralFailure: "STRUCTURAL FAILURE!",
    insufficientResources: "NOT ENOUGH RESOURCES!",
    batteryPlus: "+BATTERY",
    dronesPlus: "DRONES",
    catastrophicFailure: "CATASTROPHIC FAILURE",
    catastrophicDesc: "Critical depressurization in space vacuum. Lack of resources resulted in ship collapse.",
    restartSimulation: "RESTART SIMULATION",
    landingSuccess: "SUCCESSFUL LANDING",
    initiatingProtocols: "Initiating Planetary Base protocols...",
    eventAnomaly: "Structural Anomaly",
    eventReport: "Diagnostic Report",
    eventConsumption: "Resource Loss:",
    eventCompromised: "Structural Integrity Compromised",
    eventDamage: "DAMAGE:",
    eventMitigated: "(Damage mitigated by Thermal Armor)",
    eventSafe: "Safe Procedure. No hull damage sustained.",
    eventConfirm: "Confirm Reading",
    eventTimeout: "SYSTEM FAILURE: TIME OUT! ",
    upgLaser: "Super Laser",
    upgLaserDesc: "The laser gets stronger and pulls more resources from space rocks.",
    upgRadar: "Magic Radar",
    upgRadarDesc: "Finds more meteors and shiny comets on your path.",
    upgDrone: "Helper Bots",
    upgDroneDesc: "Little drones fly around the ship catching tiny rocks and ice for you.",
    upgCargo: "Space Backpack",
    upgCargoDesc: "Lets you store more bonus points when you make super fast combos.",
    upgShield: "Force Shield",
    upgShieldDesc: "Creates a protection bubble that sometimes completely blocks big space accidents.",
    upgEngine: "Turbo Rocket",
    upgEngineDesc: "Makes the ship much faster so you can reach the planet in a blink.",
    upgArmor: "Steel Hull",
    upgArmorDesc: "Makes the ship tough as a rock! You lose less health in accidents.",
    upgCore: "Energy Heart",
    upgCoreDesc: "Makes your laser and battery work together to drop more prizes.",
    upgScoop: "Giant Magnet",
    upgScoopDesc: "Pulls a little bit of extra prize every time you land a shot.",
    upgTurret: "Auto Cannon",
    upgTurretDesc: "A little extra cannon that shoots by itself and defends the ship."
  }
};

export const MANUAL_CONTENT = {
  pt: [
    { title: "Como Coletar", desc: "Atire nas pedras cinzas, azuis e laranjas para encher seu estoque de materiais.", icon: <Zap /> },
    { title: "Bateria e Estrelas", desc: "Sua nave gasta energia quando você atira! Pegue as Estrelas Amarelas para encher a bateria.", icon: <ShieldAlert /> },
    { title: "Perigos no Caminho", desc: "Se você bater nas pedras vermelhas de fogo, a nave quebra e um Problemão acontece na tela!", icon: <AlertTriangle /> },
    { title: "Aprenda com a NASA", desc: "Os problemas do jogo são baseados em coisas reais que aconteceram com os astronautas. Escolha a resposta mais inteligente!", icon: <BookOpen /> }
  ],
  en: [
    { title: "How to Collect", desc: "Shoot the gray, blue, and orange rocks to fill up your material stock.", icon: <Zap /> },
    { title: "Battery & Stars", desc: "Your ship uses energy when you shoot! Catch Yellow Stars to refill the battery.", icon: <ShieldAlert /> },
    { title: "Hazards Ahead", desc: "If you hit the red fire rocks, the ship breaks and a Big Problem happens on screen!", icon: <AlertTriangle /> },
    { title: "Learn with NASA", desc: "The game's problems are based on real things that happened to astronauts. Choose the smartest answer!", icon: <BookOpen /> }
  ]
};

export const PLANETS = [
  { id: 1, x: '15%', color: 'from-indigo-600 to-purple-900', size: 'w-64 h-64', duration: 40, delay: 0 },
  { id: 2, x: '75%', color: 'from-orange-700 to-red-900', size: 'w-48 h-48', duration: 60, delay: 15 },
  { id: 3, x: '45%', color: 'from-teal-600 to-cyan-900', size: 'w-96 h-96', duration: 80, delay: 35 }
];

export const GAME_EVENTS = [
  { id: 'evt1', title: { pt: 'Vazamento no Capacete (Caso Real: Luca Parmitano)', en: 'Helmet Leak (Real Case: Luca Parmitano)' }, desc: { pt: 'A água do ar-condicionado do traje está vazando dentro do capacete do astronauta! Ele pode se afogar no espaço.', en: 'The air conditioning water is leaking inside the astronauts helmet! He might drown in space.' }, options: [
      { text: { pt: 'Trocar a Bomba de Água', en: 'Change Water Pump' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Boa! Na vida real, a sujeira entupiu o filtro e a água foi para o lugar errado, quase afogando o astronauta Luca na Estação Espacial.', en: 'Great! In real life, dirt clogged the filter and water went to the wrong place, almost drowning astronaut Luca.' } },
      { text: { pt: 'Absorver com Poeira', en: 'Absorb with Dust' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'Misturar terra espacial com água formou uma lama nojenta que entupiu os tubos de respiração!', en: 'Mixing space dirt with water formed a gross mud that clogged the breathing tubes!' } },
      { text: { pt: 'Esfriar o Capacete', en: 'Cool the Helmet' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'Atenção à ciência: Quando a água congela, ela incha! O gelo estourou as válvulas do traje.', en: 'Science alert: When water freezes, it swells! The ice burst the suits valves.' } },
      { text: { pt: 'Não Fazer Nada', en: 'Do Nothing' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'No espaço, a água gruda no rosto como uma geleia (Tensão Superficial). O astronauta quase engasgou feio!', en: 'In space, water sticks to your face like jelly (Surface Tension). The astronaut almost choked badly!' } }
  ]},
  { id: 'evt2', title: { pt: 'BUM! Tanque Estourou (Caso Real: Apollo 13)', en: 'BOOM! Tank Blew Up (Real Case: Apollo 13)' }, desc: { pt: 'Um curto-circuito fez nosso tanque de oxigênio explodir. Perdemos ar e energia. Houston, temos um problema!', en: 'A short circuit made our oxygen tank explode. We lost air and power. Houston, we have a problem!' }, options: [
      { text: { pt: 'Fazer um Filtro de Fita', en: 'Make a Tape Filter' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Genial! Os astronautas da Apollo 13 usaram fita adesiva, papelão e mangueiras para consertar o ar e voltar para casa.', en: 'Genius! The Apollo 13 crew used duct tape, cardboard, and hoses to fix the air and return home.' } },
      { text: { pt: 'Tirar Ar do Gelo', en: 'Make Air from Ice' }, costType: 'ice', cost: 200, hpMod: -15, outcome: { pt: 'Tentar transformar água em ar usando eletricidade gastou o restinho de bateria que a nave tinha.', en: 'Trying to turn water into air using electricity wasted the tiny bit of battery the ship had left.' } },
      { text: { pt: 'Tapar com Pedras', en: 'Patch with Stones' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A poeira e as pedras não tapam buracos de ar direito. O oxigênio escapou para o espaço vazio.', en: 'Dust and rocks dont seal air holes well. The oxygen escaped into empty space.' } },
      { text: { pt: 'Respirar Fundo', en: 'Breathe Deeply' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'O ar ruim que expiramos (gás carbônico) se acumulou. Todo mundo ficou tonto e dormiu nos controles.', en: 'The bad air we breathe out (carbon dioxide) built up. Everyone got dizzy and fell asleep at the controls.' } }
  ]},
  { id: 'evt3', title: { pt: 'Fogo na Nave! (Caso Real: Estação Mir)', en: 'Fire on the Ship! (Real Case: Mir Station)' }, desc: { pt: 'Uma máquina pegou fogo dentro da cabine! Está tudo cheio de fumaça e a gente não consegue respirar.', en: 'A machine caught fire inside the cabin! It\'s full of smoke and we can\'t breathe.' }, options: [
      { text: { pt: 'Apagar com Água', en: 'Put Out with Water' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'Você sabia? No espaço o fogo não sobe, ele vira uma bolha parada! A água grudou na bolha de fogo e apagou ele.', en: 'Did you know? In space, fire doesn\'t go up, it forms a still bubble! Water stuck to the fire bubble and put it out.' } },
      { text: { pt: 'Abrir a Janela', en: 'Open the Window' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'Abrir a nave para o espaço apagou o fogo, mas também sugou todo o nosso ar e as nossas coisas para fora!', en: 'Opening the ship to space put the fire out, but also sucked all our air and stuff outside!' } },
      { text: { pt: 'Jogar Terra', en: 'Throw Dirt' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Jogar poeira lunar no fogo fez uma nuvem suja que entrou nos olhos dos astronautas e nos computadores.', en: 'Throwing lunar dust on the fire made a dirty cloud that got into the astronauts eyes and computers.' } },
      { text: { pt: 'Esperar Apagar', en: 'Wait it Out' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'O fogo formou uma bola de calor flutuante que derreteu os painéis e encheu a nave de fumaça tóxica.', en: 'The fire formed a floating heat ball that melted panels and filled the ship with toxic smoke.' } }
  ]},
  { id: 'evt4', title: { pt: 'Batida de Trânsito Espacial (Caso Mir, 1997)', en: 'Space Traffic Crash (Mir Case, 1997)' }, desc: { pt: 'Uma nave de entregas (Cargueiro) veio rápido demais, bateu na lateral da nossa base e fez um buraco no casco!', en: 'A delivery ship came too fast, hit the side of our base, and made a hole in the hull!' }, options: [
      { text: { pt: 'Fechar a Porta Rápido', en: 'Close the Door Fast' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Ufa! Você trancou a porta da sala furada, igualzinho os astronautas fizeram na vida real. A nave está salva!', en: 'Phew! You locked the door of the broken room, just like real astronauts did. The ship is safe!' } },
      { text: { pt: 'Tapar com Pedras', en: 'Patch with Rocks' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A força do ar tentando sair da nave empurrou as pedras para longe. O vento continuou sugando tudo.', en: 'The force of the air trying to escape pushed the rocks away. The wind kept sucking everything out.' } },
      { text: { pt: 'Congelar o Buraco', en: 'Freeze the Hole' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O gelo tampou o buraco, mas o sol do espaço é muito forte e derreteu o gelo em formato de vapor na mesma hora.', en: 'The ice plugged the hole, but the space sun is very strong and melted the ice into steam right away.' } },
      { text: { pt: 'Ficar Parado', en: 'Stand Still' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'O ar fugiu tão rápido que, sem pressão, os fluidos do corpo começam a ferver (Limite de Armstrong). Perigoso!', en: 'The air escaped so fast that, without pressure, body fluids start to boil (Armstrong Limit). Dangerous!' } }
  ]},
  { id: 'evt5', title: { pt: 'Computador Travou! (Caso Apollo 11)', en: 'Computer Froze! (Apollo 11 Case)' }, desc: { pt: 'Beep! Erro 1202! O computador da nave recebeu muita informação ao mesmo tempo e está quase travando bem na hora de pousar.', en: 'Beep! Error 1202! The ship\'s computer received too much info at once and is almost freezing right when landing.' }, options: [
      { text: { pt: 'Ignorar o que não importa', en: 'Ignore Silly Data' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Você usou a ideia da cientista Margaret Hamilton: mandou o computador focar só no pouso e esquecer o resto!', en: 'You used scientist Margaret Hamilton\'s idea: told the computer to focus only on landing and forget the rest!' } },
      { text: { pt: 'Jogar Gelo no PC', en: 'Put Ice on PC' }, costType: 'ice', cost: 100, hpMod: -10, outcome: { pt: 'O problema era muito programa aberto, não calor! Atrasar para esfriar fez a nave descer muito rápido.', en: 'The problem was too many open programs, not heat! Delaying to cool down made the ship drop too fast.' } },
      { text: { pt: 'Desligar e Ligar (Reset)', en: 'Turn Off and On' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'Reiniciar o PC apagou a tela na pior hora. Os pilotos tiveram que apertar botões no escuro.', en: 'Rebooting the PC turned off the screen at the worst time. The pilots had to press buttons in the dark.' } },
      { text: { pt: 'Entrar em Pânico', en: 'Panic' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Com o computador travado, a nave desceu rápido demais e bateu com força no chão, quebrando as pernas de pouso.', en: 'With the computer frozen, the ship dropped too fast and hit the ground hard, breaking its landing legs.' } }
  ]},
  { id: 'evt6', title: { pt: 'A Nave Tá Girando! (Caso Gemini 8)', en: 'Ship is Spinning! (Gemini 8 Case)' }, desc: { pt: 'Um foguetinho lateral emperrou e a nave começou a rodopiar no espaço feito um peão maluco! Vamos ficar enjoados.', en: 'A side rocket got stuck and the ship started spinning in space like a crazy top! We\'ll get dizzy.' }, options: [
      { text: { pt: 'Desligar Bateria Principal', en: 'Turn Off Main Battery' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'O astronauta Neil Armstrong fez exatamente isso! Ele desligou a energia para parar o foguetinho emperrado.', en: 'Astronaut Neil Armstrong did exactly this! He turned off the power to stop the stuck rocket.' } },
      { text: { pt: 'Jato de Água Oposto', en: 'Opposite Water Jet' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Ação e Reação: a força da água espirrada foi muito fraquinha contra a força do foguete de fogo.', en: 'Action & Reaction: the force of the squirted water was too weak against the fire rocket\'s force.' } },
      { text: { pt: 'Jogar Peso Fora', en: 'Throw Weight Out' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'Mudar o peso fez a nave parar de girar como peão e começar a capotar de cabeça para baixo!', en: 'Changing the weight made the ship stop spinning like a top and start tumbling upside down!' } },
      { text: { pt: 'Gritar e Segurar', en: 'Scream and Hold On' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'Rodar muito rápido joga o sangue longe do cérebro (Força G). A equipe desmaiou e a nave quebrou as antenas.', en: 'Spinning too fast throws blood away from the brain (G-Force). The crew passed out and broke antennas.' } }
  ]},
  { id: 'evt7', title: { pt: 'Pedrinha Bala (Caso Soyuz, 2022)', en: 'Bullet Pebble (Soyuz Case, 2022)' }, desc: { pt: 'Uma pedrinha minúscula voando mais rápido que uma bala furou o tubo de resfriamento. Líquido está vazando no espaço!', en: 'A tiny pebble flying faster than a bullet poked a hole in the cooling tube. Liquid is leaking into space!' }, options: [
      { text: { pt: 'Tampão de Gelo', en: 'Ice Plug' }, costType: 'ice', cost: 180, hpMod: 0, outcome: { pt: 'A água, ao encontrar o frio extremo do espaço (-150°C), congelou na mesma hora, tapando o buraquinho!', en: 'Water, upon hitting the extreme cold of space (-150°C), froze right away, plugging the tiny hole!' } },
      { text: { pt: 'Soldar com Fogo', en: 'Weld with Fire' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'O fogo esquentou o líquido químico de refrigeração que estava vazando, causando uma panelada térmica.', en: 'The fire heated up the leaking chemical cooling liquid, causing a thermal pop.' } },
      { text: { pt: 'Massa de Modelar de Pedra', en: 'Stone Playdough' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'A pressão do vazamento lavou a massa de pedra e sujou as câmeras do lado de fora da nave.', en: 'The leak\'s pressure washed the stone dough away and dirtied the cameras outside the ship.' } },
      { text: { pt: 'Deixar Vazar', en: 'Let it Leak' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Sem o líquido gelado, os computadores ficaram muito quentes e precisaram ser desligados para não derreterem.', en: 'Without the freezing liquid, the computers got too hot and had to be turned off so they wouldn\'t melt.' } }
  ]},
  { id: 'evt8', title: { pt: 'Poeira Cortante (Lua da Apollo)', en: 'Sharp Dust (Apollo Moon)' }, desc: { pt: 'A poeira espacial não é macia, ela parece cacos de vidro! Ela entrou na nave e está arranhando tudo.', en: 'Space dust isn\'t soft, it looks like broken glass! It got inside the ship and is scratching everything.' }, options: [
      { text: { pt: 'Imã Gigante', en: 'Giant Magnet' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'A poeira do espaço é cheia de ferro. Você ligou as peças magnéticas e o imã puxou toda a sujeira do ar!', en: 'Space dust is full of iron. You turned on the magnetic parts and the magnet pulled all the dirt from the air!' } },
      { text: { pt: 'Jogar Água', en: 'Throw Water' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'Água com poeira espacial formou um cimento duro que secou nas roupas dos astronautas, travando os braços.', en: 'Water with space dust formed a hard cement that dried on the astronauts\' suits, locking their arms.' } },
      { text: { pt: 'Varrer com Vassoura', en: 'Sweep with Broom' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Varrer no espaço só fez a poeira voar mais. Todo mundo começou a tossir (chamam isso de Febre Lunar).', en: 'Sweeping in space only made the dust fly more. Everyone started coughing (they call this Lunar Fever).' } },
      { text: { pt: 'Fechar os Olhos', en: 'Close Eyes' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Sem gravidade, a poeira flutua na altura do rosto o tempo todo, entrando nos olhos e machucando a vista.', en: 'Without gravity, dust floats at face level all the time, getting into eyes and hurting eyesight.' } }
  ]},
  { id: 'evt9', title: { pt: 'Capa Queimada (Caso Ônibus Espacial)', en: 'Burnt Cape (Space Shuttle Case)' }, desc: { pt: 'Um pedaço do escudo de calor da barriga da nave caiu. Se formos pousar num planeta, o calor da velocidade vai derreter a nave.', en: 'A piece of the heat shield on the ship\'s belly fell off. If we land on a planet, the speed\'s heat will melt the ship.' }, options: [
      { text: { pt: 'Fazer Cimento Espacial', en: 'Make Space Cement' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'Você misturou pedras para criar uma cerâmica super resistente ao fogo. A nave vai poder descer em segurança!', en: 'You mixed rocks to create a fire-resistant super ceramic. The ship will be able to land safely!' } },
      { text: { pt: 'Tapar com Metal', en: 'Cover with Metal' }, costType: 'parts', cost: 200, hpMod: -25, outcome: { pt: 'A queda no planeta gera plasma quente a 1500°C! O remendo de metal comum derreteu como manteiga.', en: 'Falling into the planet makes hot plasma at 1500°C! The normal metal patch melted like butter.' } },
      { text: { pt: 'Tapar com Gelo', en: 'Cover with Ice' }, costType: 'ice', cost: 150, hpMod: -35, outcome: { pt: 'O gelo virou fumaça (vapor) na mesma hora por causa do calor extremo, deixando o buraco desprotegido.', en: 'The ice turned into smoke (steam) right away because of the extreme heat, leaving the hole unprotected.' } },
      { text: { pt: 'Deixar Assim', en: 'Leave it Be' }, costType: 'none', cost: 0, hpMod: -50, outcome: { pt: 'O vento quente entrou pelo buraco e queimou os fios por dentro da nave. Quase um desastre total!', en: 'The hot wind entered through the hole and burned the wires inside the ship. Almost a total disaster!' } }
  ]},
  { id: 'evt10', title: { pt: 'Borrachinha Congelada (Caso Challenger)', en: 'Frozen Rubber Band (Challenger Case)' }, desc: { pt: 'Faz muito frio no espaço! Uma borrachinha que fecha um tubo de gás quente virou pedra de gelo e pode quebrar.', en: 'It\'s very cold in space! A rubber band that closes a hot gas tube turned solid like ice and might break.' }, options: [
      { text: { pt: 'Ligar Aquecedor', en: 'Turn on Heater' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Boa ideia! O físico Richard Feynman provou isso: esquentar a borracha a deixa molinha e elástica de novo.', en: 'Good idea! Physicist Richard Feynman proved this: heating rubber makes it soft and stretchy again.' } },
      { text: { pt: 'Cobrir com Pedras', en: 'Cover with Stones' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'Pedras geladas no espaço não transferem calor para a borracha gelada. A borrachinha acabou rachando.', en: 'Freezing stones in space don\'t transfer heat to freezing rubber. The rubber band ended up cracking.' } },
      { text: { pt: 'Jogar Água Morna', en: 'Throw Warm Water' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A água esquentou rápido, mas no vácuo congelou de novo virando gelo duro. O gelo expandiu e estourou a válvula.', en: 'Water warmed it fast, but in a vacuum it froze again turning into hard ice. The ice expanded and popped the valve.' } },
      { text: { pt: 'Ignorar o Frio', en: 'Ignore the Cold' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'A borracha dura não segurou o ar. Gás superquente vazou pela lateral como um lança-chamas, queimando o tanque.', en: 'The hard rubber didn\'t hold the air. Super hot gas leaked out the side like a flamethrower, burning the tank.' } }
  ]}
];