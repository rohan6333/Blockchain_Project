import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/issuerDashboard.css'; // Import CSS file for styling

const IssuerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="issuer-dashboard-container">
      <h2 className="dashboard-title">Issuer Dashboard</h2>
      <div className="dashboard-cards-container">
        {/* Manual Entry Card */}
        <div
          onClick={() => navigate('/issue-manual')}
          className="dashboard-card"
        >
          <h3>Manual Entry</h3>
          <p>
            Enter individual credentials manually and store them securely on
            the blockchain.
          </p>
        </div>

        {/* Bulk Upload Card */}
        <div
          onClick={() => navigate('/bulk-issue')}
          className="dashboard-card"
        >
          <h3>Bulk Upload</h3>
          <p>
            Upload multiple credentials in CSV format for efficient storage on
            the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssuerDashboard;
