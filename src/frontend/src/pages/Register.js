import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from 'axios';
import '../styles/auth.css'; // CSS file for styling

const Register = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ethAddress, setEthAddress] = useState('');
  const navigate = useNavigate();

  const handleMetaMaskConnect = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setEthAddress(accounts[0]);
      alert('MetaMask connected successfully!');
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      alert('Failed to connect to MetaMask. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role) {
      alert('Please select a role!');
      return;
    }

    if (!ethAddress && (!email || !password)) {
      alert('Please fill in all fields or connect using MetaMask.');
      return;
    }

    try {
      const payload = {
        role,
        email: email || undefined,
        password: password || undefined,
        ethereumAddress: ethAddress || undefined,
      };
      const response = await axios.post('http://localhost:5000/api/users/register', payload);

      if (response.status === 201) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegister}>
          <label className="auth-label">
            Role:
            <select
              className="auth-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select a Role</option>
              <option value="issuer">Issuer</option>
              <option value="holder">Holder</option>
              <option value="checker">Checker</option>
            </select>
          </label>
          <label className="auth-label">
            Email:
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={ethAddress !== ''}
              placeholder="Enter your email"
            />
          </label>
          <label className="auth-label">
            Password:
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={ethAddress !== ''}
              placeholder="Enter your password"
            />
          </label>
          <label className="auth-label">
            ETH Address:
            <input
              type="text"
              className="auth-input"
              value={ethAddress}
              disabled
              placeholder="Connect with MetaMask"
            />
          </label>
          <div className="auth-button-group">
            <button
              type="button"
              className="auth-button meta-button"
              onClick={handleMetaMaskConnect}
            >
              Connect MetaMask
            </button>
            <button type="submit" className="auth-button">
              Register
            </button>
          </div>
        </form>
        <p className="auth-link">
          Already a user? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
