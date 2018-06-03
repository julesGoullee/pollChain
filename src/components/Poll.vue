<template>
  <div>
    <div>
      <div>Polls:</div>
      <div
        v-for="poll in pollsFree"
        v-bind:key="JSON.stringify(poll)"
      >
        <div>{{ poll }}</div>
        <button class="btn btn-primary kikou" type="button" @click="onVote(poll.query)">Vote!</button>
      </div>
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
  import '@/css/poll.css';

  export default {
    name: 'Poll',
    data: function () {
      return {
        query: '',
        target: 100,
        isSponsoring: false,
        errors: [],
        isSending: false
      };
    },
    computed: {
      ...mapGetters(['pollsFree'])
    },
    methods: {
      ...mapActions([ 'vote']),
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
      },
    }
  };
</script>

<style scoped lang="scss">
</style>
