import React, { useState } from "react";
import axios from "axios";
import "../styles/verify.css"; // Import the CSS file for styling

const Verify = () => {
  const [searchBy, setSearchBy] = useState("holderAddress"); 
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/credentials/verify`,
        { [searchBy]: searchValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Differentiate between Holder Address and Credential Hash responses
      if (searchBy === "credentialHash") {
        setResults([response.data]); 
      } else {
        setResults(response.data.credentials || []);
      }
      setError("");
    } catch (err) {
      console.error("Error verifying credentials:", err);
      setError("Verification failed. Please check the input and try again.");
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">Verify Credentials</h2>
      <div className="verify-options">
        <label>
          <input
            type="radio"
            value="holderAddress"
            checked={searchBy === "holderAddress"}
            onChange={() => setSearchBy("holderAddress")}
          />
          Search by Holder Address
        </label>
        <label>
          <input
            type="radio"
            value="credentialHash"
            checked={searchBy === "credentialHash"}
            onChange={() => setSearchBy("credentialHash")}
          />
          Search by Credential Hash
        </label>
      </div>
      <div className="verify-input">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Enter ${
            searchBy === "credentialHash" ? "Credential Hash" : "Holder Address"
          }`}
        />
        <button onClick={handleSearch} className="verify-button">
          Search
        </button>
      </div>
      {error && <p className="verify-error">{error}</p>}
      {results.length > 0 && (
        <div className="verify-results">
          {results.map((credential, index) => (
            <div key={index} className="verify-card">
              <p>
                <strong>Issuer Address:</strong> {credential.issuer}
              </p>
              <p>
                <strong>Holder Address:</strong> {credential.holderAddress}
              </p>
              <p>
                <strong>Credential Hash:</strong> {credential.credentialHash}{" "}
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

export default Verify;
