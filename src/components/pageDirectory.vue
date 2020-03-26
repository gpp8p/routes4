<template>
    <div id="drg" class="redClass" ref="drg"  draggable="true"  @dragstart="handleDragStart" @dragend="handleDragEnd" >
        <div class="configComponentHeader">
            <span class="headingText">Select Page</span>
        </div>
        <div class="configComponentBody">
            <select v-model="layoutSelected" @change="setMessage">
                <option v-for="(option, index) in allLayouts" v-bind:value="option.id" :key="index">
                    {{ option.menu_label }}
                </option>
            </select>
            <button type="button"
                    v-clipboard:copy="message"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">Copy!</button>

        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import axios from "axios";

  Vue.use(VueClipboard)
  export default {
    name: "pageDirectory",
    data: function () {
      return {
        message: '',
        allLayouts: [],
        layoutSelected:0
      }
    },
    mounted: function() {
      axios.get('http://localhost:8000//layoutList')
        .then(response => {
// eslint-disable-next-line no-debugger
          // JSON responses are automatically parsed.
          this.allLayouts = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    methods:{
      layoutUrl(){
        return 'http://localhost:8000/getLayout?layoutId='+this.layoutSelected;
      },
      setMessage(){
        this.message='http://localhost:8000/getLayout?layoutId='+this.layoutSelected;
      },
      handleDragStart(evt){
        this.firstMouseX = evt.screenX;
        this.firstMouseY = evt.screenY;
        this.$emit('startDrag', [this.firstMouseX,this.firstMouseY]);
      },
      handleDragEnd(evt){
        // eslint-disable-next-line no-debugger
        //               debugger;
        this.lastMouseX = evt.screenX;
        this.lastMouseY = evt.screenY;
        this.$emit('newLocation',[this.lastMouseX, this.lastMouseY]);
        // eslint-disable-next-line no-console
        console.log(evt);
      },
      onCopy: function (e) {
        alert('You just copied: ' + e.text)
      },
      onError: function (e) {
        alert('Failed to copy texts'+e.text)
      }
    }
  };
</script>

<style scoped>
    .redClass {
        height:250px;
        width:500px;
        background-color: #ab97ff;
        border: 2px solid blue;
        border-radius: 8px;
        box-shadow: 10px 10px 5px grey;
    }
    .floatingObject {
        height:250px;
        width:500px;
        background-color: #ab97ff;
        border: 2px solid blue;
        border-radius: 8px;
        box-shadow: 10px 10px 5px grey;
    }
    .configComponentHeader{
        height:10%;
        background-color: #fff722;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
        color: blue;
        font-family: Geneva;
        font-size: 12px;
        font-style: normal;
        font-weight: bold;
    }
    .headingText{
        margin-top: 5px;
    }
    .configComponentBody {
        height: 90%;
        margin-left: 10px;
        margin-right: 10px;
    }

</style>