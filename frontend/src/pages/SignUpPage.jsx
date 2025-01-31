import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'

function SignUpPage() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [gender, setGender] = useState('');
  const [DOB, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/newPatient', {
        fname,
        lname,
        DOB,
        gender,
        email,
        pass,
      });

      if (response.status === 200) {
        setMessage('Registered successfully!');
        navigate('/login');
      } else {
        setMessage('Error registering. Please try again.');
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      setMessage('Error registering patients.');
    }
  };

  return (
    <div>
      <h2>Sign Up for a New Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointDate">Select Date:</label>
          <input
            type="date"
            id="Date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            placeholder="Enter your gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
