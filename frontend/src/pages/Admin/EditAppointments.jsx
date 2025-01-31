import { useState, useEffect } from 'react';
import axios from 'axios';
import './EditAppointments.css';

function EditAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:5000/api/patient');
        console.log('API Response:', response.data);

        setAppointments(response.data.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]); 
      }
    }
    fetchAppointments();
  }, []);

 

  return (
    <div className="edit-appointments-container">
      <h2>Appointments List</h2>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="6">No appointments available</td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.appoint_id}>
                <td>{appointment.appoint_id}</td>
                <td>{appointment.patient_id}</td>
                <td>
                  {appointment.doctor_fname} {appointment.doctor_lname}
                </td>
                <td>{appointment.specialisation}</td>
                <td>{appointment.appoint_date}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EditAppointments;
