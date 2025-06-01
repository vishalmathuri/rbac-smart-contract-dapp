const { ethers } = require("hardhat");

async function main() {
  const RBAC = await ethers.getContractFactory("RBACManager");
  const rbac = await RBAC.deploy();
  await rbac.waitForDeployment(); // <-- important

  console.log("Contract deployed to:", await rbac.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
