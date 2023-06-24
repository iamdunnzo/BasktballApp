

const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
// the salt is like a signature that goes int he front of the scrambled password
// that lets bcrypt know how it was scrambled so that when the user types in 
// a new password it can scramble it the same way
 
console.log(`Salt => ${salt}`);
 
const hash1 = bcryptjs.hashSync("Hello", salt);
const hash2 = bcryptjs.hashSync("onomatopoeia", salt);

console.log(hash1);
console.log(hash2);