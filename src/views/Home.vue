<template>
  <div id="home">
    <Header></Header>
    <NodeConnect v-if="!nodeConnected" />
    <Poll v-if="nodeConnected" />
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import Poll from '@/components/Poll.vue';
  import NodeConnect from '@/components/NodeConnect.vue';
  import Header from '@/components/Header.vue';

  export default {
    name: 'home',
    computed: {
      ...mapGetters(['nodeConnected', 'pollChain'])
    },
    components: {
      Header,
      Poll,
      NodeConnect,
    }
  };
</script>
