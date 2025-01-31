// routes/PrescriptionsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/medications', async (req, res) => {
  try {
    const query = 'SELECT * FROM medications';
    const result = await pool.query(query);
    const medic = result.rows;
    res.status(200).json({ success: true, medic : medic });
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/prescriptions', async (req, res) => {
  const { appointId,patientId, medications } = req.body;

  try {
    const prescriptionQuery = `
      INSERT INTO prescriptions (appoint_id,patient_id, prescribed_date)
      VALUES ($1,$2, NOW())
      RETURNING prescription_id
    `;
    const prescriptionResult = await pool.query(prescriptionQuery, [appointId,patientId]);
    const prescriptionId = prescriptionResult.rows[0].prescription_id;

    for (const med of medications) {
      const prescribedMedQuery = `
        CALL insert_prescribed_medication($1, $2, $3, $4);
      `;
      await pool.query(prescribedMedQuery, [prescriptionId, med.medId, med.dosage, med.count]);

      const stockUpdateQuery = `
        UPDATE medications
        SET stock_quantity = stock_quantity - $2
        WHERE med_id = $1
      `;
      await pool.query(stockUpdateQuery, [med.medId,med.count]);
    }

    res.status(200).json({ message: 'Prescription added successfully' });
  } catch (error) {
    console.error('Error adding prescription:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
