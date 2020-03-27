<template>
    <span class="layoutScreen">
        <display-layout :layoutId="selectedLayoutId" ></display-layout>
    </span>
</template>

<script>
  import displayLayout from "../components/displayLayout.vue";
  export default {
    name: "displayTemplate",
    components: {displayLayout},
    created(){
      this.selectedLayoutId = this.$route.params.layoutId;
    },
    data(){
      return {
        selectedLayoutId:'',
      }
    },
  };
</script>

<style scoped>
    section {

        padding: 0 0%;
        display: table;
        margin: 0;
        height: 98vh;

    }
    .layoutScreen {
        position: relative;
    }
    .content {
        margin-left: 2px;
        margin-top: 2px;
        background-color: #dbddd0;
        height:85vh;
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
        height:5vh;
        width:97vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
        padding-top: 8px;
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
    #infoi {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    #infoi {
        z-index: 10;
    }

</style>