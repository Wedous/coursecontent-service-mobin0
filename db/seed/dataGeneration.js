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
    //let courselen = Math.floor(Math.random() * 8) + 1;
    courseItem.id = i + 1;
    courseItem.title = faker.company.catchPhrase();
    //courseItem.entries = [];
    //let entry = {};
    courseItem.name = 'Talk by ' + faker.name.findName();
    courseItem.duration = Math.floor(Math.random() * 360);
    //courseItem.entries.push(entry);
    courses.push(courseItem);
  }
  return courses;
};

jsonexport(createData(10), function(err, data) {
  if (err) {
    return console.log(err);
  }
  fs.writeFile('db/sample.csv', data, function(err) {
    if (err) {
      throw err;
    }
    console.log('file saved');
  });
});
