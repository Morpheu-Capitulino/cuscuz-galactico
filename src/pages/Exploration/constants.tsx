import React from 'react';
import { BookOpen, AlertTriangle, ShieldAlert, Zap } from 'lucide-react';

export const TARGET_DISTANCE = 10000;

export const DICTIONARY = {
  pt: {
    arrival: "Pouso seguro realizado com sucesso! Bem-vindo à sua nova base.",
    tut1: "SISTEMA INICIADO. Bem-vindo à simulação de voo espacial.",
    tut2: "Seus recursos vitais (O2, H2O, Energia) são essenciais para a sobrevivência.",
    tut3: "ANOMALIA DETECTADA: Regolito. Clique no meteoro cinza para minerar minerais estruturais.",
    tut4: "ANOMALIA DETECTADA: Gelo. Clique no cometa azul para extrair água e oxigênio.",
    tut5: "ANOMALIA DETECTADA: Sucata. Clique nos destroços laranjas para obter peças de engenharia.",
    tut6: "ALERTA DE PERIGO: Evite anomalias vermelhas flamejantes. Elas causam dano estrutural crítico!",
    tut7: "DICA TÁTICA: Combos de coleta (cliques rápidos) aumentam o multiplicador de recursos ganhos.",
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
    upgScoopDesc: "Adiciona um valor fixo de recursos extras em cada clique feito com sucesso.",
    upgTurret: "Torreta de Defesa",
    upgTurretDesc: "Destrói micro-detritos. Aumenta significativamente a chance de lidar com eventos balísticos."
  },
  en: {
    arrival: "Safe landing successful! Welcome to your new base.",
    tut1: "SYSTEM BOOT. Welcome to the space flight simulation.",
    tut2: "Your vital resources (O2, H2O, Power) are essential for survival.",
    tut3: "ANOMALY DETECTED: Regolith. Click the gray meteor to mine structural minerals.",
    tut4: "ANOMALY DETECTED: Ice. Click the blue comet to extract water and oxygen.",
    tut5: "ANOMALY DETECTED: Scrap. Click the orange debris to salvage engineering parts.",
    tut6: "HAZARD ALERT: Avoid red flaming anomalies. They cause critical structural damage!",
    tut7: "TACTICAL TIP: Collection combos (rapid clicks) increase your resource multiplier.",
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
    upgScoopDesc: "Adds a flat fixed value of extra resources on every successful click.",
    upgTurret: "Defense Turret",
    upgTurretDesc: "Destroys micro-debris. Significantly increases the chance to handle ballistic events."
  }
};

export const MANUAL_CONTENT = {
  pt: [
    { title: "Coleta Básica", desc: "Clique nos meteoros cinzas, azuis e laranjas para coletar recursos primários.", icon: <Zap /> },
    { title: "Manutenção", desc: "Sua nave drena recursos com o tempo. Mantenha os níveis no verde para evitar dano no casco.", icon: <ShieldAlert /> },
    { title: "Perigos", desc: "Meteoros vermelhos e chamejantes causam dano e roubam recursos.", icon: <AlertTriangle /> },
    { title: "Eventos", desc: "Ocasionalmente a nave sofrerá eventos críticos. Escolha a melhor reparação gastando os itens certos.", icon: <BookOpen /> }
  ],
  en: [
    { title: "Basic Gathering", desc: "Click on gray, blue, and orange meteors to collect primary resources.", icon: <Zap /> },
    { title: "Maintenance", desc: "Your ship drains resources over time. Keep levels in the green to avoid hull damage.", icon: <ShieldAlert /> },
    { title: "Hazards", desc: "Red flaming meteors cause damage and steal resources if clicked.", icon: <AlertTriangle /> },
    { title: "Events", desc: "Occasionally the ship will face critical events. Choose the best repair by spending the right items.", icon: <BookOpen /> }
  ]
};

