const {assert} = require('chai');
const truffleAssertions = require('truffle-assertions');

const Bank = artifacts.require('./Bank');

contract('Bank', (accounts) => {
    let contract;

    before( async () => {
        contract = await Bank.deployed() 
    });

    describe('deployment', async() => {
        it('deploys successfuly', async() => {
            const address = contract.address;
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
            assert.notEqual(address, 0x0)
        });

        it('has a name', async() => {
            const name = await contract.name();
            assert.equal(name, 'MyCryptoBank');
        });
    });

    describe('transactions', async () => {
        it('deposits succesfully', async () => {
            const amount = 1000;

            await contract.send(amount); // the receive payable

            const totalSupply = await contract.totalSupply();
            const balance = await contract.getBalance(accounts[0]);

            assert.equal(totalSupply, amount);
            assert.equal(balance, amount);
        });

        it('sends money successfully', async () => {
            // still has money from prev test
            
            const result = await contract.sendMoney(accounts[1], 499);
            truffleAssertions.eventEmitted(result, 'Transfer');

            const balanceAccountOne = await contract.getBalance(accounts[0]);
            const balanceAccountTwo = await contract.getBalance(accounts[1]);

            assert.equal(balanceAccountOne, 501);
            assert.equal(balanceAccountTwo, 499);
        });

        it('sends money but hasn\'t enough', async () => {
            truffleAssertions.reverts(contract.sendMoney(accounts[1], 5000));
        });
    });
});