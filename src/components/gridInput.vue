<template>
    <span>
        <span v-if="this.gridInputStatus==this.GRID_WAITINGFORCLICK" class="prompt">Click on the top left cell of where you wish to place the card: <MyButton @myButtonClicked="cancelExitClicked" buttonLabel="Cancel and Return to Layout List"></MyButton></span>
        <span v-if="this.gridInputStatus==this.GRID_TOPLEFTCLICKED" class="prompt">Click on the bottom right cell of where you wish to place the card: <MyButton @myButtonClicked="cancelExitClicked" buttonLabel="Cancel and Return to Layout List"></MyButton></span>
        <span v-if="this.gridInputStatus==this.GRID_BOTTOMRIGHTCLICKED" class="prompt">Is this area ok for the new card ? <MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="No"></MyButton><MyButton @myButtonClicked="cancelExitClicked" buttonLabel="Cancel and Return to Layout List"></MyButton></span>
        <span v-if="this.gridInputStatus==this.GRID_SELECTAREAOK" class="prompt">
            What do you want to name this card ?<input @keyup.enter="this.nameEntered" ref="cardName" v-model="nameField.value"  type="text" size="30" v-focus="this.gridInputStatus==this.GRID_SELECTAREAOK"/>
            <MyButton @myButtonClicked="nameHasBeenEntered"  buttonLabel="Done"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.gridInputStatus==this.GRID_NAME_ENTERED" class="prompt">
            What kind of card are you adding ?
            <select ref="cardComponentSelect" @change="cardSelectionMade($event)">
                <option value="select">Select Card Type</option>
                <option  value="blankComponent">Blank Card</option>
            </select>
            <MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
        </span>
        <span v-if="this.gridInputStatus==this.GRID_TYPE_ENTERED">Save this card ? <MyButton @myButtonClicked="saveButtonClicked" buttonLabel="Submit"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
        <span v-if="errorCondition" class="errorMsg">{{this.errorMessage}}</span>

    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import Vue from "vue";
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "gridInput",
    components: {MyButton},
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
    created: function(){
      this.gridInputStatus=this.GRID_WAITINGFORCLICK;
    },
    data(){
      return {
        gridInputStatus:0,
        GRID_WAITINGFORCLICK:0,
        GRID_TOPLEFTCLICKED:1,
        GRID_BOTTOMRIGHTCLICKED:2,
        GRID_SELECTAREAOK:3,
        GRID_NAME_ENTERED:4,
        GRID_TYPE_ENTERED:5,
        GRID_WAITINGFORSUBMIT:6,
        GRID_WAITINGTOSAVE:8,
        GRID_CANCEL:9,
        nameField:
          {
            value:''
          },
        newCardType: '',
        errorCondition:false
      }
    },
    methods:{
        yesButtonClicked(){
          this.$emit('storeValue', ['selectAreaOk', 0,0 ]);
        },
        topLeftClicked(){
          this.gridInputStatus=this.GRID_TOPLEFTCLICKED;
        },
        bottomRightClicked(){
          this.gridInputStatus=this.GRID_BOTTOMRIGHTCLICKED;
        },
        selectAreaOk(){
//          debugger;
          this.gridInputStatus=this.GRID_SELECTAREAOK;
        },
        nameEntered(){
          if(this.nameField != ''){
            this.gridInputStatus=this.GRID_NAME_ENTERED;
            this.clearError();
          }else{
            this.setError('A card name must be enteered')
          }

        },
        typeEntered(){
          this.gridInputStatus=this.GRID_NAME_ENTERED;
        },
        nameHasBeenEntered(){
          if(this.nameField.value != ''){
            this.clearError();
            this.$emit('storeValue', ['nameEntered', this.nameField.value,0 ]);
          }else{
            this.setError('A card name must be enteered')
          }

        },
        saveButtonClicked(){
          this.gridInputStatus=this.GRID_WAITINGFORCLICK;
          this.$emit('storeValue', ['saveCard', this.nameField.value,0 ]);
        },
        cancelExitClicked(){
          this.gridInputStatus=this.GRID_WAITINGFORCLICK;
          this.$emit('storeValue', ['cardEntryCanceled', 0,0 ]);
        },
        cancelClicked(){
          this.gridInputStatus=this.GRID_WAITINGFORCLICK;
          this.$emit('storeValue', ['cardEntryReset', 0,0 ]);
        },
        cardSelectionMade(evt){
            console.log('Card type selection made:'+evt.target.value);
            this.newCardType = evt.target.value;
            this.gridInputStatus = this.GRID_TYPE_ENTERED;
         },
         setError(errMsg){
             this.errorMessage=errMsg;
             this.errorCondition=true;
         },
         clearError(){
           this.errorMessage='';
           this.errorCondition=false;
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