import { BookOpen, AlertTriangle, ShieldAlert, Zap } from 'lucide-react';

export const TARGET_DISTANCE = 2000;

export const DICTIONARY = {
  pt: {
    arrival: "Pouso perfeito! Bem-vindo à sua nova base espacial, Capitão!",
    tut1: "SISTEMA LIGADO! Oi! Bem-vindo à sua nave de exploração.",
    tut2: "Para sobreviver, você precisa ficar de olho no Ar (O2), Água (H2O) e Bateria.",
    tut3: "OLHA LÁ: Um meteoro cinza! Atire nele (Espaço) para pegar Pedras de construção.",
    tut4: "OLHA LÁ: Um cometa azul (Gelo)! Pegue para encher sua Água e seu Ar AUTOMATICAMENTE.",
    tut5: "OLHA LÁ: Lixo espacial laranja (Sucata)! Atire para pegar Peças de Engenharia.",
    tut6: "CUIDADO: Atirar gasta sua Bateria! Pegue a Estrela Amarela para recarregar sua energia.",
    tut7: "BÔNUS: A anomalia roxa é um Super Nitro! Ela faz a nave voar super rápido por alguns segundos.",
    tut8: "PERIGO: Meteoros gigantes de pedra! Se bater, machuca a nave. Atire para quebrar!",
    tut9: "PERIGO MÁXIMO: Fogo vermelho! Desvie ou atire logo. Eles quebram a nave e causam super problemas!",
    tut10: "DICA: Pegue os itens bem rápido um atrás do outro para fazer um COMBO e ganhar muito mais!",
    tut11: "ALERTA: Fique sempre de olho nas suas barras. Se elas esvaziarem, a missão acaba.",
    tut12: "CONSERTOS: Se a nave quebrar, clique no botão REPARAR ali em cima.",
    tut13: "Falta muito para chegar? Olhe a barra de 'Distância' lá no topo da tela.",
    tut14: "DICA MESTRE: Comprar melhorias de Radar e Motor ajuda você a chegar mais rápido e seguro.",
    tut15: "DEFESA: Escudos e Torreta de Defesa protegem sua nave contra as batidas no espaço.",
    tut16: "Esqueceu algo? Clique no livro ali em cima (MANUAL) para lembrar como jogar!",
    tut17: "LOJA: Clique no botão piscando 'UPGRADES' para melhorar sua nave!",
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
    upgTurretDesc: "Um canhãozinho extra que atira sozinho e ajuda a defender a nave.",
    logbook: "DIÁRIO",
    logbookTitle: "Arquivos Secretos NASA",
    logbookSubtitle: "Registros de Missões Classificadas",
    locked: "ARQUIVO CORROMPIDO",
    lockedDesc: "Sobreviva a mais eventos espaciais durante a viagem para descriptografar os dados deste arquivo histórico.",
    historyFact: "ARQUIVO DESCLASSIFICADO: FATO REAL"
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
    tut17: "SHOP: Click the blinking 'UPGRADES' button to improve your ship!",
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
    upgTurretDesc: "A little extra cannon that shoots by itself and defends the ship.",
    logbook: "LOGBOOK",
    logbookTitle: "NASA Secret Files",
    logbookSubtitle: "Classified Mission Records",
    locked: "CORRUPTED FILE",
    lockedDesc: "Survive more space events during your journey to decrypt this true NASA historical record.",
    historyFact: "DECLASSIFIED: TRUE STORY"
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

// OS 30 EVENTOS HISTÓRICOS SUPER DETALHADOS!
export const GAME_EVENTS = [
  { id: 'evt1', title: { pt: 'Vazamento no Capacete (Caso Luca Parmitano)', en: 'Helmet Leak (Luca Parmitano)' }, desc: { pt: 'A água de resfriamento do traje espacial está vazando direto para dentro do capacete do piloto em gravidade zero!', en: 'Cooling water is leaking straight inside the astronauts helmet in zero gravity!' }, 
    history: { pt: "Em 2013, o astronauta Luca Parmitano viveu um terror real! A válvula do seu traje entupiu e vazou 1,5 litros de água. Sem gravidade para fazer a água cair no chão, a tensão superficial fez o líquido grudar no rosto dele. Sem conseguir ouvir ou enxergar, ele voltou às cegas para a Estação Espacial!", en: "In 2013, astronaut Luca Parmitano lived a real terror! His suit's valve clogged, leaking 1.5 liters of water. Without gravity, surface tension made the liquid stick to his face. Unable to see or hear, he returned blind to the ISS!" },
    options: [
      { text: { pt: 'Trocar a Bomba', en: 'Change Pump' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Boa! O entupimento foi resolvido e a água parou de vazar.', en: 'Great! The clog was fixed and water stopped leaking.' } },
      { text: { pt: 'Absorver com Poeira', en: 'Absorb with Dust' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'A terra formou uma lama que entupiu os tubos de respiração!', en: 'Dirt formed mud that clogged the breathing tubes!' } },
      { text: { pt: 'Esfriar Capacete', en: 'Cool Helmet' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'A água congelou, expandiu de tamanho e estourou as válvulas do traje.', en: 'Water froze, expanded, and burst the suit valves.' } },
      { text: { pt: 'Não Fazer Nada', en: 'Do Nothing' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'A água grudou no nariz e boca. Quase asfixiou o piloto!', en: 'Water stuck to the nose and mouth. Near asphyxiation!' } }
  ]},
  { id: 'evt2', title: { pt: 'Tanque Estourou (Caso Apollo 13)', en: 'Tank Blew Up (Apollo 13)' }, desc: { pt: 'Um curto-circuito fez o tanque de oxigênio principal explodir! Perdemos ar limpo e muita energia.', en: 'A short circuit blew the main oxygen tank! We lost clean air and power.' }, 
    history: { pt: "Na missão Apollo 13 em 1970, os astronautas iam para a Lua, mas uma explosão cortou o oxigênio e a energia da nave. O gás carbônico que eles expiravam começou a envenená-los. Usando capas de manuais, fita adesiva e meias, eles montaram um 'filtro quadrado num buraco redondo' genial para limpar o ar!", en: "On Apollo 13 in 1970, astronauts were heading to the Moon when an explosion cut oxygen and power. The carbon dioxide they exhaled started poisoning them. Using manual covers, duct tape, and socks, they built a genius 'square peg in a round hole' filter to clean the air!" },
    options: [
      { text: { pt: 'Filtro de Fita', en: 'Tape Filter' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Genial! Você usou fita, plástico e peças soltas para consertar o ar.', en: 'Genius! You used tape, plastic, and loose parts to fix the air.' } },
      { text: { pt: 'Ar do Gelo', en: 'Air from Ice' }, costType: 'ice', cost: 200, hpMod: -15, outcome: { pt: 'A máquina que tira oxigênio da água gastou o resto da bateria.', en: 'The machine that extracts oxygen from water wasted the rest of the battery.' } },
      { text: { pt: 'Tapar com Pedra', en: 'Patch with Stone' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A poeira lunar não isolou o buraco. O oxigênio precioso escapou.', en: 'Lunar dust didn\'t insulate the hole. Precious oxygen escaped.' } },
      { text: { pt: 'Respirar Fundo', en: 'Breathe Deeply' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'O gás carbônico se acumulou no sangue e todos desmaiaram nos controles.', en: 'Carbon dioxide built up in blood and everyone passed out at the controls.' } }
  ]},
  { id: 'evt3', title: { pt: 'Fogo na Nave (Estação Mir)', en: 'Fire on Ship (Mir Station)' }, desc: { pt: 'Uma máquina superaqueceu e pegou fogo! Está tudo cheio de fumaça tóxica no escuro.', en: 'A machine overheated and caught fire! It\'s full of toxic smoke in the dark.' }, 
    history: { pt: "Em 1997, um cartucho que gerava oxigênio na Estação Mir virou um lança-chamas químico. Mas a física do fogo no espaço é bizarra: como o ar quente não 'sobe' (não há gravidade), o fogo não forma labaredas altas, ele vira uma bolha redonda estacionária que se espalha se você abanar!", en: "In 1997, an oxygen-generating cartridge on Mir turned into a chemical flamethrower. But fire physics in space is bizarre: since hot air doesn't 'rise' (no gravity), fire doesn't flicker up; it forms a round, stationary bubble that spreads if you fan it!" },
    options: [
      { text: { pt: 'Apagar com Água', en: 'Put Out with Water' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'A água grudou na bolha estática de fogo e abafou a combustão.', en: 'Water stuck to the static fire bubble and smothered combustion.' } },
      { text: { pt: 'Abrir Janela', en: 'Open Window' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'O vácuo sugou o fogo, mas também levou o ar dos nossos pulmões!', en: 'The vacuum sucked the fire out, but also took the air from our lungs!' } },
      { text: { pt: 'Jogar Terra', en: 'Throw Dirt' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'A terra sujou os ventiladores de suporte à vida espalhando toxinas.', en: 'Dirt fouled the life support fans spreading toxins.' } },
      { text: { pt: 'Esperar', en: 'Wait' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'A bola de calor foi derretendo todos os painéis e cabos ao redor.', en: 'The heat ball melted all the surrounding panels and cables.' } }
  ]},
  { id: 'evt4', title: { pt: 'Batida Espacial (Caso Progress)', en: 'Space Crash (Progress Case)' }, desc: { pt: 'Uma nave automática de entregas falhou os freios, bateu na nossa base e fez um furo no casco!', en: 'An automated delivery ship failed its brakes, hit our base, and poked a hole in the hull!' }, 
    history: { pt: "Em 1997, a nave cargueira russa Progress M-34 colidiu com o painel solar e o módulo Spektr da Estação Mir durante um teste de pilotagem manual. O choque amassou a lataria e o ar começou a vazar para o espaço. Os astronautas tiveram que correr contra o relógio para cortar fios com facas e fechar a escotilha grossa a tempo.", en: "In 1997, the Russian Progress M-34 cargo ship collided with Mir's Spektr module during a manual piloting test. The crash dented the hull and air began leaking into space. Astronauts raced against time to cut wires with knives and shut the heavy hatch." },
    options: [
      { text: { pt: 'Trancar a Porta', en: 'Lock the Door' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Ufa! Você trancou o módulo furado a tempo isolando o problema. Nave salva.', en: 'Phew! You locked the punctured module in time isolating the problem. Ship saved.' } },
      { text: { pt: 'Tapar com Pedras', en: 'Patch with Rocks' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A força brutal da despressurização sugou as pedras feito aspirador.', en: 'The brutal force of depressurization sucked the rocks like a vacuum.' } },
      { text: { pt: 'Congelar Buraco', en: 'Freeze Hole' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O gelo na lataria derreteu e evaporou em segundos sob a luz do sol.', en: 'Ice on the hull melted and evaporated in seconds under sunlight.' } },
      { text: { pt: 'Ficar Parado', en: 'Stand Still' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'A pressão caiu tanto que os fluidos nos nossos olhos começaram a ferver!', en: 'Pressure dropped so much that the fluids in our eyes began to boil!' } }
  ]},
  { id: 'evt5', title: { pt: 'Computador Travou (Apollo 11)', en: 'Computer Froze (Apollo 11)' }, desc: { pt: 'Alarme 1202! O processador do nosso computador central recebeu dados inúteis do radar e está travando.', en: 'Alarm 1202! Our central computer processor got useless radar data and is freezing.' }, 
    history: { pt: "No momento crítico da descida à Lua, o computador da Apollo 11 apitou o Erro 1202. Parecia que ia explodir! Mas a genial engenheira de software Margaret Hamilton havia programado o sistema para reiniciar tarefas chatas e priorizar os motores de pouso. Sem o código dela, o pouso de Neil Armstrong nunca teria acontecido.", en: "During the critical descent to the Moon, Apollo 11's computer beeped Error 1202. It seemed it would crash! But genius software engineer Margaret Hamilton programmed the system to drop boring tasks and prioritize landing engines. Without her code, Neil Armstrong's landing wouldn't have happened." },
    options: [
      { text: { pt: 'Descartar Dados Bobos', en: 'Drop Silly Data' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Perfeito! O sistema ignorou o radar e focou os cálculos no pouso seguro.', en: 'Perfect! The system ignored the radar and focused calculations on landing safely.' } },
      { text: { pt: 'Resfriar o PC com Gelo', en: 'Ice the PC' }, costType: 'ice', cost: 100, hpMod: -10, outcome: { pt: 'O erro não era de calor, era sobrecarga de software! Gelo molhou as placas.', en: 'The error wasn\'t heat, it was software overload! Ice wet the boards.' } },
      { text: { pt: 'Reiniciar Tudo Rápido', en: 'Hard Reboot' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'Ao reiniciar, perdemos a leitura do solo, descemos rápido e amassamos o chassi.', en: 'Upon rebooting, we lost ground readings, dropped fast, and dented the chassis.' } },
      { text: { pt: 'Pânico nos Controles', en: 'Panic at Controls' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Sem saber a distância, a nave chocou-se violentamente contra a superfície dura.', en: 'Without knowing the distance, the ship crashed violently into the hard surface.' } }
  ]},
  { id: 'evt6', title: { pt: 'Nave Giratória (Caso Gemini 8)', en: 'Spinning Ship (Gemini 8 Case)' }, desc: { pt: 'Um pequeno motor lateral travou aberto! A nave roda igual peão e a Força G está esmagando os pilotos.', en: 'A small side motor got stuck open! The ship spins like a top and G-Force is crushing pilots.' }, 
    history: { pt: "Na missão Gemini 8 (1966), a nave começou a rolar uma vez por segundo no espaço vazio! A força centrífuga puxava o sangue do cérebro dos tripulantes. Neil Armstrong salvou a equipe tomando uma decisão drástica: ele cortou toda a bateria do sistema defeituoso e usou o combustível de retorno para estabilizar.", en: "On the Gemini 8 mission (1966), the ship started rolling once per second in empty space! Centrifugal force pulled blood from the crew's brains. Neil Armstrong saved the team by taking a drastic choice: he cut all power to the broken system and used return fuel to stabilize." },
    options: [
      { text: { pt: 'Cortar Bateria Principal', en: 'Cut Main Battery' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Corajoso! Ficar sem luz desligou a válvula teimosa. Nave alinhada novamente.', en: 'Brave! Going dark shut down the stubborn valve. Ship aligned again.' } },
      { text: { pt: 'Jato de Água Oposto', en: 'Opposite Water Jet' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'A terceira Lei de Newton falhou aqui: a pressão do vapor era bem menor que o motor.', en: 'Newton\'s Third Law failed here: steam pressure was way less than the engine.' } },
      { text: { pt: 'Arremessar Pedras', en: 'Throw Stones' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'Mudar a massa da nave só fez ela começar a capotar de cabeça para baixo também!', en: 'Changing the ship\'s mass only made it start tumbling upside down too!' } },
      { text: { pt: 'Segurar Firme', en: 'Hold On Tight' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'O giro contínuo drenou o sangue do cérebro (G-LOC). Desmaiamos no manche.', en: 'Continuous spin drained blood from the brain (G-LOC). We passed out on the stick.' } }
  ]},
  { id: 'evt7', title: { pt: 'Tiro de Lixo Espacial (Soyuz)', en: 'Space Junk Shot (Soyuz)' }, desc: { pt: 'Um pedacinho de lata invisível voando a 27.000 km/h rasgou o tubo de refrigeração! Fluido vazando.', en: 'An invisible piece of tin flying at 27,000 km/h tore the cooling tube! Fluid leaking.' }, 
    history: { pt: "O lixo espacial viaja em velocidades absurdas (8 a 10 km por segundo). Em 2022, a nave russa Soyuz MS-22 teve seu sistema de resfriamento atravessado por um micrometeorito de apenas 1 milímetro. Sem o líquido gelado, os computadores vitais lá dentro começaram a ferver a 50°C e a nave não pôde trazer ninguém de volta.", en: "Space junk travels at absurd speeds (8 to 10 km per second). In 2022, Russian ship Soyuz MS-22 had its cooling system pierced by a 1-millimeter micrometeoroid. Without cold liquid, vital computers inside began boiling at 50°C and the ship couldn't bring anyone back." },
    options: [
      { text: { pt: 'Cola Espacial (Epóxi)', en: 'Space Glue (Epoxy)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'O polímero de resina secou super rápido e tapou o microfuro. O líquido parou de sair.', en: 'The resin polymer dried super fast and plugged the microhole. Liquid stopped coming out.' } },
      { text: { pt: 'Tampão de Gelo', en: 'Ice Plug' }, costType: 'ice', cost: 100, hpMod: -25, outcome: { pt: 'Propriedade da água: quando vira gelo, ela expande! A expansão arregaçou mais o cano.', en: 'Water property: when it turns to ice, it expands! The expansion tore the pipe open more.' } },
      { text: { pt: 'Esfregar Pedras', en: 'Rub Stones' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'O líquido que vazou virou neve espacial, misturou com poeira e cegou as câmeras laterais.', en: 'Leaking liquid turned into space snow, mixed with dust and blinded side cameras.' } },
      { text: { pt: 'Deixar Vazar', en: 'Let it Leak' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Sem o gelo do cano, o nosso computador principal superaqueceu e precisou ser deligado.', en: 'Without ice in the pipe, our main computer overheated and had to be turned off.' } }
  ]},
  { id: 'evt8', title: { pt: 'Poeira Lunar Cortante', en: 'Sharp Lunar Dust' }, desc: { pt: 'A poeira está entrando nas roupas espaciais e no ar. Ela arranha como cacos de vidro microscópicos!', en: 'Dust is getting into spacesuits and air. It scratches like microscopic glass shards!' }, 
    history: { pt: "Na Terra, a chuva e o vento lixam as pedras até ficarem redondinhas. Na Lua, como não tem clima, a poeira (regolito) é cheia de pontas afiadas feitas de silicato. Os astronautas da Apollo sofreram arranhões nos olhos, trajes travados e 'Febre do Feno Lunar' ao respirar isso dentro do módulo.", en: "On Earth, rain and wind sand rocks until they are round. On the Moon, with no weather, dust (regolith) is full of sharp edges made of silicate. Apollo astronauts suffered eye scratches, jammed suits, and 'Lunar Hay Fever' breathing it inside the module." },
    options: [
      { text: { pt: 'Ligar Eletroímãs', en: 'Turn on Electromagnets' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Excelente! A poeira de Marte/Lua é muito rica em ferro. O ímã prendeu ela no teto.', en: 'Excellent! Mars/Moon dust is very iron-rich. The magnet trapped it on the ceiling.' } },
      { text: { pt: 'Lavar Tudo com Água', en: 'Wash Everything' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'A poeira virou lama nas articulações da roupa e secou como um cimento inquebrável.', en: 'Dust turned to mud in suit joints and dried like unbreakable cement.' } },
      { text: { pt: 'Bater Roupas com Pedra', en: 'Beat Suits with Stone' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Ao bater nas roupas, você só esmagou as partículas afiadas mais fundo no tecido.', en: 'By beating the suits, you only crushed sharp particles deeper into the fabric.' } },
      { text: { pt: 'Respirar Normalmente', en: 'Breathe Normally' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O vidro microscópico arranhou a garganta da tripulação inteira (Febre Lunar grave).', en: 'Microscopic glass scratched the throats of the entire crew (Severe Lunar Fever).' } }
  ]},
  { id: 'evt9', title: { pt: 'Escudo Furado (Caso Columbia)', en: 'Pierced Shield (Columbia Case)' }, desc: { pt: 'Um pedaço protetor da barriga da nave quebrou. Se formos pousar num planeta, o calor da velocidade derreterá o alumínio.', en: 'A protective belly piece broke off. If we land on a planet, speed heat will melt aluminum.' }, 
    history: { pt: "A maior tragédia moderna da NASA, o desastre do Columbia em 2003, aconteceu porque um pedaço bobo de espuma bateu na asa durante a decolagem. Aquilo fez um furo na proteção térmica. Durante a reentrada na Terra, ventos superaquecidos a 1.500°C entraram pelo furo e derreteram a estrutura inteira de dentro para fora.", en: "NASA's greatest modern tragedy, the 2003 Columbia disaster, happened because a silly piece of foam hit the wing during launch. It punched a hole in thermal protection. During Earth reentry, superheated 1,500°C winds entered the hole and melted the structure from the inside out." },
    options: [
      { text: { pt: 'Fazer Cerâmica Espacial', en: 'Make Space Ceramic' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'Você bateu pedras vulcânicas até criar uma massa resistente ao fogo ablativo. A asa sobreviveu!', en: 'You smashed volcanic rocks into a fire-resistant ablative paste. The wing survived!' } },
      { text: { pt: 'Soldar Metal Velho', en: 'Weld Old Metal' }, costType: 'parts', cost: 200, hpMod: -25, outcome: { pt: 'Física pura: o ponto de derretimento do metal era menor que o calor do plasma. A peça evaporou.', en: 'Pure physics: metal melting point was lower than plasma heat. The part evaporated.' } },
      { text: { pt: 'Aplicar Blocos de Gelo', en: 'Apply Ice Blocks' }, costType: 'ice', cost: 150, hpMod: -35, outcome: { pt: 'O gelo absolveu calor latente muito bem, mas logo em seguida virou vapor e nos deixou sem escudo.', en: 'Ice absorbed latent heat well, but then flashed to steam leaving us shieldless.' } },
      { text: { pt: 'Deixar Assim Mesmo', en: 'Leave it Like That' }, costType: 'none', cost: 0, hpMod: -50, outcome: { pt: 'O gás superaquecido invadiu a asa rasgada e fritou todo o cabeamento elétrico vital de navegação.', en: 'Superheated gas invaded the torn wing and fried all vital electrical navigation cables.' } }
  ]},
  { id: 'evt10', title: { pt: 'Borrachinha Fria (Challenger)', en: 'Cold Rubber (Challenger)' }, desc: { pt: 'As válvulas são fechadas por anéis elásticos, mas o frio bizarro de -150°C do espaço deixou eles duros feito pedra!', en: 'Valves are closed by elastic rings, but bizarre -150°C space cold made them hard as stone!' }, 
    history: { pt: "Em janeiro de 1986, fez muito frio na Flórida. Os anéis O-Ring de borracha que vedavam os foguetes do Ônibus Espacial Challenger ficaram congelados e perderam a elasticidade. Quando o motor ligou, gases em chamas vazaram pelo buraco que a borracha não tapou, furando o tanque principal e gerando a explosão icônica.", en: "In January 1986, it was freezing in Florida. Rubber O-Rings sealing the Challenger Space Shuttle rockets froze and lost elasticity. When the engine fired, burning gases leaked through the gap the rubber didn't plug, piercing the main tank and causing the iconic explosion." },
    options: [
      { text: { pt: 'Enrolar Bobina Quente', en: 'Wrap Hot Coil' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Físico Richard Feynman ficaria orgulhoso. O calor devolveu o balanço elástico da borracha perfeitamente.', en: 'Physicist Richard Feynman would be proud. Heat returned the rubber\'s elastic bounce perfectly.' } },
      { text: { pt: 'Proteger com Pedra', en: 'Protect with Stone' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'Pedra gelada encostada em borracha gelada não produz mágica. O material continuou duro e falho.', en: 'Freezing stone touching freezing rubber makes no magic. Material stayed hard and failed.' } },
      { text: { pt: 'Esguichar Água', en: 'Squirt Water' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A água até esfregou a válvula, mas logo congelou no vácuo rasgando o cano de vez.', en: 'Water scrubbed the valve, but soon froze in vacuum tearing the pipe open.' } },
      { text: { pt: 'Ligar Turbo Máximo', en: 'Full Turbo Power' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'A pressão violenta empurrou a borracha dura para trás e uma língua de fogo devorou o tanque.', en: 'Violent pressure pushed the hard rubber back and a tongue of fire devoured the tank.' } }
  ]},
  { id: 'evt11', title: { pt: 'Desastre na Privada Espacial', en: 'Space Toilet Disaster' }, desc: { pt: 'O sistema sanitário quebrou. Sem gravidade, o xixi misturado com amônia está flutuando na cabine em pequenas bolhas amareladas corrosivas.', en: 'Sanitary system broke. Without gravity, pee mixed with ammonia is floating in the cabin in corrosive yellowish bubbles.' }, 
    history: { pt: "Na missão da Crew Dragon Inspiration4, um cano descolou debaixo do chão e urina ficou vazando lentamente. Em outras missões antigas, cocô espacial já flutuou livremente pelas cabeças (caso famoso da Apollo 10). Sem gravidade para cair na bacia, todo vaso sanitário precisa de um potente ventilador sugador (vácuo artificial) para funcionar.", en: "On the Crew Dragon Inspiration4 mission, a pipe unglued under the floor and urine leaked slowly. In older missions, space poop floated freely over heads (famous Apollo 10 case). Without gravity to fall in the bowl, every toilet needs a powerful sucking fan (artificial vacuum) to work." },
    options: [
      { text: { pt: 'Consertar Motor de Vácuo', en: 'Fix Vacuum Motor' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Maravilha! O aspirador sanitário ligou e chupou toda a nuvem tóxica de volta pro ralo.', en: 'Wonderful! The sanitary vacuum turned on and sucked the toxic cloud back into the drain.' } },
      { text: { pt: 'Caixinha de Areia', en: 'Litter Box' }, costType: 'regolith', cost: 120, hpMod: -10, outcome: { pt: 'As bolhas bateram na areia e viraram asteroides marrons que sujaram as janelas ópticas.', en: 'Bubbles hit the sand and turned into brown asteroids that dirtied optical windows.' } },
      { text: { pt: 'Tiro de Gelo Neles', en: 'Ice Shot at Them' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'Congelar urina no espaço gerou pedregulhos de xixi sólido, batendo no painel e irritando o piloto.', en: 'Freezing urine in space made solid pee pebbles, hitting the panel and annoying the pilot.' } },
      { text: { pt: 'Deixar Rolar', en: 'Let it Be' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O cheiro químico ficou tão poderoso que irritou as córneas. Além do dano elétrico por curto-circuito.', en: 'Chemical smell got so powerful it irritated corneas. Plus electrical damage from short circuits.' } }
  ]},
  { id: 'evt12', title: { pt: 'Tempestade Solar Fervente', en: 'Boiling Solar Storm' }, desc: { pt: 'O Sol disparou partículas altamente radioativas em nossa direção. A radiação está entrando na nave cortando nosso DNA.', en: 'The Sun fired highly radioactive particles our way. Radiation is entering the ship cutting our DNA.' }, 
    history: { pt: "As Tempestades Solares (Ejeções de Massa Coronal) são perigosíssimas. Para proteger os astronautas em futuras viagens a Marte, a NASA descobriu que o material mais denso em hidrogênio para bloquear raios gama não é o metal chumbo, mas sim... barris de ÁGUA líquida! A água reflete radiação maravilhosamente bem.", en: "Solar Storms (Coronal Mass Ejections) are extremely dangerous. To protect astronauts on future Mars trips, NASA found that the best hydrogen-dense material to block gamma rays isn't lead metal, but... barrels of liquid WATER! Water reflects radiation wonderfully well." },
    options: [
      { text: { pt: 'Muro com Água', en: 'Wall of Water' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'Ciência real! A alta densidade de hidrogênio da água absorveu e dispersou os prótons solares com perfeição.', en: 'Real science! Water\'s high hydrogen density absorbed and scattered solar protons perfectly.' } },
      { text: { pt: 'Esconder Atrás de Pedra', en: 'Hide Behind Stone' }, costType: 'regolith', cost: 200, hpMod: -20, outcome: { pt: 'Quando prótons batem em massa bruta de rocha, eles geram raios X secundários ainda piores (Física das partículas).', en: 'When protons hit brute rock mass, they generate even worse secondary X-rays (Particle physics).' } },
      { text: { pt: 'Ligar Super Imã', en: 'Turn on Super Magnet' }, costType: 'parts', cost: 200, hpMod: -15, outcome: { pt: 'Seu escudo eletromagnético puxou tanta bateria que os suportes vitais pifaram e fez calor de 40°C.', en: 'Your electromagnetic shield drew so much battery that life support failed and heat hit 40°C.' } },
      { text: { pt: 'Continuar Lendo Revista', en: 'Keep Reading Magazine' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'A radiação destruiu a memória RAM do computador e deu um enjoo mortal na barriga de todos a bordo.', en: 'Radiation destroyed the computer RAM and gave everyone a deadly tummy ache.' } }
  ]},
  { id: 'evt13', title: { pt: 'Chuva de Lixo Espacial (Kessler)', en: 'Space Junk Rain (Kessler)' }, desc: { pt: 'Uma constelação de satélites bateu, gerando uma nuvem gigante de lixo viajando a velocidade hiper-rápida (27.000 km/h)!', en: 'A satellite constellation crashed, generating a giant cloud of junk traveling at hyper-fast speeds (27,000 km/h)!' }, 
    history: { pt: "A 'Síndrome de Kessler' é o pesadelo da NASA: um satélite quebra em mil pedaços, que batem em outros satélites quebrando em um milhão de pedaços! Uma vez, os astronautas da ISS (Estação Espacial) tiveram que se esconder nas cápsulas de emergência com os cintos fivelados porque um lixo velho da Rússia passou raspando por eles a 10 km por segundo!", en: "The 'Kessler Syndrome' is NASA's nightmare: a satellite breaks into a thousand pieces, hitting others into a million! Once, ISS astronauts had to hide in emergency pods buckled up because old Russian junk scraped by at 10 km per second!" },
    options: [
      { text: { pt: 'Acelerar Puxando G', en: 'Accelerate Pulling Gs' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Você gastou os foguetes de manobra lateral, mudando o ângulo da nossa órbita na hora certa (Evasão Cinética).', en: 'You spent lateral maneuver rockets, changing our orbital angle just in time (Kinetic Evasion).' } },
      { text: { pt: 'Escudo com Pedras', en: 'Shield with Stones' }, costType: 'regolith', cost: 200, hpMod: -30, outcome: { pt: 'Os parafusos da nuvem furaram a pedra solta transformando tudo num estilhaço infernal nas janelas de vidro.', en: 'Cloud screws pierced loose stone turning it all into a hellish shrapnel on glass windows.' } },
      { text: { pt: 'Escudo Líquido', en: 'Liquid Shield' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'As balas de metal voam tão rápido que a água no espaço mal encostou e fomos cravados de metal velho.', en: 'Metal bullets fly so fast that space water barely touched them and we got peppered with old metal.' } },
      { text: { pt: 'Confiar na Sorte', en: 'Trust Luck' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'A energia E=mv² dos pregos abriu um rasgo fenomenal na mesa de controles. Fios e ar sugados pela fresta.', en: 'The E=mv² energy of the nails ripped a phenomenal gash in the control desk. Wires and air sucked out.' } }
  ]},
  { id: 'evt14', title: { pt: 'Fraqueza Muscular', en: 'Muscle Weakness' }, desc: { pt: 'A falta de peso está fazendo os músculos da tripulação sumirem e os ossos perderem cálcio. O piloto não aguenta segurar o manche firme.', en: 'Lack of weight is making crew muscles fade and bones lose calcium. Pilot can\'t hold stick firmly.' }, 
    history: { pt: "No espaço, você não precisa fazer força para levantar uma perna. Por causa disso, o corpo humano dissolve os ossos, jogando o cálcio fora. Na ISS, os astronautas passam no mínimo 2 horas do dia malhando duramente numa máquina especial (ARED) que usa pistões de vácuo para imitar pesos terrestres.", en: "In space, you use no force to lift a leg. Because of this, the human body dissolves bones, throwing calcium away. On the ISS, astronauts spend 2 hours daily working out on a special machine (ARED) using vacuum pistons to mimic weights." },
    options: [
      { text: { pt: 'Construir Máquina (ARED)', en: 'Build Machine (ARED)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'O uso de elásticos e molas deu resistência para malhar os braços. A tripulação voltou ao shape!', en: 'Using elastics and springs gave resistance for arm workouts. Crew got back in shape!' } },
      { text: { pt: 'Levantar Rochas Giga', en: 'Lift Giga Rocks' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'Física Clássica: a rocha pode ter muita MASSA, mas não tem PESO no espaço. A inércia enganou as costas dele.', en: 'Classic Physics: the rock has MASS, but no WEIGHT in space. Inertia fooled his back.' } },
      { text: { pt: 'Banheira Quente Quente', en: 'Super Hot Tub' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'Água morna emagrece e relaxa. Tudo que um corpo molenga NÃO quer é ficar relaxado no vácuo.', en: 'Warm water slims and relaxes. A soft body in a vacuum DOES NOT want to be relaxed.' } },
      { text: { pt: 'Ficar na Preguiça', en: 'Be Lazy' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O cálcio que saiu dos ossos formou terríveis pedras nos rins da equipe inteira de tanta flacidez celular.', en: 'Calcium from bones formed terrible kidney stones for the whole crew due to cellular flaccidity.' } }
  ]},
  { id: 'evt15', title: { pt: 'Nuvem Mágica de Gelo (Cometa)', en: 'Magic Ice Cloud (Comet)' }, desc: { pt: 'Navegamos por dentro da cauda de um cometa antigo! É deslumbrante, mas milhões de micro pedrinhas velozes estão lixando a frente da nave (Erosão).', en: 'We sailed inside an ancient comet tail! It\'s gorgeous, but millions of fast micro-pebbles are sanding the ship front (Erosion).' }, 
    history: { pt: "Para lutar contra isso, os engenheiros da NASA criaram o Escudo Whipple: uma folha fina de alumínio presa um pouco antes da parede da nave principal. Quando o micrometeoro bate nessa folha fina, ele se espatifa numa nuvem de poeira e não fura o casco grosso de trás.", en: "To fight this, NASA engineers created the Whipple Shield: a thin aluminum sheet held just before the main hull. When a micrometeoroid hits this thin sheet, it shatters into a dust cloud and doesn't pierce the thick hull behind." },
    options: [
      { text: { pt: 'Escudo Duplo Rápido', en: 'Fast Double Shield' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Funciona! A placa avançada fez as pedrinhas quebrarem antes de relarem na parede do suporte vital.', en: 'Works! The advanced plate shattered pebbles before they touched the life support wall.' } },
      { text: { pt: 'Lançar Gelo Frente', en: 'Throw Ice Front' }, costType: 'ice', cost: 180, hpMod: -15, outcome: { pt: 'O gelo na frente virou mais um milhão de cacos, aumentando o estrago nas antenas delicadas.', en: 'Ice in front turned into a million more shards, increasing damage to delicate antennas.' } },
      { text: { pt: 'Esfregar Pedras (Lixa)', en: 'Rub Stones (Sand)' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'O pó lunar junto com a cauda do cometa arranhou fatalmente todo o material refletor térmico.', en: 'Lunar dust plus comet tail fatally scratched all thermal reflective material.' } },
      { text: { pt: 'Ignorar as Pedrinhas', en: 'Ignore Pebbles' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Um barulho insuportável tomou conta da cabine. Painéis ópticos do rádio ficaram foscos permanentemente.', en: 'An unbearable noise filled the cabin. Radio optical panels became frosted permanently.' } }
  ]},
  { id: 'evt16', title: { pt: 'Alarme Mudo (Explosão Solar)', en: 'Mute Alarm (Solar Flare)' }, desc: { pt: 'Clarão ofuscante! O sol disparou uma labareda (Classe X) e sobrecarregou o topo do nosso céu. O rádio principal ficou chiando!', en: 'Blinding flash! The sun fired an X-Class flare and overloaded the top of our sky. Main radio is hissing!' }, 
    history: { pt: "Quando o Sol tem uma Erupção Solar severa, a energia chega na Terra em apenas 8 minutos, iluminando e agitando os elétrons da nossa Ionosfera. Resultado? A atmosfera inteira vira um espelho bagunçado de rádio, derrubando comunicações, radares de aviões e satélites do mundo todo (Blackout de Rádio).", en: "When the Sun has a severe Solar Flare, energy hits Earth in 8 mins, lighting up and agitating Ionosphere electrons. Result? The entire atmosphere becomes a messy radio mirror, knocking out comms, plane radars, and satellites worldwide (Radio Blackout)." },
    options: [
      { text: { pt: 'Mudar Pra Frequência UHF', en: 'Switch to UHF Band' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Gênio das ondas! Ajustar o rádio para frequências hiper-altas furou a barreira ionizada brilhante do sol.', en: 'Wave genius! Adjusting radio to hyper-high frequencies pierced the glowing ionized solar barrier.' } },
      { text: { pt: 'Jogar Água na Antena', en: 'Water on Antenna' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Isso é rádio, não temperatura térmica! A água congelada na antena prato só distorceu mais as ondas eletromagnéticas.', en: 'This is radio, not thermal temp! Frozen water on the dish antenna only distorted EM waves more.' } },
      { text: { pt: 'Cobrir Receptor de Pó', en: 'Dust on Receiver' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'Encher os diodos de rocha esfarelada tapou de vez qualquer estalo de comunicação vital e abafou a rede.', en: 'Filling diodes with crumbled rock completely plugged any vital comms crackle and muffled the net.' } },
      { text: { pt: 'Socar a Tela', en: 'Punch the Screen' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Bater na mesa irritado não impediu que o pulso eletromagnético (EMP) apagasse os radares por duas horas.', en: 'Punching the desk angrily didn\'t stop the electromagnetic pulse (EMP) from blanking radars for 2 hours.' } }
  ]},
  { id: 'evt17', title: { pt: 'Falta de Energia (Ingenuity)', en: 'Power Loss (Ingenuity)' }, desc: { pt: 'A noite caiu de forma súbita. A temperatura bateu -90°C. Nossas baterias estão drenando brutalmente para aquecer os cérebros dos robôs.', en: 'Night fell suddenly. Temp hit -90°C. Batteries are draining brutally to heat robot brains.' }, 
    history: { pt: "O helicóptero de Marte Ingenuity foi um milagre da engenharia. A atmosfera de Marte é fina, então a noite não guarda calor. Mais de 60% da bateria minúscula do helicóptero nunca é usada para girar as hélices, e sim apenas para ligar um aquecedorzinho simples, evitando que seus chips rachem de frio durante a madrugada terrível!", en: "Mars helicopter Ingenuity was an engineering miracle. Mars atmosphere is thin, so nights don't hold heat. Over 60% of the tiny battery is never used to spin blades, but just to run a simple heater, keeping chips from cracking during the terrible freezing dawn!" },
    options: [
      { text: { pt: 'Ligar Isolante Térmico', en: 'Turn on Thermal Insulator' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Gasto energético salvo! Instalar um cobertorzinho aquecido e peças extras deixou tudo confortável.', en: 'Energy expense saved! Installing a heated little blanket and extra parts made everything cozy.' } },
      { text: { pt: 'Esguicho d\'Água Fervendo', en: 'Squirt Boiling Water' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'Péssima escolha. O vapor congelou antes de relar na placa mãe, formando estalactites de gelo no painel.', en: 'Terrible choice. Steam froze before touching the motherboard, forming ice stalactites on the panel.' } },
      { text: { pt: 'Ligar Motor pra Girar (Soco)', en: 'Rev Engine to Spin' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Atrito por pedras gasta força demais. O motor tentou rodar e a engrenagem quebrou dura feito vidro.', en: 'Friction by stones wastes too much force. Motor tried spinning and gears shattered like glass.' } },
      { text: { pt: 'Apagar e Dormir', en: 'Shut Down & Sleep' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Sem o aquecedor elétrico, os terminais da bateria congelaram e o processador esfarelou pela manhã.', en: 'Without the electric heater, battery terminals froze and the processor crumbled by morning.' } }
  ]},
  { id: 'evt18', title: { pt: 'Freio de Paraquedas (Pathfinder)', en: 'Parachute Brake (Pathfinder)' }, desc: { pt: 'Os computadores avisam: a gravidade e o vácuo farão a nave espatifar como um tomate no chão do planeta! Não há combustível de freio.', en: 'Computers warn: gravity and vacuum will smash the ship like a tomato on planet ground! No brake fuel.' }, 
    history: { pt: "A NASA inovou muito na década de 90. Sem foguetes pesados ou gravidade para usar paraquedas simples, os jipes Pathfinder, Spirit e Opportunity pousaram usando bolas de airbag! As sondas batiam no chão de Marte e quicavam dezenas de vezes como enormes bolas de basquete brancas até pararem rolando no pó vermelho.", en: "NASA innovated hugely in the 90s. With no heavy rockets or gravity for simple parachutes, Pathfinder, Spirit, and Opportunity rovers landed using airbags! Probes hit the Martian floor and bounced dozens of times like huge white basketballs before rolling to a stop in red dust." },
    options: [
      { text: { pt: 'Acionar Airbags Gigantes', en: 'Deploy Giant Airbags' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Boi-ing! A cápsula caiu e quicou 15 vezes bem alto amortecendo cada centímetro da força final.', en: 'Boing! Capsule fell and bounced 15 times very high cushioning every inch of the final force.' } },
      { text: { pt: 'Soltar Peso de Pedra', en: 'Drop Rock Weights' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'Soltar pedras deixou mais leve, mas a aceleração gravitacional (9,8m/s²) não se importa com a massa.', en: 'Dropping rocks made it lighter, but gravitational acceleration (9.8m/s²) doesn\'t care about mass.' } },
      { text: { pt: 'Neve de Proteção', en: 'Protection Snow' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Uma camadinha de gelo embaixo não venceu milhares de toneladas de energia cinética na queda livre.', en: 'A tiny ice layer underneath didn\'t beat thousands of tons of kinetic energy in freefall.' } },
      { text: { pt: 'Pular na Grama Macia', en: 'Jump on Soft Grass' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Grama espacial? Não tem atmosfera, colega. A nave embicou na cratera a 3.000 km/h quebrando os eixos.', en: 'Space grass? No atmosphere, buddy. Ship nosedived into a crater at 3,000 km/h snapping axles.' } }
  ]},
  { id: 'evt19', title: { pt: 'Visão Embaçada (Hubble)', en: 'Blurry Vision (Hubble)' }, desc: { pt: 'O espelho principal está com defeito de 2 micrômetros de grossura! Estamos tirando fotos de borrões confusos em vez de galáxias e caminhos.', en: 'Main mirror has a 2 micrometer thickness defect! We\'re taking blurry smudge photos instead of galaxies and paths.' }, 
    history: { pt: "Quando a NASA lançou o icônico Telescópio Hubble por 1 bilhão de dólares em 1990, descobriram no espaço que um matemático errou e o espelho ficou muito liso nos cantos (Aberração Esférica). Foi o maior mico do mundo. Três anos depois, astronautas instalaram caixinhas chamadas COSTAR, que funcionavam exatamente como 'óculos de grau' pro telescópio!", en: "When NASA launched the iconic billion-dollar Hubble Telescope in 1990, they found in space a mathematician erred and the mirror was too flat on edges (Spherical Aberration). Huge embarrassment. 3 years later, astronauts installed COSTAR boxes, acting exactly like 'prescription glasses' for the telescope!" },
    options: [
      { text: { pt: 'Fazer Óculos (COSTAR)', en: 'Make Glasses (COSTAR)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Gênio da engenharia ótica! O óculos espacial cancelou a aberração e o foco voltou a piscar brilhante.', en: 'Optical engineering genius! Space glasses canceled aberration and focus blinked bright again.' } },
      { text: { pt: 'Lavar e Enxugar Lente', en: 'Wash and Dry Lens' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'A lente berílio absorveu o calo térmico da água secando com machas duras de minerais. Borrão terrível.', en: 'Beryllium lens absorbed water\'s thermal heat drying with hard mineral stains. Terrible blur.' } },
      { text: { pt: 'Esfregar com Lixa Braba', en: 'Scrub with Harsh Sand' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Arear o espelho de 2 bilhões não é inteligente! A poeira riscou tudo tirando a cobertura anti-reflexo.', en: 'Sanding the 2-billion mirror isn\'t smart! Dust scratched it all removing anti-reflective coating.' } },
      { text: { pt: 'Olhar Bem de Pertinho', en: 'Look Really Close' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Com as câmeras míopes, a inteligência da nave se confundiu com uma estrela dupla e quase batemos.', en: 'With myopic cameras, ship intelligence confused a double star and we nearly crashed.' } }
  ]},
  { id: 'evt20', title: { pt: 'Pedra Gigante e Cega', en: 'Giant Blind Rock' }, desc: { pt: 'O radar mostra uma lua pequena (Asteroide Dimorphos) exatamente no meio do percurso! Não temos como virar.', en: 'Radar shows a small moon (Asteroid Dimorphos) right in the path! No way to turn.' }, 
    history: { pt: "A humanidade provou que defende a Terra! Em 2022, a missão DART (NASA) esmagou uma pequena sonda espacial inteira diretamente no asteroide lunar Dimorphos, batendo de frente. Ao arremessar as peças de titânio (Massa a toda velocidade), eles alteraram perfeitamente o tempo da rotação e empurraram a pedra perigosa.", en: "Humanity proved it defends Earth! In 2022, DART mission (NASA) smashed an entire small probe right into the moonlet asteroid Dimorphos, head-on. By hurling titanium parts (Mass at full speed), they perfectly altered its rotation time and pushed the dangerous rock." },
    options: [
      { text: { pt: 'Bater com Sonda Veloz', en: 'Crash Fast Probe' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Isso que é Transferência de Momento Linear (p=m*v)! O peso deslocou a pedra centímetros pro lado seguro.', en: 'That\'s Linear Momentum Transfer (p=m*v)! Weight shifted the rock inches to the safe side.' } },
      { text: { pt: 'Atirar Muitas Pedras', en: 'Shoot Many Stones' }, costType: 'regolith', cost: 200, hpMod: -15, outcome: { pt: 'Jogar pedrinhas de cascalho espalhou o bando, mas a inércia maior (centro) da montanha não se mexeu.', en: 'Throwing gravel pebbles spread the pack, but the mountain\'s larger inertia (center) didn\'t move.' } },
      { text: { pt: 'Esguicho de Água Pressão', en: 'Pressure Water Squirt' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'Vapor dissipou-se num belo arco-íris gasoso na escuridão. Impacto mecânico nulo contra a pedra densa.', en: 'Vapor dissipated in a beautiful gas rainbow in the dark. Zero mechanical impact against the dense rock.' } },
      { text: { pt: 'Rezar pra Desviar', en: 'Pray to Dodge' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Tivemos que dar um cavalo de pau no manche. Os giroscópios choraram enquanto amassávamos o pára-choque.', en: 'Had to yank the stick like crazy. Gyroscopes cried as we dented the bumper.' } }
  ]},
  { id: 'evt21', title: { pt: 'Costura Espacial (ISS)', en: 'Space Sewing (ISS)' }, desc: { pt: 'Uma asa de placa de energia solar novinha rasgou feito pano. Se ela cair para trás, perdemos toda energia!', en: 'A brand new solar power panel wing tore like cloth. If it falls back, we lose all power!' }, 
    history: { pt: "Em 2007, o enorme painel solar da Estação Espacial prendeu num fio guia e começou a rasgar violentamente, podendo desabar. O herói Scott Parazynski viajou pendurado num braço mecânico lá fora com uma fita e 'Abotoaduras' feitas de alumínio amarradas. Ele teve que costurar as bordas do painel cheio de volts ao vivo sem levar choque mortal!", en: "In 2007, the ISS' huge solar panel snagged a guide wire and began tearing violently, risking collapse. Hero Scott Parazynski rode a mechanical arm out there with tape and aluminum 'Cufflinks'. He had to sew the live high-volt panel edges without getting a deadly shock!" },
    options: [
      { text: { pt: 'Abotoaduras de Alumínio', en: 'Aluminum Cufflinks' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Artesanato de Titânio! Você puxou as bordas soltas e alinhou a tensão, fazendo os cabos passarem corrente viva e segura!', en: 'Titanium crafting! You pulled loose edges and aligned tension, letting cables pass live safe current!' } },
      { text: { pt: 'Grudar com Neve Gelo', en: 'Stick with Ice Snow' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'Painéis solares funcionam a +120°C no Sol. A cola gelada vaporizou em 3 segundos, piorando o buraco solar.', en: 'Solar panels work at +120°C in the Sun. Icy glue vaporized in 3 secs, worsening the solar hole.' } },
      { text: { pt: 'Muro de Terra', en: 'Wall of Dirt' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Jogar poeira para tentar diminuir a voltagem não fechou os buracos largos de fibra e só sujou as células.', en: 'Throwing dust to try to lower voltage didn\'t close wide fiber holes and only dirtied cells.' } },
      { text: { pt: 'Sacudir e Soltar', en: 'Shake and Let Go' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'A tensão elástica partiu! O painel chicoteou quebrando a antena de radar logo acima.', en: 'Elastic tension snapped! Panel whipped back breaking the radar antenna right above.' } }
  ]},
  { id: 'evt22', title: { pt: 'Buraco Misterioso (Soyuz)', en: 'Mystery Hole (Soyuz)' }, desc: { pt: 'Os alarmes de pressão acordaram todos! Alguém na base fez um buraco (2mm) na parede com uma furadeira. Ar escapando!', en: 'Pressure alarms woke everyone! Someone at base drilled a (2mm) hole in the wall. Air escaping!' }, 
    history: { pt: "Fofoca na NASA e Roscosmos! Em 2018, um vazamento irritante acordou a ISS. Acharam um furinho de furadeira perfeito na Soyuz MS-09 (ninguém sabe como foi feito até hoje!). Para parar, o comandante da nave tampou o buraco apertando o próprio polegar, e depois preencheu a fresta com pano de gaze embebido em cola superforte Epoxy.", en: "NASA/Roscosmos gossip! In 2018, an annoying leak woke the ISS. They found a perfect drill hole in Soyuz MS-09 (no one knows how to this day!). To stop it, the commander plugged it pressing his own thumb, then filled the gap with gauze cloth soaked in super strong Epoxy glue." },
    options: [
      { text: { pt: 'Dedo Sujo de Cola Epóxi', en: 'Thumb with Epoxy Glue' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Pressão negativa segurou o ar! O remendo esquisito curou a resina perfeitamente. Alarme finalmente verde.', en: 'Negative pressure held the air! Weird patch cured resin perfectly. Alarm finally green.' } },
      { text: { pt: 'Cascalho Pontudo', en: 'Pointy Gravel' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'Ao tentar enfiar areia para fechar fendas, você arranhou a dupla camada de alumínio anodizado da parede grossa.', en: 'Trying to jam sand to close gaps, you scratched the thick wall\'s double anodized aluminum layer.' } },
      { text: { pt: 'Gelo Fino Quebradiço', en: 'Thin Brittle Ice' }, costType: 'ice', cost: 100, hpMod: -15, outcome: { pt: 'O ar quente e confortável da cabine transformou o gelo nojento do buraco numa poça que molhou a parede.', en: 'The comfy hot cabin air turned the gross ice in the hole into a puddle that wet the wall.' } },
      { text: { pt: 'Olhar de Longe', en: 'Look From Afar' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Deixando quieto o oxigênio diminuiu muito. Tivemos que gastar energia violenta re-pressurizando tudo (Zumbido nos ouvidos).', en: 'Leaving it alone oxygen dropped heavily. Had to use violent energy repressurizing everything (Ear ringing).' } }
  ]},
  { id: 'evt23', title: { pt: 'Cofre Nuclear (Juno)', en: 'Nuclear Vault (Juno)' }, desc: { pt: 'Vamos mergulhar no anel magnético de um planeta gigante. São milhões de partículas mortais, e o cérebro do PC vai fritar!', en: 'We will dive into a giant planet\'s magnetic ring. Millions of deadly particles, and the PC brain will fry!' }, 
    history: { pt: "A missão Juno viajou a Júpiter. Júpiter é um monstro terrível que suga partículas do espaço e as acelera em anéis giratórios invisíveis como balas de metralhadora de energia. Para não fritar o computador em segundos, a NASA pegou os circuitos da nave Juno e selou eles por dentro de um cofre sólido feito de 18 kg de titânio absoluto.", en: "Juno mission traveled to Jupiter. Jupiter is a terrible monster sucking space particles and accelerating them in invisible spinning rings like energy machine gun bullets. Not to fry the computer in seconds, NASA took Juno's circuits and sealed them inside a solid vault made of 18 kg of absolute titanium." },
    options: [
      { text: { pt: 'Trancar PC em Titânio', en: 'Lock PC in Titanium' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Os raios duros bateram nas paredes e sumiram. Computação brilhante! Sem tela azul da morte.', en: 'Hard rays hit the walls and vanished. Brilliant computing! No blue screen of death.' } },
      { text: { pt: 'Ligar Isolamento Hídrico', en: 'Hydric Isolation' }, costType: 'ice', cost: 200, hpMod: -25, outcome: { pt: 'A radiação do planeta fez a água do motor de resfriamento começar a liberar isótopos mortais. Tubo rompeu.', en: 'Planet\'s radiation made cooling motor water start releasing deadly isotopes. Tube burst.' } },
      { text: { pt: 'Barreira de Asteroides Soltos', en: 'Loose Asteroid Barrier' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Pedras na frente do chip só se quebraram e esmagaram as soldas delicadas do conector mãe.', en: 'Stones in front of the chip only broke and crushed the mother connector\'s delicate welds.' } },
      { text: { pt: 'Ligar Anti-Vírus', en: 'Turn on Anti-Virus' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Partículas físicas atravessam software. O PC surtou em 1 milissegundo. Motor de freio desligou, caindo feio.', en: 'Physical particles pierce software. PC freaked in 1 millisecond. Brake engine shut off, falling badly.' } }
  ]},
  { id: 'evt24', title: { pt: 'Beijando o Fogo Solar (Parker Probe)', en: 'Kissing Solar Fire (Parker)' }, desc: { pt: 'O sol no vidro! Estamos passando por dentro da Coroa do sol para acelerar nossa órbita, e o metal externo está virando líquido ardente!', en: 'Sun on the glass! Passing inside the Sun\'s Corona to accelerate our orbit, and outer metal is turning to fiery liquid!' }, 
    history: { pt: "A 'Parker Solar Probe' da NASA se atreveu a tocar a camada externa do Sol em 2021, batendo o recorde de velocidade e calor humanos! Enquanto as antenas atrás ficam em temperatura fria e confortável (30°C), a ponta do escudo na frente absorve 1.300 Graus Celsius! Eles usam uma tecnologia de espuma de carbono branca fininha (11 cm) e uma calota refletora assustadoramente eficientes.", en: "NASA's 'Parker Solar Probe' dared to touch the Sun's outer layer in 2021, breaking human heat/speed records! While antennas in the back stay at comfy cool temps (30°C), the front shield tip absorbs 1,300 Celsius! They use a scary efficient white carbon foam tech (11 cm) and a reflective cap." },
    options: [
      { text: { pt: 'Filtro Refletor de Carbono Branco', en: 'White Carbon Reflector' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'A placa negra virou gelo cósmico por trás! A luz do fogo bateu, refletiu e deixou a cabine num frescor.', en: 'The black plate became cosmic ice behind! Fire light hit, reflected, and left the cabin cool.' } },
      { text: { pt: 'Abraçar Gelo Quente', en: 'Hug Hot Ice' }, costType: 'ice', cost: 150, hpMod: -30, outcome: { pt: 'Perto do Sol? A água se dividiu termicamente num vapor tão expandido que abalou a pressurização traseira!', en: 'Near the Sun? Water thermally split into vapor so expanded it shook rear pressurization!' } },
      { text: { pt: 'Ligar Exaustor Elétrico', en: 'Turn on Electric Exhaust' }, costType: 'parts', cost: 120, hpMod: -25, outcome: { pt: 'A turbina de arame de metal comum (ferro/alumínio) dissolveu igual sorvete e as pás da hélice grilaram.', en: 'The common metal wire turbine (iron/aluminum) dissolved like ice cream and propeller blades seized.' } },
      { text: { pt: 'Esperar a Sombra Mágica', en: 'Wait for Magic Shadow' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'O calor cozinhou as telas por dentro, explodindo lâmpadas, cabos e botões de comando (Falência do sistema 1).', en: 'Heat cooked screens inside, exploding lamps, cables, and command buttons (System 1 failure).' } }
  ]},
  { id: 'evt25', title: { pt: 'Dormir na Areia (Opportunity)', en: 'Sleep in Sand (Opportunity)' }, desc: { pt: 'O céu inteiro ficou marrom escuro! Uma tempestade global de poeira varreu o Sol e tapou os painéis fotovoltaicos.', en: 'The entire sky went dark brown! A global dust storm swept the Sun and covered photovoltaic panels.' }, 
    history: { pt: "Em 2018, Marte foi varrido pela maior tempestade de areia da década. O robô solar Opportunity, depois de 14 anos trabalhando heroicamente, perdeu a luz que abastecia as placas e esquentava suas 'veias'. A NASA enviou o comando final para ele desligar tudo e dormir para economizar as baterias vitais. Foram as últimas palavras de uma lenda ('Minha bateria está fraca e escurecendo').", en: "In 2018, Mars was swept by the decade's biggest sandstorm. Solar rover Opportunity, after 14 heroic years, lost the light that fueled plates and warmed its 'veins'. NASA sent the final command to shut everything down and sleep to save vital batteries. It was a legend's last words ('My battery is low and it's getting dark')." },
    options: [
      { text: { pt: 'Dormir (Desligar Subsistemas)', en: 'Sleep (Shut Down Subsys)' }, costType: 'none', cost: 0, hpMod: 0, outcome: { pt: 'Modo sobrevivência! Gastando 0 watts, o núcleo segurou a carga até o céu limpar. L.U.M.I diz Olá de volta!', en: 'Survival mode! Spending 0 watts, the core held charge until the sky cleared. L.U.M.I says Hello back!' } },
      { text: { pt: 'Ligar Limpador (Braços Mecânicos)', en: 'Wipers (Mech Arms)' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'A tempestade estava tão grossa que forçar o limpador gastou toda a reserva de força antes da manhã.', en: 'The storm was so thick that forcing wipers used all power reserves before morning.' } },
      { text: { pt: 'Jogar Gelo Sujo na Placa', en: 'Dirty Ice on Plate' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'Gelo molhou a areia criando placas de tijolo duro na lente! Nunca mais veremos sol de verdade.', en: 'Ice wet the sand creating hard brick plates on the lens! We\'ll never see real sun again.' } },
      { text: { pt: 'Escavar Terra em Volta', en: 'Dig Dirt Around' }, costType: 'regolith', cost: 120, hpMod: -25, outcome: { pt: 'Gastar bateria girando pás apenas atolou os rotores na cratera da tempestade brutal. Empacou feio.', en: 'Spending battery spinning blades only bogged rotors in the brutal storm crater. Stuck bad.' } }
  ]},
  { id: 'evt26', title: { pt: 'Fio Enrolado lá Fora (Skylab)', en: 'Tangled Wire Outside (Skylab)' }, desc: { pt: 'Um painel gigante solar do tamanho de um ônibus não abriu, ficou enroscado em amarrações duras depois da decolagem.', en: 'A giant solar panel size of a bus didn\'t open, tangled in tough strings after launch.' }, 
    history: { pt: "No lançamento do Skylab da NASA, não só o escudo caiu (Lembra do Guarda-Sol?), como ele entortou barras de alumínio grossas em volta do último painel solar salvador. O astronauta Pete Conrad teve que fazer algo insano: vestiu a roupa e com uma ferramenta de cortar galhos (comprada em loja normal) deu fortes tesouradas no espaço para desenrolar os fios metálicos! Deu certo.", en: "At NASA's Skylab launch, not only the shield fell, but it bent thick aluminum bars around the last saving solar panel. Astronaut Pete Conrad had to do something insane: suited up and with a branch lopper (store bought) gave strong snips in space to untangle metal wires! It worked." },
    options: [
      { text: { pt: 'Tesoura Corta-Galho Extra', en: 'Extra Lopper Scissors' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Ploing! O fio metálico rompeu com a alavanca e a asa solar finalmente abriu linda, puxando o ouro dos raios!', en: 'Ploing! The metal wire snapped with the lever and the solar wing finally opened beautifully, pulling gold rays!' } },
      { text: { pt: 'Jogar Gelo Derretido no Alumínio', en: 'Melted Ice on Aluminum' }, costType: 'ice', cost: 100, hpMod: -15, outcome: { pt: 'A diferença térmica contraiu ainda mais a barra. O braço robótico agarrou apertado machucando a engrenagem.', en: 'Thermal difference contracted the bar more. Robotic arm grabbed tight hurting the gear.' } },
      { text: { pt: 'Força Bruta com Pedras', en: 'Brute Force with Stones' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Bater na placa frágil destruiu as células solares fotovoltaicas de vidro. O fio não cedeu (100% de raiva).', en: 'Hitting the fragile plate destroyed glass photovoltaic solar cells. Wire didn\'t yield (100% rage).' } },
      { text: { pt: 'Balançar Nave com Propulsor', en: 'Shake Ship with Thruster' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'A inércia (Vai e Volta) violenta partiu a dobradiça de vez, a placa toda ficou flutuando perdida atrás de nós.', en: 'Violent inertia (Back & Forth) broke the hinge completely, whole plate floated lost behind us.' } }
  ]},
  { id: 'evt27', title: { pt: 'Rodas Entupidas em Solo Mole', en: 'Clogged Wheels Soft Soil' }, desc: { pt: 'Fomos dirigir no deserto e o jipe afundou na areia muito fofa (armadilha de poeira). Se rodar o motor, afunda até a barriga.', en: 'Drove into the desert and rover sank in very soft sand (dust trap). If engine revs, it sinks to the belly.' }, 
    history: { pt: "O jipe marciano Spirit da NASA encontrou uma tristeza na Terra de Marte. Ele passou de um solo duro para uma cama de areia ultrafina coberta por uma casca que parecia pedra, atolando profundamente (cratera Troy em 2009). Os engenheiros na Terra testaram em caixa de areia real por MESES como tirá-lo dali usando manobras milimétricas, mas a barriga grudou no chão.", en: "NASA's Spirit Mars rover met sadness in Mars land. It went from hard soil to a bed of ultra-fine sand covered by a rock-like crust, bogging down deeply (Troy crater 2009). Engineers on Earth tested in real sandbox for MONTHS how to get it out using mm maneuvers, but the belly stuck to the ground." },
    options: [
      { text: { pt: 'Socar Pedrinhas nas Rodas', en: 'Punch Pebbles in Wheels' }, costType: 'regolith', cost: 180, hpMod: 0, outcome: { pt: 'A Atrito Tático perfeito! Jogar as pedras e detritos no fosso deu aderência pro metal (tração) e o jipe subiu a rampa!', en: 'Perfect Tactical Friction! Throwing stones and debris in the ditch gave grip to the metal (traction) and rover climbed out!' } },
      { text: { pt: 'Jogar Água pra Fazer Lama', en: 'Throw Water for Mud' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'No espaço com pressão nula, a água ferveu virando gás antes de molhar a poeira, apenas sujando tudo com espuma.', en: 'In space with zero pressure, water boiled turning to gas before wetting dust, only dirtying all with foam.' } },
      { text: { pt: 'Ligar Rotação Máxima Rápido', en: 'Max RPM Fast' }, costType: 'parts', cost: 100, hpMod: -25, outcome: { pt: 'Você gastou partes forçando os eixos na velocidade da luz, rasgando sulcos na areia e atolando a barriga 100%.', en: 'You spent parts forcing axles at light speed, tearing ruts in sand and bogging the belly 100%.' } },
      { text: { pt: 'Não Fazer Absolutamente Nada', en: 'Do Absolutely Nothing' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O robô Spirit mandou beijos pro horizonte, não se moveu do buraco até o fim do verão, congelando pra sempre.', en: 'Spirit rover blew kisses to the horizon, didn\'t move from the hole till summer ended, freezing forever.' } }
  ]},
  { id: 'evt28', title: { pt: 'Chuva de Cristais de Anel', en: 'Ring Crystal Rain' }, desc: { pt: 'Órbita baixa! Precisamos cortar caminho pelos espetaculares anéis de Saturno. Infelizmente, eles são formados por pedaços de gelo voadores.', en: 'Low orbit! Need a shortcut through Saturn\'s spectacular rings. Sadly, they are formed by flying ice chunks.' }, 
    history: { pt: "A majestosa sonda Cassini passou anos explorando Saturno, mas seu final foi apoteótico. No 'Grand Finale', ela mergulhou 22 vezes pelo espaço entre Saturno e os seus anéis internos. Para não ser metralhada pela chuva de pequenos flocos e cristais de gelo, a sonda usava a sua Antena Prato gigante como um 'escudo' segurando na frente enquanto caía.", en: "Majestic Cassini probe spent years exploring Saturn, but its end was apotheotic. In the 'Grand Finale', it dived 22 times through the space between Saturn and its inner rings. Not to be peppered by tiny flakes and ice crystals rain, it used its giant Dish Antenna as a 'shield' holding it in front while falling." },
    options: [
      { text: { pt: 'Usar Prato de Antena (Escudo)', en: 'Use Dish Antenna (Shield)' }, costType: 'parts', cost: 220, hpMod: 0, outcome: { pt: 'Vrum! Você inclinou o chapéu (antena) de peças de comunicação protegendo os delicados tubos até o fim.', en: 'Vroom! You tilted the hat (antenna) of comm parts protecting delicate tubes to the end.' } },
      { text: { pt: 'Derreter com Vapor Lateral', en: 'Melt with Side Steam' }, costType: 'ice', cost: 150, hpMod: -15, outcome: { pt: 'Os cristais dos anéis vinham a 30 km/s. Gelo contra gelo apenas gerou uma bola de sinuca letal de destroços.', en: 'Ring crystals came at 30 km/s. Ice on ice only generated a lethal billiard ball of debris.' } },
      { text: { pt: 'Soltar Poeira Lixadeira', en: 'Release Sanding Dust' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Poeira arranhou tudo! Câmeras cegas e propulsor esquerdo raspado perdendo combustível azul em espiral.', en: 'Dust scratched everything! Blind cameras and scraped left thruster losing blue fuel in spiral.' } },
      { text: { pt: 'Seguir Voando Direto Lento', en: 'Keep Flying Slow' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Como voar numa nevasca cheia de pedras afiadas, buracos na frente e o computador principal dando curto na hora.', en: 'Like flying in a blizzard full of sharp stones, holes in front and main computer shorting right away.' } }
  ]},
  { id: 'evt29', title: { pt: 'Luva Térmica Perdida (Gemini 4)', en: 'Lost Thermal Glove (Gemini 4)' }, desc: { pt: 'Ao sair pela escotilha no espaço, algo escorregou e a luva de reserva foi sugada pra fora. Ela brilha flutuando longe (lixo que bate na nave).', en: 'Exiting the hatch in space, something slipped and spare glove got sucked out. It shines floating away (junk that hits the ship).' }, 
    history: { pt: "A primeira caminhada espacial americana (Ed White na Gemini 4 em 1965) foi maravilhosa, mas um pequeno detalhe escapou: uma de suas luvas térmicas de reposição saiu flutuando para fora da cabine! Foi um dos primeiros 'lixos espaciais' da NASA (anos depois, isso virou um problema grave para a ISS, com ferramentas flutuantes).", en: "First American spacewalk (Ed White on Gemini 4 in 1965) was gorgeous, but a tiny detail slipped: one of his spare thermal gloves floated out of the cabin! It was one of NASA's first 'space junk' (years later, this became a severe issue for ISS with floating tools)." },
    options: [
      { text: { pt: 'Empurrar com Jato de Gás H2O', en: 'Push with H2O Gas Jet' }, costType: 'ice', cost: 150, hpMod: 0, outcome: { pt: 'Sopro mágico! O esguicho do líquido vaporizado atingiu a luva e mudou a rota dela, desviando da órbita.', en: 'Magic puff! Squirt of vaporized liquid hit the glove and changed its path, dodging the orbit.' } },
      { text: { pt: 'Laçar com Fios Finos e Cabos', en: 'Lasso with Wires' }, costType: 'parts', cost: 100, hpMod: -20, outcome: { pt: 'Mecânica quântica de fios rebeldes: o cabo enrolou na maçaneta de fora quebrando a dobradiça central hermética.', en: 'Quantum mechanics of rebel wires: cable wrapped around outside handle breaking hermetic hinge.' } },
      { text: { pt: 'Jogar Pedrinha na Luva', en: 'Throw Pebble at Glove' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'Bater em objetos no vácuo só ricocheteia eles com mais fúria. A luva retornou como bumerangue no radar.', en: 'Hitting objects in vacuum only ricochets them with more fury. Glove returned like boomerang on radar.' } },
      { text: { pt: 'Deixar Girar na Órbita', en: 'Let it Spin in Orbit' }, costType: 'none', cost: 0, hpMod: -25, outcome: { pt: 'Em 45 minutos (uma volta), a luva nos alcançou por trás a 27 mil km/h rasgando os painéis fininhos de resfriamento!', en: 'In 45 mins (one lap), the glove caught us from behind at 27k km/h ripping thin cooling panels!' } }
  ]},
  { id: 'evt30', title: { pt: 'Broca Entalada no Chão (Apollo 15)', en: 'Drill Stuck in Ground (Apollo 15)' }, desc: { pt: 'Na caminhada lunar, a furadeira de recolher solo parou fundo demais e emperrou! Os astronautas não conseguem arrancar o cano.', en: 'On the moonwalk, soil collecting drill stopped too deep and jammed! Astronauts can\'t pull the pipe out.' }, 
    history: { pt: "A geologia espacial é difícil! Na Apollo 15, os astronautas Dave Scott e Jim Irwin perfuraram a superfície, mas a broca oca (Coração da Terra) atolou no basalto profundo 2 metros. Eles tentaram arrancar, os pés não davam tração e as luvas escorregavam na poeira! Trabalhar num traje inflado e sob a luz do Sol cansa os pulmões rapidamente (aumenta CO2 e gasto de O2).", en: "Space geology is hard! On Apollo 15, astronauts Dave Scott and Jim Irwin drilled the surface, but the core drill bogged in deep basalt 2 meters down. They tried to yank it, feet lacked traction and gloves slipped on dust! Working in inflated suits under Sun tires lungs fast (increases CO2 and O2 spend)." },
    options: [
      { text: { pt: 'Alavanca com Peça de Aço', en: 'Lever with Steel Part' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Arquimedes e NASA! Apoiando numa pedra firme, a alavanca extra-larga destravou a ponta de titânio do chão. Viva!', en: 'Archimedes and NASA! Resting on firm stone, extra-wide lever unlocked titanium tip from ground. Hooray!' } },
      { text: { pt: 'Jogar Terra Pra Soltar (Escavar)', en: 'Dig Dirt to Loosen' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'O material da Lua gruda como estática, cavar piorou, enterrando mais a trava da broca no basalto puro.', en: 'Moon material sticks like static, digging worsened, burying drill lock deeper in pure basalt.' } },
      { text: { pt: 'Esfriar Haste com Água Quente', en: 'Cool Rod with Water' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'Choque Térmico fez a haste oca de ferro trincar no meio como um graveto velho. Amostra de bilhões arruinada.', en: 'Thermal Shock made hollow iron rod crack in half like an old twig. Billion dollar sample ruined.' } },
      { text: { pt: 'Fazer Força e Puxar Braço', en: 'Force and Pull Arm' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Fizeram tanta força bruta nas pernas que gastaram quase o dobro de oxigênio vital. Tossiram e ficaram exaustos voltando.', en: 'Used so much brute force in legs they spent almost double vital oxygen. Coughed and returned exhausted.' } }
  ]}
];