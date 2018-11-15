const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/courseContent';

const db = mongoose.connect(mongoUri);

module.exports = db;
