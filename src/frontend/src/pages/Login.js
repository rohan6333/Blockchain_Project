import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import axios from 'axios';
import '../styles/auth.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleMetaMaskConnect = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const ethAddress = accounts[0];

      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: ethAddress,
        password: 'metamask-login',
      });

      if (response.status === 200) {
        alert('Login successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('ethAddress', response.data.user.ethereumAddress);
        const role = response.data.user.role;

        if (role === 'issuer') {
          navigate('/issuer-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('MetaMask login error:', error);
      alert(error.response?.data?.message || 'MetaMask login failed!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        alert('Login successful!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('ethAddress', response.data.user.ethereumAddress);
        const role = response.data.user.role;

        if (role === 'issuer') {
          navigate('/issuer-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="auth-label">
            Email:
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-label">
            Password:
            <input
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="auth-button-group">
            <button type="submit" className="auth-button">
              Login
            </button>
            <button
              type="button"
              className="auth-button meta-button"
              onClick={handleMetaMaskConnect}
            >
              Connect MetaMask
            </button>
          </div>
        </form>
        <p className="auth-link">
          New user? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
