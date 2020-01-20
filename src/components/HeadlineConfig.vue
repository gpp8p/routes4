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
            <span v-if="backgroundInputStatus==ENTER_BACKGROUND_IMAGE">
                <SingleFile></SingleFile>
            </span>
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_TEXT_STYLE" class="layoutMenuItem">
            <span>
                <font-picker :api-key="AIzaSyDr6bD_1Pw2oxD1kS0xPJeRC2Kwu6F7KhI" :options="options" :active-font="fontFamily" @change="myFunc"></font-picker>
                <span>
                    Size:
                    <select ref="fontSizeSelect" @change="fontSizeSelectionMade($event)">
                        <option value="select">Select Font Size</option>
                        <option  value="10">10 Pt.</option>
                        <option  value="12">12 Pt.</option>
                        <option  value="18">18 Pt.</option>
                        <option  value="24">24 Pt.</option>
                        <option  value="36">36 Pt.</option>
                        <option  value="48">48 Pt.</option>
                        <option  value="72">72 Pt.</option>
                    </select>
                </span>
                <MyButton v-if="this.fontInputStatus==this.FONT_CONFIG_UNKNOWN" @myButtonClicked="showColorPicker" buttonLabel="Pick Font Color"></MyButton>
                <MyButton v-if="this.fontInputStatus==this.FONT_CONFIG_COLOR" @myButtonClicked="hideColorPicker" buttonLabel="Finished Picking A Color"></MyButton>
                <span v-if="this.fontInputStatus==this.FONT_CONFIG_COLOR" class="prompt">Font Color:
                    <colorPicker
                                :color="color"
                                :sucker-hide="false"
                                :sucker-canvas="suckerCanvas"
                                :sucker-area="suckerArea"
                                @changeColor="changeColor"
                                @openSucker="openSucker"
                        />
                </span>
                <span class="prompt">
                    Alignment:
                    <input type="radio" name="alignment_type" value="left" @click="setAlignment" />Left
                    <input type="radio" name="alignment_type" value="center" @click="setAlignment" />Center
                    <input type="radio" name="alignment_type" value="right" @click="setAlignment" />Right
                </span>
            </span><MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_TEXT" class="layoutMenuItem">
            Please enter text for this card:<input @keyup.enter="this.textContentEntered" ref="textContent" v-model="textContent.value"  type="text" size="80" v-focus="this.statusNow==INPUT_TEXT"/>
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==SAVE_CONFIG" class="layoutMenuItem">
            <MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
    </span>
    
</template>

<script>
  /* eslint-disable no-console */

  import MyButton from "../components/MyButton.vue";
  import SingleFile from "../components/SingleFile.vue";
  import Vue from 'vue';
  import FontPicker from 'font-picker-vue';
  import colorPicker from '@caohenghu/vue-colorpicker'

  Vue.use(FontPicker);

  export default {
    name: "HeadlineConfig",
    components: { MyButton, SingleFile, colorPicker },
    directives:{
      focus:{
        inserted: function (el) {
          //         debugger;
          el.focus()
        },
        update: function (el) {
          Vue.nextTick(function() {
            el.focus();
          })
        }
      }
    },
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
        backgroundInputStatus: this.ENTER_BACKGROUND_COLOR,
        FONT_CONFIG_UNKNOWN:0,
        FONT_CONFIG_COLOR:1,
        fontInputStatus: this.FONT_CONFIG_UNKNOWN,
        color: '#59c7f9',
        suckerCanvas: null,
        suckerArea: [],
        isSucking: false,
        fontSize:0,
        fontType:'',
        backgroundColor:'',
        textAlignment: '',
        textContent: ''


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
      },
      showColorPicker(){
        this.fontInputStatus=this.FONT_CONFIG_COLOR;
      },
      hideColorPicker(){
        this.fontInputStatus=this.FONT_CONFIG_UNKNOWN;
      },
      changeColor(color) {
        const {rgba: {r, g, b, a}} = color;
        console.log(r+' '+g+' '+b+' '+a);
//        this.color = `rgba(${r, g, b, a})`
      },
      fontSizeSelectionMade(evt){
        this.fontSize = evt.target.value;
      },
      backgroundSelectionMade(evt){
        this.fontType = evt.target.value;
      },
      setAlignment(evt){
        this.textAlignment = evt.target.value;
      },
      textContentEntered(evt){
        console.log(evt);
        this.textContent = this.$refs.HeadlineConfig.textContent.value;
        this.bumpStatus();
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