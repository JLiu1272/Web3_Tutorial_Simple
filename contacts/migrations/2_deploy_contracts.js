// eslint-disable-next-line no-undef
const Contacts = artifacts.require("./Contacts.sol"); 

module.exports = function(deployer) {
    deployer.deploy(Contacts);
}