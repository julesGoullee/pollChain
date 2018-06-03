import storePollChain from '@/store/storePollChain';

const getters = {
  nodeConnected: state => state.nodeConnected,
  pollChain: () => storePollChain.data,
  pollsFree: state => state.pollsFree,
  pollsSponsoring: state => state.pollsSponsoring
};

export default getters;
