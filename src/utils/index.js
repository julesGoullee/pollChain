import Network from '@/network';

const Utils = {
  wait(ms){
    return new Promise(res => setTimeout(res, ms) );
  },
  getTransactionReceiptMined: async (txHash) => {
    const eth = await Network.eth();
    let receipt = null;

    while(receipt == null){

      receipt = await eth.getTransactionReceipt(txHash);
      await Utils.wait(8000); //TODO

    }

    return receipt;
  },

};

export default Utils;
