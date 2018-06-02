const PollChain = artifacts.require("PollChain.sol");

async function deployContract(deployer) {

  await deployer.deploy(PollChain);

}

module.exports = deployContract;

