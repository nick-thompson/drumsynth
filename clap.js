import {el} from '@nick-thompson/elementary';


/**
 * Clap synthesis via filtered white noise.
 *
 * @param {core.Node|number} tone - Bandpass filter cutoff frequency, tuned for [400Hz, 3500Hz]
 * @param {core.Node|number} attack - Attack time in seconds, tuned for [0s, 0.2s]
 * @param {core.Node|number} decay - Decay time in seconds, tuned for [0s, 4.0s]
 * @param {core.Node|number} gate - The pulse train which triggers the amp envelope
 * @returns {core.Node}
 */
export default function clap(tone, attack, decay, gate) {
  // Layered white noise synthesis
  let no = el.noise();

  let e1 = el.adsr(el.add(0.035, attack), el.add(0.06, decay), 0.0, 0.1, gate);
  let e2 = el.adsr(el.add(0.025, attack), el.add(0.05, decay), 0.0, 0.1, gate);
  let e3 = el.adsr(el.add(0.015, attack), el.add(0.04, decay), 0.0, 0.1, gate);
  let e4 = el.adsr(el.add(0.005, attack), el.add(0.02, decay), 0.0, 0.1, gate);

  // Then we run the result through a bandpass filter set according to tone
  // between 400Hz and 3500Hz, and slightly saturate.
  return el.tanh(
    el.bandpass(
      tone,
      1.214,
      el.add(
        el.mul(no, e1),
        el.mul(no, e2),
        el.mul(no, e3),
        el.mul(no, e4),
      ),
    )
  );
}
