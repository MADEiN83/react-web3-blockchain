const Test = artifacts.require("Test");
const Player = artifacts.require("Player");

module.exports = function (deployer) {
  deployer.deploy(Test);
  deployer.deploy(Player);
};
