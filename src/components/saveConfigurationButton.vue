<template>
    <MyButton @myButtonClicked="saveConfiguration" buttonLabel="Save Configuration"></MyButton>
</template>

<script>
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "saveConfigurationButton",
    components:{MyButton},
    methods:{
      saveConfiguration(){
        this.$emit('configSelected', ['saveConfiguration','activated']);
      }
    },
    props: {
      configElement: {
        type: Object,
        required: true
      }
    },
    currentValues:{
      type: Object,
      required: false
    }

  };
</script>

<style scoped>

</style>