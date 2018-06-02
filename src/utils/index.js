const Utils = {

  wait(ms){

    return new Promise(res => setTimeout(res, ms) );

  },

};

export default Utils;
