
const Random = require('../shared/RandomService');
const Identity = require('../shared/IdentityService');
const Time = require('../shared/TimeService');

const ranges = {
  age: {
    type: 'triangular',
    args: [0, 125, 40]
  }
}

class Person {
  constructor() {
    // Required
    this.class = 'Person';
    this.id = Identity.register(this);

    this.age = Random.generate(ranges.age.type, ranges.age.args);

    this.birth = Time.now();
    this.death = null;
  }
}

module.exports = Person;
