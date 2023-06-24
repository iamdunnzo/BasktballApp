const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtSchema = new Schema({
    name: String,
    location: String,
    capacity: Number,
    level: String,
    image: String,
    player: [{type: mongoose.Types.ObjectId, ref: 'Player'}]
});

const Court = mongoose.model('Court', courtSchema);

module.exports = Court;
