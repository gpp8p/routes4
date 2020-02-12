<template>
    <span>
        <input type="checkbox" @click="this.clicked" value="on" /> - {{this.configElement.prompt}}
    </span>
</template>

<script>
  /* eslint-disable no-debugger */

  //  import flexConfigComponent from "../components/flexConfigComponent.vue";
//    import dummyConfigComponent from "../components/dummyConfigComponent.vue";
  export default {
    name: "flexCheckbox",
//    components: {'flexConfigComponent':flexConfigComponent},
//      components: {dummyConfigComponent},
    props:{
      configElement: {
        type: Object,
        required: true
      }
// eslint-disable-next-line no-debugger
    },
    mounted(){
      this.$emit('onClickActivate', [this.configElement.element, this.isClicked]);
    },
    data(){
        return {
          showExpansion:null,
          sizePrompt:'Size',
          checked: Boolean
        }
    },
    methods:{
      clicked(event){
        if (event.target.checked){
          this.showExpansion=true;
          this.checked=true;
          this.$emit('configSelected', [this.configElement.element,'activated']);
        }else{
          this.showExpansion=false;
          this.checked=false;
          this.$emit('configSelected', [this.configElement.element,'deactivated']);
        }
      },
      isClicked(){
//        debugger;
        return this.checked;
      }
    }
  };
</script>

<style scoped>

</style>