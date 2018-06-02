const mutations = {
  nodeConnect: (state, { address }) => {
    state.nodeConnected = true;
    state.address = address;
  },
  polls: (state, { polls }) => {
    state.polls = polls;
  }
};

export default mutations;
