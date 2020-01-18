<template>
    <span>
        <span v-if="this.statusNow==INPUT_BACKGROUND" class="layoutMenuItem">
            <input type="radio" name="background_type" value="color" @click="setBackgroundColor" />Background Color
            <input type="radio" name="background_type" value="image" @click="setBackgroundImage" />Background Image
            <span v-if="backgroundInputStatus==ENTER_BACKGROUND_COLOR">
            <select ref="backgroundColorSelect" @change="backgroundSelectionMade($event)">
                <option value="select">Select Color</option>
                <option  value="#000000">Black</option>
                <option  value="#000080">Navy Blue</option>
                <option  value="#0000CD">MediumBlue</option>
                <option  value="#0000FF">Blue</option>
                <option  value="#006400">DarkGreen</option>
                <option  value="#008080">Teal</option>
                <option  value="#008B8B">DarkCyan</option>
                <option  value="#00BFFF">DeepSkyBlue</option>
                <option  value="#00CED1">DarkTurquoise</option>
                <option  value="#00FA9A">MediumSpringGreen</option>
                <option  value="#00FF00">Lime</option>
            </select>

            </span>
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
        ENTER_BACKGROUND_COLOR: 0,
        ENTER_BACKGROUND_IMAGE: 1,
        ENTER_BACKGROUND_UNKNOWN:3,
        statusNow: this.INPUT_BACKGROUND,
        backgroundInputStatus: this.ENTER_BACKGROUND_COLOR
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