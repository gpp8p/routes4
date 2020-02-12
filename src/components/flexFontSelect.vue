<template>
      <span>
            <span :style="{fontFamily : focused_font}">Font to use: </span>
            <select v-model="focused_font" class="selectStyle" ref="fontSelect" @change="fontSelected()">
                <option value="" disabled selected class="optionStyle">Font</option>
                <option v-for="(font, index) in available_fonts" :key="index" v-bind:value="font" v-bind:style="{fontFamily : font}" class="optionStyle" >{{ font }}</option>
            </select>
        </span>

</template>

<script>
  /* eslint-disable no-debugger */

  export default {
    name: "flexFontSelect",
    props: {
      configElement: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        available_fonts: ['Arial', 'Times New Roman', 'Helvetica','Times','Courier New','Verdana','Courier','Arial Narrow','Candara','Geneva','Calibri','Optima','Cambria','Garamond','Perpetua','Monaco','Didot','Brush Script MT','Lucida Bright','Copperplate'],
        focused_font:'',
      }
    },
// eslint-disable-next-line no-debugger
    methods:{
      fontSelected(){
//        debugger;
        this.$emit('configSelected', [this.configElement.element, this.$refs.fontSelect.value]);
      }

    }
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