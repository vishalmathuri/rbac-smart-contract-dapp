# Leafny RBAC DApp

A decentralized application implementing **Role-Based Access Control (RBAC)** using a Solidity smart contract and a React + Ethers.js frontend. Built to support real-world use cases for CMS, E-commerce dashboards, and booking/learning platforms at Leafny.

---

## 🚀 Features

- Roles: `Admin`, `Editor`, and `Viewer` using OpenZeppelin's `AccessControl`
- Admin can assign roles to users
- Role-based access to features like `addEvent()`
- MetaMask integration and wallet-based login
- Frontend conditionally renders UI based on connected user’s role

---

## 📁 Project Structure

```

rbac-smart-contract-dapp/
│
├── contracts/
│   └── RBACManager.sol           # Solidity contract using AccessControl
│
├── scripts/
│   └── deploy.js                 # Script to deploy contract on Sepolia or Mumbai
│
├── test/
│   └── RBACManager.test.js       # Unit tests using Chai/Mocha
│
├── frontend/
│   ├── src/
│   │   ├── App.js                # React app with MetaMask integration
│   │   ├── index.js
│   │   └── RBAC\_ABI.json         # Copied ABI from build
│   └── package.json
│
├── .env                          # Environment variables (PRIVATE\_KEY, RPC\_URL)
├── hardhat.conf
````

---

## 🔧 Prerequisites

- Node.js >= 16
- MetaMask Extension
- A Sepolia or Mumbai testnet wallet with ETH/MATIC
- Alchemy or Infura RPC endpoint

---

## 📦 Installation

### 1. Clone the repo

git clone https://github.com/your-username/rbac-smart-contract-dapp.git
cd rbac-smart-contract-dapp

### 2. Install backend dependencies

npm install --save-dev hardhat
npm install @nomicfoundation/hardhat-toolbox dotenv
npm install @openzeppelin/contracts

### 3. Install frontend dependencies

cd frontend
npm install
npm install ethers

### 4. Replace the code of frontend/src/App.js from app.js. 

---

## 🌐 Environment Setup

Edit `.env` file in the root directory:

env
PRIVATE_KEY=your_private_key
RPC_URL=https://rpc-sepolia.g.alchemy.com/v2/your-api-key


---

## 🧾 Compile & Deploy

### 1. Compile the contract

npx hardhat compile

### 2. Deploy to testnet (Sepolia/Mumbai)

npx hardhat run scripts/deploy.js --network sepolia (result 0xA9e0dF2dcEF5f532167f0C9Bd14d4D437e502c5f)

Copy the deployed contract address and update it in your `App.js` in frontend.

---

## 🖥️ Frontend Setup

### 1. Go to frontend

cd frontend

### 2. Update contract address & ABI in `src/App.js`

Replace:

```js
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const ABI = require("./RBAC_ABI.json");
```

You can get the ABI from:

```
artifacts/contracts/RBACManager.sol/RBACManager.json
```

Copy that JSON and paste into `frontend/src/RBAC_ABI.json`.

### 3. Start the frontend

```bash
npm start
```

---

## 🧪 Running Tests

```bash
npx hardhat test
```

---

## 👤 Roles Description

* **Admin**

  * Can assign roles to others
  * Full access
* **Editor**

  * Can add or edit events/content
* **Viewer**

  * Read-only access

---

## 📚 Integration Notes

* The RBACManager.sol contract is reusable across different Leafny DApps
* Ensure role assignments happen from an Admin wallet using the Hardhat console or via contract methods

---

## ✅ Success Criteria

* Smart contract compiles and deploys without errors
* Role-based functions behave as expected
* UI dynamically adjusts based on role
* Clean commit history and comments

---

## 📜 License

MIT License – Use freely with attribution

```