export const PLANETS = [
  { id: 1, x: '15%', color: 'from-indigo-600 to-purple-900', size: 'w-64 h-64', duration: 40, delay: 0 },
  { id: 2, x: '75%', color: 'from-orange-700 to-red-900', size: 'w-48 h-48', duration: 60, delay: 15 },
  { id: 3, x: '45%', color: 'from-teal-600 to-cyan-900', size: 'w-96 h-96', duration: 80, delay: 35 }
];

export const GAME_EVENTS = [
  { id: 'evt1', title: { pt: 'Ejeção de Massa Coronal', en: 'Coronal Mass Ejection' }, desc: { pt: 'Tempestade geomagnética solar detectada em aproximação. Partículas carregadas ameaçam a eletrônica primária.', en: 'Solar geomagnetic storm detected. Charged particles threaten primary electronics.' }, options: [
      { text: { pt: 'Escudo de Espalhamento', en: 'Scattering Shield' }, costType: 'ice', cost: 150, hpMod: 0, outcome: { pt: 'A alta densidade de prótons na água atenuou nêutrons e radiação ionizante via Espalhamento de Compton. Integridade mantida.', en: 'High proton density in water attenuated ionizing radiation via Compton scattering. Integrity held.' } },
      { text: { pt: 'Blindagem Densa', en: 'Dense Armor' }, costType: 'regolith', cost: 200, hpMod: -15, outcome: { pt: 'FÍSICA: O metal pesado bloqueou a onda, mas gerou Bremsstrahlung (radiação de frenagem). A emissão secundária de Raios-X queimou circuitos.', en: 'Heavy metal generated Bremsstrahlung. Secondary X-ray emission burned circuits.' } },
      { text: { pt: 'Modo Inativo', en: 'Standby Mode' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Mesmo desligada, a variação magnética induziu correntes parasitas (Lei de Faraday) fritando barramentos vitais.', en: 'Magnetic variation induced eddy currents (Faraday Law), frying vital bus lines.' } }
  ]},
  { id: 'evt2', title: { pt: 'Síndrome de Kessler', en: 'Kessler Syndrome' }, desc: { pt: 'Nuvem de micro-detritos orbitais hipervelozes (7.5 km/s) interceptando a trajetória da nave.', en: 'Cloud of hypervelocity orbital debris (7.5 km/s) intercepting flight path.' }, options: [
      { text: { pt: 'Aumentar Inércia', en: 'Increase Inertia' }, costType: 'regolith', cost: 200, hpMod: 0, outcome: { pt: 'A adição de massa estrutural dissipou a tremenda energia cinética (E=mv²/2) dos impactos menores, salvando o núcleo.', en: 'Added mass dissipated kinetic energy (E=mv²/2) of minor impacts.' } },
      { text: { pt: 'Resfriar Carenagem', en: 'Cool Hull' }, costType: 'ice', cost: 150, hpMod: -30, outcome: { pt: 'FÍSICA DE MATERIAIS: A queda de temperatura causou transição dúctil-frágil no metal. A energia do impacto estilhaçou as placas.', en: 'Temperature drop caused ductile-brittle transition. Hull shattered on impact.' } },
      { text: { pt: 'Manter Curso', en: 'Maintain Course' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Sem ação, a alta velocidade relativa fez com que micro-parafusos perfurassem o casco como balas de artilharia.', en: 'High relative velocity turned micro-screws into artillery shells piercing the hull.' } }
  ]},
  { id: 'evt3', title: { pt: 'Falha no Traje Sublimador', en: 'Sublimator Failure' }, desc: { pt: 'O sistema de resfriamento LCG da cabine bloqueou. O calor residual humano e eletrônico não está sendo dissipado no vácuo.', en: 'Cabin LCG cooling blocked. Residual heat is not dissipating.' }, options: [
      { text: { pt: 'Purgar Tubulações', en: 'Purge Pipes' }, costType: 'parts', cost: 120, hpMod: 0, outcome: { pt: 'Peças novas recalibraram o fluxo. A água pôde sublimar diretamente para o espaço, rejeitando calor latente perfeitamente.', en: 'Water sublimated directly into space, perfectly rejecting latent heat.' } },
      { text: { pt: 'Injeção Adicional', en: 'Extra Injection' }, costType: 'ice', cost: 100, hpMod: -20, outcome: { pt: 'O excesso de água congelou nas linhas finas (anomalia de densidade), expandindo e rompendo válvulas críticas.', en: 'Excess water froze and expanded in fine lines, breaking critical valves.' } },
      { text: { pt: 'Ignorar Alarme', en: 'Ignore Alarm' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'A saturação térmica desestabilizou baterias e computadores falharam por limite operacional seguro (Throttling Térmico).', en: 'Thermal saturation caused battery instability and CPU thermal throttling.' } }
  ]},
  { id: 'evt4', title: { pt: 'Acúmulo Eletrostático', en: 'Spacecraft Charging' }, desc: { pt: 'O atrito com plasma da ionosfera carregou a superfície da nave com potencial elétrico perigoso.', en: 'Plasma friction charged the hull with dangerous electrical potential.' }, options: [
      { text: { pt: 'Canhão de Elétrons', en: 'Electron Cannon' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Componentes ejetaram elétrons ativamente para o vácuo, equalizando o potencial da nave com o plasma ambiente (Neutralização).', en: 'Active electron ejection equalized hull potential with ambient plasma.' } },
      { text: { pt: 'Isolamento de Silicato', en: 'Silicate Insulation' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'O regolito aumentou a capacitância do casco. A carga se acumulou até causar um arco voltaico severo no painel solar.', en: 'Regolith increased capacitance, building charge until a severe arc flash hit solar arrays.' } },
      { text: { pt: 'Aguardar Dissipação', en: 'Await Dissipation' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O vácuo é um isolante perfeito. Sem aterramento, a carga arcou para os circuitos internos, corrompendo a navegação.', en: 'Vacuum is a perfect insulator. Unreleased charge arced internally, corrupting nav.' } }
  ]},
  { id: 'evt5', title: { pt: 'Erosão por Oxigênio Atômico', en: 'Atomic Oxygen Erosion' }, desc: { pt: 'Em órbita baixa, partículas de oxigênio atômico estão oxidando severamente polímeros estruturais.', en: 'In low orbit, atomic oxygen particles are severely oxidizing structural polymers.' }, options: [
      { text: { pt: 'Camada de Sacrifício', en: 'Sacrificial Layer' }, costType: 'regolith', cost: 180, hpMod: 0, outcome: { pt: 'A poeira reagiu termodinamicamente com o O atômico, formando uma cerâmica passivadora que protegeu a estrutura base.', en: 'Dust reacted thermodynamically forming a passivating ceramic that protected the base.' } },
      { text: { pt: 'Lavar com Água', en: 'Wash with Water' }, costType: 'ice', cost: 120, hpMod: -20, outcome: { pt: 'A água evaporou instantaneamente. A umidade residual acelerou reações de oxidação nas ligas de alumínio.', en: 'Water flash-boiled. Residual moisture accelerated oxidation in aluminum alloys.' } },
      { text: { pt: 'Manter Perfil', en: 'Keep Profile' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'Kevlar e isolantes térmicos viraram cinzas ao contato. Degradação massiva da blindagem externa térmica.', en: 'Kevlar and thermal insulators turned to ash. Massive external degradation.' } }
  ]},
  { id: 'evt6', title: { pt: 'Single Event Upset (SEU)', en: 'Single Event Upset' }, desc: { pt: 'Um raio cósmico galáctico altamente energético está cruzando nosso setor de processamento.', en: 'High-energy galactic cosmic ray crossing processing sector.' }, options: [
      { text: { pt: 'Redundância Lógica', en: 'Logic Redundancy' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Hardware extra executou votação tripla modular (TMR). O bit "flipado" pelo raio foi isolado e corrigido matematicamente.', en: 'Triple Modular Redundancy isolated and corrected the radiation-flipped bit.' } },
      { text: { pt: 'Enclausurar', en: 'Enclose CPU' }, costType: 'regolith', cost: 200, hpMod: -25, outcome: { pt: 'O raio primário colidiu com o regolito, criando uma "chuva" de partículas secundárias piores, fritando o disco rígido.', en: 'Primary ray hit regolith, creating a shower of worse secondary particles.' } },
      { text: { pt: 'Ignorar', en: 'Ignore' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'O bit "1" virou "0" no controle de propulsão. O motor disparou errado, causando torção estrutural na fuselagem.', en: 'Bit flipped in propulsion control. Engine misfired, causing structural torsion.' } }
  ]},
  { id: 'evt7', title: { pt: 'Despressurização por Microfratura', en: 'Microfracture Depressurization' }, desc: { pt: 'Fadiga térmica causou uma micro-fissura. O ar da cabine está vazando sob alta pressão acústica.', en: 'Thermal fatigue caused a crack. Cabin air leaking under acoustic pressure.' }, options: [
      { text: { pt: 'Selante de Gelo', en: 'Ice Sealant' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'TERMODINÂMICA: A água congelou instantaneamente na fissura pelo frio do vácuo, criando um tampão estrutural hermético perfeito.', en: 'Water flash-froze in the crack from vacuum cold, creating a perfect hermetic plug.' } },
      { text: { pt: 'Rebites Externos', en: 'External Rivets' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'A perfuração dos rebites gerou concentrações de tensão ao redor da rachadura primária, fragilizando a área.', en: 'Riveting generated stress concentrations around the crack, weakening the area.' } },
      { text: { pt: 'Fita Adesiva', en: 'Tape Over' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Adesivos comuns perdem aderência no vácuo devido à evaporação de solventes (Desgaseificação). Vazamento continuou.', en: 'Standard adhesives lose grip in vacuum due to outgassing. Leak continued.' } }
  ]},
  { id: 'evt8', title: { pt: 'Saturação de Giroscópios', en: 'Gyroscope Saturation' }, desc: { pt: 'As rodas de reação acumularam momento angular máximo. Perdemos o controle de atitude da nave.', en: 'Reaction wheels hit max angular momentum. Attitude control lost.' }, options: [
      { text: { pt: 'Propulsores (RCS)', en: 'Thrusters (RCS)' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'Válvulas novas permitiram disparar propulsores químicos para anular o torque rotacional (Desaturação Física).', en: 'Chemical thrusters fired to cancel rotational torque (Physical Desaturation).' } },
      { text: { pt: 'Freio Magnético', en: 'Magnetic Brake' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Frear com atrito transferiu energia cinética para o eixo, superaquecendo rolamentos de esferas no vácuo seco.', en: 'Friction braking transferred kinetic energy, overheating bearings in dry vacuum.' } },
      { text: { pt: 'Desligar Rodas', en: 'Power Off Wheels' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Conservação do Momento Angular: A energia da roda passou para a nave. Entramos num giro letal descontrolado.', en: 'Conservation of Angular Momentum transferred spin to the ship. Lethal tumble.' } }
  ]},
  { id: 'evt9', title: { pt: 'Desgaseificação no Vácuo', en: 'Vacuum Outgassing' }, desc: { pt: 'No ambiente de extrema baixa pressão, solventes das placas solares estão sublimando e embaçando lentes.', en: 'In extreme low pressure, solvents are sublimating and fogging lenses.' }, options: [
      { text: { pt: 'Filtro Frio', en: 'Cold Filter' }, costType: 'ice', cost: 120, hpMod: 0, outcome: { pt: 'Condensamos os gases em uma placa fria sacrifical (Cold Finger). Lentes ópticas da nave permaneceram limpas.', en: 'Condensed gases on a sacrificial cold finger. Optical lenses stayed clean.' } },
      { text: { pt: 'Raspar Poeira', en: 'Scrape Dust' }, costType: 'regolith', cost: 100, hpMod: -15, outcome: { pt: 'A poeira agiu como lixa. A química dos gases cimentou o material na lente, diminuindo eficácia solar.', en: 'Dust acted as sandpaper. Gas chemistry cemented it to the lens.' } },
      { text: { pt: 'Ignorar Gases', en: 'Ignore Gases' }, costType: 'none', cost: 0, hpMod: -25, outcome: { pt: 'Os vapores se depositaram sobre rastreadores de estrelas, cegando a navegação e forçando manobras perigosas às cegas.', en: 'Vapors deposited on star trackers, blinding nav and forcing dangerous blind maneuvers.' } }
  ]},
  { id: 'evt10', title: { pt: 'Forças de Maré', en: 'Tidal Forces' }, desc: { pt: 'Passagem próxima a um corpo supermaciço. Gradiente gravitacional esticando a fuselagem frontal.', en: 'Close pass to massive body. Gravity gradient stretching front fuselage.' }, options: [
      { text: { pt: 'Girar Nave (BBQ Roll)', en: 'BBQ Roll' }, costType: 'parts', cost: 150, hpMod: 0, outcome: { pt: 'Motores iniciaram uma rotação constante (Modo Churrasco). Distribuiu uniformemente o estresse elástico pela estrutura.', en: 'Rotation distributed the elastic stress evenly across the structure.' } },
      { text: { pt: 'Reforço de Lastro', en: 'Ballast Brace' }, costType: 'regolith', cost: 250, hpMod: -20, outcome: { pt: 'Maior massa nas extremidades piorou o efeito (F=G*Mm/r²). A diferença gravitacional dobrou a antena de rádio.', en: 'More mass at extremities worsened the effect. Gravity difference bent antennas.' } },
      { text: { pt: 'Aceleração Linear', en: 'Linear Acceleration' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Acelerar contra o gradiente causou um cisalhamento longitudinal brutal, arrancando painéis de comunicação do teto.', en: 'Accelerating against the gradient caused brutal longitudinal shear tearing panels.' } }
  ]},
  { id: 'evt11', title: { pt: 'Cristalização de Baterias', en: 'Battery Crystallization' }, desc: { pt: 'Queda extrema de temperatura formou dendritos de lítio nas células da bateria primária.', en: 'Extreme temp drop formed lithium dendrites in primary battery cells.' }, options: [
      { text: { pt: 'Curto Controlado', en: 'Controlled Short' }, costType: 'parts', cost: 200, hpMod: 0, outcome: { pt: 'Circuitos resistivos geraram calor ôhmico suave, derretendo os dendritos antes que fechassem curto cativo.', en: 'Resistive circuits generated gentle ohmic heat, melting dendrites before shorting.' } },
      { text: { pt: 'Manta Térmica', en: 'Thermal Blanket' }, costType: 'regolith', cost: 150, hpMod: -15, outcome: { pt: 'O isolamento demorou muito. Um dendrito perfurou o separador interno, causando perda permanente de 20% de carga.', en: 'Insulation took too long. Dendrite pierced separator causing capacity loss.' } },
      { text: { pt: 'Forçar Carga', en: 'Force Charge' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'Injetar corrente fria agravou o problema. Fuga térmica parcial derreteu a parede do compartimento elétrico.', en: 'Cold charging worsened it. Thermal runaway melted electrical bay walls.' } }
  ]},
  { id: 'evt12', title: { pt: 'Falha no Reator Sabatier', en: 'Sabatier Anomaly' }, desc: { pt: 'O conversor químico de CO2 está acumulando gás Hidrogênio inflamável fora de proporção.', en: 'CO2 chemical converter building up flammable Hydrogen out of proportion.' }, options: [
      { text: { pt: 'Resfriador Catalítico', en: 'Catalyst Cooler' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'QUÍMICA: Resfriamento rápido reduziu a cinética da reação, permitindo ventilação segura do hidrogênio não reagido.', en: 'Rapid cooling reduced reaction kinetics, allowing safe venting of unreacted hydrogen.' } },
      { text: { pt: 'Válvula de Pressão', en: 'Pressure Valve' }, costType: 'parts', cost: 120, hpMod: -20, outcome: { pt: 'A ventilação mecânica travou por frio extremo no bocal (Efeito Joule-Thomson), causando micro-explosões.', en: 'Venting jammed due to nozzle freezing (Joule-Thomson effect), causing micro-explosions.' } },
      { text: { pt: 'Deixar Reagir', en: 'Let it React' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'Mistura estequiométrica fora de controle gerou detonação confinada no sistema de suporte à vida primário.', en: 'Runaway stoichiometric mix caused confined detonation in life support.' } }
  ]},
  { id: 'evt13', title: { pt: 'Ressonância Acústica', en: 'Acoustic Resonance' }, desc: { pt: 'A vibração contínua dos motores de dobra encontrou a frequência natural do casco de titânio.', en: 'Engine vibration matched the natural frequency of the titanium hull.' }, options: [
      { text: { pt: 'Amortecimento Seco', en: 'Dry Damping' }, costType: 'regolith', cost: 250, hpMod: 0, outcome: { pt: 'ACÚSTICA: A massa não estrutural alterou a frequência de ressonância do casco, quebrando a harmonia destrutiva.', en: 'Non-structural mass altered the hull’s resonant frequency, breaking the harmony.' } },
      { text: { pt: 'Rebites Tensionados', en: 'Tension Rivets' }, costType: 'parts', cost: 150, hpMod: -15, outcome: { pt: 'Aperto extra deixou a estrutura rígida demais. Ondas estacionárias trincaram três janelas de observação duplas.', en: 'Extra tension made structure too rigid. Standing waves cracked windows.' } },
      { text: { pt: 'Manter Impulso', en: 'Maintain Thrust' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'A amplitude da onda cresceu exponencialmente. Falha catastrófica nas junções primárias do chassi por fadiga acústica.', en: 'Wave amplitude grew exponentially. Catastrophic acoustic fatigue failure.' } }
  ]},
  { id: 'evt14', title: { pt: 'Reconexão Magnética', en: 'Magnetic Reconnection' }, desc: { pt: 'Linhas de campo do plasma circundante estalaram e se reconectaram, disparando uma onda de choque magnética.', en: 'Plasma field lines snapped and reconnected, firing a magnetic shockwave.' }, options: [
      { text: { pt: 'Blindagem de Plasma', en: 'Plasma Shield' }, costType: 'parts', cost: 300, hpMod: 0, outcome: { pt: 'ELETROMAGNETISMO: Bobinas criaram campo diamagnético opositor, defletindo a energia e protegendo a aviônica.', en: 'Coils created opposing diamagnetic field, deflecting energy from avionics.' } },
      { text: { pt: 'Absorvedor Térmico', en: 'Thermal Sink' }, costType: 'ice', cost: 200, hpMod: -20, outcome: { pt: 'Energia magnética não foi convertida em calor suficientemente rápido. Picos de tensão queimaram resistores vitais.', en: 'Magnetic energy spiked voltage before heat conversion. Resistors burned.' } },
      { text: { pt: 'Ficar em Silêncio', en: 'Go Silent' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'O fluxo magnético intenso reorganizou a polaridade dos HDDs de navegação mecânicos, apagando os mapas de voo.', en: 'Intense flux scrambled HDD polarities, deleting flight maps completely.' } }
  ]},
  { id: 'evt15', title: { pt: 'Congelamento de Hidrazina', en: 'Hydrazine Freeze' }, desc: { pt: 'Linhas do monopropelente congelando. Expansão pode quebrar o sistema de controle de altitude (RCS).', en: 'Monopropellant lines freezing. Expansion may break altitude control.' }, options: [
      { text: { pt: 'Aquecedores Kapton', en: 'Kapton Heaters' }, costType: 'parts', cost: 180, hpMod: 0, outcome: { pt: 'TERMODINÂMICA: Resistores mantiveram o fluido acima de 2°C, evitando a transição de fase sem iniciar auto-ignição.', en: 'Resistors kept fluid above 2°C, preventing phase transition safely.' } },
      { text: { pt: 'Gelo Isolante', en: 'Ice Insulator' }, costType: 'ice', cost: 150, hpMod: -25, outcome: { pt: 'A condutividade térmica do gelo retirou ainda mais calor das linhas de titânio. Uma tubulação de manobra rachou.', en: 'Ice thermal conductivity drained more heat. A maneuver pipe cracked.' } },
      { text: { pt: 'Acionar Bomba', en: 'Run Pump' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'Cristais sólidos foram sugados. A cavitação brutal destruiu as pás da turbobomba de injeção primária.', en: 'Solid crystals caused brutal cavitation, destroying turbopump blades.' } }
  ]},
  { id: 'evt16', title: { pt: 'Degradação UV de Polímeros', en: 'UV Polymer Degradation' }, desc: { pt: 'Luz ultravioleta extrema sem filtro atmosférico está quebrando cadeias carbônicas no revestimento.', en: 'Extreme UV light breaking carbon chains in the spacecraft coating.' }, options: [
      { text: { pt: 'Camada de Pó Fino', en: 'Fine Dust Layer' }, costType: 'regolith', cost: 150, hpMod: 0, outcome: { pt: 'O mineral opaco agiu como barreira física (Albedo), refletindo UV e impedindo a foto-degradação química dos polímeros.', en: 'Opaque mineral acted as physical barrier, reflecting UV from polymers.' } },
      { text: { pt: 'Remendo Sintético', en: 'Synthetic Patch' }, costType: 'parts', cost: 120, hpMod: -15, outcome: { pt: 'Adesivos novos sofrem cross-linking (endurecimento extremo) por UV no vácuo, rachando em vez de selar.', en: 'New adhesives suffered UV cross-linking, cracking instead of sealing.' } },
      { text: { pt: 'Deixar Exposto', en: 'Leave Exposed' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O revestimento virou pó fino (embrittlement). Cabos vitais ficaram expostos a radiação e sofreram curtos.', en: 'Coating embrittled to dust. Vital cables exposed to radiation shorted out.' } }
  ]},
  { id: 'evt17', title: { pt: 'Expansão Térmica Assimétrica', en: 'Asymmetric Thermal Expansion' }, desc: { pt: 'Metade da nave voltada para estrela a 150°C, outra metade no escuro a -150°C. O chassi está torcendo.', en: 'Half ship facing sun at 150°C, half at -150°C. Chassis twisting.' }, options: [
      { text: { pt: 'Tubos de Calor', en: 'Heat Pipes' }, costType: 'ice', cost: 250, hpMod: 0, outcome: { pt: 'A evaporação de líquidos nos tubos distribuiu o calor por convecção em gravidade zero, igualando o estresse termomecânico.', en: 'Phase-change heat pipes distributed heat, equalizing thermomechanical stress.' } },
      { text: { pt: 'Trava Mecânica', en: 'Mechanical Lock' }, costType: 'parts', cost: 180, hpMod: -20, outcome: { pt: 'Forças térmicas são implacáveis. As juntas forçadas sofreram cisalhamento sob as toneladas de tensão dilatórias.', en: 'Thermal forces sheared forced mechanical locks under tons of pressure.' } },
      { text: { pt: 'Nenhuma Ação', en: 'No Action' }, costType: 'none', cost: 0, hpMod: -35, outcome: { pt: 'A diferença térmica causou empenamento severo (Warping). Portas de eclusa emperraram e o casco desestabilizou.', en: 'Thermal differential caused severe warping. Airlocks jammed permanently.' } }
  ]},
  { id: 'evt18', title: { pt: 'Saturação de CO2 (LiOH)', en: 'CO2 Saturation (LiOH)' }, desc: { pt: 'Cartuchos de Hidróxido de Lítio (filtro de ar) perderam reatividade química. Níveis de CO2 tóxicos.', en: 'LiOH air scrubbers lost chemical reactivity. Toxic CO2 levels.' }, options: [
      { text: { pt: 'Eletrólise Substituto', en: 'Electrolysis Sub' }, costType: 'ice', cost: 200, hpMod: 0, outcome: { pt: 'QUÍMICA: Água foi quebrada (2H2O -> 2H2 + O2), aumentando O2 na mistura para diluir e adiar a toxicidade de CO2 no sangue.', en: 'Water split to increase O2 mix, diluting and delaying CO2 blood toxicity.' } },
      { text: { pt: 'Filtro de Regolito', en: 'Regolith Filter' }, costType: 'regolith', cost: 150, hpMod: -20, outcome: { pt: 'Minerais brutos não absorvem CO2 e liberaram sílica nos dutos de ar. Tripulação sofreu problemas pulmonares mecânicos.', en: 'Raw minerals released silica into air ducts, causing mechanical lung distress.' } },
      { text: { pt: 'Respirar Lento', en: 'Breathe Slow' }, costType: 'none', cost: 0, hpMod: -40, outcome: { pt: 'Fisiologia: Acúmulo de ácido carbônico no sangue. Letargia grave resultou em erros vitais na pilotagem e batidas de casco.', en: 'Carbonic acid blood buildup caused lethargy and vital piloting errors.' } }
  ]},
  { id: 'evt19', title: { pt: 'Vento Solar Rápido', en: 'Fast Solar Wind' }, desc: { pt: 'Um buraco coronal emitiu ventos solares a 800 km/s. Pressão dinâmica extrema ameaça os painéis solares.', en: 'Coronal hole emitted solar wind at 800 km/s. Extreme dynamic pressure on panels.' }, options: [
      { text: { pt: 'Retrair Painéis', en: 'Retract Panels' }, costType: 'parts', cost: 220, hpMod: 0, outcome: { pt: 'Mecânica Orbital: Minimizar a área de secção transversal anulou a transferência de momento linear do plasma espacial.', en: 'Minimizing cross-sectional area cancelled linear momentum transfer from plasma.' } },
      { text: { pt: 'Gelo na Base', en: 'Ice at Base' }, costType: 'ice', cost: 100, hpMod: -15, outcome: { pt: 'Peso excessivo na raiz dos painéis não impediu o momento torçor na ponta. Articulações solares dobraram.', en: 'Weight at the base didn’t stop tip torque. Solar joints bent backward.' } },
      { text: { pt: 'Deixar Bater', en: 'Let it hit' }, costType: 'none', cost: 0, hpMod: -30, outcome: { pt: 'O fluxo de prótons causou abrasão massiva (Sputtering) no silício, além de arrancar dois eixos de rotação solar.', en: 'Proton flux caused massive sputtering on silicon and sheared solar axes.' } }
  ]},
  { id: 'evt20', title: { pt: 'Anomalia do Efeito Pogo', en: 'Pogo Oscillation' }, desc: { pt: 'Flutuações de pressão de combustível criando oscilações longitudinais violentas na nave inteira.', en: 'Fuel pressure fluctuations creating violent longitudinal oscillations.' }, options: [
      { text: { pt: 'Injeção de Gás', en: 'Gas Injection' }, costType: 'ice', cost: 180, hpMod: 0, outcome: { pt: 'MECÂNICA DE FLUIDOS: Vapor introduzido atuou como mola acústica (Pogo Suppressor), absorvendo os picos de pressão nas linhas.', en: 'Vapor acted as an acoustic spring (Pogo Suppressor), absorbing pressure spikes.' } },
      { text: { pt: 'Trava de Motor', en: 'Engine Brace' }, costType: 'parts', cost: 200, hpMod: -20, outcome: { pt: 'Rigidez adicional piorou as frequências de ressonância. A transmissão direta do motor para a cabine rachou consoles.', en: 'Added rigidity worsened resonant frequencies. Direct transmission cracked consoles.' } },
      { text: { pt: 'Segurar Firme', en: 'Hold Tight' }, costType: 'none', cost: 0, hpMod: -45, outcome: { pt: 'Ciclo de feedback positivo explodiu a bomba de fluxo turbo. Parte da tubulação principal estourou na câmara de combustão.', en: 'Positive feedback loop exploded turbopump. Main piping burst at combustion chamber.' } }
  ]}
];