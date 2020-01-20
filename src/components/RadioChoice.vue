<template>
    <span v-if="this.alignmentHz">
        {{this.label}}
        <span v-for="(choice, index) in this.choices" :key="index">
            <input type="radio" name=this.fieldName @onclick="this.choiceSelected(index)"  />{{choice}}
        </span>
        <nextCancelButtons></nextCancelButtons>
    </span>
</template>

<script>
    import nextCancelButtons from '../components/nextCancelButtons.vue';
  export default {
    name: "RadioChoice",
    components: {nextCancelButtons},
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
      }
    },
    data(){
      return {
        choices: this.radioChoices,
        fName: this.fieldName,
        selectedIndes: 0,
        errorMsgs: ''
      }
    },
    methods:{
      choiceSelected(idx){
        this.selectedIndex = idx;
      },
      buttonClickedHandler(msg){
        if(msg=='next' && this.choiceRequired){
          this.errorMsgs = 'You must choose';
        }else{
          this.$emit('buttonClick', [msg]);
        }

      }

    }


  };
</script>

<style scoped>

</style>