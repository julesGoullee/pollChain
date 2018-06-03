<template>
  <div id="add">
    <Header />
    <NodeConnect v-if="!nodeConnected" />
    <NewPoll v-if="nodeConnected" />
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import NewPoll from '@/components/NewPoll.vue';
  import NodeConnect from '@/components/NodeConnect.vue';
  import Header from '@/components/Header.vue';

  export default {
    name: 'Add',
    computed: {
      ...mapGetters(['nodeConnected'])
    },
    components: {
      Header,
      NewPoll,
      NodeConnect
    }
  };
</script>
