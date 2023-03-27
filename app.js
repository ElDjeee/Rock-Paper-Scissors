const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.static('public'));

const db = new sqlite3.Database('answers.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('CREATE TABLE IF NOT EXISTS answers (answer TEXT)');
  }
});

app.post('/answers', (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    db.run('INSERT INTO answers (answer) VALUES (?)', [body], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error writing to database');
      } else {
        res.send('Answer saved successfully');
      }
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
