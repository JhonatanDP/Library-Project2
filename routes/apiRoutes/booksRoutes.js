const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');



// Get all Books
router.get('/books', (req, res) => {
    
    const sql = `SELECT books.id, books.title, books.code,
    author.author_name AS Author_Name, isle, row_letter from books
    LEFT JOIN author
    ON books.author_id = author.id
    LEFT JOIN location
    ON books.location_id = location.id`;
  
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


//Get a single book
router.get('/book/:id', (req, res) => {
    const sql = `SELECT books.id, books.title, books.code,
                 author.author_name AS Author_Name, isle, row_letter from books
                 LEFT JOIN author
                 ON books.author_id = author.id
                 LEFT JOIN location
                 ON books.location_id = location.id
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


  // Create a book
router.post('/book', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'code', 'author_id', 'location_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO books ('title', 'code', 'author_id', 'location_id')
  VALUES (?,?,?,?)`;
const params = [body.title, body.code, body.author_id, location_id];

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



//   // Update a candidate's party
// router.put('/candidate/:id', (req, res) => {

//     const errors = inputCheck(req.body, 'party_id');

//     if(errors) {
//         res.status(400).json({error: errors });
//         return;
//     }
//     const sql = `UPDATE candidates SET party_id = ? 
//                  WHERE id = ?`;
//     const params = [req.body.party_id, req.params.id];
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         // check if a record was found
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Candidate not found'
//         });
//       } else {
//         res.json({
//           message: 'success',
//           data: req.body,
//           changes: result.affectedRows
//         });
//       }
//     });
//   });




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