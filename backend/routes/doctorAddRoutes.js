const express = require('express');
const router = express.Router();
const pool = require('../db/connection');


router.post('/', async (req, res) => {
  const { fname, lname, specialisation, consultation_fee } = req.body;

  if (!fname || !lname || !specialisation || !consultation_fee) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try { 
    
    const query = `
      INSERT INTO doctors (fname, lname, specialisation, consultation_fee)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [fname, lname, specialisation,consultation_fee];

    const result = await pool.query(query, [fname,lname,specialisation,consultation_fee]);

    if (result.command === 'INSERT') {
      const newDoctor = result.rowCount[0];
      res.status(200).json({ success: true, doctor: newDoctor });
    } else {
      res.status(500).json({ message: 'Failed to register the patient. Please try again.' });
    }
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
