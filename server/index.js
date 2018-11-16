const express = require('express');
let app = express();
var faker = require('faker')
var fs = require('fs')

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/testData', function (req, res) {
// console.log("REUSLT", JSON.parse(req.body.courseItem))

fs.writeFile("./test.json", JSON.stringify(req.body), 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
});



})

app.post('/repos', function (req, res) {




});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //GET 200, THEN SEND BACK 25.
  // console.log("getting")

});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

