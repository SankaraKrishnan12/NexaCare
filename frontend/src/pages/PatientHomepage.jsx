import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PatientHomepage.css';

function PatientHomepage() {
  const [data, setData] = useState({});
  const [appointments, setAppointments] = useState([]);

  const patientId = localStorage.getItem('patient_id'); // Retrieve patient_id from local storage

  useEffect(() => {
    if (!patientId) return;

    axios.get(`http://localhost:5000/api/patients/${patientId}`)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.patient);
        }
      })
      .catch((err) => console.log("Error fetching patient data:", err));
  }, [patientId]);

  useEffect(() => {
    if (!patientId) return;

    axios.get(`http://localhost:5000/api/patient/${patientId}`)
      .then((res) => {
        setAppointments(res.data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching appointments:', err);
        setAppointments([]);
      });
  }, [patientId]);

  return (
    <div className="patient-homepage">
      <header className="patient-header">
        <h1>Welcome, {data.fname} {data.lname}</h1>
      </header>

      {/* Profile Section */}
      <div className="profile-section">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {data.fname} {data.lname}</p>
        <p><strong>Date of Birth:</strong> {data.dob ? new Date(data.dob).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Gender:</strong> {data.gender || 'N/A'}</p>
        <p><strong>Contact Info:</strong> {data.email || 'N/A'}</p>
      </div>

      {/* Appointments Section */}
      <div className="appointments-section">
        <h2>Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No upcoming appointments. You can book a new one below.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item.appoint_id}>
                  <td>{item.doctor_fname} {item.doctor_lname}</td>
                  <td>{item.specialisation}</td>
                  <td>{new Date(item.appoint_date).toLocaleDateString()}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
        
      <div className="appointment-booking-section">
        <h2>Book a New Appointment</h2>
        <Link to="/Appointment" className="appointment-button">
          Book an Appointment
        </Link>
      </div>

      <div className="appointment-booking-section">
        <h2>Processed Appointments</h2>
        <Link to="/details" className="appointment-button">
          Open
        </Link>
      </div>

      <footer className="patient-footer">
        <p>&copy; 2024 Medical Clinic Management</p>
      </footer>
    </div>
  );
}

export default PatientHomepage;
