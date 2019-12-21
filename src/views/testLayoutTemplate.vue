<template>
    <span class="layoutScreen">
    <section  class="navbar">
        <div v-if="this.viewStatus==this.VIEW_CREATE_LAYOUT">
            <focusTest></focusTest>
        </div>
        <div v-if="this.viewStatus==this.VIEW_TOP_MENU">
            <span class="layoutMenu"><span class="layoutMenuItem" @click="createLayout">New Layout</span><span class="layoutMenuItem">User Administration</span></span>
        </div>
    </section>
    <section class="content">
        <div>

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

        padding: 0 0%;
        display: table;
        margin: 0;
        height: 100vh;

    }
    .layoutScreen {

    }
    .content {
        margin-left: 2px;
        margin-top: 2px;
        background-color: #dbddd0;
        height:87vh;
        width:97vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        padding-top: 16px;
        padding-left: 5px;
    }
    .navbar {
        margin-left: 2px;
        background-color: #ffcd90;
        height:6vh;
        width:97vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
        padding-top: 16px;
        padding-left: 5px;
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