const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const DURATION = 20;
const TOTAL_SAMPLES = SAMPLE_RATE * DURATION;

function generateSamples() {
  const samples = new Float32Array(TOTAL_SAMPLES);

  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;

    const pad1 = 0.08 * Math.sin(2 * Math.PI * 110 * t);
    const pad2 = 0.06 * Math.sin(2 * Math.PI * 164.81 * t);
    const pad3 = 0.05 * Math.sin(2 * Math.PI * 220 * t);
    const pad4 = 0.04 * Math.sin(2 * Math.PI * 329.63 * t);

    const lfo = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(2 * Math.PI * 0.15 * t));

    const bass = 0.1 * Math.sin(2 * Math.PI * 55 * t) * (1 + 0.3 * Math.sin(2 * Math.PI * 0.5 * t));

    const sparkle = 0.02 * Math.sin(2 * Math.PI * 880 * t) * Math.max(0, Math.sin(2 * Math.PI * 0.25 * t));

    const fadeIn = Math.min(1, t / 2);
    const fadeOut = Math.min(1, (DURATION - t) / 2);
    const envelope = fadeIn * fadeOut;

    const beatPhase = (t * 2) % 1;
    const kick = beatPhase < 0.05 ? 0.12 * Math.sin(2 * Math.PI * 60 * beatPhase) * (1 - beatPhase / 0.05) : 0;

    samples[i] = ((pad1 + pad2 + pad3 + pad4) * lfo + bass + sparkle + kick) * envelope * 0.7;
  }

  return samples;
}

function floatTo16Bit(samples) {
  const buffer = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    const val = Math.max(-1, Math.min(1, samples[i]));
    const int16 = val < 0 ? val * 32768 : val * 32767;
    buffer.writeInt16LE(Math.round(int16), i * 2);
  }
  return buffer;
}

function createWav(samples) {
  const data = floatTo16Bit(samples);
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);

  return Buffer.concat([header, data]);
}

const samples = generateSamples();
const wav = createWav(samples);
const outputPath = path.join(__dirname, 'public', 'bgm.wav');
fs.writeFileSync(outputPath, wav);
console.log('Audio gerado:', outputPath, `(${(wav.length / 1024).toFixed(0)} KB)`);
