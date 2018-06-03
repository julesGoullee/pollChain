const mutations = {
  nodeConnect: (state, { address }) => {
    state.nodeConnected = true;
    state.address = address;
  },
  polls: (state, { polls }) => {
    state.pollsFree = polls.filter(poll => poll.kind === 'free');
    state.pollsSponsoring = polls.filter(poll => poll.kind === 'sponsoring');
  }
};

export default mutations;
