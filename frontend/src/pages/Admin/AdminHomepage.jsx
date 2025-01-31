
import { Link } from 'react-router-dom';
import './AdminHomepage.css';

function AdminHomepage() {
  return (
    <div className="admin-homepage-container">
      <header>
        <h1>Welcome, Admin</h1>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="/admin/edit-doctors">Add Doctors</Link>
          </li>
          <li>
            <Link to="/admin/edit-patients">Add Patients</Link>
          </li>
          <li>
            <Link to="/admin/edit-appointments">View Appointments</Link>
          </li>
          <li>
            <Link to="/admin/manage-stock">Manage Stocks</Link>
          </li>
        </ul>
      </nav>

      <footer>
        <p>&copy; 2024 Medical Clinic Management</p>
      </footer>
    </div>
  );
}

export default AdminHomepage;
