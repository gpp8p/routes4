<template>

    <span>
        <span v-if="this.statusNow==INPUT_MENU_LABEL" class="layoutMenuItem">
            What is the label you wish for this layout ?<input ref="menuLabelInput" v-model="menuLabelInput.value" type="text" size="32" @keydown.tab="bumpStatus" v-focus="this.statusNow==this.INPUT_MENU_LABEL" placeholder="Layout name"  /><MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_DESCRIPTION" class="layoutMenuItem">
            <MyButton @myButtonClicked="this.goBack" buttonLabel="<-Go Back"></MyButton>Please provide a short description of this layout: <input ref="menuDescriptionInput" v-model="menuDescriptionInput.value" type="text" size="80" @keydown.tab="bumpStatus" v-focus="this.statusNow==this.INPUT_DESCRIPTION" placeholder="Layout Description"  /><MyButton @myButtonClicked="this.bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_ROWS" class="layoutMenuItem">
            <MyButton @myButtonClicked="this.goBack" buttonLabel="<-Go Back"></MyButton>How many rows will the layout have ? <input ref="menuRowsInput" v-model="menuRowsInput.value" type="text" size="5" @keydown.tab="bumpStatus" v-focus="this.statusNow==this.INPUT_ROWS" placeholder="Rows" /><MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==INPUT_COLUMNS" class="layoutMenuItem">
            <MyButton @myButtonClicked="this.goBack" buttonLabel="<-Go Back"></MyButton>How many columns will the layout have ? <input ref="menuColumnsInput" v-model="menuColumnsInput.value" type="text" size="5" @keydown.tab="bumpStatus" v-focus="this.statusNow==this.INPUT_COLUMNS" placeholder="Cols" /><MyButton @myButtonClicked="bumpStatus" buttonLabel="Next"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.statusNow==SUBMIT_LAYOUT" class="layoutMenuItem">
            <MyButton @myButtonClicked="this.goBack" buttonLabel="<-Go Back"></MyButton>Save and set up this layout ? <MyButton @myButtonClicked="this.submitInput" buttonLabel="Save"></MyButton><MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-show="entryError" class="errorMsg">{{this.errorMsg}}</span>

    </span>

</template>

<script>

  /* eslint-disable no-debugger */

  import MyButton from "../components/MyButton.vue";
  import Vue from "vue";

  export default {
    name: "NewLayoutInput",
    components: { MyButton },
    data() {
      return {
        INPUT_MENU_LABEL: 0,
        INPUT_DESCRIPTION: 1,
        INPUT_ROWS: 2,
        INPUT_COLUMNS: 3,
        SUBMIT_LAYOUT: 4,
        statusNow: 0,
        entryError: false,
        errorMsg: '',
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
    directives:{
      focus:{
        inserted: function (el) {
//          debugger;
          el.focus()
        },
        update: function (el) {
          Vue.nextTick(function() {
            el.focus();
          })
        }
      }
    },
    methods: {
      bumpStatus() {
        switch (this.statusNow) {
          case this.INPUT_MENU_LABEL:
            if(this.menuLabelInput.value==''){
                this.errorMsg = "This is a required field";
                this.entryError=true;
            }else{
              this.entryError=false;
              this.statusNow++;

            }
            break;
          case this.INPUT_DESCRIPTION:
            if(this.menuDescriptionInput==''){
              this.errorMsg = "This is a required field";
              this.entryError=true;
            }else{
              this.entryError=false;
              this.statusNow++;

            }
            break;
          case this.INPUT_ROWS:
            if(this.menuRowsInput==''){
              this.errorMsg = "This is a required field";
              this.entryError=true;
            }else{
              this.entryError=false;
              this.statusNow++;

            }
            break;
          case this.INPUT_COLUMNS:
            if(this.menuColumnsInput==''){
              this.errorMsg = "This is a required field";
              this.entryError=true;
            }else{
              this.entryError=false;
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
        this.statusNow = 0;
        this.menuLabelInput.value='';
        this.menuDescriptionInput.value='';
        this.menuRowsInput.value='';
        this.menuColumnsInput.value='';
        this.$emit('layoutInputComplete', [mlabel, mdesc,mrows,mcols]);
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
      }
    }

  }
</script>

<style scoped>

    .layoutMenuItem {
        text-align: left;
        margin-top: 10px;
        margin-left: 10px;
    }

    .layoutMenu{
        padding: 3px;
    }

    .errorMsg {
        text-align: right;
        margin-right: 10px;
        color: red;
    }



</style>