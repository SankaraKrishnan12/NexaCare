// src/pages/DoctorLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorLogin.css';

function DoctorLogin() {
  const [docId, setDocID] = useState('');
  const [lname, setLname] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset error message

    try {
        await axios.post('http://localhost:5000/api/doctors/login', {
        doc_id :  docId,
        lname : lname,
      }).then((response) => {

          if (response.data.success) {
              console.log('API Response : ' , response.data)
              console.log(response.data.doctor)
              // Store doctor data (e.g., id) in localStorage
              localStorage.setItem('doctor_id', response.data.doctor.doc_id);
              // Redirect to doctor dashboard
              navigate(`/doctor-dashboard/${ response.data.doctor.doc_id}`);
            } else {
                setMessage('Invalid credentials. Please try again.');
            }
    })
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="doctor-login-container">
      <header>
        <h1>Doctor Login</h1>
      </header>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Doctor ID :</label>
          <input
            type="number"
            value={docId}
            onChange={(e) => setDocID(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Last Name:</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default DoctorLogin;
