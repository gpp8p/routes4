<template>
    <span>
    <section v-if="this.viewStatus==this.VIEW_CREATE_LAYOUT" class="navbarWrapper">
        <div class="navbar">
            <focusTest></focusTest>
        </div>
    </section>
    <section v-if="this.viewStatus==this.VIEW_TOP_MENU" class="navbarWrapper">
        <div class="navbar">
            <span class="layoutMenu"><span class="layoutMenuItem" @click="createLayout">New Layout</span><span class="layoutMenuItem">User Administration</span></span>
        </div>
    </section>
    <section class="intro">
        <div class="content">

        </div>
    </section>
    </span>
</template>

<script>
  import focusTest from "../views/focusTest.vue";
  export default {
    name: "testLayoutTemplate",
    components: {focusTest},
    mounted: function() {
      this.viewStatus = this.VIEW_TOP_MENU;
    },
    data () {
      return {
        VIEW_TOP_MENU: 0,
        VIEW_CREATE_LAYOUT:1,
        viewStatus: this.VIEW_TOP_MENU
      }
    },
    methods:{
      createLayout(){
        this.viewStatus=this.VIEW_CREATE_LAYOUT;
      }
    }
  };
</script>

<style scoped>
    section {
        width: 100vw;
        padding: 0 0%;
        display: table;
        margin: 0;
        max-width: none;
        height: 100vh;

    }
    .content {
        margin: 2px;
        background-color: #dbddd0;
        height:90vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;

    }
    .intro {
        height: 93vh;
        width: 100vw;
        background-color: #ffffff;


    }
    .navbarWrapper {
        height: 7vh;
        width: 100vw;
        background-color: #ffffff;

    }
    .navbar {
        margin: 2px;
        background-color: #ffcd90;
        height:6vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
    }
    .layoutMenu {
        display: flex;
        justify-content: space-evenly;
        height: 100%;
        align-items: baseline;
        margin-top: 6px;
    }
    .layoutMenuItem {
        background-color: #ffcd90;
        font-family: Arial;
        font-size: 17px;
        padding: 1px;
    }
    .layoutMenuItem:hover {
        background-color: #fff722;
        color:red;
    }
</style>