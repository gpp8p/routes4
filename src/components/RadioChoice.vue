<template>
    <span v-if="this.alignmentHz">
        {{this.label}}
        <span v-if="this.isCheckBox==false">
            <span v-for="(choice, index) in this.choices" :key="index">
                <input type="radio" name=this.fieldName @click="choiceSelected(index)"  />{{choice}}
            </span>
        </span>
        <span v-if="this.isCheckBox==true">
            <span v-for="(choice, index) in this.choices" :key="index">
                <input type="checkbox" name=this.fieldName @click="checkboxClicked($event)"  />{{choice}}
            </span>
        </span>
        <span class="errorMsg"> {{this.errorMsgs}} </span>

    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  export default {
    name: "RadioChoice",
    props: {
      alignmentHz: {
        type: Boolean,
        required: true
      },
      radioChoices: {
        type: Array,
        required: true
      },
      fieldName: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      choiceRequired: {
        type: Boolean,
        required:true
      },
      isCheckBox:{
        type: Boolean,
        required:true
      }
    },
    data(){
      return {
        choices: this.radioChoices,
        fName: this.fieldName,
        selectedIndes: 0,
        errorMsgs: '',
        chosen: false
      }
    },
    methods:{
      choiceSelected(idx){
//        debugger;
        this.selectedIndex = idx;
        this.chosen=true;
        this.errorMsgs = '';
        this.$emit('radioChoiceMade', this.radioChoices[idx]);
// eslint-disable-next-line no-debugger
      },
      checkboxClicked(event){
//        debugger;
//        console.log(event);
            if (event.target.checked){
              this.$emit('radioChoiceMade', 'checked');
            }else{
              this.$emit('radioChoiceMade', 'unchecked');
            }
      },
      buttonClickedHandler(msg){
//        debugger;
        if(msg=='next' && this.choiceRequired && !this.chosen){
          this.errorMsgs = '(You must choose)';
        }else{
          this.$emit('buttonClick', [msg]);
        }
      }

    }


  };
</script>

<style scoped>
    .errorMsg {
        text-align: right;
        margin-right: 10px;
        color: red;
    }

</style>