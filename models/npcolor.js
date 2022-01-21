const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    Color: String,
});

module.exports = mongoose.model("npcolor", Schema);