const Random = require('../vendor/random');

class RandomService {
  constructor(seed) {
    this.seed = seed;
    this.rand = new Random(seed);
  }

  generate(type, args) {
    return this.rand[type](...args);
  }
}

module.exports = new RandomService(100);
