<template>
    <span>
    <RadioChoice :alignmentHz="true" :radioChoices="this.choices" :fieldName=this.fName :label=this.labelText :choiceRequired="this.choiceIsRequired" @radioChoiceMade="backgroundChosen" ></RadioChoice>
    <SingleFile v-if="this.doFileUpload"  SingleFile></SingleFile>
    <cpick v-if="this.doColorPick" @colorSelected="colorIsSelected"></cpick>
    </span>
</template>

<script>
    import RadioChoice from "../components/RadioChoice.vue";
    import SingleFile from "../components/SingleFile.vue";
    import cpick from "../components/cpick.vue";
  export default {
    name: "ConfigureHeadline",
    components: {RadioChoice, SingleFile, cpick},
    data() {
      return {
        choices: ['color', 'images'],
        labelText: 'Background is:',
        choiceIsRequired: true,
        fName: 'backGroundType',
        doFileUpload: false,
        doColorPick: false,
        selectedBackgroundColor:''
      }
    },
    methods: {
      backgroundChosen(msg){
        if(msg=='images'){
          this.doFileUpload = true;
        }
        if(msg=='color'){
          this.doColorPick=true;
        }
      },
      colorIsSelected(msg){
        this.doColorPick=false;
        this.selectedBackgroundColor = msg;
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
</style>