<template>
    <colorPicker
            :color="color"
            :sucker-hide="true"
            :sucker-canvas="suckerCanvas"
            :sucker-area="suckerArea"
            @changeColor="changeColor"
            @openSucker="openSucker"
    />
</template>

<script>
  /* eslint-disable no-console */
  import colorPicker from '@caohenghu/vue-colorpicker'
  export default {
    name: "cpick",
    components: {colorPicker},
    data() {
      return {
        color: '#59c7f9'
      }
    },

// eslint-disable-next-line no-console
    methods:{
      changeColor(msg){
        console.log(msg);
      },
      openSucker(msg){
        console.log(msg);
      }
    }
  };
</script>

<style scoped>

</style>