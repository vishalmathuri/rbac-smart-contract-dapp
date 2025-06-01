// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RBACManager is AccessControl {
    // Define role identifiers
    bytes32 public constant EDITOR_ROLE = keccak256("EDITOR_ROLE");
    bytes32 public constant VIEWER_ROLE = keccak256("VIEWER_ROLE");

    struct Event {
        string name;
        string description;
        uint256 timestamp;
    }

    Event[] public events;

    event EventAdded(string name, address indexed addedBy);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Updated method
    }

    // Grant Editor role
    function grantEditorRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(EDITOR_ROLE, account);
    }

    // Grant Viewer role
    function grantViewerRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(VIEWER_ROLE, account);
    }

    // Editor-only function to add an event
    function addEvent(string memory name, string memory description) external onlyRole(EDITOR_ROLE) {
        events.push(Event(name, description, block.timestamp));
        emit EventAdded(name, msg.sender);
    }

    // View event count
    function getEventCount() external view returns (uint256) {
        return events.length;
    }

    // View a specific event
    function getEvent(uint256 index) external view returns (string memory, string memory, uint256) {
        require(index < events.length, "Invalid index");
        Event memory e = events[index];
        return (e.name, e.description, e.timestamp);
    }
}
