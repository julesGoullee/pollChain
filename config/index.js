export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0x56abbb1becfbd16b27e98b3892b6f28f2e452bb2',
  COST_PEER_VOTE: process.env.COST_PEER_VOTE || process.env.VUE_APP_COST_PEER_VOTE || '100000000000000000'
};
