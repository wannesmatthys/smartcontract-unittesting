// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BankMetadata.sol";

contract Bank is BankMetadata {

    mapping(address => uint256) _balances;

    constructor() BankMetadata("MyCryptoBank") {

    }

    function sendMoney(address _to, uint256 _amount) external {
        require(_balances[msg.sender] >= _amount, "ERROR: You do not have this much ether!");

        _balances[msg.sender] -= _amount;
        _balances[_to] += _amount; 
    }

    receive() payable external {
        _balances[msg.sender] += msg.value;
    }

    function getBalance(address _from) external view returns(uint256) {
        require(_from != address(0), "ERROR: Invalid address");
        return _balances[_from];
    }

}
