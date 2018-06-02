<template>
  <div>
    <div>
      <div>Polls:</div>
      <div
        v-for="poll in polls"
        v-bind:key="JSON.stringify(poll)"
      >
        <div>{{ poll }}</div>
        <button type="button" @click="onVote(poll.query)">Vote!</button>
      </div>
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
    <div v-if="errors.length === 0 && isSending" id="send-waiting">
      Transaction is sending, Waiting....
    </div>
    <div v-if="errors.length > 0" id="errors">
      <div>Error{{ errors.length > 1 ? "s" : "" }}: </div>
      <div
        v-for="error in errors"
        v-bind:key="error"
      >{{ error }}</div>
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
      ...mapActions(['addPoll', 'vote']),
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
      },
      onVote(query){
        this.errors = [];
        this.isSending = true;

        this.vote({ query })
          .then(() => {
            this.isSending = false;
          })
          .catch(error => {
            this.errors.push(Errors.displayError(error));
            this.isSending = false;
          });
      }
    },

  };
</script>

<style scoped lang="scss">
</style>
