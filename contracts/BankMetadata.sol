// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BankMetadata {

    string private _name;

    constructor(string memory named) {
        _name = named;
    }

    function name() external view returns(string memory) {
        return _name;
    }

}