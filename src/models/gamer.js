const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamerSchema = new mongoose.Schema({
  name: String,
  age:String, // description
  game:String, //resume
  user:{ type: Schema.Types.ObjectId, ref: 'User' }
});

const taskModel = mongoose.model("Gamer", gamerSchema);

module.exports = taskModel;
