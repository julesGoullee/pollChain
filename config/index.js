export default {
  ENV: process.env.ENV || process.env.VUE_APP_ENV || 'development',
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || process.env.VUE_APP_CONTRACT_ADDRESS
  || '0xf11d466eb6d4a9d9fa65163ba88c729a30cec9fe'
};
