// Imports
const Person = require('./people/Person');
const Time = require('./shared/TimeService');

// Declarations
const people = [];

for(let i=0; i<10; i++){
  people.push(new Person());
  Time.forward();
}
console.log(people);

const Identity = require('./shared/IdentityService');
console.log(Identity);
