import React from 'react';
import { BookOpen, AlertTriangle, ShieldAlert, Zap } from 'lucide-react';

export const TARGET_DISTANCE = 3000;

export const DICTIONARY = {
  pt: {
    arrival: "Pouso seguro realizado com sucesso! Bem-vindo à sua nova base.",
    tut1: "SISTEMA INICIADO. Bem-vindo à simulação de voo espacial.",
    tut2: "Seus recursos vitais (O2, H2O, Energia) são essenciais para a sobrevivência.",
    tut3: "ANOMALIA DETECTADA: Regolito. Aproxime-se ou atire no meteoro cinza para minerar minerais estruturais.",
    tut4: "ANOMALIA DETECTADA: Gelo. Aproxime-se ou atire no cometa azul para extrair água e oxigênio.",
    tut5: "ANOMALIA DETECTADA: Sucata. Aproxime-se ou atire nos destroços laranjas para obter peças de engenharia.",
    tut6: "ALERTA DE PERIGO: Evite anomalias vermelhas flamejantes. Elas causam dano estrutural crítico e invocam eventos!",
    tut7: "DICA TÁTICA: Combos de coleta (acertos rápidos) aumentam o multiplicador de recursos ganhos.",
    tut8: "GERENCIAMENTO: Use recursos para recarregar seus suportes vitais no HUD esquerdo.",
    hazardHit: "IMPACTO CRÍTICO!",
    repair: "REPARAR",
    upgrades: "UPGRADES",
    manual: "MANUAL",
    btnScan: "ESCANEAR SETOR",
    upgLaser: "Laser de Mineração",
    upgLaserDesc: "Aumenta o multiplicador base ao coletar recursos de anomalias espaciais.",
    upgRadar: "Radar de Varredura",
    upgRadarDesc: "Aumenta a frequência de aparecimento de anomalias na rota da nave.",
    upgDrone: "Drones Coletores",
    upgDroneDesc: "Drones passivos que coletam pequenas quantias de Regolito e Gelo automaticamente ao longo do tempo.",
    upgCargo: "Compartimento de Carga",
    upgCargoDesc: "Aumenta o limite máximo de multiplicador de combo em alta velocidade.",
    upgShield: "Escudo Defletor",
    upgShieldDesc: "Garante uma chance percentual de bloquear completamente eventos espaciais catastróficos.",
    upgEngine: "Motor de Dobra",
    upgEngineDesc: "Aumenta a velocidade passiva de viagem para chegar ao destino mais rapidamente.",
    upgArmor: "Blindagem Térmica",
    upgArmorDesc: "Reduz permanentemente o dano de HP sofrido em escolhas erradas de eventos.",
    upgCore: "Núcleo de Fusão",
    upgCoreDesc: "Potencializa a sinergia dos seus lasers, garantindo bônus extra de recursos.",
    upgScoop: "Coletor Magnético",
    upgScoopDesc: "Adiciona um valor fixo de recursos extras em cada coleta feita com sucesso.",
    upgTurret: "Torreta de Defesa",
    upgTurretDesc: "Destrói micro-detritos. Aumenta significativamente a chance de lidar com eventos balísticos."
  },
  en: {
    arrival: "Safe landing successful! Welcome to your new base.",
    tut1: "SYSTEM BOOT. Welcome to the space flight simulation.",
    tut2: "Your vital resources (O2, H2O, Power) are essential for survival.",
    tut3: "ANOMALY DETECTED: Regolith. Move or shoot the gray meteor to mine structural minerals.",
    tut4: "ANOMALY DETECTED: Ice. Move or shoot the blue comet to extract water and oxygen.",
    tut5: "ANOMALY DETECTED: Scrap. Move or shoot the orange debris to salvage engineering parts.",
    tut6: "HAZARD ALERT: Avoid red flaming anomalies. They cause critical structural damage and trigger events!",
    tut7: "TACTICAL TIP: Collection combos (rapid hits) increase your resource multiplier.",
    tut8: "MANAGEMENT: Use resources to refill your life support on the left HUD.",
    hazardHit: "CRITICAL IMPACT!",
    repair: "REPAIR",
    upgrades: "UPGRADES",
    manual: "MANUAL",
    btnScan: "SCAN SECTOR",
    upgLaser: "Mining Laser",
    upgLaserDesc: "Increases the base multiplier when collecting resources from space anomalies.",
    upgRadar: "Scanning Radar",
    upgRadarDesc: "Increases the frequency of anomalies appearing on the ship's route.",
    upgDrone: "Collector Drones",
    upgDroneDesc: "Passive drones that automatically collect small amounts of Regolith and Ice over time.",
    upgCargo: "Cargo Bay",
    upgCargoDesc: "Increases the maximum combo multiplier limit at high speeds.",
    upgShield: "Deflector Shield",
    upgShieldDesc: "Grants a percentage chance to completely block catastrophic space events.",
    upgEngine: "Warp Engine",
    upgEngineDesc: "Increases passive travel speed to reach the destination faster.",
    upgArmor: "Thermal Armor",
    upgArmorDesc: "Permanently reduces HP damage taken from wrong event choices.",
    upgCore: "Fusion Core",
    upgCoreDesc: "Boosts the synergy of your lasers, granting extra resource bonuses.",
    upgScoop: "Magnetic Scoop",
    upgScoopDesc: "Adds a flat fixed value of extra resources on every successful collect.",
    upgTurret: "Defense Turret",
    upgTurretDesc: "Destroys micro-debris. Significantly increases the chance to handle ballistic events."
  }
};

export const MANUAL_CONTENT = {
  pt: [
    { title: "Coleta Básica", desc: "Destrua ou colete meteoros cinzas, azuis e laranjas para obter recursos primários.", icon: <Zap /> },
    { title: "Manutenção", desc: "Sua nave drena recursos com o tempo. Mantenha os níveis no verde para evitar dano no casco.", icon: <ShieldAlert /> },
    { title: "Perigos", desc: "Meteoros vermelhos causam dano e podem desencadear Falhas Estruturais se a nave colidir com eles.", icon: <AlertTriangle /> },
    { title: "Eventos", desc: "Eventos críticos exigem decisões táticas. Escolha a melhor reparação gastando os itens certos sem saber a consequência exata.", icon: <BookOpen /> }
  ],
  en: [
    { title: "Basic Gathering", desc: "Destroy or collect gray, blue, and orange meteors to gather primary resources.", icon: <Zap /> },
    { title: "Maintenance", desc: "Your ship drains resources over time. Keep levels in the green to avoid hull damage.", icon: <ShieldAlert /> },
    { title: "Hazards", desc: "Red meteors cause damage and may trigger Structural Failures if the ship collides with them.", icon: <AlertTriangle /> },
    { title: "Events", desc: "Critical events require tactical decisions. Choose the best repair by spending the right items without knowing the exact consequence.", icon: <BookOpen /> }
  ]
};

export const PLANETS = [
  { id: 1, x: '15%', color: 'from-indigo-600 to-purple-900', size: 'w-64 h-64', duration: 40, delay: 0 },
  { id: 2, x: '75%', color: 'from-orange-700 to-red-900', size: 'w-48 h-48', duration: 60, delay: 15 },
  { id: 3, x: '45%', color: 'from-teal-600 to-cyan-900', size: 'w-96 h-96', duration: 80, delay: 35 }
];

