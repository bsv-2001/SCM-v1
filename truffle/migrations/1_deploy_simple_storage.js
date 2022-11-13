const SimpleStorage = artifacts.require("SimpleStorage");
const ItemManager = artifacts.require("ItemManager");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(ItemManager)
};
