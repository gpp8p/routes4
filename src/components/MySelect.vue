<template>
    <span>
        <select class="selectStyle" v-model="this.selectValue" ref="thisSelect" @change="broadcastValue(event)">
            <option class="optionStyle" value="" disabled selected>Select</option>
            <option class="optionStyle" v-for="(val, index) in selectionOptions" :key="index" v-bind:value="val" >{{ val }}</option>
        </select>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  export default {
    name: "MySelect",
//    mounted () {
//      this.selectOptions=this.selectionOptions;
//      debugger;
//    },
    props: {
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
//        selectOptions: []
      }
    },
    methods: {
      broadcastValue(evt){
        console.log(evt);
//        debugger;
        this.$emit('selectMade',[this.sName, this.$refs.thisSelect.value]);
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