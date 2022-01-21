const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    Style: String,
});

module.exports = mongoose.model("lfstyle", Schema);