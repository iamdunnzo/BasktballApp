const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    passwordHash: String,
    name: String,
    age: Number, 
    stats: Number, 
    favoritePlayer: String, 
    jersey: Number,
    courts: [{type: mongoose.Types.ObjectId, ref:"Court"}]
    // we never save the actual password in the database
    // this is a bare minimum security measure
    // this way if someone gains access to our DB they wont know everyones password
    // the way that a hash function works is that even if you know the hashed password
    // and you also know the function that was used to scramble it,
    // you still cant unscramble it, even when the user logs in,
    // the app does not unscramble the stored hashedPassword and compare to the password the user types in
    // instead, the app scrambles whatever the user types in, in the same way that the password was scrambled
    //  so these hash functions are sometimes called a one way hash
});

const User = mongoose.model('User', userSchema);



module.exports = User;

