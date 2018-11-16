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
    client.query('SELECT * from content', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      res.send([result.rows[0]]);
    });
  });
});

// app.post('/testData', function (req, res) {
// fs.writeFile("./test.json", JSON.stringify(req.body), 'utf8', function (err) {
//     if (err) {
//       return console.log(err);
//     }

//     console.log("The file was saved!");
// });
// });


let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

