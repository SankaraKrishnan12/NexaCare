const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email,password } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const query = 'SELECT * FROM patients WHERE email = $1 and password = $2';
    const result = await pool.query(query, [email,password]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.json({
      success: true,
      patient: result.rows[0], 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching patient profile' });
  }
});

router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM patients WHERE patient_id = $1', [patientId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.json({success : true, patient : result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching patient profile' });
  }
});

router.get('/', async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM patients ');

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.json({success : true, patient : result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching patient profile' });
  }
});
module.exports = router;
