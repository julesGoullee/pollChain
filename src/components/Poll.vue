<template>
  <div>
    <div>

      <div class="bloc-title">
        <div id="small-title">TOP 3 : SIGN PETITION  THIS MONTH</div>
        <div id="big-title">Your opinion start<br>
          to matter here & now.
        </div>
      </div>

      <div class="card w-75">
        <div class="card-body">

          <h5 class="card-title">#1 Free us from the plastic bag</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">I sign</a>
        </div>
      </div>

      <div class="card w-75">
        <div class="card-body">
         
          <h5 class="card-title">#2 Save the Amazonia recif</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">I sign</a>
        </div>
      </div>

      <div class="card w-75">
        <div class="card-body">
         
          <h5 class="card-title">#3 Stop riding Thaï Elephant</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">I sign</a>
        </div>
      </div>






   <div class="bloc-title">
        <div id="small-title">SUCCESS STORIES : LAST MONTH</div>
        <div id="big-title">See what change we made<br>
          with optimism & determination
        </div>
    </div>


    <div class="card-group">
  <div class="card">
    
    <div class="card-body" id="designcard">
      <h5 class="card-title">Fight for Women</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-primary">I sign</a>
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title">Fight for Ban Hyung</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-primary">I sign</a>
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <h5 class="card-title">Expression Liberty</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-primary">I sign</a>
    </div>
  </div>
</div>

           

    <div class="bloc-title">
        <div id="small-title">VOTING FOR THE NEXT PETITION</div>
        <div id="big-title">Upgrade the  3 next<br>
          petition for next month
        </div>
    </div>


          <div class="card w-75">
        <div class="card-body">

          <h5 class="card-title">#1 Free us from the plastic bag</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">up</a>
        </div>
      </div>

      <div class="card w-75">
        <div class="card-body">
         
          <h5 class="card-title">#2 Save the Amazonia recif</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">up</a>
        </div>
      </div>

      <div class="card w-75">
        <div class="card-body">
         
          <h5 class="card-title">#3 Stop riding Thaï Elephant</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          <a href="#" class="btn btn-primary">up</a>
        </div>
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
