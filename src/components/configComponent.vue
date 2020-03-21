<template>

        <div id="drg" class="redClass" ref="drg"  draggable="true"  @dragstart="handleDragStart" @dragend="handleDragEnd" >
                <div class="configComponentHeader"></div>
                <div class="configComponentBody">
                        <configElement v-for="(configElement, index) in this.configurationElements[configurationLine].configurationElements"
                                       :currentValues="currentValues"
                                       :configElement="configElement"
                                       :key="index"
                                       @configSelected="selectionHandler_flexConfig2"  ></configElement>
                        <nextCancelButtons :currentStatus="this.configurationLine" @buttonClick="bumpLine" ></nextCancelButtons>
                </div>
        </div>

</template>

<script>
        import configElement from "../components/configElement.vue";
        import nextCancelButtons from "../components/nextCancelButtons.vue";

        export default {
        name: "configComponent",
        components: {configElement, nextCancelButtons},
        data(){
            return {
               mouseIsDown:false,
               firstMouseX:0,
               firstMouseY:0,
               lastMouseX:0,
               lastMouseY:0,

               expandedElementNow: 'null',
               closeExpanderFunction: null,
               configurationLine: 0,
               configurationElements:this.configElement,
               configurationCurrentValues:this.currentValues

            }
        },
        props: {
                    configElement: {
                            type: Object,
                            required: true
                    },
                    currentValues:{
                            type: Object,
                            required:true
                    },
                    cardType:{
                            type: String,
                            required: true
                    },
                    instanceNumberBeingConfigured:{
                            type: Number,
                            required: true
                    }
        },

        methods: {
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
        }
    }
</script>


<style scoped>
    .redClass {
        height:200px;
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
        }
        .configComponentBody {
                height: 90%;
        }

</style>