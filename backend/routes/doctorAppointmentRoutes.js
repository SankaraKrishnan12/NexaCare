const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const query = `
      SELECT 
        a.appoint_id,
        a.patient_id,
        p.fname || ' ' || p.lname AS patient_name,
        a.appoint_date, 
        a.status
      FROM appointments a
      JOIN patients p ON a.patient_id = p.patient_id
      WHERE a.doc_id = $1 and a.status not ilike 'process%'
    `;
    const result = await pool.query(query, [doctorId]);
    if (result.rows.length > 0) {
        const app = result.rows;
        res.status(200).json({ success: true, app : app });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;