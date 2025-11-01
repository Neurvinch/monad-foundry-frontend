import React, { useState, useEffect } from "react";
import ConnectWallet from "./components/ConnectWallet";
import TokenDashboard from "./components/TokenDashboard";
import { ethers } from "ethers";
import abi from "./abi/MonadToken.json";

const CONTRACT_ADDRESS = "0xYourDeployedContractAddress"; // <-- replace this

function App() {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [provider, setProvider] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  }, []);

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);
      setTokenContract(contract);
    }
  }, [provider]);

  return (
    <div
      style={{ textAlign: "center", padding: "2rem", fontFamily: "Poppins" }}
    >
      <h1>💎 MonadToken Dashboard</h1>
      <ConnectWallet setAccount={setAccount} />
      {account && tokenContract && (
        <TokenDashboard
          account={account}
          provider={provider}
          tokenContract={tokenContract}
        />
      )}
    </div>
  );
}

export default App;
