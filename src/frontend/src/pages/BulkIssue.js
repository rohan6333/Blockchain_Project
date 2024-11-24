import React, { useState } from 'react';
import axios from 'axios';
import '../styles/bulkIssue.css'; // Import the CSS file for styling

const BulkIssue = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!file) {
      setError('Please upload a valid CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/credentials/bulk-issue',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Bulk issuance successful!');
      setError('');
    } catch (err) {
      console.error('Error in bulk issuance:', err);
      setError('Error issuing credentials. Please try again.');
    }
  };

  return (
    <div className="bulk-issue-container">
      <h2 className="bulk-issue-title">Bulk Credential Upload</h2>
      <form onSubmit={handleSubmit} className="bulk-issue-form">
        <label className="bulk-issue-label">
          Upload CSV:
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            required
            className="bulk-issue-input"
          />
        </label>
        <button type="submit" className="bulk-issue-button">Submit</button>
      </form>
      {message && <p className="bulk-issue-message">{message}</p>}
      {error && <p className="bulk-issue-error">{error}</p>}
    </div>
  );
};

export default BulkIssue;
