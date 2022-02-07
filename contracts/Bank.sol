// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BankMetadata.sol";

contract Bank is BankMetadata {

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _amount);

    mapping(address => uint256) _balances;

    uint256 private _totalSupply;

    constructor() BankMetadata("MyCryptoBank") {

    }

    function sendMoney(address _to, uint256 _amount) external {
        require(_balances[msg.sender] >= _amount, "ERROR: You do not have this much ether!");

        _balances[msg.sender] -= _amount;
        _balances[_to] += _amount; 

        emit Transfer(msg.sender, _to, _amount);
    }

    receive() payable external {
        _balances[msg.sender] += msg.value;
        _totalSupply += msg.value;
    }

    function getBalance(address _from) external view returns(uint256) {
        require(_from != address(0), "ERROR: Invalid address");
        return _balances[_from];
    }

    function totalSupply() external view returns(uint256) {
        return _totalSupply;
    }

}
