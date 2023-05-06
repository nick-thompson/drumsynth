# drumsynth

A small drum synthesis library for [Elementary Audio](https://www.elementary.audio/).

## Installation

```bash
$ npm install --save @nick-thompson/drumsynth
```

## Usage

```js
import ds from '@nick-thompson/drumsynth';

// A contrived example; a function that produces a kick, hat, and clap playing
// on every step of a pulse train running at 4Hz.
function chaos() {
  let gate = el.train(4);

  return el.add(
    ds.kick(40, 0.104, 0.005, 0.4, 4, gate),
    ds.clap(800, 0.005, 0.204, gate),
    ds.hat(317, 12000, 0.005, 0.1, gate),
  );
}
```

## Reference

### ds.kick(pitch, click, attack, decay, drive, gate)

* @param {Node|number} pitch - The base frequency of the kick drum in Hz
* @param {Node|number} click - The speed of the pitch envelope, tuned for [0.005s, 1s]
* @param {Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.4s]
* @param {Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
* @param {Node|number} drive - A gain multiplier going into the saturator. Tuned for [1, 10]
* @param {Node|number} gate - The pulse train which triggers the amp envelope
* @returns {Node}

### ds.clap(tone, attack, decay, gate)

* @param {Node|number} tone - Bandpass filter cutoff frequency, tuned for [400Hz, 3500Hz]
* @param {Node|number} attack - Attack time in seconds, tuned for [0s, 0.2s]
* @param {Node|number} decay - Decay time in seconds, tuned for [0s, 4.0s]
* @param {Node|number} gate - The pulse train which triggers the amp envelope
* @returns {Node}

### ds.hat(pitch, tone, attack, decay, gate)

* @param {Node|number} pitch - Base frequency in the range [317Hz, 3170Hz]
* @param {Node|number} tone - Bandpass filter cutoff frequency, tuned for [800Hz, 18kHz]
* @param {Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.2s]
* @param {Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
* @param {Node|number} gate - The pulse train which triggers the amp envelope
* @returns {Node}

## Running the Example

In the `examples/` directory here we have a small example demonstrating some step sequencing
of the provided drum synth sounds. The example is intended for the minimal command line tool
shipped in the main [Elementary repo](https://github.com/elemaudio/elementary/tree/main/cli). You'll first
need to clone and compile the command line tool there, then here you can bundle the `examples/stepseq.js` file
and run it with the cli.

```bash
# Get the repo
git clone https://github.com/nick-thompson/drumsynth.git
cd drumsynth

# Install and build
npm install
npm run build

# Run the example. You'll need to locate `elemcli` in your own file system depending on
# where you built the cli project yourself.
./elemcli examples/dist/stepseq.js
```

## License

MIT License

Copyright (c) 2023 Nick Thompson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
