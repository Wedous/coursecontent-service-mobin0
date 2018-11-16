const fs = require('fs');

const jsonexport = require('jsonexport');

const csv = require('fast-csv');

const faker = require('faker');

const ws = fs.createWriteStream('data1.csv');

const createContent = (total, course) => {
  let content = [];
  for (var i = 1; i <= total; i++) {
    let courseItem = {};
    courseItem.id = i ;
    courseItem.title = faker.company.catchPhrase();
    courseItem.courseId = Math.floor(Math.random() * course);
    content.push(courseItem);
  }
  return content;
};

const createEntry = (total, content) => {
  let entries = [];
  for (let i = 1; i <= total; i++) {
    let entryItem = {};
    entryItem.id = i;
    entryItem.name = 'Talk by ' + faker.name.findName();
    entryItem.duration = Math.floor(Math.random() * 360);
    entryItem.contentId = Math.floor(Math.random() * content);
    entries.push(entryItem);
  }
  return entries;
};

const writing = (csv, file) => {
  jsonexport(csv, function(err, data) {
    if (err) {
      return console.log(err);
    }
    fs.writeFile(file, data, function(err) {
      if (err) {
        throw err;
      }
      console.log('file saved');
    });
  });
};

writing(createContent(50, 10), 'db/content.csv');
writing(createEntry(200, 50), 'db/entry.csv');
