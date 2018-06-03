export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0x621fb050b2f699d5d67b88e2ce716e6b1416bc26',
  COST_PEER_VOTE: process.env.COST_PEER_VOTE || process.env.VUE_APP_COST_PEER_VOTE || '100000000000000000'
};
