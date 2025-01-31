import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStock.css';

function ManageStock() {
  const [stock, setStock] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages

  useEffect(() => {
    async function fetchStock() {
      try {
        const response = await axios.get('http://localhost:5000/api/stock');
        setStock(response.data.medic);
      } catch (error) {
        console.error('Error fetching stock:', error);
        setMessage('Error fetching stock data.');
      }
    }
    fetchStock();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!productName || !quantity) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/stock/add', {
        productName,
        quantity: parseInt(quantity), // Ensure quantity is a number
      });

      setStock([...stock, response.data]);
      setProductName('');
      setQuantity('');
      setMessage('Stock added successfully!');
    } catch (error) {
      console.error('Error adding stock:', error);
      setMessage('Error adding stock.');
    }
  };

  return (
    <div className="manage-stock-container">
      <h2>Manage Stock & Inventory</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleAddStock} className="stock-form">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          min="1" // Prevent entering zero or negative numbers
        />
        <button type="submit">Add Stock</button>
      </form>

      <ul>
  {stock.length === 0 ? (
    <li>No stock available</li>
  ) : (
    stock.map((item, index) => (
      <li key={item.med_id || `${item.med_name}-${index}`}>
        {item.med_id}. {item.med_name} - {item.stock_quantity}
      </li>
    ))
  )}
</ul>

    </div>
  );
}

export default ManageStock;
