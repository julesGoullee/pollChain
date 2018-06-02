import storePollChain from '@/store/storePollChain';

const getters = {
  nodeConnected: state => state.nodeConnected,
  pollChain: () => storePollChain.data,
  polls: state => state.polls
};

export default getters;
