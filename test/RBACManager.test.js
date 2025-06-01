const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RBACManager", function () {
  let RBACManager, rbac, owner, editor, viewer;

  beforeEach(async () => {
    [owner, editor, viewer] = await ethers.getSigners();
    RBACManager = await ethers.getContractFactory("RBACManager");
    rbac = await RBACManager.deploy();
    await rbac.deployed();
  });

  it("should allow admin to grant roles", async () => {
    await rbac.grantEditorRole(editor.address);
    expect(await rbac.hasRole(await rbac.EDITOR_ROLE(), editor.address)).to.be.true;
  });

  it("should not allow non-editor to add event", async () => {
    await expect(rbac.connect(viewer).addEvent("Hackathon")).to.be.reverted;
  });

  it("should allow editor to add event", async () => {
    await rbac.grantEditorRole(editor.address);
    await rbac.connect(editor).addEvent("Hackathon");
  });
});
