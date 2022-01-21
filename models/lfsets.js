const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    LastFM: String,
});

module.exports = mongoose.model("lfsets", Schema);