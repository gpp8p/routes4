<template>
    <span>
     <span v-if="this.cstatus==this.CONFIGURING_BACKGROUND">
        <RadioChoice :alignmentHz="true"
                     :radioChoices="this.choices"
                     :fieldName=this.fName
                     :label=this.labelText
                     :choiceRequired="this.choiceIsRequired"
                     :currentStatus="this.cstatus"
                     @radioChoiceMade="backgroundChosen"
                     @buttonClick="buttonClicked" >
        </RadioChoice>
        <SingleFile v-if="this.doFileUpload"  @filePath="fileUploaded"></SingleFile>
        <cpick v-if="this.doColorPick" @colorSelected="colorIsSelected"></cpick>
    </span>
    <span v-if="this.cstatus==this.CONFIGURING_FONT">
        <fpick></fpick>
    </span>

    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import RadioChoice from "../components/RadioChoice.vue";
    import SingleFile from "../components/SingleFile.vue";
    import cpick from "../components/cpick.vue";
    import fpick from "../components/fpick1.vue";
  export default {
    name: "ConfigureHeadline",
    components: {RadioChoice, SingleFile, cpick, fpick},
    mounted () {
      this.cstatus=this.CONFIGURING_BACKGROUND;
    },
    props:{
        InstanceNumberBeingConfigured: {
            type: Number,
            required: true
        },
    },
    data() {
      return {
        CONFIGURING_BACKGROUND:0,
        CONFIGURING_FONT:1,
        CONFIGURING_ALIGNMENT:2,
        CONFIGURING_CARD_BORDERS:3,
        CONFIGURING_TEXT:4,
        choices: ['color', 'images'],
        labelText: 'Background is:',
        choiceIsRequired: true,
        fName: 'backGroundType',
        doFileUpload: false,
        doColorPick: false,
        selectedBackgroundColor:'',
        instanceBeingConfigured:this.InstanceNumberBeingConfigured,
        filePrefix: 'http://localhost:8000/storage/',
        cstatus:this.CONFIGURING_BACKGROUND
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
        debugger;
        var buttonPressed = msg[0][0];
        switch (buttonPressed){
          case 'next':
            this.cstatus++;
            break;
          case 'prev':
            this.cstatus--;
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
//        debugger;
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