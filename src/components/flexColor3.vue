<template>
        <span>
                <label class="input-color-label" for="input-color">
                     Layout Background Color:
                </label>

                <span class="input-color-container">
                      <input  id="input-color" type="color" class="input-color" @change="newColor" :value="val"/>
                </span>
        </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  export default {
    name: "flexColor3",
    data(){
      return{
        val:this.getCurrentValue()
      }
    },
    props: {
      currentValues:{
        type: Object,
        required: false
      }

    },

    watch:{
      currentValues: function(){
//        debugger;
        this.val = this.getCurrentValue();
      }
    },

    methods: {
      newColor(evt) {
        console.log(evt.target.value);
        this.currentValues=evt.target.value;
        this.$emit("colorSelected",[this.currentValues]);

      },
      getCurrentValue() {
//        debugger;
        if (typeof(this.currentValues) == 'undefined') {
          return '#FFFFFF';
        } else {
          return this.currentValues;
        }
      }
    }

    };
</script>

<style scoped>
    .input-color-container {
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 20px;
        top: 2px;
        margin-right: 5px;
        border: solid 2px #ddd;
        border-radius: 40px;
    }

    .input-color {
        position: absolute;
        right: -8px;
        top: -5px;
        width: 36px;
        height: 26px;
        border: none;
    }

    .input-color-label {
        cursor: pointer;
        text-decoration: underline;
        color: #3498db;
        margin-right: 30px;
    }

</style>