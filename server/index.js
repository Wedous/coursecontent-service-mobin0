require('newrelic');
const express = require('express');
let app = express();
var faker = require('faker');
var fs = require('fs');
const { Pool, Client } = require('pg');
const db = new Pool({ database: 'courses' });

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/:courseId', (req, res) => {
  db.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(`select title, jsonb_agg(jsonb_build_object('name', name, 'duration', duration)) as entry 
from (select * from content left join entries on content.id = entries.contentId where content.courseId = 
  ${req.params.courseId}) AS derivedTable group by title`, (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      res.send(result.rows);
    });
  });
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

