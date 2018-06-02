import { getPollChain } from '@/contracts'
import config from '@/../config'
import Errors from '@/utils/errors';
import storePollChain from '@/store/storePollChain';
import Network from '@/network';

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

      polls.push(await storePollChain.data.pollsIndex(i) );

    }

    commit('polls', { polls });

  },
  addPoll: async ({ state, commit, dispatch }, { query }) => {
    Errors.assert(storePollChain.data, 'pollChain_undefined');
    await storePollChain.data.addPoll(query, 10, { from: state.address });
  }
};

export default actions;
