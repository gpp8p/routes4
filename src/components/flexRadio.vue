<template>
    <span>
        <span v-for="(choice, index) in this.radioOptions" :key="index">
            <input type="radio" name=this.fieldName @click="choiceSelected(index)" value="this.fieldValue" :checked="checked" @change="valueChanged"  />{{choice}}
        </span>
    </span>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: "flexRadio",
    props: {
      configElement: {
        type: Object,
        required: true
      },
      currentValues:{
        type: Object,
        required: false
      }

    },
    data(){
      return {
        radioOptions: this.configElement.radioOptions,
        fieldName: this.configElement.fieldName,
        fieldValue: this.configElement.element,
        radioValue: '',
        checked: this.getCurrentValue()
//        selectOptions: []
      }
    },
// eslint-disable-next-line no-console
    methods:{
      valueChanged(){
//        console.log('radio value changed-'+this.fieldValue);
      },
      choiceSelected(idx){
        this.$emit('configSelected', [this.configElement.element,'activated', this.radioOptions[idx]]);
      },
      getCurrentValue(){
        if(typeof(this.currentValues[this.configElement.element])=='undefined'){
          return false;
        }else{
          if(this.currentValues[this.configElement.element]=='checked'){
//            debugger;
            this.$emit('openCheckedByDefault',[this.configElement.element]);
            return true;
          }else{
            return false;
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>