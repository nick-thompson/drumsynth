const el = require('@nick-thompson/elementary');


/**
 * Kick drum synthesis via a pitched sine sweep
 *
 * @param {Object} [props]
 * @param {core.Node|number} pitch - The base frequency of the kick drum in Hz
 * @param {core.Node|number} click - The speed of the pitch envelope, tuned for [0.005s, 1s]
 * @param {core.Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.4s]
 * @param {core.Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
 * @param {core.Node|number} drive - A gain multiplier going into the saturator. Tuned for [1, 10]
 * @param {core.Node|number} gate - The pulse train which triggers the amp envelope
 * @returns {core.Node}
 */
function kick(props, pitch, click, attack, decay, drive, gate) {
  // First up we have our amp envelope
  let env = el.adsr(attack, decay, 0.0, 0.1, gate);

  // Then we have a pitch envelope with 0 attack and decay in [5ms, 4s].
  // The `el.adsr` node uses exponential segments which is great for our purposes
  // here, but you could also weight the curve more or less aggressively by squaring
  // or taking the square root of the pitchenv signal.
  let pitchenv = el.adsr(0.005, click, 0.0, 0.1, gate);

  // Then our synthesis: a sine tone at our base pitch, whose frequency is quickly
  // modulated by the pitchenv to sweep from 5*pitch to 1*pitch over `click` seconds.
  // The resulting sound is multiplied straight through our amp envelope.
  let clean = el.mul(
    env,
    el.cycle(
      el.mul(
        // The pitch envelope runs from a multiplier of 5 to
        // a multiplier of 1 on the original pitch
        el.add(1, el.mul(4, pitchenv)),
        pitch,
      )
    )
  );

  // Then you can drive it into a soft clipper with a gain multiplier in [1, 10]
  return el.tanh(el.mul(clean, drive));
}

module.exports = el.createNodeFactory(kick);
