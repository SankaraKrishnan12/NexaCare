// routes/DoctorLoginRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Replace with your actual database connection

router.post('/login', async (req, res) => {
  const { doc_id, lname } = req.body;

  try {
    const query = `
      SELECT * 
      FROM doctors 
      WHERE doc_id = $1 AND lname = $2
    `;
    const result = await db.query(query, [doc_id, lname]);

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
