<template>
            <span>
                <span>{{this.prompt}}</span>
                <input ref="menuLabelInput" v-model="fieldValue.value" type="text" v-bind:size="fieldSize" @keydown.tab="gotoNext" v-focus="true" v-bind:placeholder="placeholderText"  />
                <nextCancelButtons :currentStatus="this.status" @buttonClick="buttonClickedHandler" ></nextCancelButtons>            </span>
</template>

<script>
  /* eslint-disable no-debugger */

  import Vue from "vue";
  import nextCancelButtons from "../components/nextCancelButtons.vue";
  export default {
    name: "SingleInput",
    components: {nextCancelButtons},
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
      },
      status: {
        type: Number,
        required: true
      }

    },
    data(){
      return {
        fieldValue:
          {
            value: '',
          },
      }
    },
    methods:{
        buttonClickedHandler(msg){
  //        debugger;
          if(msg[0]=='next'){
            this.$emit('textEntered', [this.value]);
          }
          if(msg[0]=='cancel'){
            this.$emit('configurationSelectionMade',['cancel']);
          }
          if(msg[0]=='previous'){
            this.$emit('configurationSelectionMade',['previous']);
          }
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