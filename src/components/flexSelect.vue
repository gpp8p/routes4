<template>
   <span>
        <select class="selectStyle" v-model="this.selectValue" ref="thisSelect" @change="broadcastValue(event)">
            <option class="optionStyle" value="" disabled selected>{{this.configElement.prompt}}</option>
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
      }
    },
    data(){
      return {
        selectionOptions: this.configElement.selectOptions,
        selectValue: ''
//        selectOptions: []
      }
    },
    methods: {
      broadcastValue(){
//        console.log(evt);
//        debugger;
        this.$emit('configSelected', [this.configElement.element, this.$refs.thisSelect.value]);
      }
    }
  };
</script>

<style scoped>
    .selectStyle {
        background: #DBAA6E;
        color:blue;
        font-weight: bold;
        font-size: 12px;
    }
    .optionStyle {
        background: #DBAA6E;
        color:blue;
    }

</style>