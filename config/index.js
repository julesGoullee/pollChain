export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0x86720be9bd6418cecbb57ebcf5b08b26060da24d',
  COST_PEER_VOTE: process.env.COST_PEER_VOTE || process.env.VUE_APP_COST_PEER_VOTE || '100000000000000000'
};
