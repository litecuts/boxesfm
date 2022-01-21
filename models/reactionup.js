const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    Up: String,
});

module.exports = mongoose.model("reactionup", Schema);