<template>
    <span>
        <FontPicker :api-key="AIzaSyDr6bD_1Pw2oxD1kS0xPJeRC2Kwu6F7KhI" :options="this.initialOptions" :active-font="this.initialFont" @change="myFunc"></FontPicker>
    </span>

</template>

<script>
  import Vue from 'vue';
  import FontPicker from 'font-picker-vue';
  Vue.use(FontPicker);
  export default {
    name: "fpick",
    components: {FontPicker},
    data(){
      return {
        initialFont: 'Roboto',
        initialOptions: { limit: 30 }
      }
    }
  };
</script>

<style scoped>

</style>