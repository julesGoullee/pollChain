export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0x50457a7acf4328bbca050082564c61288d40aa86',
  COST_PEER_VOTE: process.env.COST_PEER_VOTE || process.env.VUE_APP_COST_PEER_VOTE || '100000000000000000'
};
