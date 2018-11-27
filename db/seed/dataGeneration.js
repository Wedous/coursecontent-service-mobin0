const fs = require('fs');

const faker = require('faker');

const ws1 = fs.createWriteStream('db/content.csv');
const ws2 = fs.createWriteStream('db/entry.csv');
let index1 = 0;
let index2 = 0;

(function createContent() {
  index1++;
  if (index1 > 20) {
    return ws1.end();
  }
  const id = index1;
  console.log('content: ' + id + ' is created');
  const title = faker.company.catchPhrase();
  const courseId = faker.random.number({min: 1, max: 10});
  const writing = ws1.write(`${id},${title},${courseId}\n`);
  if (!writing) {
    ws1.once('drain', createContent);
  } else {
    createContent();
  }
})();

(function createEntry() {
  index2++;
  if (index2 > 40) {
    return ws2.end();
  }
  const id = index2;
  console.log('entry: ' + id + ' is created');
  const name = 'Talk by ' + faker.name.findName();
  const duration = faker.random.number({min: 1, max: 360});
  const contentId = faker.random.number({min: 1, max: 20});
  const writing = ws2.write(`${id},${name},${duration},${contentId}\n`);
  if (!writing) {
    ws1.once('drain', createEntry);
  } else {
    createEntry();
  }
})();
