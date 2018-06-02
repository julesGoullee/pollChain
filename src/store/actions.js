import { getPollChain } from '@/contracts'
import config from '@/../config'
import Errors from '@/utils/errors';
import storePollChain from '@/store/storePollChain';
import Network from '@/network';
import Utils from '@/utils';

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

      const poll = await storePollChain.data.pollsIndex(i);
      polls.push(poll);

    }

    commit('polls', { polls });

  },
  addPoll: async ({ state, commit, dispatch }, { query }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');
    const res = await storePollChain.data.addPoll(query, 10, { from: state.address });
    await Utils.getTransactionReceiptMined(res.tx);
    await dispatch('getPolls');

  }
};

export default actions;
