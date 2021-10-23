import {ElementaryNodeRenderer as core, el} from '@nick-thompson/elementary';
import ds from '../index.js';


// A simple helper function for essentially applying a sine shape LFO to a given
// value `x`, at the provided `rate` and `amount`.
function modulate(x, rate, amount) {
  return el.add(x, el.mul(amount, el.cycle(rate)));
}

const kickPattern = [1, 0, 0, 1, 0, 1, 1, 0];
const clapPattern = [0, 0, 1, 0, 0, 0, 1, 0];

core.on('load', function() {
  let gate = el.train(6);

  let kickSeq = el.seq({seq: kickPattern, hold: true}, gate);
  let clapSeq = el.seq({seq: clapPattern}, gate);

  // For the kick we're going to modulate the attack time slightly while also
  // setting a little drive. That will have some of the kicks kind of "hold" into
  // the saturator while the other kicks will be tight. In order to give the kick
  // enough time to hold, we've set `hold: true` in the `kickSeq`, which will continue
  // to output the most recent sequence value until the next rising edg of the gate signal.
  // Without it, our kicks would be gated by the gate driving the sequence as well.
  let kick = ds.kick(40, 0.104, modulate(0.255, 1, 0.250), 0.4, 4, kickSeq);
  let clap = ds.clap(800, 0.005, 0.204, clapSeq);

  // We'll run the hat every step but sweep its pitch, tone, and decay with
  // various LFOs.
  let hat = ds.hat(
    modulate(317, 1, 900),
    modulate(14000, 4.5, 4000),
    0.005,
    modulate(0.5, 4.1, 0.45),
    gate
  );

  // Some quick gain staging
  let out = el.add(
    el.mul(0.7, kick),
    el.mul(0.6, clap),
    el.mul(0.75, hat),
  );

  // Duplicate the output into the left and right channel.
  core.render(out, out);
});

core.initialize();
