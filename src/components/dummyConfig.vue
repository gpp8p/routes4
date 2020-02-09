<template>
    <span v-if="visible">
        <flex-checkbox v-if="this.configElement.type=='checkbox'" :config-element="this.configElement"></flex-checkbox>
        <flex-select v-if="this.configElement.type=='select'" :config-element="this.configElement"></flex-select>
        <flex-color v-if="this.configElement.type=='color'" :config-element="this.configElement"></flex-color>
    </span>
</template>

<script>
    import flexCheckbox from "../components/flexCheckbox.vue";
    import flexSelect from "../components/flexSelect.vue";
    import flexColor from "../components/flexColor.vue";
  export default {
    name: "dummyConfig",
    components:{flexCheckbox, flexSelect, flexColor},
    props: {
      prompt:{
        type: String,
        required: true
      },
      idx: {
        type: Number,
        required: true
      },
      configElement: {
        type: Object,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>