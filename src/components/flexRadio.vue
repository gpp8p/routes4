<template>
    <span>
        <span v-for="(choice, index) in this.radioOptions" :key="index">
            <input type="radio" name=this.fieldName @click="choiceSelected(index)" value="this.fieldValue" @change="valueChanged"  />{{choice}}
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
      }
    },
    data(){
      return {
        radioOptions: this.configElement.radioOptions,
        fieldName: this.configElement.fieldName,
        fieldValue: this.configElement.element,
        radioValue: ''
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
      }
    }
  };
</script>

<style scoped>

</style>