var faker = require('faker');
var mongoose = require('mongoose');
var db = require('./index.js');
var courseContent = require('./courseContent.js');
var fs = require('file-system');


var createDB = function(n) {
  // console.log("www" + arguments)
  createSaveTestData(n)
}

var savetoDB = function(userData){
  // console.log("trying")
  courseContent.create(userData)
    .then(() => db.disconnect());
    console.log("User Data Saved!")
}


var createSaveTestData = function(n) {
  let courses = []

  for(var i = 0; i < n ; i++){
    let courseItem = {}
    let courseName = faker.company.catchPhrase()
    let courselen = Math.floor(Math.random()*8) + 1
    courseItem.title = courseName;
    courseItem.sectionNumber = i + 1;
    courseItem.entries = [];
    for(var j = 0 ; j < courselen; j++) {
      let entry = {}
      entry.name = "Talk by " + faker.name.findName();
      entry.duration = Math.floor(Math.random()*360)
      entry.entryNumber = j + 1
      courseItem.entries.push(entry)

    }
      courses.push(courseItem)

  }
  console.log("Saved to db/test.json", JSON.stringify(courses))
  let prependTo = "var courseData = "
  let appendTo = " \n export default courseData;"
  var result = prependTo + JSON.stringify(courses) + appendTo
  fs.writeFile('./db/test.js', result, (err) => {
  if (err) throw err;
  console.log(`Seed of ${n} saved!`);
  });
  savetoDB(courses);
}

createDB(100)