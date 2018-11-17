const fs = require('fs');

const jsonexport = require('jsonexport');

const faker = require('faker');

const csv = require('fast-csv');
const contentStream = csv.createWriteStream({ headers: ['id', 'title', 'courseId']});
const ws1 = fs.createWriteStream('db/content.csv');
contentStream.pipe(ws1);
const entryStream = csv.createWriteStream({ headers: ['id', 'name', 'duration', 'contentId']});
const ws2 = fs.createWriteStream('db/entry.csv');
entryStream.pipe(ws2);

const createContent = (total, course) => {
  for (var i = 1; i <= total; i++) {
    let courseItem = {};
    courseItem.id = i;
    courseItem.title = faker.company.catchPhrase();
    courseItem.courseId = Math.floor(Math.random() * course) + 1;
    contentStream.write(courseItem);
  }
  contentStream.end();
};

const createEntry = (total, content) => {
  for (let i = 1; i <= total; i++) {
    let entryItem = {};
    entryItem.id = i;
    entryItem.name = 'Talk by ' + faker.name.findName();
    entryItem.duration = Math.floor(Math.random() * 360);
    entryItem.contentId = Math.floor(Math.random() * content) + 1;
    entryStream.write(entryItem);
  }
  entryStream.end();
};

createContent(50, 10);
createEntry(200, 50);

