import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookAppointment.css';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointDate, setAppointDate] = useState('');
  // const [availableSlots, setAvailableSlots] = useState([]);
  // const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const patient_id = localStorage.getItem('patient_id');

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
  // useEffect(() => {
  //   async function fetchSlots() {
  //     try {
  //       await axios.get('http://localhost:5000/api/available_slots')
  //       .then((res) => {
  //         console.log('Slots API Response:', res.data);
  //         setAvailableSlots(res.data || []);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching slots:', error);
  //       setAvailableSlots([]);
  //     }
  //   }
  //   fetchSlots();
  // }, []);
  const handleDoctorSelect = (e) => {
    setSelectedDoctor(e.target.value);
    // setAvailableSlots([]);
    // setSelectedSlot('');
  };

  const handleDateChange = async (e) => {
    setAppointDate(e.target.value);
    console.log(selectedDoctor,appointDate);
    // if (selectedDoctor && e.target.value) {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/available_slots`, {
    //       params: {
    //         doctorId: selectedDoctor,
    //         date: e.target.value,
    //       },
    //     });
    //     setAvailableSlots(response.data || []);
    //     setSelectedSlot('');
    //   } catch (error) {
    //     console.error('Error fetching available slots:', error);
    //   }
    // }
  };

  // const handleSlotSelect = (e) => {
  //   setSelectedSlot(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !appointDate ) {
      setMessage('Please fill in all fields to book an appointment.');
      return;
    }

    try {
      console.log(selectedDoctor,appointDate)
      await axios.post('http://localhost:5000/api/appointments', {
        patientId: patient_id,
        doctorId: selectedDoctor,
        appointDate : appointDate,
      }).then((res) => {
        if (res.status === 200) {
          setMessage('Appointment booked successfully!');
          navigate('/Home-Patients/1');
        } else {
          setMessage('Error booking appointment. Please try again.');
        }
      }).catch(err => {
        console.log(err)
      });

      // if (response.status === 200) {
      //   setMessage('Appointment booked successfully!');
      //   navigate('/Home-Patients/1');
      // } else {
      //   setMessage('Error booking appointment. Please try again.');
      // }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Error booking appointment.');
    }
  };

  return (
    <div className="book-appointment-container">
      <header className="appheader">
        <h1>Book an Appointment</h1>
      </header>

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            value={selectedDoctor || ''}
            onChange={(e) => handleDoctorSelect(e)}
            required
          >
            <option value="">Select a Doctor</option>
            {Array.isArray(doctors) && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor.doc_id} value={doctor.doc_id}>
                  {doctor.fname} {doctor.lname} - {doctor.specialisation}
                </option>
              ))
            ) : (
              <option value="" disabled>No doctors available</option>
            )
            }
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appointDate">Select Date:</label>
          <input
            type="date"
            id="appointDate"
            value={appointDate}
            onChange={(e) => handleDateChange(e)}
            required
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="slot">Select Time Slot:</label>
          <select
            id="slot"
            value={selectedSlot || ''}
            onChange={handleSlotSelect}
            required
            // disabled={availableSlots.length === 0}
          >
            <option value="">Select a Time Slot</option>
            {Array.isArray(availableSlots) && availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <option key={slot.slot_id} value={slot.slot_id}>
                  {slot.slot_time} 
                </option>
              ))
            ) : (
              <option value="" disabled>No slots available</option>
            )}
          </select>
        </div> */}

        <button type="submit" className="submit-button">
          Book Appointment
        </button>
        
        {message && <p className="message">{message}</p>}
      </form>

      <footer className="appointment-footer">
        <p>&copy; 2024 Medical Clinic Management</p>
      </footer>
    </div>
  );
}

export default BookAppointment;
