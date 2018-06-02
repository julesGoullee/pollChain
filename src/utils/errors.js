import config from '@/../config';

const createCustom = (code, meta, expose) => {

  const errorCustom = getError(code);

  if(!errorCustom){

    const error = new Error('unknown_error');

    error.status = ERRORS.unknown_error.status;
    error.meta = Object.assign({ code }, meta);


    return error;

  }

  const error = new Error(code);
  error.isCustom = true;
  error.expose = expose;

  if(meta){

    error.meta = meta;

  }

  return error;

};

const throwError = (code, meta, expose) => {

  throw createCustom(code, meta, expose);

};

function getError(errorCode) {

  const code = ERRORS[errorCode];

  if(!errorCode || !code) {

    return null;

  }

  return code;

}

function assert(condition, message, meta, expose) {

  if(!condition){

    throwError(message, meta, expose);

  }

}

const displayError = (error) => {
  debugger;

  const errorCustom = getError(error.message);

  if(config.ENV !== 'production' || !errorCustom){

    console.error(Object.assign({}, error), error);

  }

  if(!errorCustom){

    return ERRORS.unknown_error.description;

  } else {

    let content = errorCustom.description;

    if(error.meta && error.expose){

      if(Array.isArray(error.meta) ){

        content += ':';

        error.meta.forEach( (item) => {

          content += ` ${item}`;

        });

      } else {

        content += Object.keys(error.meta).reduce( (acc, prop) => {

          acc += ` ${prop}: ${JSON.stringify(error.meta[prop])}`;

          return acc;

        }, '');

      }


    }

    return content;

  }

};

const ERRORS = {
  unknown_error: {
    description: 'Unknown error',
  },
  response_error: {
    description: 'Request error',
  },
  unknown_blockchain_error: {
    description: 'Unknown blockchain error',
  },
  node_connection_error: {
    description: 'Node connection error',
  },
  not_enough_balance: {
    description: 'Not enough balance',
  },
  insufficient_fund: {
    description: 'Insufficient fund',
  },
  invalid_amount: {
    description: 'Invalid amount',
  },
  invalid_address: {
    description: 'Invalid address'
  }
};

export default {
  createCustom,
  throwError,
  displayError,
  assert,
  ERRORS,
};
