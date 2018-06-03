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

      const pollTitle = await storePollChain.data.pollsIndex(i);
      const rawPoll = await storePollChain.data.getPoll(pollTitle);
      polls.push({
        creator: rawPoll[0],
        title: rawPoll[1],
        query: rawPoll[2],
        createdAt: moment(rawPoll[3].toNumber() * 1000),
        kind: rawPoll[4],
        target: rawPoll[5].toNumber(),
        contributors: rawPoll[6].toNumber(),
      });

    }

    commit('polls', { polls });

  },
  addPoll: async ({ state, commit, dispatch }, { title, query, target, isSponsoring }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');

    let value = 0;

    if(isSponsoring){

      value = new Decimal(target).mul(config.COST_PEER_VOTE).toString();

    }

    const res = await storePollChain.data.addPoll(query, title, target, isSponsoring, {
      from: state.address,
      value
    });

    await Utils.getTransactionReceiptMined(res.tx);
    await dispatch('getPolls');

  },
  vote: async ({ state, commit, dispatch }, { title, titleSponsored = '', voteRejected = false }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');

    const res = await storePollChain.data.vote(title, titleSponsored, voteRejected, { from: state.address });
    await Utils.getTransactionReceiptMined(res.tx);

    await dispatch('getPolls');
  }
};

export default actions;
