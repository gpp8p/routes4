<template>
    <span>
     <span v-if="this.cstatus==this.CONFIGURING_BACKGROUND">
        <RadioChoice :alignmentHz="true"
                     :radioChoices="this.choices"
                     :fieldName=this.fName
                     :label=this.labelText
                     :choiceRequired="this.choiceIsRequired"
                     :isCheckBox="false"
                     @radioChoiceMade="backgroundChosen">
        </RadioChoice>
        <SingleFile v-if="this.doFileUpload"  @filePath="fileUploaded"></SingleFile>

        <RadioChoice :alignmentHz="true"
                     :radioChoices="this.borderChoice"
                     :fieldName=this.borderFieldName
                     :label=this.borderChoiceLabel
                     :choiceRequired="false"
                     :isCheckBox="true"
                     @radioChoiceMade="borderChosen">
        </RadioChoice>
         <span v-if="this.borderIncluded">
            <span class="fpickSelectors">Border Size: <MySelect v-bind:sName="this.borderSizeName" v-bind:selectionOptions="this.availableBorderSizes" @selectMade="this.borderSizeSelected"></MySelect></span>
             <MyButton @myButtonClicked="borderColor" buttonLabel="Select Border Color"></MyButton>
         </span>
        <RadioChoice :alignmentHz="true"
                          :radioChoices="this.shadowChoice"
                          :fieldName=this.shadowFieldName
                          :label=this.shadowChoiceLabel
                          :choiceRequired="false"
                          :isCheckBox="true"
                          @radioChoiceMade="shadowChosen">
        </RadioChoice>
        <RadioChoice :alignmentHz="true"
                     :radioChoices="this.roundChoice"
                     :fieldName=this.roundFieldName
                     :label=this.roundChoiceLabel
                     :choiceRequired="false"
                     :isCheckBox="true"
                     @radioChoiceMade="roundChosen">
        </RadioChoice>


        <nextCancelButtons :currentStatus="this.cstatus" @buttonClick="buttonClickedHandler" ></nextCancelButtons>
    </span>
    <span v-if="this.cstatus==this.CONFIGURING_FONT">
        <fpick :currentStatus="this.cstatus" :InstanceNumberBeingConfigured="this.instanceBeingConfigured" @fontConfigured="fontConfigured" @fontSelectionMade="this.fontSelectionMade" @buttonClick="this.buttonClickedHandler"></fpick>
    </span>
    <span v-if="this.cstatus==this.CONFIGURING_TEXT">
        <SingleInput :prompt="this.textPrompt" :fieldSize="this.textFieldSize" :placeholderText="this.placeholder" :status="this.cstatus" @textEntered="this.textContentEntered" @configurationSelectionMade="buttonClickedHandler"></SingleInput>
    </span>
        <cpick v-if="this.selectingBorderColor" @colorSelected="borderColorIsSelected"></cpick>
        <cpick v-if="this.doColorPick" @colorSelected="colorIsSelected"></cpick>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import RadioChoice from "../components/RadioChoice.vue";
    import SingleFile from "../components/SingleFile.vue";
    import cpick from "../components/cpick.vue";
    import fpick from "../components/fpick1.vue";
    import SingleInput from "../components/SingleInput.vue";
    import nextCancelButtons from "../components/nextCancelButtons.vue";
    import MySelect from "../components/MySelect.vue";
    import MyButton from "../components/MyButton.vue";
  export default {
    name: "ConfigureHeadline",
    components: {RadioChoice, SingleFile, cpick, fpick, SingleInput, nextCancelButtons, MySelect, MyButton},
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
        CONFIGURING_FONT:2,
        CONFIGURING_TEXT:1,
        cstatusLimit:this.CONFIGURING_TEXT,
        choices: ['color', 'images'],
        labelText: 'Background is:',
        choiceIsRequired: true,
        fName: 'backGroundType',
        doFileUpload: false,
        doColorPick: false,
        selectedBackgroundColor:'',
        instanceBeingConfigured:this.InstanceNumberBeingConfigured,
        filePrefix: 'http://localhost:8000/storage/',
        cstatus:this.CONFIGURING_BACKGROUND,

        textContent:'',

        borderChoice: [''],
        borderChoiceLabel: 'Border ?',
        borderFieldName:'includeBorder',
        borderIncluded:false,
        availableBorderSizes: ['1px','2px','3px','4px','5px','6px','7px','8px'],
        borderSize:'',
        borderSizeName:'borderSize',
        selectingBorderColor:false,
        selectedBorderColor:'',


        shadowChoice: [''],
        shadowChoiceLabel: 'Shadow ?',
        shadowFieldName:'includeshadow',
        shadowIncluded:false,

        roundChoice: [''],
        roundChoiceLabel: 'Round Corners ?',
        roundFieldName:'includeround',
        roundIncluded:false,



        fontFamily: '',
        fontSize:'',
        fontWeight: '',
        fontStyle: '',
        fontColor:'',
        textPrompt:'Please enter headline text:',
        textFieldSize: 80,
        placeholder:'Headline content'

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
//        debugger;
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
        this.$emit('configurationSelectionMade',['backgroundImage', uploadedFilePath, this.instanceBeingConfigured]);
      },
      colorIsSelected(msg){
        debugger;
        this.doColorPick=false;
        this.selectedBackgroundColor = msg[0];
        this.$emit('configurationSelectionMade',['backgroundColor', this.selectedBackgroundColor, this.instanceBeingConfigured]);
      },
      fontSelectionMade(msg){
        console.log(msg[0]);
//        debugger;
        this.$emit('fontSelectionMade',[msg[0], msg[1], msg[2]]);
      },
      fontConfigured(msg){
//        debugger;
        this.fontFamily = msg[0];
        this.fontSize = msg[1];
        this.fontWeight= msg[2];
        this.fontStyle=msg[3];
        this.fontColor=msg[4];
        this.$emit('configurationSelectionMade',[this.fontFamily, this.fontSize, this.fontWeight, this.fontColor, 'font']);
      },
      borderChosen(msg){
//        debugger;
        if(msg=='checked'){
          this.borderIncluded=true;
        }else{
          this.borderIncluded=false;
          this.borderSize='';
        }

      },
      shadowChosen(msg){
//        debugger;
        if(msg=='checked'){
          this.shadowIncluded=true;
        }else{
          this.shadowIncluded=false;
        }
      },
      roundChosen(msg){
//        debugger;
        if(msg=='checked'){
          this.roundIncluded=true;
        }else{
          this.roundIncluded=false;
        }
      },


      borderSizeSelected(msg){
//        debugger;
        this.borderSize = msg[1];
      },
      borderColor(){
        this.selectingBorderColor=true;
      },
      borderColorIsSelected(msg){
        this.selectingBorderColor=false;
        this.selectedBorderColor = msg[0];
      },
      buttonClickedHandler(msg){
        console.log(msg);
        if(msg[0]=='next'){
          this.bumpStatus();
        }
        if(msg[0]=='cancel'){
          this.$emit('configurationSelectionMade',['cancel']);
        }
        if(msg[0]=='previous'){
          this.bumpBackStatus();
        }
      },
      textContentEntered(msg){
        this.textContent = msg[0];
        this.$emit('textEntered', [this.textContent]);
        this.bumpStatus();
      },
      bumpStatus(){
        if(this.cstatus==this.cstatusLimit){
          console.log('headlineConfigured');
        }else{
          this.cstatus++;
        }
      },
      bumpBackStatus(){
        if(this.cstatus==0){
          console.log('headlineConfigured');
        }else{
          this.cstatus--;
        }
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
    .fpickSelectors {
        padding-left: 1vw;
    }
    .selectStyle {
        background: #DBAA6E;
        color:blue;
        font-weight: bold;
        font-size: 12px;
    }
    .optionStyle {
        background: #DBAA6E;
        color:blue;
    }
</style>