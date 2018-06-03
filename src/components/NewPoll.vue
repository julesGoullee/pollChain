<template>
  <div>
    <div>
      <div class="bloc-title">
        <div class="small-title">MY PETITION</div>
        <div class="big-title">My petition to start <br>
          to change the world
        </div>
      </div>

      <div class="form-group">
        <div class="question-title"><label for="exampleFormControlInput1">Insert the title of your petition</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Save the panda in Chongqing">
      </div>

      <div>
        <div class="question-title"><label for="exampleFormControlInput1">Is this petition are sponsored ? </label>
        </div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>

        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary active">
            <input type="radio" name="options" id="option1" autocomplete="off" checked> Yes
          </label>
          <label class="btn btn-secondary">
            <input type="radio" name="options" id="option2" autocomplete="off"> No
          </label>
        </div>

        <form id="add-poll-form" @submit="onAddPool">
          <input
            id="add-poll-title"
            type="text"
            v-model.trim="title"
            placeholder="Title..."
          >
          <input
            id="add-poll-query"
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

      <div class="form-group">
        <div class="question-title"><label for="exampleFormControlInput2">Present the problem you want to solve</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <input type="email" class="form-control" id="exampleFormControlInput2" placeholder="Save the panda in Chongqing">
      </div>

      <div class="form-group">
        <div class="question-title"><label >Add a photo</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>

        <div class="input-group">
            <span class="input-group-btn">
                <span class="btn btn-default btn-file">
                    <input type="file" id="imgInp">
                </span>
            </span>
        </div>
        <img id='img-upload'/>
      </div>
    </div>

    <button type="button" class="btn btn-success">Success</button>

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
  import { mapActions } from 'vuex';
  import config from '@/../config'
  import Errors from '@/utils/errors';
  import Decimal from 'decimal.js';
  import '@/css/newPoll.css';

  export default {
    name: 'NewPoll',
    data: function () {
      return {
        title: '',
        query: '',
        target: 100,
        isSponsoring: false,
        errors: [],
        isSending: false
      };
    },
    computed: {},
    methods: {
      ...mapActions(['addPoll']),

      onAddPool(e){
        this.errors = [];
        this.isSending = true;

        this.addPoll({
          title: this.title,
          query: this.query,
          target: this.target,
          isSponsoring: this.isSponsoring
        })
          .then(() => {
            this.query = '';
            this.title = '';
            this.isSending = false;
          })
          .catch(error => {
            this.errors.push(Errors.displayError(error));
            this.isSending = false;
          });

        e.preventDefault();
      },
      calcCost(){
        return new Decimal(this.target).mul(config.COST_PEER_VOTE).div(10e17).toString();
      }
    },

  };
</script>

<style scoped lang="scss">
</style>
