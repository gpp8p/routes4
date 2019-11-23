<template>
    <div>
        <span
                v-for="(meeting, index) in meetings"
                :key="index"
                class="links">



            <router-link :to="{name: 'meetings', params: {id: index, attendeeNumber: meeting.attendees.length}}">{{meeting.title}}</router-link>

        </span>
        <router-link :to="{name:'softGrid', params:{}}">SoftGrid</router-link>
        <router-link :to="{name:'editGrid', params:{}}">EditGrid</router-link>
    </div>

</template>

<script>
  import store from "@/store";
  export default {
    name: "TheNavigation",
    methods: {
      log(message){
        window.console.log(message);
      }
    },
    data() {
      return {
          meetings: store.meetings
      }

    }
  };
</script>

<style scoped>
    #nav {
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: white;
        border-bottom: 1px solid grey;
        z-index: 1;
    }

    #nav a {
        color: #2c3e50;
        text-decoration: none;
        font-weight: bold;
    }

    #nav a.vue-school-active-class {
        color: #ab26ab;
    }
    .nav-links {
        display: flex;
    }
    .links {
        padding-right: 20px;
        list-style: none;
    }
    .links:hover {
        text-decoration: underline;
    }
    .logo {
        font-size: 20px;
        color: purple;
        font-weight: bold;
    }
</style>
