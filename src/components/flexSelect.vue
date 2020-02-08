<template>
   <span>
        <select class="selectStyle" v-model="this.selectValue" ref="thisSelect" @change="broadcastValue(event)">
            <option class="optionStyle" value="" disabled selected>Select</option>
            <option class="optionStyle" v-for="(val, index) in selectionOptions" :key="index" v-bind:value="val" >{{ val }}</option>
        </select>
    </span>

</template>

<script>
  export default {
    name: "flexSelect",
    props: {
      configElement: {
        type: Object,
        required: true
      },
      sName: {
        type: String,
        required: true
      }
    },
    data(){
      return {
        selectionOptions: this.configElement.selectionOptions,
        selectValue: ''
//        selectOptions: []
      }
    },
    methods: {
      broadcastValue(evt){
//        console.log(evt);
//        debugger;
        this.$emit('configSelected', [this.configElement.element, this.$refs.thisSelect.value]);
      }
    }
  };
</script>

<style scoped>

</style>