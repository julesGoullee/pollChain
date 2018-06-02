import contract from 'truffle-contract'
import Network from "./network"

export async function getPollChain(address) {
  const Pollchain = contract(require('../build/contracts/PollChain.json'))
  const provider = await Network.provider()
  Pollchain.setProvider(provider)
  return Pollchain.at(address)
}
