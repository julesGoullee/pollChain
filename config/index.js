export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0x729516396c56a9985110671926d1cb19247ea185',
  COST_PEER_VOTE: process.env.COST_PEER_VOTE || process.env.VUE_APP_COST_PEER_VOTE || '100000000000000000'
};
