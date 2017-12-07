const _ = require('underscore');

class TimeService {
  constructor(config = {}) {
    this.yearLength = _.isUndefined(config.yearLength) ? 365 : config.yearLength;

    this.time = {
      start: {
        day: _.isUndefined(config.day) ? 0 : config.day,
        year: _.isUndefined(config.year) ? 0 : config.year
      },
      current: {
        day: _.isUndefined(config.day) ? 0 : config.day,
        year: _.isUndefined(config.year) ? 0 : config.year
      }
    };
  }

  forward(step) {
    const day = (this.time.current.day + 1) % this.yearLength;

    this.time.current = {
      day: day,
      year: day === 0 ? this.time.current.year + 1 : this.time.current.year
    };
  }

  now() {
    return this.time.current;
  }

  isPast(date) {
    return (
      date.year < this.time.current.year ||
      (
        date.year === this.time.current.year &&
        date.day < this.time.current.day
      )
    );
  }
}

module.exports = new TimeService();
