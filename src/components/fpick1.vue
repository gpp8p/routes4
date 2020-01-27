<template>
    <span>
        <span :style="{fontFamily : focused_font}">Pick the font you want to use:</span>
        <select v-model="focused_font">
            <option value="" disabled selected>Font</option>
            <option v-for="(font, index) in available_fonts" :key="index" v-bind:value="font" v-bind:style="{fontFamily : font}" >{{ font }}</option>
        </select>
        <span>Font Sizes:<MySelect :sName="size" v-bind:selectionOptions="this.availableFontSizes" @selectMade="this.selection"></MySelect></span>
        <span>Font Weight:<MySelect :sName="weight" v-bind:selectionOptions="this.availableFontWeight" @selectMade="this.selection"></MySelect></span>
        <span>Font Style:<MySelect :sName="style" v-bind:selectionOptions="this.availableFontWeight" @selectMade="this.selection"></MySelect></span>
        <MyButton @myButtonClicked="fontColor" buttonLabel="Select Font Color"></MyButton>
        <nextCancelButtons :currentStatus="this.currentStatus" @buttonClick="buttonClickedHandler" ></nextCancelButtons>
        <cpick v-if="this.selectingColor" @colorSelected="fontColorIsSelected"></cpick>
    </span>

</template>

<script>
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
        selectedSize:'',
        selectedWeight:'',
        selectedStyle:'',
        statusNow:this.currentStatus,
        selectingColor: false,
        selectedFontColor: '',
        instanceBeingConfigured:this.InstanceNumberBeingConfigured,

      }
    },
    methods: {
      selection(msg){
        switch(msg[0]){
          case 'size':
            this.selectedSize = msg[1];
            break;
          case 'weight':
              this.selectedWeight = msg[1];
              break;
          case 'style':
            this.selectedStyle = msg[1];
            break;
            }
        },
      fontColor(){
        this.selectingColor=true;
      },
      fontColorIsSelected(msg) {
        this.selectingColor=false;
        this.selectedFontColor = msg[0];
        this.$emit('configurationSelectionMade',[this.selectedFontColor, this.instanceBeingConfigured, 'fontColor']);
      },
      buttonClickedHandler(msg){
        if(msg=='next'){
          this.$emit('fontConfigured', [this.focused_font, this.selectedSize, this.selectedWeight, this.selectedStyle ]);
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

</style>