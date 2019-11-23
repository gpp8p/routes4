<template>

    <div>
        <span>Component Four<h2><router-link to='/'>Home</router-link></h2></span>
        <h2>The id is:{{this.$route.params.id}}</h2>
        <div>Title:{{thisMeeting.title}}</div>
        <div v-for="(attendee, index) in thisMeeting.attendees" :key="index">
            {{attendee}}
        </div>
        <div class="cardBox">
            <simpleCard card-size="width: 20vw; height: 40vh;" card-height="width: 40vh;" card-width="height: 40vh;">Here is slot-delivered content</simpleCard>
        </div>
        <div v-if="showBlank">
            <blank-component></blank-component>
        </div>
    </div>

</template>

<script>
  import store from "@/store";
  import simpleCard from '../components/simpleCard.vue';
  import BlankComponent from "../components/blankComponent";
  export default {
    name: "Component4",
    data() {
      return {
        meetings: store.meetings,
        linkId : this.$route.params.id,
        showBlank: false
      }

    },
    components: {
      BlankComponent,
      simpleCard
    },
    computed: {
      thisMeeting(){
        return this.meetings[this.$route.params.id]
      }

    }
  };
</script>

<style scoped>
    .cardBox{
        margin-left: auto;
        margin-right: auto;
        width: 20%;
        height: 40vh;
    }
</style>