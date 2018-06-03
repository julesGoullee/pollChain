<template>
  <div>

    <div class="bloc-title">
      <div class="small-title">MY PETITION</div>
      <div class="big-title">My petition to start <br>
        to change the world
      </div>
    </div>

    <form id="add-poll-form" @submit="onAddPool">

      <div class="form-group">
        <div class="question-title"><label for="add-poll-title">Insert the title of your petition</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <input
          id="add-poll-title"
          type="text"
          v-model.trim="title"
          class="form-control"
          placeholder="Save the panda in Chongqing"
        />
      </div>

      <div class="form-group">
        <div class="question-title"><label for="add-poll-query">Present the problem you want to solve</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <input
          id="add-poll-query"
          type="text"
          v-model.trim="query"
          class="form-control"
          placeholder="Save the panda in Chongqing"
        >
      </div>

      <div class="form-group">
        <div class="question-title"><label for="add-poll-target">Expected number of signatures</label></div>
        <div class="question-description">
          <!--@description-->
        </div>
        <input
          id="add-poll-target"
          type="number"
          step="1"
          v-model.trim="target"
          placeholder="Target contributor"
        >
      </div>

      <div class="form-group">
        <div class="question-title"><label for="isSponsoring">Is this petition are sponsored ? </label>
        </div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <label class="switch">
          <input
            type="checkbox"
            id="isSponsoring" v-model="isSponsoring"
          >
          <span class="slider round"></span>
        </label>
        <div v-if="isSponsoring">Cost: {{ calcCost() }} ether</div>
      </div>

      <div class="form-group">
        <div class="question-title"><label >Add a photo</label></div>
        <div class="question-description">
          This is the first thing people will see to offer your petition. Attract their attention with a title that has come to focus on the change you are asking for support.
        </div>
        <div class="input-group mb-3 upload-file-container">
          <div class="input-group-prepend">
            <span class="input-group-text">Upload</span>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01">
            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
          </div>
        </div>
        <img id='img-upload'/>
      </div>

      <div>
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
      <button type="submit" id="add-petition" class="btn btn-success">Add petition</button>

    </form>

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
