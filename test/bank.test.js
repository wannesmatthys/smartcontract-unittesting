const {assert} = require('chai');

const Bank = artifacts.require('./Bank');

require('chai').use(require('chai-as-promised')).should();

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
            const name = await contract.name()
            assert.equal(name, 'MyCryptoBank')
        });
    });
});