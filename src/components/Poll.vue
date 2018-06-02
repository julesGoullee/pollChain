<template>
  <div>
    <div>
      <div>Polls:</div>
      <div
        v-for="poll in polls"
        v-bind:key="poll"
      >{{ poll }}</div>
    </div>
    <div>
      <div>Add poll:</div>
      <form id="add-poll-form" @submit="onAddPool">
        <input
          id="add-poll"
          type="text"
          v-model.trim="query"
          placeholder="Query..."
        >
        <input id="add-poll-submit" type="submit" value="Validate">
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Errors from '@/utils/errors';

  export default {
    name: 'Poll',
    data: function () {
      return {
        query: '',
        errors: [],
        isSending: false
      };
    },
    computed: {
      ...mapGetters(['polls'])
    },
    methods: {
      ...mapActions(['addPoll']),
      onAddPool(e){
        this.errors = [];
        this.isSending = true;

        this.addPoll({
          query: this.query
        })
          .then(() => {
            this.query = '';
            this.isSending = false;
          })
          .catch(error => {
            this.errors.push(Errors.displayError(error));
            this.isSending = false;
          });

        e.preventDefault();
      }
    },
  };
</script>

<style scoped lang="scss">
</style>
