import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/holders.css'; // Import the CSS file for styling

const Holders = () => {
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const token = localStorage.getItem('token');
        const holderAddress = localStorage.getItem('ethAddress');

        console.log('Holder Address:', holderAddress); 

        if (!holderAddress) {
          setError('Holder address not found. Redirecting to login...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/credentials/${holderAddress}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data); 

        if (response.data.credentials.length > 0) {
          setCredentials(response.data.credentials);
        } else {
          setError('No credentials issued yet.');
        }
      } catch (err) {
        console.error('Error fetching credentials:', err);
        setError('Failed to fetch credentials. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  return (
    <div className="holders-container">
      <h2 className="holders-title">Holder's Credentials</h2>
      {isLoading ? (
        <p className="holders-loading">Loading...</p>
      ) : error ? (
        <p className="holders-error">{error}</p>
      ) : (
        <div className="credentials-list">
          {credentials.map((credential, index) => (
            <div key={index} className="credential-card">
              <h3 className="credential-title">{credential.organizationName}</h3>
              <p>
                <strong>Issuer Address:</strong> {credential.issuer}
              </p>
              <p>
                <strong>Holder Address:</strong> {credential.holderAddress}
              </p>
              <p>
                <strong>Credential Hash:</strong> {credential.credentialHash}{' '}
                <button
                  className="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText(credential.credentialHash)
                  }
                >
                  Copy
                </button>
              </p>
              <p>
                <strong>Certificate:</strong> {credential.certificate}
              </p>
              <p>
                <strong>Period:</strong> {credential.period}
              </p>
              <p>
                <strong>CGPA:</strong> {credential.cgpa}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Holders;
