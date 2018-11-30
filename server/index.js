require('newrelic');
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');
var connection = 'postgres://ling:@127.0.0.1:5432/courses';
const db = new Client(connection);
db.connect();
let port = 3000;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.get('/api/:courseId', (req, res) => {
  //const index = req.params.courseId;
  const index = Math.floor(Math.random() * 1000000);
  // const end = index + 1;
  // console.log(end);
  //     db.query(`select title, jsonb_agg(jsonb_build_object('name', name, 'duration', duration)) as entry 
  // from (select * from content left join entries on content.id = entries.contentId where content.id = 
  //   ${req.params.courseId}) AS derivedTable group by title`, (err, result) => {
  db.query(`select * from content natural join entries where id = 
  ${req.params.courseId}`, (err, result) => {
    if (err) {
      console.log('ERROR: ', err);
    } else {
      //console.log(result);
      res.send(result.rows);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

