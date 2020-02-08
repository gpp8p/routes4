<template>
    <span>
        <input type="checkbox" @click="this.clicked" value="on" /> - {{this.configElement.prompt}}
    </span>
</template>

<script>
  export default {
    name: "flexCheckbox",
    props:{
      configElement: {
        type: Object,
        required: true
      }
    },
    methods:{
      clicked(event){
        if (event.target.checked){
          this.$emit('configSelected', [this.configElement.element,'checked']);
        }else{
          this.$emit('configSelected', [this.configElement.element,'unchecked']);
        }
      }
    }
  };
</script>

<style scoped>

</style>