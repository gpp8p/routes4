<template>
    <span>
        <span>
            <span :style="{fontFamily : focused_font}">Font to use: </span>
            <select v-model="focused_font" class="selectStyle" ref="fontSelect" @change="fontSelected(event)">
                <option value="" disabled selected class="optionStyle">Font</option>
                <option v-for="(font, index) in available_fonts" :key="index" v-bind:value="font" v-bind:style="{fontFamily : font}" class="optionStyle" >{{ font }}</option>
            </select>
        </span>
        <span class="fpickSelectors">Font Sizes: <MySelect v-bind:sName="this.sizeName" v-bind:selectionOptions="this.availableFontSizes" @selectMade="this.selection"></MySelect></span>
        <span class="fpickSelectors">Font Weight: <MySelect v-bind:sName="this.weightName" v-bind:selectionOptions="this.availableFontWeight" @selectMade="this.selection"></MySelect></span>
        <span class="fpickSelectors">Font Style: <MySelect v-bind:sName="this.styleName" v-bind:selectionOptions="this.availableFontStyles" @selectMade="this.selection"></MySelect></span>
        <span class="fpickSelectors">Text Alignment: <MySelect v-bind:sName="this.alignName" v-bind:selectionOptions="this.availableAlignStyles" @selectMade="this.selection"></MySelect></span>
        <MyButton @myButtonClicked="fontColor" buttonLabel="Select Font Color"></MyButton>
        <nextCancelButtons :currentStatus="this.currentStatus" @buttonClick="buttonClickedHandler" ></nextCancelButtons>
        <cpick v-if="this.selectingColor" @colorSelected="fontColorIsSelected"></cpick>
    </span>

</template>

<script>
  /* eslint-disable no-debugger */

  import MySelect from "../components/MySelect.vue";
    import nextCancelButtons from '../components/nextCancelButtons.vue';
    import MyButton from "../components/MyButton.vue";
    import cpick from "../components/cpick.vue";
  export default {
    name: "fpick1",
    components: {MySelect, nextCancelButtons, MyButton, cpick},
    props: {
      currentStatus:{
        type: Number,
        required: true
      },
      InstanceNumberBeingConfigured: {
        type: Number,
        required: true
      },

    },
    mounted(){
      this.statusNow = this.$attrs.currentStatus;
    },
    data(){
      return {
        focused_font:'',
        available_fonts: ['Arial', 'Times New Roman', 'Helvetica','Times','Courier New','Verdana','Courier','Arial Narrow','Candara','Geneva','Calibri','Optima','Cambria','Garamond','Perpetua','Monaco','Didot','Brush Script MT','Lucida Bright','Copperplate'],
        availableFontSizes: ['10pt','12pt','15pt','18pt','24pt','36pt','48pt','72pt'],
        availableFontWeight: ['normal','bold','bolder','lighter'],
        availableFontStyles: ['normal', 'italic', 'oblique'],
        availableAlignStyles: ['left','center','right'],
        selectedFont:'',
        selectedSize:'',
        selectedWeight:'',
        selectedStyle:'',
        statusNow:this.currentStatus,
        selectingColor: false,
        selectedFontColor: '',
        alignmentStyling:'',
        instanceBeingConfigured:this.InstanceNumberBeingConfigured,
        sizeName:'size',
        weightName:'weight',
        styleName:'style',
        alignName:'align'

      }
    },
    methods: {
      fontSelected(){
        this.selectedFont = this.$refs.fontSelect.value;
        this.$emit('fontSelectionMade',['fontFamily',this.selectedFont,this.instanceBeingConfigured]);
      },
      selection(msg){
        debugger;
        switch(msg[0]){
          case 'size':
            this.selectedSize = msg[1];
            this.$emit('fontSelectionMade',['fontSize',this.selectedSize,this.instanceBeingConfigured]);
            break;
          case 'weight':
              this.selectedWeight = msg[1];
              this.$emit('fontSelectionMade',['fontWeight',this.selectedWeight,this.instanceBeingConfigured]);
              break;
          case 'style':
            this.selectedStyle = msg[1];
            this.$emit('fontSelectionMade',['fontStyle',this.selectedStyle,this.instanceBeingConfigured]);
            break;
          case 'align':
            this.alignmentStyling = msg[1];
            this.$emit('fontSelectionMade',['textAlign',this.alignmentStyling, this.selectedStyle,]);
            break;
            }
        },
      fontColor(){
        this.selectingColor=true;
      },
      fontColorIsSelected(msg) {
//        debugger;
        this.selectingColor=false;
        this.selectedFontColor = msg[0];
        this.$emit('fontSelectionMade',['color',this.selectedFontColor,this.instanceBeingConfigured]);
//        this.$emit('configurationSelectionMade',[this.selectedFontColor, this.instanceBeingConfigured, 'fontColor']);
      },
      buttonClickedHandler(msg){
 //       debugger;
        if(msg=='next'){
          this.$emit('fontConfigured', [this.focused_font, this.selectedSize, this.selectedWeight, this.selectedStyle, this.selectedFontColor, this.alignmentStyling ]);
          this.$emit('buttonClick', [msg]);
        }
        if(msg=='previous'){
          this.$emit('buttonClick', [msg]);
        }
        if(msg=='cancel'){
          this.$emit('buttonClick', [msg]);
        }
      }
      },
    };
</script>

<style scoped>
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