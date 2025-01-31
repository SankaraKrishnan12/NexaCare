// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your global styles

// Components
import Homepage from './pages/Homepage'; 
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Placeholder for future sign-up page
import PatientHomepage from './pages/PatientHomepage';
import BookAppointment from './pages/BookAppointment';
import ProcessedAppointmentDetails from './pages/ProcessedAppointmentDetails';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHomepage from './pages/Admin/AdminHomepage';
import EditDoctors from './pages/Admin/EditDoctors';
import EditPatients from './pages/Admin/EditPatients';
import EditAppointments from './pages/Admin/EditAppointments';
import ManageStock from './pages/Admin/ManageStock';
import DoctorLogin from './pages/Doctor/doctorLogin';
import DoctorDashboard from './pages/Doctor/doctorDash';
import AddPrescription from './pages/Doctor/AddPrescription';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>NEXA CARE</h1>
        </header>

        <Routes>
          <Route path="/" element={<Homepage />} />  {/* Set Homepage as the default route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/Home-Patients/:id" element={<PatientHomepage />} />
          <Route path="/Appointment" element={<BookAppointment />} />
          <Route path="/Details" element={<ProcessedAppointmentDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHomepage />} />
          <Route path="/admin/edit-doctors" element={<EditDoctors />} />
          <Route path="/admin/edit-patients" element={<EditPatients />} />
          <Route path="/admin/edit-appointments" element={<EditAppointments />} />
          <Route path="/admin/manage-stock" element={<ManageStock />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-dashboard/:id" element={<DoctorDashboard />} />
          <Route path="/AddPrescription/:id" element={<AddPrescription />} />
        </Routes>

        <footer className="footer">
          <p>&copy; 2024 Medical Clinic Management</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
