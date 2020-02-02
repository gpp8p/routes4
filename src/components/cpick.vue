<template>
    <span>
    <colorPicker
            :color="color"
            :sucker-hide="true"
            :sucker-canvas="suckerCanvas"
            :sucker-area="suckerArea"
            @changeColor="changeColor"
            @openSucker="openSucker"
            @selectColor="selectColor"
            ref="colorpick"
    />
        <MyButton @myButtonClicked="colorSelected" buttonLabel="Use This Color"></MyButton>
    </span>

</template>

<script>
  /* eslint-disable no-console,no-debugger,no-undef */
  import colorPicker from '@caohenghu/vue-colorpicker';
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "cpick",
    components: {colorPicker, MyButton},
    data() {
      return {
        color: '#59c7f9'
      }
    },

// eslint-disable-next-line no-console
    methods:{
      changeColor(msg){
//        console.log(msg);
// eslint-disable-next-line no-debugger
//        debugger;
        var r = msg.rgba;
        console.log(r);

      },
      openSucker(msg){
        console.log(msg);
      },
      colorSelected(){
//        debugger;
        this.$emit('colorSelected', [this.$refs.colorpick._data.modelHex]);
      },
      selectColor(msg){
        debugger;
        console.log(msg);
      }
    }
  };
</script>

<style scoped>

</style>