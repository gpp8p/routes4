<template>
    <span>
    <RadioChoice :alignmentHz="true" :radioChoices="this.choices" :fieldName=this.fName :label=this.labelText :choiceRequired="this.choiceIsRequired" @radioChoiceMade="backgroundChosen" @buttonClick="buttonClicked" ></RadioChoice>
    <SingleFile v-if="this.doFileUpload"  @filePath="fileUploaded"></SingleFile>
    <cpick v-if="this.doColorPick" @colorSelected="colorIsSelected"></cpick>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import RadioChoice from "../components/RadioChoice.vue";
    import SingleFile from "../components/SingleFile.vue";
    import cpick from "../components/cpick.vue";
//    import fpick from "../components/fpick.vue";
  export default {
    name: "ConfigureHeadline",
    components: {RadioChoice, SingleFile, cpick},
    props:{
        InstanceNumberBeingConfigured: {
            type: Number,
            required: true
        },
    },
    data() {
      return {
        choices: ['color', 'images'],
        labelText: 'Background is:',
        choiceIsRequired: true,
        fName: 'backGroundType',
        doFileUpload: false,
        doColorPick: false,
        selectedBackgroundColor:'',
        instanceBeingConfigured:this.InstanceNumberBeingConfigured,
        filePrefix: 'http://localhost:8000/storage/'
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
// eslint-disable-next-line no-debugger
      },
      buttonClicked(msg){
        console.log(msg);
        switch (msg[0]){
          case 'next':
            break;
          case 'prev':
            break;
          case 'cancel':
            break;
        }
      },
      fileUploaded(msg){
//        debugger;
        this.doFileUpload = false;
        var uploadedFilePath = this.filePrefix+msg[0];
        this.$emit('configurationSelectionMade',[uploadedFilePath, this.instanceBeingConfigured, 'backgroundImage']);
      },
      colorIsSelected(msg){
        debugger;
        this.doColorPick=false;
        this.selectedBackgroundColor = msg[0];
        this.$emit('configurationSelectionMade',[this.selectedBackgroundColor, this.instanceBeingConfigured, 'backgroundColor']);
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