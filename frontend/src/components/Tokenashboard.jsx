import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const ADMIN_ROLE = ethers.id("ADMIN_ROLE");
const MINTER_ROLE = ethers.id("MINTER_ROLE");

const TokenDashboard = ({ account, provider, tokenContract }) => {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [role, setRole] = useState("user");
  const [signer, setSigner] = useState(null);
  const [contractWithSigner, setContractWithSigner] = useState(null);

  useEffect(() => {
    async function load() {
      const signer = await provider.getSigner();
      setSigner(signer);
      setContractWithSigner(tokenContract.connect(signer));

      const bal = await tokenContract.balanceOf(account);
      setBalance(ethers.formatEther(bal));

      // Determine role
      const isAdmin = await tokenContract.hasRole(ADMIN_ROLE, account);
      const isMinter = await tokenContract.hasRole(MINTER_ROLE, account);
      if (isAdmin) setRole("admin");
      else if (isMinter) setRole("minter");
      else setRole("user");
    }
    load();
  }, [account]);

  async function mint() {
    if (role === "admin" || role === "minter") {
      const tx = await contractWithSigner.mint(
        account,
        ethers.parseEther(amount)
      );
      await tx.wait();
      alert("Minted successfully!");
    } else {
      alert("You are not a minter!");
    }
  }

  async function pause() {
    if (role === "admin") {
      const tx = await contractWithSigner.pause();
      await tx.wait();
      alert("Token paused!");
    } else alert("Only admin can pause!");
  }

  async function unpause() {
    if (role === "admin") {
      const tx = await contractWithSigner.unpause();
      await tx.wait();
      alert("Token unpaused!");
    } else alert("Only admin can unpause!");
  }

  return (
    <div>
      <h2>Connected as: {account}</h2>
      <h3>Balance: {balance} MONAD</h3>
      <h4>Role: {role.toUpperCase()}</h4>

      {(role === "admin" || role === "minter") && (
        <div>
          <input
            placeholder="Amount to mint"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={mint}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Mint
          </button>
        </div>
      )}

      {role === "admin" && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={pause} style={{ marginRight: "10px" }}>
            Pause
          </button>
          <button onClick={unpause}>Unpause</button>
        </div>
      )}
    </div>
  );
};

export default TokenDashboard;
