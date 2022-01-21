const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    Down: String,
});

module.exports = mongoose.model("reactiondown", Schema);