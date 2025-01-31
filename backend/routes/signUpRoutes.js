const express = require('express');
const router = express.Router();
const pool = require('../db/connection');


router.post('/', async (req, res) => {
  const { fname, lname, DOB, gender, email, pass } = req.body;

  if (!fname || !lname || !gender || !DOB || !email || !pass) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try { 
    
    const query = `
      INSERT INTO patients (fname, lname, dob, gender, email, password)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [fname, lname, DOB, gender, email, pass];

    const result = await pool.query(query,  [fname, lname, DOB, gender, email, pass]);

    if (result.command === 'INSERT') {
      const newPatient = result.rows[0];
      res.status(200).json({ success: true, patient: newPatient });
    } else {
      res.status(500).json({ message: 'Failed to register the patient. Please try again.' });
    }
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
