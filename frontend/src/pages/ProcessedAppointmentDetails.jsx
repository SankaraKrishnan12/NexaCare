import { useEffect, useState } from 'react';
import './ProcessedAppointmentDetails.css';
import axios from 'axios';

function ProcessedAppointmentDetails() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const patientId = localStorage.getItem('patient_id');

  useEffect(() => {
    if (!patientId) {
      setError('Patient ID is not available.');
      return;
    }

    async function fetchProcessedAppointments() {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/${patientId}`);
        if (response.data.success) {
          setAppointments(response.data.data);
        } else {
          setError(response.data.message || 'No processed appointments found.');
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointment details.');
      }
    }

    fetchProcessedAppointments();
  }, [patientId]);

  return (
    <div className="processed-appointment-container">
      <header className="appointment-header">
        <h1>Processed Appointments</h1>
      </header>

      {error && <p className="error-message">{error}</p>}

      {!error && appointments.length > 0 ? (
        <div className="appointment-list">
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-details">
              <h2>Appointment Information</h2>
              <p>
                <strong>Appointment ID:</strong> {appointment.appoint_id}
              </p>
              <p>
                <strong>Doctor:</strong> Dr. {appointment.doctor_fname}{' '}
                {appointment.doctor_lname}
              </p>
              <p>
                <strong>Appointment Date:</strong>{' '}
                {new Date(appointment.appoint_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {appointment.status}
              </p>

              <h2>Prescription</h2>
              {appointment.prescription_id ? (
                <ul>
                  {appointments
                    .filter((a) => a.appoint_id === appointment.appoint_id)
                    .map((medication, idx) => (
                      <li key={idx}>
                        <p>
                          <strong>Medication Name:</strong>{' '}
                          {medication.med_name}
                        </p>
                        <p>
                          <strong>Dosage:</strong> {medication.dosage}
                        </p>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No prescription available for this appointment.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Loading appointment details...</p>
      )}


      <footer className="appointment-footer">
        <p>&copy; 2024 Medical Clinic Management</p>
      </footer>
    </div>
  );
}

export default ProcessedAppointmentDetails;
