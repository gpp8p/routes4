<template>
    <span class="inpArea">
            <span v-if="this.statusNow==this.INPUT_MENU_LABEL" >
               What is the label you wish for this layout ? <input @keyup.enter="bumpStatus" v-model="menuLabelInput.value" type="text" ref="i1" size="32" placeholder="Label" v-focus="this.statusNow==this.INPUT_MENU_LABEL" /><MyButton @myButtonClicked="this.bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
            <span v-if="this.statusNow==this.INPUT_DESCRIPTION" >
                Please provide a short description of this layout: <input @keyup.enter="bumpStatus"  type="text" ref="i2" size="60" placeholder="Description" v-model="menuDescriptionInput.value" v-focus="this.statusNow==this.INPUT_DESCRIPTION"/><MyButton @myButtonClicked="this.bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.goBack" buttonLabel="Previous"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
            <span v-if="this.statusNow==this.INPUT_ROWS" >
                How many rows will the layout have ? <input  @keyup.enter="bumpStatus" type="text" ref="i3" size="5" placeholder="Rows" v-model="menuRowsInput.value" v-focus="this.statusNow==this.INPUT_ROWS"/><MyButton @myButtonClicked="this.bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.goBack" buttonLabel="Previous"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
            <span v-if="this.statusNow==this.INPUT_COLUMNS">
                How many columns will the layout have ? <input @keyup.enter="bumpStatus"  type="text" ref="i4" size="5" placeholder="Cols" v-model="menuColumnsInput.value" v-focus="this.statusNow==INPUT_COLUMNS"/><flexColor3 :currentValues="selectedBackgroundColor" @colorSelected="colorIsSelected"></flexColor3><MyButton @myButtonClicked="this.bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.goBack" buttonLabel="Previous"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
            <span v-if="this.statusNow==SUBMIT_LAYOUT" class="layoutMenuItem">
                Save and set up this layout ? <MyButton @myButtonClicked="this.submitInput" buttonLabel="Save"></MyButton><MyButton @myButtonClicked="this.goBack" buttonLabel="Previous"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
            <span v-show="entryError" class="errorMsg">{{this.errorMsg}}</span>
            <span v-if="this.statusNow==PLEASE_WAIT" class="errorMsg">Please wait...</span>


    </span>

</template>

<script>
  /* eslint-disable no-debugger */

  import Vue from "vue";
  import MyButton from "../components/MyButton.vue";
  import flexColor3 from "../components/flexColor3.vue"
  export default {
    name: "focusTest",
    components: {MyButton, flexColor3},
    data () {
      return {
        INPUT_MENU_LABEL: 0,
        INPUT_DESCRIPTION: 1,
        INPUT_ROWS: 2,
        INPUT_COLUMNS: 3,
        SUBMIT_LAYOUT: 4,
        PLEASE_WAIT: 5,
        statusNow: 0,
        entryError: false,
        errorMsg: '',
        waitMessage: false,
        doColorPick:false,
        selectedBackgroundColor: this.getBackground(),
        statusSave:0,
        menuLabelInput:
          {
            value: ''
          },
        menuDescriptionInput:
          {
            value: ''
          },
        menuRowsInput:
          {
            value: ''
          },
        menuColumnsInput:
          {
            value: ''
          }


      }

    },
    props: {
        backgroundColor:{
          type: String,
          required: false
        }
    },
    methods: {
      getBackground(){
//        debugger;
        if(typeof(this.backgroundColor)=='undefined'){
          return '#DBAA6E';
        }else{
          return this.backgroundColor;
        }
      },
      bumpStatus() {
//        debugger;
        switch (this.statusNow) {
          case this.INPUT_MENU_LABEL:
            if (this.menuLabelInput.value == '') {
              this.errorMsg = "This is a required field";
              this.entryError = true;
            } else {
              this.entryError = false;
              this.statusNow++;

            }
            break;
          case this.INPUT_DESCRIPTION:
            if (this.menuDescriptionInput.value == '') {
              this.errorMsg = "This is a required field";
              this.entryError = true;
            } else {
              this.entryError = false;
              this.statusNow++;

            }
            break;
          case this.INPUT_ROWS:
            if (this.menuRowsInput.value == '') {
              this.errorMsg = "This is a required field";
              this.entryError = true;
            } else {
              this.entryError = false;
              this.statusNow++;

            }
            break;
          case this.INPUT_COLUMNS:
            if (this.menuColumnsInput.value == '') {
              this.errorMsg = "This is a required field";
              this.entryError = true;
            } else {
              this.entryError = false;
              this.statusNow++;
            }
            break;
        }
      },
      submitInput(){
        var mlabel = this.menuLabelInput.value;
        var mdesc = this.menuDescriptionInput.value;
        var mrows = this.menuRowsInput.value;
        var mcols = this.menuColumnsInput.value;
        this.statusNow = this.PLEASE_WAIT;
        this.menuLabelInput.value='';
        this.menuDescriptionInput.value='';
        this.menuRowsInput.value='';
        this.menuColumnsInput.value='';
        this.$emit('layoutInputComplete', [mlabel, mdesc,mrows,mcols,this.selectedBackgroundColor ]);
      },
      goBack(){
        this.statusNow--;
      },
      cancel(){
        this.statusNow = 0;
        this.menuLabelInput.value='';
        this.menuDescriptionInput.value='';
        this.menuRowsInput.value='';
        this.menuColumnsInput.value='';
        this.$emit('layoutInputCanceled');
      },
      setWait(){
        this.statusNow = this.PLEASE_WAIT;
      },

      clearWait(){
        this.statusNow = 0;
      },
      setColor(){
        this.doColorPick=true;
        this.statusSave=this.statusNow;
        this.statusNow=this.SELECTING_BACKGROUND_COLOR;
      },
      colorIsSelected(msg){
//        debugger;
        this.selectedBackgroundColor = msg[0];
      }
    },
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

  };
</script>

<style scoped>
    .inpArea {
        position: relative;
        margin-top: 40px;
    }

    .errorMsg {
        text-align: right;
        margin-right: 10px;
        color: red;
    }


</style>