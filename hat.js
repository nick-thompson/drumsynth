const el = require('@nick-thompson/elementary');


/** A quick helper for a sine wave oscillator with a phase offset. */
function cycle(freq, phaseOffset) {
  let t = el.add(el.phasor(freq), phaseOffset);
  let p = el.sub(t, el.floor(t));

  return el.sin(el.mul(2 * Math.PI, p));
}

/**
 * Hi hat drum synthesis via phase modulation.
 *
 * Here we have a carrier sine wave modulated by another sine wave, which is in turn
 * modulated by white noise. The carrier frequency is tuned for a value between 317Hz
 * and 3170Hz, borrowing slightly from the tuning of the DR110. The first modulator runs
 * at exactly twice the frequency of the carrier to introduce square-like harmonics.
 *
 * @param {Object} [props]
 * @param {core.Node|number} pitch - Base frequency in the range [317Hz, 3170Hz]
 * @param {core.Node|number} tone - Bandpass filter cutoff frequency, tuned for [800Hz, 18kHz]
 * @param {core.Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.2s]
 * @param {core.Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
 * @param {core.Node|number} gate - The pulse train which triggers the amp envelope
 * @returns {core.Node}
 */
function hat(props, pitch, tone, attack, decay, gate) {
  // Synthesis
  let m2 = el.noise();
  let m1 = cycle(el.mul(2, pitch), el.mul(2, m2));
  let m0 = cycle(pitch, el.mul(2, m1));

  // Then we run the result through a bandpass filter set according to tone
  // between 800Hz and 18kHz.
  let f = el.bandpass(tone, 1.214, m0);

  // Finally we have the amp envelope with an attack in [5ms, 200ms] and a
  // decay in [5ms, 4000ms]
  let env = el.adsr(attack, decay, 0.0, 0.1, gate);

  return el.mul(f, env);
}

module.exports = el.createNodeFactory(hat);
