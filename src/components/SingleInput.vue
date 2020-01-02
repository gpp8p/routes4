<template>
            <span class="layoutMenuItem">
                {{prompt}}
                <input ref="menuLabelInput" v-model="fieldValue.value" type="text" v-bind:size="fieldSize" @keydown.tab="gotoNext" v-focus="true" v-bind:placeholder="placeholderText"  />
                <MyButton @myButtonClicked="gotoNext" buttonLabel="Next"></MyButton>
                <MyButton @myButtonClicked="this.cancel" buttonLabel="Cancel"></MyButton>
            </span>
</template>

<script>
  export default {
    name: "SingleInput",
    props:{
      prompt: {
        type: String,
        required: true
      },
      fieldSize: {
        type: String,
        required: true
      },
      placeholderText : {
        type: String,
        required: true
      }

    },
    data(){
      return {
        fieldValue:
          {
            value: ''
          },
      }
    },
    methods:{
      gotoNext(){
        this.$emit('gotoNextField', [this.fieldValue.value])
      },
      gotoPrevious(){
        this.$emit('gotoPreviousField', [this.fieldValue.value])
      }
    },
    directives:{
      focus:{
        inserted: function (el) {
//          debugger;
          el.focus()
        },
        update: function (el) {
          Vue.nextTick(function() {
            el.focus();
          })
        }
      }
    }
  };
</script>

<style scoped>

    .dummyStyle{
        background-color: aqua;
    }

</style>