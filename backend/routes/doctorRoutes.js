const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT doc_id, fname, lname, specialisation FROM doctors;';
    const result = await pool.query(query);
    
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: 'No doctors found' });
    }
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});


router.post('/login', async (req, res) => {
  const { doc_id, lname } = req.body;

  try {
    const query = `
      SELECT * 
      FROM doctors 
      WHERE doc_id = $1 AND lname = $2
    `;
    const result = await pool.query(query, [doc_id, lname]);

    if (result.rows.length > 0) {
      const doctor = result.rows[0];
      res.status(200).json({ success: true, doctor });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during doctor login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
