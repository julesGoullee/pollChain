<template>
  <div id="home">
    <NodeConnect v-if="!nodeConnected" />
    <Poll v-if="nodeConnected" />
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import Poll from '@/components/Poll.vue';
  import NodeConnect from '@/components/NodeConnect.vue';

  export default {
    name: 'home',
    computed: {
      ...mapGetters(['nodeConnected', 'pollChain'])
    },
    components: {
      Poll,
      NodeConnect,
    }
  };
</script>
