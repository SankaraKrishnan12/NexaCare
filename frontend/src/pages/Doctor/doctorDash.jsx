// src/pages/DoctorDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './doctorDash.css';

function DoctorDashboard() {
  const doctorId  = localStorage.getItem('doctor_id');
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        await axios.get(`http://localhost:5000/api/doctor-appointments/${doctorId}`)
        .then((response)=>{
        setAppointments(response.data.app);
        }
      )
        ;
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchAppointments();
  }, [doctorId]);

  const viewAppointment = (appointId,patientId) => {
    localStorage.setItem('patient_id',patientId)
    localStorage.setItem('appoint_id',appointId)
    navigate(`/AddPrescription/${appointId}`);
  };

  return (
    <div className="doctor-dashboard-container">
      <h2>Appointments for Doctor ID: {doctorId}</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            
            <tr key={appointment.appoint_id}>
              <td>{appointment.appoint_id}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.appoint_date}</td>
              <td>{appointment.status}</td>
              <td>
                <button onClick={() => viewAppointment(appointment.appoint_id,appointment.patient_id)}>Open</button>
              </td>
            </tr>
             
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorDashboard;
