<template>
    <span>
        <span v-if="this.statusNow==INPUT_BACKGROUND" class="layoutMenuItem">
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_TEXT_STYLE" class="layoutMenuItem">
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_TEXT" class="layoutMenuItem">
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==SAVE_CONFIG" class="layoutMenuItem">
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
    </span>
    
</template>
import MyButton from "../components/MyButton.vue";
import Vue from "vue";

<script>
  export default {
    name: "HeadlineConfig",
    data() {
      return {
        INPUT_BACKGROUND: 0,
        INPUT_TEXT_STYLE: 1,
        INPUT_TEXT: 2,
        SAVE_CONFIG: 3,
        statusNow: this.INPUT_BACKGROUND
      }
    },
    methods: {
      bumpStatus() {
        switch (this.statusNow) {
          case this.INPUT_BACKGROUND:
            break;
          case this.INPUT_TEXT_STYLE:
            break;
          case this.INPUT_TEXT:
            break;
          case this.SAVE_CONFIG:
            break;
        }
      },
      goBack(){
        this.statusNow--;
      },
      cancel(){
        this.statusNow = 0;
      }

    }
  };
</script>

<style scoped>
    .prompt {
        font-size: medium;
        color: blue;
        margin-bottom: 5px;
        text-align: left;
    }
    .errorMsg {
        text-align: right;
        margin-right: 10px;
        color: red;
    }
</style>