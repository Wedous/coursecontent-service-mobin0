const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const courseContentSchema = new mongoose.Schema({
  title : String,
  sectionNumber: Number,
  entries: [{name: String,
    duration: Number,
    entryNumber: Number}]
},
  {
    timestamps: true
  }
);

const CourseContent = mongoose.model('CourseContent', courseContentSchema);

module.exports = CourseContent;
