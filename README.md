# drumsynth

A small drum synthesis library for [Elementary](https://www.elementary.audio/).

## Installation

```bash
$ npm install @nick-thompson/drumsynth
```

## Usage

```js
const core = require('elementary-core');
const el = require('@nick-thompson/elementary');
const ds = require('@nick-thompson/drumsynth');

// The simplest example: a kick, hat, and clap playing on every step of a
// pulse train running at 4Hz.
core.on('load', function() {
  let gate = el.train(4);

  core.render(
    el.add(
      ds.kick(40, 0.104, 0.005, 0.4, 4, gate),
      ds.clap(800, 0.005, 0.204, gate),
      ds.hat(317, 12000, 0.005, 0.1, gate),
    ),
  );
);
```

## Reference

### ds.kick(props, pitch, click, attack, decay, drive, gate)

* @param {Object} [props] – Optional
* @param {core.Node|number} pitch - The base frequency of the kick drum in Hz
* @param {core.Node|number} click - The speed of the pitch envelope, tuned for [0.005s, 1s]
* @param {core.Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.4s]
* @param {core.Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
* @param {core.Node|number} drive - A gain multiplier going into the saturator. Tuned for [1, 10]
* @param {core.Node|number} gate - The pulse train which triggers the amp envelope
* @returns {core.Node}

### ds.clap(props, tone, attack, decay, gate)

* @param {Object} [props] – Optional
* @param {core.Node|number} tone - Bandpass filter cutoff frequency, tuned for [400Hz, 3500Hz]
* @param {core.Node|number} attack - Attack time in seconds, tuned for [0s, 0.2s]
* @param {core.Node|number} decay - Decay time in seconds, tuned for [0s, 4.0s]
* @param {core.Node|number} gate - The pulse train which triggers the amp envelope
* @returns {core.Node}

### ds.hat(props, pitch, tone, attack, decay, gate)

* @param {Object} [props] – Optional
* @param {core.Node|number} pitch - Base frequency in the range [317Hz, 3170Hz]
* @param {core.Node|number} tone - Bandpass filter cutoff frequency, tuned for [800Hz, 18kHz]
* @param {core.Node|number} attack - Attack time in seconds, tuned for [0.005s, 0.2s]
* @param {core.Node|number} decay - Decay time in seconds, tuned for [0.005s, 4.0s]
* @param {core.Node|number} gate - The pulse train which triggers the amp envelope
* @returns {core.Node}

## Running the Example

This repo has a simple step sequencer example which demonstrates some of the
sounds available via the drum synths here. To hear it, just clone the repository,
run `npm install`, and `npm start`:

```bash
$ git clone https://github.com/nick-thompson/drumsynth.git
$ cd drumsynth
$ npm install
$ npm start
```

## License

MIT License

Copyright (c) 2021 Nick Thompson

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
