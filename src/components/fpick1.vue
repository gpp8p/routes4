<template>
    <span>
        <span :style="{fontFamily : focused_font}">Pick the font you want to use:</span>
        <select v-model="focused_font">
            <option value="" disabled selected>Font</option>
            <option v-for="(font, index) in available_fonts" :key="index" v-bind:value="font" v-bind:style="{fontFamily : font}" >{{ font }}</option>
        </select>
    </span>

</template>

<script>
  export default {
    name: "fpick1",
    data(){
      return {
        focused_font:'',
        available_fonts: ['Arial', 'Times New Roman', 'Helvetica','Times','Courier New','Verdana','Courier','Arial Narrow','Candara','Geneva','Calibri','Optima','Cambria','Garamond','Perpetua','Monaco','Didot','Brush Script MT','Lucida Bright','Copperplate'],
        availableFontSizes: ['10pt','12pt','15pt','18pt','24pt','36pt','48pt','72pt'],
        availableFontWeight: ['normal','bold','bolder','lighter'],
        availableFontStyles: ['normal', 'italic', 'oblique'],
        
      }
    }
  };
</script>

<style scoped>

</style>