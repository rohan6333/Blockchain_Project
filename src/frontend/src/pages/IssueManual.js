import React, { useState } from 'react';
import axios from 'axios';
import '../styles/issueManual.css'; // Import the CSS file for styling

const IssueManual = () => {
  const [formData, setFormData] = useState({
    holderAddress: '',
    certificate: '',
    period: '',
    cgpa: '',
    organizationName: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/credentials/issue-manual',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Credential issued successfully! Credential Hash: ${response.data.credentialHash}`);
    } catch (err) {
      console.error('Error issuing credential:', err);
      setError('Error issuing credential. Please check the details and try again.');
    }
  };

  return (
    <div className="issue-manual-container">
      <h2 className="issue-manual-title">Manual Credential Entry</h2>
      <form onSubmit={handleSubmit} className="issue-manual-form">
        <label>
          Holder Address:
          <input
            type="text"
            name="holderAddress"
            value={formData.holderAddress}
            onChange={handleChange}
            required
            className="issue-manual-input"
          />
        </label>
        <label>
          Certificate:
          <input
            type="text"
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
            required
            className="issue-manual-input"
          />
        </label>
        <label>
          Period:
          <input
            type="text"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            className="issue-manual-input"
          />
        </label>
        <label>
          CGPA:
          <input
            type="number"
            step="0.01"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            required
            className="issue-manual-input"
          />
        </label>
        <label>
          Organization Name:
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            required
            className="issue-manual-input"
          />
        </label>
        <button type="submit" className="issue-manual-button">Submit</button>
      </form>
      {message && <p className="issue-manual-message">{message}</p>}
      {error && <p className="issue-manual-error">{error}</p>}
    </div>
  );
};

export default IssueManual;
