// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerification {
    
    struct Credential {
        address issuer;
        bytes32 credentialHash; 
        uint256 timestamp;
        bool isRevoked;
    }

    mapping(address => Credential[]) private credentials;

    event CredentialIssued(address indexed holder, bytes32 credentialHash, uint256 timestamp);
    event CredentialRevoked(address indexed holder, bytes32 credentialHash, uint256 timestamp);
    event CredentialUpdated(address indexed holder, bytes32 oldCredentialHash, bytes32 newCredentialHash, uint256 timestamp);

    modifier onlyIssuer(address _holder, uint256 _index) {
        require(msg.sender == credentials[_holder][_index].issuer, "Not authorized as issuer.");
        _;
    }

    /**
     * @dev Function to issue a credential to a holder
     * @param _holder The address of the credential holder
     * @param _credentialHash The hash of the credential data (e.g., generated from details)
     */
    function issueCredential(address _holder, string memory _credentialHash) public {
        bytes32 credentialHash = keccak256(abi.encodePacked(_credentialHash)); 

        Credential memory newCredential = Credential({
            issuer: msg.sender,
            credentialHash: credentialHash,
            timestamp: block.timestamp,
            isRevoked: false
        });
        
        credentials[_holder].push(newCredential);
        
        emit CredentialIssued(_holder, credentialHash, block.timestamp);
    }

    /**
     * @dev Function to retrieve credentials for a holder
     * @param _holder The address of the credential holder
     * @return Array of Credential structs associated with the holder
     */
    function getCredentials(address _holder) public view returns (Credential[] memory) {
        return credentials[_holder];
    }

    /**
     * @dev Verifies if a given credential hash exists and is not revoked for a holder
     * @param _holder The address of the credential holder
     * @param _credentialHash The credential hash to verify
     * @return true if the credential exists and is not revoked, otherwise false
     */
    function verifyCredential(address _holder, string memory _credentialHash) public view returns (bool) {
        bytes32 credentialHash = keccak256(abi.encodePacked(_credentialHash));
        Credential[] memory holderCredentials = credentials[_holder];
        
        for (uint256 i = 0; i < holderCredentials.length; i++) {
            if (holderCredentials[i].credentialHash == credentialHash && !holderCredentials[i].isRevoked) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * @dev Function to revoke a credential
     * @param _holder The address of the credential holder
     * @param _index The index of the credential to revoke
     */
    function revokeCredential(address _holder, uint256 _index) public onlyIssuer(_holder, _index) {
        credentials[_holder][_index].isRevoked = true;
        emit CredentialRevoked(_holder, credentials[_holder][_index].credentialHash, block.timestamp);
    }

    /**
     * @dev Function to update a credential
     * @param _holder The address of the credential holder
     * @param _index The index of the credential to update
     * @param _newCredentialHash The new hash of the credential data
     */
    function updateCredential(address _holder, uint256 _index, string memory _newCredentialHash) public onlyIssuer(_holder, _index) {
        bytes32 newCredentialHash = keccak256(abi.encodePacked(_newCredentialHash));
        bytes32 oldCredentialHash = credentials[_holder][_index].credentialHash;

        credentials[_holder][_index].credentialHash = newCredentialHash;
        credentials[_holder][_index].timestamp = block.timestamp;
        
        emit CredentialUpdated(_holder, oldCredentialHash, newCredentialHash, block.timestamp);
    }
}
