import React from 'react';

const MetaMaskButton = ({ onConnect }) => {
  const handleMetaMaskConnect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        onConnect(accounts[0]);
      } catch (error) {
        alert("MetaMask connection failed");
      }
    } else {
      alert("MetaMask not detected. Please install it.");
    }
  };

  return <button onClick={handleMetaMaskConnect}>Connect MetaMask</button>;
};

export default MetaMaskButton;
