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
    <div>
      <div>Add poll:</div>
      <form id="add-poll-form" @submit="onAddPool">
        <input
          id="add-poll"
          type="text"
          v-model.trim="query"
          placeholder="Query..."
        >
        <input
          id="add-poll-target"
          type="number"
          step="1"
          v-model.trim="target"
          placeholder="Target contributor"
        >
        <label for="isSponsoring">is sponsoring</label>
        <input type="checkbox" id="isSponsoring" v-model="isSponsoring">
        <div v-if="isSponsoring">Cost: {{ calcCost() }} ether</div>
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
  import config from '@/../config'
  import Errors from '@/utils/errors';
  import Decimal from 'decimal.js';
  import '@/css/test.css';

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
      ...mapActions(['addPoll', 'vote']),
      onAddPool(e){
        this.errors = [];
        this.isSending = true;

        this.addPoll({
          query: this.query,
          target: this.target,
          isSponsoring: this.isSponsoring
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
      },
      calcCost(){
        return new Decimal(this.target).mul(config.COST_PEER_VOTE).div(10e17).toString();
      }
    },

  };
</script>

<style scoped lang="scss">
</style>
