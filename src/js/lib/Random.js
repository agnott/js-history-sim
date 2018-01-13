const Random = require('../vendor/random.js');

class Rand {
  constructor(seed) {
    this.rand = new Random(seed);
  }

  normal(mu, sigma) {
    return this.rand.normal(mu, sigma);
  }

  triangular(lower, upper, mode) {
    return this.rand.triangular(lower, upper, mode);
  }

  uniform(lower, upper) {
    return this.rand.uniform(lower, upper);
  }

  random() {
    return this.rand.random();
  }

  choice(choices) {
    return choices[Math.floor(this.random() * choices.length)];
  }

  integer(lower, upper) {
    return Math.floor(this.rand.uniform(lower, upper + 1));
  }
}

module.exports = new Rand();
