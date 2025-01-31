import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPrescription.css';

function AddPrescription() {
  const appointId = localStorage.getItem('appoint_id');
  const doctorId = localStorage.getItem('doctor_id');
  const patientId = localStorage.getItem('patient_id');
  const navigate = useNavigate();

  const [medications, setMedications] = useState([]);
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMedications() {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor/medications');
        setMedications(response.data.medic);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    }
    fetchMedications();
  }, []);

  const handleAddPrescription = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/doctor/prescriptions', {
        appointId,
        patientId,
        medications: selectedMedications.map((med) => ({
          medId: med.med_id,
          dosage: med.dosage,
          count: med.count,
        })),
      });

      if (response.status === 200) {
        setMessage('Prescription added successfully!');
        navigate(`/doctor-dashboard/${doctorId}`);
      }
    } catch (error) {
      console.error('Error adding prescription:', error);
      setMessage('Error adding prescription. Please try again.');
    }
  };

  const handleMedicationSelection = (medication) => {
    const existing = selectedMedications.find((med) => med.med_id === medication.med_id);
    if (existing) {
      setSelectedMedications(selectedMedications.filter((med) => med.med_id !== medication.med_id));
    } else {
      setSelectedMedications([...selectedMedications, { ...medication, dosage: '', count: '' }]);
    }
  };

  const handleMedicationChange = (medId, field, value) => {
    setSelectedMedications((prevState) =>
      prevState.map((med) =>
        med.med_id === medId
          ? {
              ...med,
              [field]: value,
            }
          : med
      )
    );
  };

  return (
    <div className="add-prescription-container">
      <h2>Add Prescription for Appointment ID: {appointId}</h2>
      <div className="medication-list">
        <h3>Available Medications</h3>
        <ul>
          {medications.map((med) => (
            <li key={med.med_id}>
              {med.med_name} (Stock: {med.stock_quantity})
              <label>
                <input
                  type="checkbox"
                  value={med.med_id}
                  onChange={() => handleMedicationSelection(med)}
                />
                {selectedMedications.find((m) => m.med_id === med.med_id) && (
                  <div className="medication-inputs">
                    <input
                      type="number"
                      className="num"
                      placeholder="Count"
                      value={
                        selectedMedications.find((m) => m.med_id === med.med_id)
                          ?.count || ''
                      }
                      onChange={(e) =>
                        handleMedicationChange(med.med_id, 'count', e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={
                        selectedMedications.find((m) => m.med_id === med.med_id)
                          ?.dosage || ''
                      }
                      onChange={(e) =>
                        handleMedicationChange(med.med_id, 'dosage', e.target.value)
                      }
                    />
                    
                  </div>
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleAddPrescription}>Submit Prescription</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddPrescription;
