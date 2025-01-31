
import  { useState, useEffect } from 'react';
import axios from 'axios';
import './EditDoctors.css';
import { useNavigate } from 'react-router-dom';

function EditDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [doctorFname, setDoctorFname] = useState('');
  const [doctorLname, setDoctorLname] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [doctorConsultation, setDoctorConsultation] = useState('');
const navigate = useNavigate()

  useEffect(() => {
    async function fetchDoctors() {
      try {
        await axios.get('http://localhost:5000/api/doctors')
        .then((res) => {
          console.log('Doctors API Response:', res.data);
          setDoctors(res.data || []);
        });
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
      }
    }
    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctorsAdd', {
        fname: doctorFname,
        lname: doctorLname,
        specialisation: doctorSpecialization,
        consultation_fee: doctorConsultation
      });
      
      alert("Added Succesfully.")
      setDoctors([...doctors, response.data]);
      navigate('/admin-home');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div className="edit-doctors-container">
      <h2>Edit Doctors</h2>
      <div className="doctor-form">
        <input
          type="text"
          placeholder="Doctor First Name"
          value={doctorFname}
          onChange={(e) => setDoctorFname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Doctor Last Name"
          value={doctorLname}
          onChange={(e) => setDoctorLname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={doctorSpecialization}
          onChange={(e) => setDoctorSpecialization(e.target.value)}
        />
         <input
          type="text"
          placeholder="Consultation"
          value={doctorConsultation}
          onChange={(e) => setDoctorConsultation(e.target.value)}
        />
        
        <button onClick={handleAddDoctor}>Add Doctor</button>
      </div>

      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.fname} {doctor.lname} - {doctor.specialisation} - {doctor.consultation_fee}</li>
        ))}
      </ul>
    </div>
  );
}

export default EditDoctors;
