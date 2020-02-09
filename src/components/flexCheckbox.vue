<template>
    <span>
        <input type="checkbox" @click="this.clicked" value="on" /> - {{this.configElement.prompt}}
        <Dummy v-for="(configEl, index) in this.configElement.onClick" :configElement="configEl" :prompt="Size" :idx="index" :key="index" :visible="this.showExpansion"></Dummy>
    </span>
</template>

<script>
  import Dummy from "../components/dummyConfig.vue";
  export default {
    name: "flexCheckbox",
    components: {Dummy},
    props:{
      configElement: {
        type: Object,
        required: true
      }
    },
    data(){
        return {
          showExpansion:true
        }
    },
    methods:{
      clicked(event){
        if (event.target.checked){
          this.showExpansion=true;
          this.$emit('configSelected', [this.configElement.element,'checked']);
        }else{
          this.showExpansion=false;
          this.$emit('configSelected', [this.configElement.element,'unchecked']);
        }
      }
    }
  };
</script>

<style scoped>

</style>