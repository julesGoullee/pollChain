import { getPollChain } from '@/contracts'
import config from '@/../config'
import Errors from '@/utils/errors';
import storePollChain from '@/store/storePollChain';
import Network from '@/network';
import Utils from '@/utils';
const moment = require('moment');
import Decimal from 'decimal.js';

const actions = {
  nodeConnect: async ({ state, commit, dispatch }) => {
    Errors.assert(!state.nodeConnected, 'node_already_connected');
    storePollChain.data = await getPollChain(config.CONTRACT_ADDRESS);
    const accounts = await Network.getAccounts();

    commit('nodeConnect', { address: accounts[0]});
    await dispatch('getPolls');

  },
  getPolls: async ({ state, commit }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');

    const pollsCount = (await storePollChain.data.pollsCount() ).toNumber();
    const polls = [];

    for(let i = 0; i < pollsCount; i++){

      const pollQuery = await storePollChain.data.pollsIndex(i);
      const rawPoll = await storePollChain.data.getPoll(pollQuery);
      polls.push({
        creator: rawPoll[0],
        query: rawPoll[1],
        createdAt: moment(rawPoll[2].toNumber() * 1000),
        kind: rawPoll[3],
        target: rawPoll[4].toNumber(),
        contributors: rawPoll[5].toNumber(),
      });

    }

    commit('polls', { polls });

  },
  addPoll: async ({ state, commit, dispatch }, { query, target, isSponsoring }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');

    let value = 0;

    if(isSponsoring){

      value = new Decimal(target).mul(config.COST_PEER_VOTE).toString();

    }

    const res = await storePollChain.data.addPoll(query, target, isSponsoring, {
      from: state.address,
      value
    });

    await Utils.getTransactionReceiptMined(res.tx);
    await dispatch('getPolls');

  },
  vote: async ({ state, commit, dispatch }, { query }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');
    const res = await storePollChain.data.vote(query, { from: state.address });
    await Utils.getTransactionReceiptMined(res.tx);
    await dispatch('getPolls');
  }
};

export default actions;
