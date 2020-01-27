<template>
    <select v-model="this.selectValue">
        <option value="" disabled selected>Select</option>
        <option v-for="(val, index) in selectOptions" :key="index" v-bind:value="val" @change="broadcastValue">{{ val }}</option>
    </select>
</template>

<script>
  /* eslint-disable no-debugger */

  export default {
    name: "MySelect",
    mounted () {
      this.selectOptions=this.$attrs.selectionOptions;
      debugger;
    },
    opts: {
      selectionOptions:{
          type: Array,
          required: true
        },
        sName: {
          type: String,
          required: true
        }
    },
    data(){
      return {
        selectValue: '',
        selectOptions: []
      }
    },
    methods: {
      broadcastValue(){
        this.$emit('selectMade',[this.selectName, this.selectValue]);
      }
    }
  };
</script>

<style scoped>

</style>