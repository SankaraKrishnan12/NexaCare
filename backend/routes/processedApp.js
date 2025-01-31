const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const query = `
      SELECT 
        a.appoint_id, 
        d.fname AS doctor_fname, 
        d.lname AS doctor_lname, 
        a.appoint_date, 
        a.status,
        pr.prescription_id,
        pm.med_id, 
        m.med_name, 
        pm.dosage
      FROM
        appointments a
      JOIN 
        doctors d ON a.doc_id = d.doc_id
      LEFT JOIN 
        prescriptions pr ON a.appoint_id = pr.appoint_id
      LEFT JOIN 
        prescribed_medications pm ON pr.prescription_id = pm.prescription_id
      LEFT JOIN 
        medications m ON pm.med_id = m.med_id
      WHERE 
        a.status = 'Processed' AND a.patient_id = $1;
    `;

    const result = await pool.query(query, [patientId]);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, data: result.rows });
    } else {
      res.status(404).json({ success: false, message: 'No processed appointments with prescriptions found for this patient' });
    }
  } catch (error) {
    console.error('Error fetching processed appointments with prescriptions:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
