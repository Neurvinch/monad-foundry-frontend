import React from "react";

const ConnectWallet = ({ setAccount }) => {
  async function connect() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button
        onClick={connect}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          backgroundColor: "#4E44CE",
          color: "white",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
