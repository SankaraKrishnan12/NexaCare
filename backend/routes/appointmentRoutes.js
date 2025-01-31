const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

router.get('/doctors', async (req, res) => {
  try {
    const query = 'SELECT * FROM doctors ORDER BY fname, lname';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

router.post('/appointments', async (req, res) => {
  const { patientId, doctorId, appointDate} = req.body;
  console.log(patientId,doctorId,appointDate);

  if (!patientId || !doctorId || !appointDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const insertQuery = `
      INSERT INTO appointments (patient_id, doc_id, appoint_date)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertQuery, [patientId, doctorId, appointDate]);

    
    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

router.get('/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const query = `
      SELECT appointments.*, doctors.fname AS doctor_fname, doctors.lname AS doctor_lname, doctors.specialisation
      FROM appointments
      JOIN doctors ON appointments.doc_id = doctors.doc_id
      WHERE appointments.patient_id = $1
    `;
    const result = await pool.query(query, [patientId]);

    res.json({data : result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

router.get('/patient', async (req, res) => {

  try {
    const query = `
      SELECT appointments.*, doctors.fname AS doctor_fname, doctors.lname AS doctor_lname, doctors.specialisation
      FROM appointments
      JOIN doctors ON appointments.doc_id = doctors.doc_id
    `;
    const result = await pool.query(query);

    res.json({data : result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});
module.exports = router;
