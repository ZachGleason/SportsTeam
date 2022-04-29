const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String },
    position: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);