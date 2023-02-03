const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Password1234',
    database: 'office_db'
  },
  console.log(`Connected to the office_db database.`)
);

app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department;`;
    
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.get('/api/roles', (req, res) => {
    const sql = `SELECT `;
    
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.post('/api/add-movie', (req, res) => {
    const sql = `INSERT INTO movies (movie_name) VALUES (?);`;
    mName = req.body.movie_name;

    db.query(sql, mName, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.put('/api/update-review', (req, res) => {
    const sql = `INSERT INTO reviews (movie_id, review) VALUES (??, ?);`;
    //UPDATE reviews SET review = ?? WHERE id = ?
    
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.delete('/api/movie/:id', (req, res) => {
    const sql = `DELETE FROM movies WHERE id = ?;`;
    
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: result
      });
    });
  });
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});