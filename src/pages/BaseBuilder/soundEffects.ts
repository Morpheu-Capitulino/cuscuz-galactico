// Sintetizador Web Audio API - Efeitos Temáticos Espaciais (Zero arquivos externos)
class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Clique padrão de interface
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // 1. JATO PROPULSOR DO ASTRONAUTA (Ruído branco filtrado + Turbina)
  playThruster() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.85;

    // Gerador de ruído de ar comprimido (Jetpack)
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filtro que simula a válvula abrindo e fechando
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(400, now + duration);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Sub-grave do motor de plasma
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + duration);
    subGain.gain.setValueAtTime(0.1, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
    subOsc.start(now);
    subOsc.stop(now + duration);
  }

  // 2. CONSTRUÇÃO E UPGRADE (Batidas metálicas + chave pneumática/solda)
  playBuild() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Três batidas metálicas rápidas seguidas de trava mecânica
    const hits = [
      { freq: 220, time: 0, dur: 0.09 },
      { freq: 280, time: 0.12, dur: 0.09 },
      { freq: 420, time: 0.24, dur: 0.18 }
    ];

    hits.forEach(h => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(h.freq, now + h.time);
      osc.frequency.exponentialRampToValueAtTime(h.freq * 0.4, now + h.time + h.dur);

      gain.gain.setValueAtTime(0.15, now + h.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + h.time + h.dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + h.time);
      osc.stop(now + h.time + h.dur);
    });
  }

  // 3. EXPEDIÇÃO DO ROVER (Ignição do motor elétrico + Bipe de Radar)
  playExpedition() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Aceleração da turbina do Rover
    const engine = this.ctx.createOscillator();
    const engineGain = this.ctx.createGain();
    engine.type = 'sawtooth';
    engine.frequency.setValueAtTime(85, now);
    engine.frequency.exponentialRampToValueAtTime(340, now + 0.45);
    engine.frequency.exponentialRampToValueAtTime(220, now + 0.65);

    engineGain.gain.setValueAtTime(0.12, now);
    engineGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    engine.connect(engineGain);
    engineGain.connect(this.ctx.destination);
    engine.start(now);
    engine.stop(now + 0.65);

    // Dois bipes agudos de telemetria / radar
    [0.25, 0.42].forEach(t => {
      if (!this.ctx) return;
      const beep = this.ctx.createOscillator();
      const beepGain = this.ctx.createGain();
      beep.type = 'sine';
      beep.frequency.setValueAtTime(1250, now + t);

      beepGain.gain.setValueAtTime(0.12, now + t);
      beepGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);

      beep.connect(beepGain);
      beepGain.connect(this.ctx.destination);
      beep.start(now + t);
      beep.stop(now + t + 0.08);
    });
  }

  // 4. PESQUISA CIENTÍFICA (Computador de Laboratório / Scanner Sci-Fi)
  playResearch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [660, 880, 1320, 1046.5, 1567.98];

    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.06);

      gain.gain.setValueAtTime(0.1, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.1);
    });
  }

  // Tarefa / Recompensa concluída
  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.15, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  // Alerta de Emergência da NASA
  playAlert() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.35].forEach(offset => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now + offset);
      osc.frequency.linearRampToValueAtTime(880, now + offset + 0.25);

      gain.gain.setValueAtTime(0.15, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.28);
    });
  }

  // Fanfarra de Vitória
  playVictory() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 523.25, t: 0.18, d: 0.15 },
      { f: 523.25, t: 0.36, d: 0.15 },
      { f: 659.25, t: 0.55, d: 0.4 },
      { f: 587.33, t: 1.0, d: 0.4 },
      { f: 783.99, t: 1.45, d: 0.9 }
    ];

    melody.forEach(n => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.2, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }
}

export const sfx = new SoundController();