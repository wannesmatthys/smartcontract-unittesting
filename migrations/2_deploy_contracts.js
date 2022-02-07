const Bank = artifacts.require("Bank");

module.exports = (deployer) => {
    deployer.deploy(Bank);
}