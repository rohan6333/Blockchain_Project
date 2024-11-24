import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Secure, Trusted, & Global Credential Verification Powered by Blockchain</h1>
      </header>

      {/* Sections */}
      <section className="dashboard-section">
        <div className="dashboard-card">
          <h2>Credential Issuers</h2>
          <p>
            Educational institutions and organizations can securely issue and
            manage digital credentials with blockchain verification.
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Credential Holders</h2>
          <p>
            Students and professionals can store, manage, and share their
            verified credentials securely in one place.
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Credential Checkers</h2>
          <p>
            Employers and organizations can instantly verify the authenticity
            of credentials with blockchain technology.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <ul className="footer-links">
          <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
          <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
          <li><Link to="/contact" className="footer-link">Contact Information</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default Dashboard;
