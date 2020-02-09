<template>
    <span>
        <span v-if="openColorPicker==true">
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
        <span v-if="openColorPicker==false">
            <MyButton @myButtonClicked="openPicker" buttonLabel="Select Color"></MyButton>
        </span>
    </span>

</template>

<script>
  /* eslint-disable no-console,no-debugger,no-undef */
  import colorPicker from '@caohenghu/vue-colorpicker';
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "flexColor",
    components: {colorPicker, MyButton},
    props:{
      configElement: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        color: '#59c7f9',
        openColorPicker:false
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
        this.openColorPicker=false;
        this.$emit('configSelected', [this.configElement.element,this.$refs.colorpick._data.modelHex]);
//        this.$emit('colorSelected', [this.$refs.colorpick._data.modelHex]);
      },
      selectColor(msg){
        debugger;
        console.log(msg);
      },
      openPicker(){
//        debugger;
        this.openColorPicker=true;
      }
    }
  };
</script>

<style scoped>

</style>