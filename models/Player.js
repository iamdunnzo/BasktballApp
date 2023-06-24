const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: String,
  position: String,
  team: String,
  height: String,
  weight: Number,
  age: Number,
  court: [{ type: mongoose.Types.ObjectId, ref: 'Court' }]
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
