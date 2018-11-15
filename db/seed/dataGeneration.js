const fs = require('fs');

const jsonexport = require('jsonexport');

const csv = require('fast-csv');

const faker = require('faker');

const ws = fs.createWriteStream('data1.csv');

let headers = [
  'title',
  'sectionNumber',
  'entries',
];

var createData = function(n) {
  let courses = [];
  for (var i = 0; i < n; i++) {
    let courseItem = {};
    let courseName = faker.company.catchPhrase();
    let courselen = Math.floor(Math.random() * 8) + 1;
    courseItem.title = courseName;
    courseItem.sectionNumber = i + 1;
    courseItem.entries = [];
    for (var j = 0; j < courselen; j++) {
      let entry = {};
      entry.name = 'Talk by ' + faker.name.findName();
      entry.duration = Math.floor(Math.random() * 360);
      entry.entryNumber = j + 1;
      courseItem.entries.push(entry);
    }
    courses.push(courseItem);
  }
  return courses;
};

jsonexport(createData(10), function(err, data) {
  if (err) {
    return console.log(err);
  }
  fs.writeFile('sample.csv', data, function(err) {
    if (err) {
      throw err;
    }
    console.log('file saved');
  });
});