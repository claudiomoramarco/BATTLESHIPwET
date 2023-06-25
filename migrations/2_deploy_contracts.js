const Battleship = artifacts.require("Battleships");

module.exports = async function (deployer) {
    await deployer.deploy(Battleship);
};