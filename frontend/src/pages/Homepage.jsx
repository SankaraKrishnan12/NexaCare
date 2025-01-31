
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import the styles for this component

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h2>Welcome to Our Medical Clinic</h2>
        <p className='para'>Your health is our priority. Connect with the best doctors.</p>
      </header>

      <div className="homepage-content">
        <section className="intro-section">
          <h2>About Us</h2>
          <p className='parag'>
            Our clinic offers expert healthcare services in a comfortable and
            compassionate environment. We have a team of skilled doctors and
            healthcare professionals ready to serve you.
          </p>
        </section>

        <section className="action-section">
          <h2>Patient Login</h2>
          <p>Already a patient? Log in to view your appointments and medical records.</p>
          <Link to="/login" className="action-button">
            Login
          </Link>
        </section>

        <section className="action-section">
          <h2>New to Our Clinic?</h2>
          <p>Create an account to get started with your healthcare journey.</p>
          <Link to="/signup" className="action-button">
            Sign Up
          </Link>
        </section>

        <section className="action-section">
          <h2>Doctor Login</h2>
          <p>Log in to view your patients and appointments.</p>
          <Link to="/doctor-login" className="action-button">
            Login
          </Link>
        </section>

        <section className="action-section">
          <h2>Admin Login</h2>
          <p>Already a patient? Log in to view your appointments and medical records.</p>
          <Link to="/admin-login" className="action-button">
            Login
          </Link>
          <p><br/></p>
        </section>
      </div>

      <footer className="homepage-footer">
        <p>&copy; 2024 Medical Clinic Management</p>
      </footer>
    </div>
  );
}

export default Homepage;
