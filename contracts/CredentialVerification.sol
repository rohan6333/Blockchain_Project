// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerification {
    uint public value;

    event ValueSet(uint _value);

    constructor() {
        value = 123; // Simple initialization
    }

    function setValue(uint _value) public {
        value = _value;
        emit ValueSet(_value); // Emit an event when the value is changed
    }
}