export const GAME_EVENTS = [
  { id: 'evt1', title: { pt: 'Fuga de Água no Traje (Caso Luca Parmitano)', en: 'Suit Water Leak (Luca Parmitano Case)' }, desc: { pt: 'Água do sistema de resfriamento está vazando dentro do capacete (risco de afogamento no espaço).', en: 'Cooling system water is leaking inside the helmet (risk of drowning in space).' }, options: [
      { text: { pt: 'Consertar Válvula', en: 'Fix Valve' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Peças novas consertaram o vazamento, permitindo a respiração segura.', en: 'New parts fixed the leak, allowing safe breathing.' } },
      { text: { pt: 'Absorver com Pó', en: 'Absorb with Dust' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'A poeira virou lama e entupiu os filtros de ar do traje.', en: 'Dust turned to mud and clogged the suit air filters.' } },
      { text: { pt: 'Congelar Fluxo', en: 'Freeze Flow' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'A água congelou, estilhaçando os tubos vitais do traje por expansão térmica.', en: 'Water froze, shattering vital suit pipes due to thermal expansion.' } }
  ]},
  { id: 'evt2', title: { pt: 'Explosão do Tanque de O2 (Caso Apollo 13)', en: 'O2 Tank Explosion (Apollo 13 Case)' }, desc: { pt: 'Um tanque de oxigênio explodiu, destruindo o suporte à vida principal da nave.', en: 'An oxygen tank exploded, destroying the ships main life support.' }, options: [
      { text: { pt: 'Filtro Improvisado', en: 'Improvise Filter' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Usando fita, papelão e mangueiras, a tripulação montou um filtro salvador!', en: 'Using tape, cardboard, and hoses, the crew built a lifesaving filter!' } },
      { text: { pt: 'Extrair de Gelo', en: 'Extract from Ice' }, costType: 'ice', cost: 200, hpMod: -15, outcome: { pt: 'Gerar O2 via eletrólise consumiu energia crítica que a nave não tinha.', en: 'Generating O2 via electrolysis consumed critical power the ship lacked.' } },
      { text: { pt: 'Selar com Rocha', en: 'Seal with Rock' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'O regolito não selou a pressão gasosa. O oxigênio continuou vazando para o espaço.', en: 'Regolith did not seal gas pressure. Oxygen kept leaking into space.' } }
  ]},
  { id: 'evt3', title: { pt: 'Fogo a Bordo! (Caso Estação Mir)', en: 'Fire on Board! (Mir Station Case)' }, desc: { pt: 'O gerador de oxigênio pegou fogo! Fumaça tóxica enchendo rapidamente a cabine fechada.', en: 'Oxygen generator caught fire! Toxic smoke rapidly filling the closed cabin.' }, options: [
      { text: { pt: 'Espuma de Água', en: 'Water Foam' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'A água esfriou e abafou o fogo no ambiente de microgravidade.', en: 'Water cooled and smothered the fire in the microgravity environment.' } },
      { text: { pt: 'Ventilar Pro Espaço', en: 'Vent to Space' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'Tirou o fogo, mas sugou equipamentos soltos e parte da atmosfera da nave.', en: 'Removed the fire, but sucked out loose gear and part of the ships atmosphere.' } },
      { text: { pt: 'Abafar com Pó', en: 'Smother with Dust' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'A poeira espalhou faíscas pela ventilação e danificou os olhos da tripulação.', en: 'Dust spread sparks through vents and damaged the crews eyes.' } }
  ]},
  { id: 'evt4', title: { pt: 'Colisão de Nave de Carga (Caso Mir)', en: 'Cargo Ship Collision (Mir Case)' }, desc: { pt: 'Uma nave de suprimentos não tripulada veio rápido demais e bateu no casco, rasgando o metal.', en: 'An unmanned supply ship came too fast and hit the hull, tearing the metal.' }, options: [
      { text: { pt: 'Selar Portas Escotilha', en: 'Seal Hatches' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Mecanismos de trava selaram a seção danificada, salvando o resto da estação.', en: 'Locking mechanisms sealed the damaged section, saving the rest of the station.' } },
      { text: { pt: 'Tampão de Rocha', en: 'Rock Plug' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A pedra não criou um vácuo perfeito, resultando em assobio e perda de ar contínua.', en: 'The rock did not create a perfect vacuum seal, resulting in continuous air loss.' } },
      { text: { pt: 'Parede de Gelo', en: 'Ice Wall' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O gelo selou provisoriamente, mas sublimou rapidamente sob a luz do sol, reabrindo o buraco.', en: 'Ice sealed temporarily but sublimated rapidly in sunlight, reopening the hole.' } }
  ]},
  { id: 'evt5', title: { pt: 'Sobrecarga do Computador 1202 (Caso Apollo 11)', en: 'Computer Overload 1202 (Apollo 11 Case)' }, desc: { pt: 'Perto do pouso, o computador de bordo trava por excesso de dados do radar.', en: 'Near landing, the onboard computer freezes due to too much radar data.' }, options: [
      { text: { pt: 'Filtrar Dados (Bypass)', en: 'Filter Data (Bypass)' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'A equipe de engenharia isolou o radar defeituoso, permitindo que a CPU focasse no pouso.', en: 'Engineering isolated the faulty radar, letting the CPU focus on landing.' } },
      { text: { pt: 'Resfriar CPU', en: 'Cool CPU' }, costType: 'ice', cost: 100, hpMod: -10, outcome: { pt: 'O problema era software, não calor. O atraso fez a nave descer rápido demais.', en: 'The issue was software, not heat. The delay caused a fast descent.' } },
      { text: { pt: 'Aterrar Cabos', en: 'Ground Cables' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'O pó isolou mal os fios, gerando um pequeno curto que desligou as telas.', en: 'Dust insulated wires poorly, causing a minor short that turned off screens.' } }
  ]},
  { id: 'evt6', title: { pt: 'Giro Descontrolado (Caso Gemini 8)', en: 'Uncontrolled Spin (Gemini 8 Case)' }, desc: { pt: 'Um propulsor travou ligado. A nave gira freneticamente; a tripulação está prestes a desmaiar.', en: 'A thruster stuck on. Ship spins frantically; crew is about to pass out.' }, options: [
      { text: { pt: 'Cortar Força e Backup', en: 'Cut Power & Backup' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Cortar a energia parou o propulsor travado. Motores de emergência estabilizaram a nave.', en: 'Cutting main power stopped the stuck thruster. Backup engines stabilized the ship.' } },
      { text: { pt: 'Jato de Vapor Oposto', en: 'Opposite Steam Jet' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O vapor não teve força suficiente. O giro continuou até a tripulação quase vomitar.', en: 'Steam lacked thrust. Spin continued until the crew nearly vomited.' } },
      { text: { pt: 'Ejetar Lastro', en: 'Eject Ballast' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'Mudar a massa alterou o eixo, mas a nave começou a capotar caoticamente.', en: 'Changing mass altered the axis, but the ship began tumbling chaotically.' } }
  ]},
  { id: 'evt7', title: { pt: 'Tiro de Micrometeorito (Caso Soyuz MS-22)', en: 'Micrometeoroid Strike (Soyuz MS-22 Case)' }, desc: { pt: 'Uma pedrinha espacial super rápida perfurou o radiador. Líquido resfriador vazando em jatos!', en: 'A tiny, super-fast space pebble pierced the radiator. Coolant leaking in a cascade!' }, options: [
      { text: { pt: 'Congelar Furo', en: 'Freeze Hole' }, costType: 'ice', cost: 180, hpMod: 0, outcome: { pt: 'A injeção de água no vácuo congelou instantaneamente, formando uma rolha de gelo selando o vazamento.', en: 'Injecting water in vacuum instantly froze, forming an ice plug sealing the leak.' } },
      { text: { pt: 'Soldar Buraco', en: 'Weld Hole' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'O calor da solda derreteu as aletas de alumínio finas ao redor do buraco.', en: 'Welding heat melted the thin aluminum fins around the hole.' } },
      { text: { pt: 'Massa de Pó', en: 'Dust Putty' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'O líquido dissolveu a massa. O vazamento continuou pintando a nave de branco.', en: 'Liquid dissolved the putty. The leak continued painting the ship white.' } }
  ]},
  { id: 'evt8', title: { pt: 'Poeira Tóxica Afiada (Missões Apollo)', en: 'Sharp Toxic Dust (Apollo Missions)' }, desc: { pt: 'Poeira espacial abrasiva grudou nos trajes, arranhando tudo e invadindo o ar da cabine.', en: 'Abrasive space dust stuck to suits, scratching gear and invading cabin air.' }, options: [
      { text: { pt: 'Filtro Magnético', en: 'Magnetic Filter' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Como a poeira tem partículas de ferro, o filtro magnético limpou o ar perfeitamente.', en: 'Since the dust has iron particles, the magnetic filter cleaned the air perfectly.' } },
      { text: { pt: 'Lavar com Água', en: 'Wash with Water' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'A água misturou com o pó afiado criando um cimento duro que travou as juntas do traje.', en: 'Water mixed with sharp dust creating hard cement that locked suit joints.' } },
      { text: { pt: 'Esfregar com Rocha', en: 'Scrub with Rock' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Atrito destruiu as fibras de Kevlar do traje, causando micro-vazamentos de ar.', en: 'Friction destroyed the suits Kevlar fibers, causing air micro-leaks.' } }
  ]},
  { id: 'evt9', title: { pt: 'Dano no Escudo de Calor (Caso Columbia)', en: 'Heat Shield Damage (Columbia Case)' }, desc: { pt: 'Um buraco foi feito no escudo térmico. O calor extremo da reentrada pode destruir a nave.', en: 'A hole was made in the thermal shield. Reentry extreme heat could destroy the ship.' }, options: [
      { text: { pt: 'Cerâmica de Regolito', en: 'Regolith Ceramic' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'Misturar regolito criou uma pasta cerâmica resistente a altas temperaturas, salvando o casco.', en: 'Mixing regolith created a high-temp resistant ceramic paste, saving the hull.' } },
      { text: { pt: 'Placa de Metal', en: 'Metal Plate' }, costType: 'parts', cost: 200, hpMod: -25, outcome: { pt: 'O plasma da reentrada atingiu 1500°C. O metal comum derreteu em segundos.', en: 'Reentry plasma hit 1500°C. Common metal melted in seconds.' } },
      { text: { pt: 'Escudo de Gelo', en: 'Ice Shield' }, costType: 'ice', cost: 150, hpMod: -35, outcome: { pt: 'O gelo evaporou violentamente antes mesmo de entrar na atmosfera profunda.', en: 'Ice evaporated violently before even entering the deep atmosphere.' } }
  ]},
  { id: 'evt10', title: { pt: 'Borracha Congelada (Caso Challenger)', en: 'Frozen Rubber Seals (Challenger Case)' }, desc: { pt: 'O frio extremo no espaço enrijeceu os anéis de vedação de borracha, ameaçando vazar gás quente.', en: 'Extreme cold in space stiffened rubber O-rings, threatening to leak hot gas.' }, options: [
      { text: { pt: 'Aquecedores de Junta', en: 'Joint Heaters' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Os aquecedores elétricos restauraram a flexibilidade da borracha, mantendo o gás selado.', en: 'Electric heaters restored rubber flexibility, keeping the gas sealed.' } },
      { text: { pt: 'Manta de Regolito', en: 'Regolith Blanket' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'A pedra estava tão fria quanto a borracha, não transferindo calor nenhum para a junta.', en: 'The rock was as cold as the rubber, transferring no heat to the joint.' } },
      { text: { pt: 'Água Quente', en: 'Hot Water' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A água esquentou, mas logo congelou novamente no vácuo, expandindo e rompendo a junta.', en: 'Water warmed it, but soon froze again in vacuum, expanding and breaking the joint.' } }
  ]},
  { id: 'evt11', title: { pt: 'Banheiro Quebrado (Caso Crew Dragon)', en: 'Broken Toilet (Crew Dragon Case)' }, desc: { pt: 'O sistema sanitário quebrou e resíduos líquidos estão flutuando livremente em microgravidade.', en: 'Sanitary system broke and liquid waste is floating freely in microgravity.' }, options: [
      { text: { pt: 'Consertar Tubos', en: 'Fix Pipes' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Substituição das válvulas de sucção devolveu a higiene e segurança à nave.', en: 'Replacing suction valves returned hygiene and safety to the ship.' } },
      { text: { pt: 'Areia Absorvente', en: 'Absorbent Sand' }, costType: 'regolith', cost: 120, hpMod: -10, outcome: { pt: 'Funcionou como caixa de areia flutuante, mas espalhou pó fedorento pela cabine.', en: 'Acted as a floating litter box, but spread foul-smelling dust through the cabin.' } },
      { text: { pt: 'Congelar Resíduos', en: 'Freeze Waste' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'O frio endureceu a sujeira, mas danificou sensores delicados ao redor do vazamento.', en: 'Cold hardened the mess, but damaged delicate sensors around the leak.' } }
  ]},
  { id: 'evt12', title: { pt: 'Tempestade Solar Letal (Caso Era Apollo)', en: 'Lethal Solar Storm (Apollo Era Case)' }, desc: { pt: 'O Sol disparou uma nuvem de radiação massiva em direção à nave, que não tem chumbo para defesa.', en: 'The Sun fired a massive radiation cloud toward the ship, lacking lead for defense.' }, options: [
      { text: { pt: 'Barreira de Água', en: 'Water Barrier' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'A água é excelente contra radiação! Os tanques cheios protegeram o DNA dos astronautas.', en: 'Water is excellent against radiation! Full tanks protected the astronauts DNA.' } },
      { text: { pt: 'Camada de Pedra', en: 'Stone Layer' }, costType: 'regolith', cost: 200, hpMod: -20, outcome: { pt: 'Radiação batendo em pedra gerou "raios-X secundários" que queimaram as placas eletrônicas.', en: 'Radiation hitting stone generated secondary X-rays that burned circuit boards.' } },
      { text: { pt: 'Escudo Magnético', en: 'Magnetic Shield' }, costType: 'parts', cost: 200, hpMod: -15, outcome: { pt: 'O escudo sugou energia demais das baterias, deixando o suporte de vida desligado por horas.', en: 'Shield drained too much battery, leaving life support off for hours.' } }
  ]},
  { id: 'evt13', title: { pt: 'Nuvem de Lixo Espacial (Caso ISS)', en: 'Space Debris Cloud (ISS Case)' }, desc: { pt: 'Pedaços de satélites vindo a 27.000 km/h em rota de colisão direta.', en: 'Pieces of satellites incoming at 27,000 km/h on direct collision course.' }, options: [
      { text: { pt: 'Motores e Desvio', en: 'Engines and Dodge' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Queima rápida de combustível alterou a órbita da nave o suficiente para os destroços passarem longe.', en: 'Quick fuel burn altered ship orbit enough for debris to miss closely.' } },
      { text: { pt: 'Reforçar Casco', en: 'Brace Hull' }, costType: 'regolith', cost: 200, hpMod: -30, outcome: { pt: 'A essa velocidade, mesmo pedras grossas foram perfuradas como papelão por parafusos espaciais.', en: 'At this speed, even thick rocks were pierced like cardboard by space screws.' } },
      { text: { pt: 'Névoa Densa', en: 'Dense Mist' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A água não parou os detritos, apenas cegou as câmeras externas da nave.', en: 'Water did not stop debris, only blinded the ships exterior cameras.' } }
  ]},
  { id: 'evt14', title: { pt: 'Atrofia por Microgravidade (Dados OSDR NASA)', en: 'Microgravity Atrophy (NASA OSDR Data)' }, desc: { pt: 'A viagem no espaço está dissolvendo a densidade óssea e os músculos da tripulação.', en: 'Spaceflight is dissolving the crews bone density and muscle.' }, options: [
      { text: { pt: 'Máquina de Resistência', en: 'Resistance Machine' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Engrenagens simulando peso permitiram exercícios vitais, salvando a densidade óssea!', en: 'Weight-simulating gears allowed vital exercises, saving bone density!' } },
      { text: { pt: 'Pesos de Pedra', en: 'Stone Weights' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'No espaço, pedras não têm peso. Tentar malhar com a inércia torceu os pulsos da equipe.', en: 'In space, stones have no weight. Trying to workout with inertia sprained wrists.' } },
      { text: { pt: 'Banho de Gelo', en: 'Ice Bath' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'O choque térmico deprimiu ainda mais o sistema imunológico fragilizado pelo espaço.', en: 'Thermal shock depressed the immune system even more, weakened by space.' } }
  ]},
  { id: 'evt15', title: { pt: 'Chuva de Meteoros de Cometa (Caso Discovery)', en: 'Comet Meteor Shower (Discovery Case)' }, desc: { pt: 'A nave está entrando direto em um rastro denso de poeira e pedras deixado por um cometa.', en: 'The ship is flying straight into a dense trail of dust and rocks left by a comet.' }, options: [
      { text: { pt: 'Escudo de Poeira', en: 'Dust Shield' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'Ejetar regolito grosso destruiu os micro-meteoros antes deles atingirem o casco sensível.', en: 'Ejecting thick regolith destroyed micro-meteors before they hit the sensitive hull.' } },
      { text: { pt: 'Fechar Janelas', en: 'Close Shutters' }, costType: 'parts', cost: 150, hpMod: -20, outcome: { pt: 'A chuva abradou antenas de comunicação, deixando a nave completamente muda e isolada.', en: 'The shower abraded communication antennas, leaving the ship completely mute.' } },
      { text: { pt: 'Muralha de Gelo', en: 'Ice Wall' }, costType: 'ice', cost: 180, hpMod: -15, outcome: { pt: 'Os impactos transformaram o gelo em fragmentos cortantes que danificaram painéis solares.', en: 'Impacts turned ice into sharp shrapnel that damaged solar panels.' } }
  ]},
  { id: 'evt16', title: { pt: 'Blackout de Rádio por Erupção Solar (Alerta DONKI)', en: 'Solar Flare Radio Blackout (DONKI Alert)' }, desc: { pt: 'O banco de dados DONKI alertou: Erupção Solar Classe-X ionizou a área. Radar e comunicações offline!', en: 'DONKI database alert: X-Class Solar Flare ionized the area. Radar and comms offline!' }, options: [
      { text: { pt: 'Reconfigurar Antena', en: 'Reconfigure Antenna' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Usar peças sobressalentes para amplificar a banda UHF superou a interferência solar.', en: 'Using spare parts to boost UHF band overcame the solar interference.' } },
      { text: { pt: 'Nuvem Condutora', en: 'Conductive Cloud' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Água ejetada como antena improvisada congelou no casco e causou curtos-circuitos elétricos.', en: 'Water ejected as a makeshift antenna froze on the hull and caused short circuits.' } },
      { text: { pt: 'Escudo de Rocha', en: 'Rock Shield' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'Tentar cobrir a antena não ajudou; a ionização penetrou a rocha e o rádio continuou mudo.', en: 'Covering the antenna didnt help; ionization penetrated the rock and radio stayed dead.' } }
  ]},
  { id: 'evt17', title: { pt: 'Tempestade de Partículas Solares - SEP (Alerta DONKI)', en: 'Solar Energetic Particles - SEP (DONKI Alert)' }, desc: { pt: 'Alerta DONKI: Evento SEP letal detectado! Prótons super-energéticos estão perfurando o casco.', en: 'DONKI Alert: Lethal SEP event detected! Super-energetic protons are piercing the hull.' }, options: [
      { text: { pt: 'Bombear Água Externa', en: 'Pump Outer Water' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'A massa de água rica em hidrogênio nos canos externos parou os prótons solares perfeitamente.', en: 'The hydrogen-rich water mass in outer pipes stopped the solar protons perfectly.' } },
      { text: { pt: 'Muralha de Pedra', en: 'Stone Wall' }, costType: 'regolith', cost: 200, hpMod: -25, outcome: { pt: 'Partículas solares batendo na pedra criaram Radiação de Frenagem (Bremsstrahlung), fritando CPUs.', en: 'Solar particles hitting stone created Bremsstrahlung radiation, frying CPUs.' } },
      { text: { pt: 'Super Escudo', en: 'Super Shield' }, costType: 'parts', cost: 200, hpMod: -15, outcome: { pt: 'O escudo eletromagnético salvou o DNA, mas drenou as baterias de suporte à vida ao limite.', en: 'The electromagnetic shield saved DNA, but drained life support batteries to the limit.' } }
  ]},
  { id: 'evt18', title: { pt: 'Expansão Atmosférica por Tempestade Geomagnética', en: 'Geomagnetic Storm Atmospheric Expansion' }, desc: { pt: 'Alerta DONKI: Uma tempestade geomagnética aqueceu a atmosfera. O atrito extra está puxando a nave para cair!', en: 'DONKI Alert: Geomagnetic storm heated the atmosphere. Extra drag is pulling the ship down!' }, options: [
      { text: { pt: 'Impulso Extra', en: 'Extra Boost' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'Usar peças para sobrecarregar os motores permitiu que a nave subisse acima do arrasto atmosférico.', en: 'Using parts to overclock engines allowed the ship to climb above the atmospheric drag.' } },
      { text: { pt: 'Aliviar Água', en: 'Dump Water' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Jogar água fora deixou a nave mais leve, mas ameaçou a tripulação com sede severa depois.', en: 'Dumping water made the ship lighter, but threatened the crew with severe thirst later.' } },
      { text: { pt: 'Casco Aerodinâmico', en: 'Aero Hull' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'Prender rochas pesadas ao redor da nave apenas piorou o atrito e acelerou a queda orbital.', en: 'Attaching heavy rocks around the ship only worsened friction and sped up orbital decay.' } }
  ]},
  { id: 'evt19', title: { pt: 'Miopia Espacial (Caso Hubble)', en: 'Space Myopia (Hubble Case)' }, desc: { pt: 'As lentes do sensor principal vieram com um erro microscópico de fábrica. A visão está completamente embaçada!', en: 'The main sensor lenses have a microscopic factory error. Vision is completely blurry!' }, options: [
      { text: { pt: 'Instalar Óculos (COSTAR)', en: 'Install Glasses (COSTAR)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'A tripulação instalou pequenas lentes corretivas que consertaram o foco do telescópio perfeitamente!', en: 'The crew installed small corrective lenses that fixed the telescope focus perfectly!' } },
      { text: { pt: 'Lavar Lente', en: 'Wash Lens' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'A água de limpeza congelou no delicado espelho de berílio, causando trincas irreversíveis.', en: 'Cleaning water froze on the delicate beryllium mirror, causing irreversible cracks.' } },
      { text: { pt: 'Polir com Pó', en: 'Polish with Dust' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Esfregar o vidro com pó de regolito arranhou permanentemente as ópticas, cegando os sensores.', en: 'Rubbing the glass with regolith dust permanently scratched the optics, blinding sensors.' } }
  ]},
  { id: 'evt20', title: { pt: 'Defesa Planetária (Missão DART)', en: 'Planetary Defense (DART Mission)' }, desc: { pt: 'Um asteroide letal está na sua rota. Precisamos realizar um impacto cinético em alta velocidade para desviá-lo!', en: 'A lethal asteroid is on your route. We need to perform a high-speed kinetic impact to deflect it!' }, options: [
      { text: { pt: 'Aumentar Massa da Sonda', en: 'Increase Probe Mass' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'Encher a frente da sonda de pedras pesadas aumentou o impacto cinético (E=mv²/2), desviando o alvo com sucesso!', en: 'Filling the probes front with heavy rocks increased kinetic impact (E=mv²/2), successfully deflecting the target!' } },
      { text: { pt: 'Atirar Lasers', en: 'Shoot Lasers' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'Os lasers de mineração apenas aqueceram a rocha superficial, o asteroide continuou e atingiu a asa da nave.', en: 'Mining lasers only heated surface rock, the asteroid kept coming and clipped the ships wing.' } },
      { text: { pt: 'Jato de Vapor', en: 'Steam Jet' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'Tentou empurrar a rocha com um gêiser de vapor, mas a pressão dissipou no vácuo sem efeito algum.', en: 'Tried pushing the rock with a steam geyser, but pressure dissipated in vacuum with no effect.' } }
  ]},
  { id: 'evt21', title: { pt: 'Origami Espacial Travado (Caso James Webb)', en: 'Jammed Space Origami (James Webb Case)' }, desc: { pt: 'Um painel solar gigante dourado, dobrado como origami, travou no meio do caminho durante a abertura.', en: 'A giant golden solar panel, folded like origami, jammed halfway while unfolding.' }, options: [
      { text: { pt: 'Micro-Braço Robótico', en: 'Micro-Robotic Arm' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'A tripulação improvisou um braço mecânico para dar um pequeno "empurrãozinho" e destravar a dobradiça!', en: 'The crew rigged a mechanical arm to give a tiny "nudge" and unjam the hinge!' } },
      { text: { pt: 'Esfriar com Gelo', en: 'Cool with Ice' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Jogar água fria fez o titânio da estrutura contrair bruscamente e estourar os cabos tensores vitais.', en: 'Throwing cold water made the titanium frame contract sharply, popping vital tension cables.' } },
      { text: { pt: 'Jogar Pedrinhas', en: 'Throw Pebbles' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'Jogar pedras para soltar a junta furou a delicada membrana dourada de proteção contra o Sol.', en: 'Throwing rocks to loosen the joint punctured the delicate golden sun-protection membrane.' } }
  ]},
  { id: 'evt22', title: { pt: 'Helicóptero em Ar Rarefeito (Caso Ingenuity)', en: 'Helicopter in Thin Air (Ingenuity Case)' }, desc: { pt: 'Você precisa enviar um drone à frente, mas a atmosfera daqui tem apenas 1% da densidade da Terra.', en: 'You need to send a drone ahead, but the atmosphere here has only 1% of Earths density.' }, options: [
      { text: { pt: 'Super Rotores Rápidos', en: 'Super Fast Rotors' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Modificar as hélices para girarem 5 vezes mais rápido que na Terra permitiu que o pequeno drone decolasse!', en: 'Modifying props to spin 5 times faster than on Earth allowed the tiny drone to take off!' } },
      { text: { pt: 'Pesos Estabilizadores', en: 'Stabilizer Weights' }, costType: 'regolith', cost: 120, hpMod: -15, outcome: { pt: 'Tentar estabilizar o drone com peso extra o prendeu no chão para sempre.', en: 'Trying to stabilize the drone with extra weight pinned it to the ground forever.' } },
      { text: { pt: 'Turbina a Vapor', en: 'Steam Turbine' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O peso da caldeira de água foi demais para o motor decolar no ar ultrafino.', en: 'The weight of the water boiler was too much for the engine to lift in the ultra-thin air.' } }
  ]},
  { id: 'evt23', title: { pt: 'Mutação de Biofilme (Dados OSDR)', en: 'Biofilm Mutation (OSDR Data)' }, desc: { pt: 'Bactérias Burkholderia formaram um biofilme espesso em microgravidade, entupindo o processador de água!', en: 'Burkholderia bacteria formed a thick biofilm in microgravity, clogging the water processor!' }, options: [
      { text: { pt: 'Jato de Vapor', en: 'Steam Jet' }, costType: 'ice', cost: 180, hpMod: 0, outcome: { pt: 'O calor extremo da água fervente esterilizou os canos sem usar químicos tóxicos.', en: 'The extreme heat of boiling water sterilized the pipes without toxic chemicals.' } },
      { text: { pt: 'Filtro Mecânico', en: 'Mechanical Filter' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'A gosma bacteriana entupiu as engrenagens da nova bomba em poucas horas.', en: 'The bacterial slime clogged the new pump gears in a few hours.' } },
      { text: { pt: 'Abrasão com Pó', en: 'Dust Abrasion' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Jogar pó rasgou o biofilme, mas contaminou todo o suprimento de água potável.', en: 'Throwing dust tore the biofilm but contaminated the entire drinking water supply.' } }
  ]},
  { id: 'evt24', title: { pt: 'Declínio Cognitivo por Radiação (OSDR)', en: 'Radiation Cognitive Decline (OSDR)' }, desc: { pt: 'Radiação do espaço profundo está causando neuroinflamação na equipe (efeito similar ao Alzheimer).', en: 'Deep space radiation is causing neuroinflammation in the crew (Alzheimer-like effect).' }, options: [
      { text: { pt: 'Sintetizar Remédio', en: 'Synthesize Drug' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'O laboratório da nave criou um bloqueador de neuroinflamação, restaurando o foco da equipe!', en: 'The ship lab created a neuroinflammation blocker, restoring the crews focus!' } },
      { text: { pt: 'Terapia Fria', en: 'Cold Therapy' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'O choque frio estressou os astronautas, piorando a resposta imune cerebral.', en: 'Cold shock stressed astronauts, worsening the brain immune response.' } },
      { text: { pt: 'Cristaloterapia', en: 'Crystal Therapy' }, costType: 'regolith', cost: 100, hpMod: -30, outcome: { pt: 'Acreditar que pedras curam radiação resultou em decisões lentas e falhas na pilotagem.', en: 'Believing stones heal radiation resulted in slow decisions and piloting failures.' } }
  ]},
  { id: 'evt25', title: { pt: 'Estresse Térmico e Perda Óssea (OSDR)', en: 'Thermal Stress & Bone Loss (OSDR)' }, desc: { pt: 'Falha no aquecedor! O frio extremo acelera drasticamente a perda de massa óssea na tripulação.', en: 'Heater failure! Extreme cold drastically accelerates crew bone mass loss.' }, options: [
      { text: { pt: 'Consertar Aquecedor', en: 'Fix Heater' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Aquecedores restaurados! A zona termoneutra evitou a degradação óssea precoce.', en: 'Heaters restored! The thermoneutral zone prevented early bone degradation.' } },
      { text: { pt: 'Bolsas de Água Quente', en: 'Hot Water Bags' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'A água esfriou rápido demais, estourou e congelou sobre os painéis de controle.', en: 'The water cooled too fast, burst, and froze over control panels.' } },
      { text: { pt: 'Isolamento de Pedra', en: 'Stone Insulation' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'Pedras roubaram o pouco calor restante do corpo dos astronautas por condução térmica.', en: 'Stones stole the little remaining body heat from the astronauts via thermal conduction.' } }
  ]},
  { id: 'evt26', title: { pt: 'Falha na Horta Espacial (Projeto Veggie)', en: 'Space Garden Failure (Veggie)' }, desc: { pt: 'As plantas que filtram nosso ar estão morrendo devido ao espectro de luz errado em órbita.', en: 'The plants filtering our air are dying due to the wrong light spectrum in orbit.' }, options: [
      { text: { pt: 'Calibrar LEDs', en: 'Calibrate LEDs' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Ajustar a luz para 90% Vermelho e 10% Azul salvou os tomates e restaurou o O2!', en: 'Adjusting light to 90% Red and 10% Blue saved the tomatoes and restored O2!' } },
      { text: { pt: 'Irrigação Fria', en: 'Cold Irrigation' }, costType: 'ice', cost: 100, hpMod: -15, outcome: { pt: 'Sem a luz correta, a água extra apenas apodreceu as raízes das plantas em microgravidade.', en: 'Without correct light, extra water just rotted the plant roots in microgravity.' } },
      { text: { pt: 'Fertilizante Mineral', en: 'Mineral Fertilizer' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'O solo de regolito era muito tóxico (percloratos), matando a colheita instantaneamente.', en: 'The regolith soil was too toxic (perchlorates), killing the crop instantly.' } }
  ]},
  { id: 'evt27', title: { pt: 'Alerta do Biossensor de Levedura (BioSentinel)', en: 'Yeast Biosensor Alert (BioSentinel)' }, desc: { pt: 'Microrganismos a bordo detectaram um pico invisível e letal de raios cósmicos galácticos!', en: 'Onboard microbes detected an invisible and lethal spike of galactic cosmic rays!' }, options: [
      { text: { pt: 'Escudo de Água', en: 'Water Shield' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'Encher as paredes com água criou uma barreira rica em hidrogênio que bloqueou a radiação.', en: 'Filling walls with water created a hydrogen-rich barrier blocking the radiation.' } },
      { text: { pt: 'Gaiola de Faraday', en: 'Faraday Cage' }, costType: 'parts', cost: 180, hpMod: -20, outcome: { pt: 'A gaiola parou eletricidade, mas raios cósmicos de alta energia passaram direto.', en: 'The cage stopped electricity, but high-energy cosmic rays passed right through.' } },
      { text: { pt: 'Reforço de Rocha', en: 'Rock Brace' }, costType: 'regolith', cost: 200, hpMod: -25, outcome: { pt: 'Raios cósmicos bateram na rocha e estilhaçaram em radiação secundária ainda pior.', en: 'Cosmic rays hit the rock and shattered into even worse secondary radiation.' } }
  ]},
  { id: 'evt28', title: { pt: 'Síndrome Neuro-Ocular Espacial (SANS)', en: 'Space Neuro-ocular Syndrome (SANS)' }, desc: { pt: 'Sem gravidade, os fluidos corporais subiram para a cabeça, achatando os olhos da tripulação.', en: 'Without gravity, body fluids shifted to the head, flattening the crews eyeballs.' }, options: [
      { text: { pt: 'Traje de Pressão', en: 'Pressure Suit' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'As calças de sucção (Chibis) puxaram o sangue de volta para as pernas, salvando a visão!', en: 'Suction pants (Chibis) pulled blood back to the legs, saving their vision!' } },
      { text: { pt: 'Máscara Gelada', en: 'Ice Mask' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'O gelo reduziu o inchaço do rosto, mas não tirou a pressão de trás dos nervos óticos.', en: 'Ice reduced facial swelling, but didnt relieve pressure from behind the optic nerves.' } },
      { text: { pt: 'Gravidade de Pedra', en: 'Stone Gravity' }, costType: 'regolith', cost: 100, hpMod: -25, outcome: { pt: 'Amarrar pedras não cria gravidade, apenas fez os astronautas chutarem e quebrarem painéis.', en: 'Tying stones doesnt create gravity, just made astronauts kick and break panels.' } }
  ]},
  { id: 'evt29', title: { pt: 'Ejeção de Massa Coronal (DONKI CME)', en: 'Coronal Mass Ejection (DONKI CME)' }, desc: { pt: 'Alerta DONKI: Uma nuvem gigante de plasma solar superaquecido vai engolir a nave!', en: 'DONKI Alert: A giant cloud of superheated solar plasma will engulf the ship!' }, options: [
      { text: { pt: 'Escudo de Rocha Espessa', en: 'Thick Rock Shield' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'A massa bruta do regolito formou um escudo que derreteu em vez da nave principal.', en: 'The raw mass of regolith formed a shield that melted instead of the main ship.' } },
      { text: { pt: 'Barreira de Gelo', en: 'Ice Barrier' }, costType: 'ice', cost: 200, hpMod: -25, outcome: { pt: 'O plasma a milhões de graus vaporizou a água instantaneamente, explodindo as tubulações.', en: 'Million-degree plasma vaporized water instantly, blowing up the pipes.' } },
      { text: { pt: 'Campo Elétrico', en: 'Electric Field' }, costType: 'parts', cost: 200, hpMod: -20, outcome: { pt: 'O plasma massivo sobrecarregou e derreteu os geradores do campo de força.', en: 'The massive plasma overloaded and melted the force field generators.' } }
  ]},
  { id: 'evt30', title: { pt: 'Choque Interplanetário (DONKI IPS)', en: 'Interplanetary Shock (DONKI IPS)' }, desc: { pt: 'Alerta DONKI: Uma onda de choque invisível no vento solar colidirá com força bruta.', en: 'DONKI Alert: An invisible shockwave in the solar wind will hit with brute force.' }, options: [
      { text: { pt: 'Amortecedores Estruturais', en: 'Structural Dampers' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Ativar pistões hidráulicos permitiu que o chassi absorvesse o impacto violento sem quebrar.', en: 'Activating hydraulic pistons let the chassis absorb the violent impact without breaking.' } },
      { text: { pt: 'Lastro de Pedra', en: 'Stone Ballast' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A inércia extra das pedras causou um efeito chicote que rachou o casco de titânio.', en: 'The extra inertia of the stones caused a whiplash effect that cracked the titanium hull.' } },
      { text: { pt: 'Contra-jato de Vapor', en: 'Counter-Steam Jet' }, costType: 'ice', cost: 180, hpMod: -20, outcome: { pt: 'A onda de choque engoliu o vapor e jogou a nave em um giro caótico e descontrolado.', en: 'The shockwave swallowed the steam and threw the ship into a chaotic, uncontrolled spin.' } }
  ]},
  { id: 'evt31', title: { pt: 'Fluxo Solar de Alta Velocidade (DONKI HSS)', en: 'High-Speed Solar Stream (DONKI HSS)' }, desc: { pt: 'Um buraco coronal está soprando vento solar contínuo a 800 km/s, arrastando nossa órbita.', en: 'A coronal hole is blowing steady solar wind at 800 km/s, dragging our orbit.' }, options: [
      { text: { pt: 'Propulsores de Correção', en: 'Correction Thrusters' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Manobras suaves e contínuas mantiveram a nave estável contra a correnteza solar.', en: 'Smooth, continuous maneuvers kept the ship stable against the solar current.' } },
      { text: { pt: 'Reforçar Armadura', en: 'Brace Armor' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Mais massa apenas aumentou a área de arrasto, fazendo a nave perder altitude rápido.', en: 'More mass just increased the drag area, making the ship lose altitude quickly.' } },
      { text: { pt: 'Criogenia', en: 'Cryogenics' }, costType: 'ice', cost: 120, hpMod: -15, outcome: { pt: 'Congelar o casco não impediu a física do arrasto magnético. Órbita gravemente degradada.', en: 'Freezing the hull didnt stop magnetic drag physics. Orbit severely degraded.' } }
  ]},
  { id: 'evt32', title: { pt: 'Cruzamento da Magnetopausa (DONKI MPC)', en: 'Magnetopause Crossing (DONKI MPC)' }, desc: { pt: 'Saímos do escudo magnético da Terra! Estamos expostos ao plasma bruto do espaço interplanetário.', en: 'We left Earths magnetic shield! Exposed to raw interplanetary space plasma.' }, options: [
      { text: { pt: 'Defletor Eletromagnético', en: 'Electromagnetic Deflector' }, costType: 'parts', cost: 250, hpMod: 0, outcome: { pt: 'O gerador criou uma bolha magnética artificial, desviando o plasma mortal com sucesso.', en: 'The generator created an artificial magnetic bubble, successfully deflecting deadly plasma.' } },
      { text: { pt: 'Escudo de Gelo', en: 'Ice Shield' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'O plasma cósmico ferveu e ionizou a água, criando tempestades elétricas perigosas no casco.', en: 'Cosmic plasma boiled and ionized the water, creating dangerous electrical storms on the hull.' } },
      { text: { pt: 'Camada de Pó', en: 'Dust Layer' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'O plasma silicatou o pó instantaneamente, fundindo escotilhas e cegando sensores.', en: 'Plasma silicated the dust instantly, fusing hatches and blinding sensors.' } }
  ]},
  { id: 'evt33', title: { pt: 'Aumento do Cinturão de Radiação (DONKI RBE)', en: 'Radiation Belt Enhancement (DONKI RBE)' }, desc: { pt: 'O cinturão de radiação sobrecarregou. Elétrons assassinos vão fritar os computadores de voo!', en: 'The radiation belt supercharged. Killer electrons will fry the flight computers!' }, options: [
      { text: { pt: 'Circular Água no Casco', en: 'Circulate Water in Hull' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'A camada fluida atuou como um dissipador perfeito para absorver os elétrons super-rápidos.', en: 'The fluid layer acted as a perfect sink to absorb the super-fast electrons.' } },
      { text: { pt: 'Reiniciar Sistemas', en: 'Reboot Systems' }, costType: 'parts', cost: 150, hpMod: -20, outcome: { pt: 'Desligar não impediu os elétrons de causarem Descargas Dielétricas Profundas (curtos graves).', en: 'Turning off didnt stop electrons from causing Deep Dielectric Discharges (severe shorts).' } },
      { text: { pt: 'Aterramento Mineral', en: 'Mineral Grounding' }, costType: 'regolith', cost: 120, hpMod: -25, outcome: { pt: 'Os minerais secos não conduziram a carga espacial. Faíscas enormes destruíram as baterias.', en: 'Dry minerals didnt conduct space charge. Massive sparks destroyed the batteries.' } }
  ]},
  { id: 'evt34', title: { pt: 'Vazamento de Amônia Tóxica', en: 'Toxic Ammonia Leak' }, desc: { pt: 'O sistema de resfriamento externo vazou gás amônia letal no sistema de ar da cabine principal!', en: 'The external cooling loop leaked lethal ammonia gas into the main cabin air system!' }, options: [
      { text: { pt: 'Bypass de Tubulação', en: 'Pipe Bypass' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'A tripulação isolou a linha quebrada e filtrou o ar a tempo, evitando um desastre químico.', en: 'The crew isolated the broken line and scrubbed the air in time, averting a chemical disaster.' } },
      { text: { pt: 'Congelar o Gás', en: 'Freeze the Gas' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A amônia atua como anticongelante. A água misturou, derreteu e espalhou o veneno.', en: 'Ammonia acts as antifreeze. Water mixed, melted, and spread the poison.' } },
      { text: { pt: 'Areia Absorvente', en: 'Absorbent Sand' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'A poeira mascarou o cheiro, mas os vapores químicos continuaram queimando os olhos e pulmões.', en: 'The dust masked the smell, but chemical vapors kept burning eyes and lungs.' } }
  ]},
  { id: 'evt35', title: { pt: 'Cabo Espacial Rompido', en: 'Snapped Space Tether' }, desc: { pt: 'Durante uma caminhada espacial, o cabo de segurança arrebentou. Um astronauta flutua para longe!', en: 'During a spacewalk, the safety tether snapped. An astronaut is floating away!' }, options: [
      { text: { pt: 'Mochila a Jato (SAFER)', en: 'Jetpack (SAFER)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Usando pequenos jatos de nitrogênio de emergência, o astronauta voou de volta em segurança.', en: 'Using small emergency nitrogen jets, the astronaut flew back to safety.' } },
      { text: { pt: 'Jogar Pedras (Ação/Reação)', en: 'Throw Rocks (Action/Reaction)' }, costType: 'regolith', cost: 100, hpMod: -25, outcome: { pt: 'Jogar pedras não gerou empuxo no eixo correto, e o astronauta quase se perdeu no vácuo.', en: 'Throwing rocks didnt generate thrust on the right axis; the astronaut was almost lost.' } },
      { text: { pt: 'Jato de Água', en: 'Water Jet' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'A água congelou na válvula da garrafa instantaneamente, impedindo qualquer propulsão.', en: 'Water froze in the bottle valve instantly, preventing any propulsion.' } }
  ]},
  { id: 'evt36', title: { pt: 'Saturação do Giroscópio (CMG)', en: 'Gyroscope Saturation (CMG)' }, desc: { pt: 'As enormes rodas de equilíbrio da nave giraram até o limite máximo. Perdemos a direção!', en: 'The ships massive balance wheels spun to their max limit. We lost steering!' }, options: [
      { text: { pt: 'Desaturação com Foguetes', en: 'Rocket Desaturation' }, costType: 'parts', cost: 220, hpMod: 0, outcome: { pt: 'Disparar foguetes opostos parou a rotação da nave, permitindo que os giroscópios freassem.', en: 'Firing opposite thrusters stopped ship rotation, allowing gyroscopes to brake safely.' } },
      { text: { pt: 'Mudar Centro de Massa', en: 'Shift Center of Mass' }, costType: 'ice', cost: 150, hpMod: -20, outcome: { pt: 'Mover tanques de água só gerou uma oscilação caótica, destruindo as frágeis antenas solares.', en: 'Moving water tanks only caused a chaotic wobble, destroying fragile solar antennas.' } },
      { text: { pt: 'Jogar Lastro Fora', en: 'Dump Ballast' }, costType: 'regolith', cost: 150, hpMod: -25, outcome: { pt: 'A mudança violenta de peso quebrou por torção o eixo de um dos giroscópios de titânio.', en: 'The violent weight change torsionally snapped the axis of a titanium gyroscope.' } }
  ]},
  { id: 'evt37', title: { pt: 'Fuga Térmica da Bateria', en: 'Battery Thermal Runaway' }, desc: { pt: 'Uma bateria de íons de lítio entrou em curto e está esquentando a 600°C! Risco de explosão.', en: 'A lithium-ion battery shorted and is heating to 600°C! Explosion risk.' }, options: [
      { text: { pt: 'Resfriamento Brutal', en: 'Brutal Cooling' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'Inundar o compartimento isolado com gelo roubou todo o calor, apagando o incêndio químico.', en: 'Flooding the isolated bay with ice stole all the heat, putting out the chemical fire.' } },
      { text: { pt: 'Ventilar o Painel', en: 'Vent the Panel' }, costType: 'parts', cost: 150, hpMod: -25, outcome: { pt: 'Abrir dutos de emergência forneceu oxigênio, transformando a bateria numa tocha incandescente!', en: 'Opening emergency ducts provided oxygen, turning the battery into an incandescent torch!' } },
      { text: { pt: 'Abafar com Pó', en: 'Smother with Dust' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'O pó prendeu o calor lá dentro, fazendo a bateria inchar e estourar a pesada porta do painel.', en: 'Dust trapped the heat inside, making the battery swell and blow off the heavy panel door.' } }
  ]},
  { id: 'evt38', title: { pt: 'Tiro de Lixo Espacial (Pintura)', en: 'Space Debris Strike (Paint)' }, desc: { pt: 'Uma lasca de tinta de um foguete antigo voando a 30.000 km/h rachou a janela de vidro frontal!', en: 'A paint chip from an old rocket flying at 30,000 km/h cracked the front glass window!' }, options: [
      { text: { pt: 'Resina Epóxi Espacial', en: 'Space Epoxy Resin' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'A resina aderiu perfeitamente e selou a micro-rachadura, impedindo que o vidro estourasse.', en: 'The resin adhered perfectly and sealed the micro-crack, preventing the glass from shattering.' } },
      { text: { pt: 'Tampão de Gelo', en: 'Ice Plug' }, costType: 'ice', cost: 100, hpMod: -25, outcome: { pt: 'O gelo expandiu com força dentro da rachadura, piorando o dano e causando micro-vazamentos.', en: 'Ice expanded forcefully inside the crack, worsening the damage and causing micro-leaks.' } },
      { text: { pt: 'Massa de Pedra', en: 'Stone Putty' }, costType: 'regolith', cost: 120, hpMod: -20, outcome: { pt: 'Esfregar poeira áspera destruiu a camada anti-reflexo dourada e cegou a visão dos pilotos.', en: 'Rubbing rough dust destroyed the golden anti-glare layer and blinded the pilots.' } }
  ]},
  { id: 'evt39', title: { pt: 'Filtro de CO2 Entupido', en: 'Clogged CO2 Filter' }, desc: { pt: 'Filtros exauridos. O ar está pesado, sufocante, e a tripulação não consegue pensar direito.', en: 'Exhausted filters. The air is heavy, suffocating, and the crew cant think straight.' }, options: [
      { text: { pt: 'Adaptador Improvisado', en: 'Improvised Adapter' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'A equipe usou fita e plástico para encaixar perfeitamente um filtro quadrado num buraco redondo!', en: 'The crew used tape and plastic to perfectly fit a square filter into a round hole!' } },
      { text: { pt: 'Lavar com Água', en: 'Wash with Water' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'A água derreteu e destruiu o hidróxido de lítio do filtro, tornando-o inútil de vez.', en: 'Water melted and destroyed the lithium hydroxide in the filter, rendering it permanently useless.' } },
      { text: { pt: 'Filtrar com Pedras', en: 'Filter with Stones' }, costType: 'regolith', cost: 120, hpMod: -25, outcome: { pt: 'Regolito não reage com gás carbônico. A tripulação desmaiou temporariamente por asfixia.', en: 'Regolith doesnt react with carbon dioxide. Crew temporarily passed out from asphyxiation.' } }
  ]},
  { id: 'evt40', title: { pt: 'Ilusão Vestibular (Enjoo Espacial)', en: 'Vestibular Illusion (Space Sickness)' }, desc: { pt: 'Sem "cima e baixo", o ouvido interno da equipe enlouqueceu (Desorientação Espacial Severa).', en: 'Without "up and down", the crews inner ear went crazy (Severe Spatial Disorientation).' }, options: [
      { text: { pt: 'Centrífuga Médica', en: 'Medical Centrifuge' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Uma pequena rotação recriou a gravidade, curando os labirintos e salvando o foco da equipe.', en: 'A small rotation recreated gravity, curing inner ears and saving the crews focus.' } },
      { text: { pt: 'Beber Água Gelada', en: 'Drink Ice Water' }, costType: 'ice', cost: 100, hpMod: -15, outcome: { pt: 'Água flutuante no estômago confuso só resultou em vômitos catastróficos no painel principal.', en: 'Floating water in a confused stomach only resulted in catastrophic vomiting on the main panel.' } },
      { text: { pt: 'Terapia de Peso', en: 'Weight Therapy' }, costType: 'regolith', cost: 100, hpMod: -20, outcome: { pt: 'Carregar pedras pesadas flutuantes não ajudou com o enjoo e só machucou as costas dos pilotos.', en: 'Carrying heavy floating rocks didnt help the sickness and only hurt the pilots backs.' } }
  ]}
];
