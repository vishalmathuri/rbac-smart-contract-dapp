import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "./RBAC_ABI.json";

const CONTRACT_ADDRESS = "0xA9e0dF2dcEF5f532167f0C9Bd14d4D437e502c5f";

const ROLE_IDS = {
  Admin: ethers.id("DEFAULT_ADMIN_ROLE"),
  Editor: ethers.id("EDITOR_ROLE"),
  Viewer: ethers.id("VIEWER_ROLE"),
};

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userRole, setUserRole] = useState("None");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setCurrentAccount(account);
        await getUserRole(account, provider);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const getUserRole = async (account, provider) => {
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      if (await contract.hasRole(ROLE_IDS.Admin, account)) {
        setUserRole("Admin");
      } else if (await contract.hasRole(ROLE_IDS.Editor, account)) {
        setUserRole("Editor");
      } else if (await contract.hasRole(ROLE_IDS.Viewer, account)) {
        setUserRole("Viewer");
      } else {
        setUserRole("None");
      }
    } catch (error) {
      console.error("Failed to get user role", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Leafny RBAC DApp</h1>
      <p><strong>Connected Wallet:</strong> {currentAccount}</p>
      <p><strong>Role:</strong> {userRole}</p>

      {userRole === "Admin" && (
        <div>
          <button>Add Editor</button>
          <button>Add Viewer</button>
        </div>
      )}

      {userRole === "Editor" && (
        <div>
          <button>Add Event</button>
          <button>Add Blog</button>
        </div>
      )}

      {userRole === "Viewer" && (
        <div>
          <button>View Events</button>
          <button>Read Blogs</button>
        </div>
      )}

      {userRole === "None" && (
        <p style={{ color: "red" }}>Access Denied or Role Not Assigned</p>
      )}
    </div>
  );
}

export default App;
