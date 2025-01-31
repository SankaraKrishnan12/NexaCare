import  { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPatients.css';
import { useNavigate } from 'react-router-dom';

function EditPatients() {
  const [patients, setPatients] = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [DOB, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPatients() {
      axios.get(`http://localhost:5000/api/patients`)
      .then((res) => {
        if (res.data.success) {
          setPatients(res.data.patient);
        }
      })
      .catch((err) => console.log("Error fetching patient data:", err));
    }
    fetchPatients();
  }, []);

  const handleAddPatient = async (e) => {
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
        alert("Added Succesfully.")
        setPatients([...patients, response.data]);
        navigate('/admin-home');
      } else {
        setMessage('Error registering. Please try again.');
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      setMessage('Error registering patients.');
    }
  };

  return (
    <div className="edit-patients-container">
      <h2>Edit Patients</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleAddPatient} className="patient-form">
          <input
            type="text"
            placeholder="Enter your first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <input
            type="date"
            id="Date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        
        <button type="submit">Add Patient</button>
      </form>
      <table>
  <thead>
    <tr>
      <th>Patient ID</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    {patients.length === 0 ? (
      <tr>
        <td colSpan="3">No patients available</td>
      </tr>
    ) : (
      patients.map((patient) => (
        <tr key={patient.id}>
          <td>{patient.patient_id}</td>
          <td>{patient.fname}</td>
          <td>{patient.lname}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

    </div>
  );
}

export default EditPatients;
