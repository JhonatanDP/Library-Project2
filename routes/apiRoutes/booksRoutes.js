const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');



// Get all Books
router.get('/books', (req, res) => {
    
    const sql = `SELECT * FROM books`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });


//Get a single book by id
router.get('/book/:id', (req, res) => {
    const sql = `SELECT * FROM books
                 WHERE books.id = ?`;

    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

  router.get('/book/code', (req, res) => {
    const sql = `SELECT * FROM books
                 WHERE code = ?`;

    const params = [req.params.code];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

//Get a single book by title
router.get('/book/title', (req, res) => {
    const sql = `SELECT * FROM books
                 WHERE title = ?`;

    const params = [req.params.title];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });



  // Create a book
router.post('/book', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'code', 'author_name', 'isle', 'row_letter');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT IGNORE INTO books ( title, code, author_name, isle, row_letter)
    VALUES (?,?,?,?,?)`;

const params = [body.title, body.code, body.author_name, body.isle, body.row_letter];

db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  
   });
});


//Update a candidate's party

router.put('/books/:id', (req, res) => {

    const errors = inputCheck(req.body, 'party_id');

    if(errors) {
        res.status(400).json({error: errors });
        return;
    }
    const sql = `UPDATE books SET party_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });




//   // Delete a candidate
// router.delete('/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Candidate not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
//   });

  module.exports = router;