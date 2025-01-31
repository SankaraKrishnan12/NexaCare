const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
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

router.post('/add', async (req, res) => {
    const { productName, quantity } = req.body;
  
    if (!productName || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid product name or quantity' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO medications (med_name, stock_quantity) VALUES ($1, $2) RETURNING *',
        [productName, quantity]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ success: false, message: 'Server error while adding stock' });
    }
  });

  router.post('/delete', async (req, res) => {
    const { productName } = req.body;
  
    if (!productName) {
      return res.status(400).json({ success: false, message: 'Invalid product name or quantity' });
    }
  
    try {
      const result = await pool.query(
        'delete ',
        [productName, quantity]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error adding stock:', error);
      res.status(500).json({ success: false, message: 'Server error while adding stock' });
    }
  });
  

module.exports = router;