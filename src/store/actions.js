import { getPollChain } from '@/contracts'
import config from '@/../config'
import Errors from '@/utils/errors';
import storePollChain from '@/store/storePollChain';

const actions = {
  nodeConnect: async ({ state, commit }) => {
    Errors.assert(!state.nodeConnected, 'node_already_connected');
    const pollChain = await getPollChain(config.CONTRACT_ADDRESS);
    storePollChain.data = pollChain;
    commit('nodeConnect');
  },
  getPolls: async ({ state, commit }) => {
    Errors.assert(!storePollChain.data, 'pollChain_undefined');

    const polls = await storePollChain.data.getPolls();

  }
};

export default actions;
