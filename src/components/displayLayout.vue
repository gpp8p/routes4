<template>
    <div v-bind:style="gridParamDefinition">
        <display-generic-card
                v-for="(instance, index) in cardInstances"
                :key="index"
                :cardType="instance.card_component"
                :card-style="instance.card_parameters.style"
                :card-id="instance.id"
                :card-key="index"
                :card-position="instance.card_position"
                :gridCss="gridParamDefinition"
                :cardProperties="instance.card_parameters.properties">

        </display-generic-card>
    </div>
</template>

<script>
  import DisplayGenericCard from "./displayGenericCard";
  import axios from "axios";
  export default {
    name: "displayLayout",
    components: { DisplayGenericCard },
    props:{
      layoutId: {
        type: String,
        required: true
      }
    },
    data(){
      return{
        cardInstances:[],
      }
    },
    mounted() {
      this.cardInstances = [];
//      console.log("reloading" + msg);
      axios
        .get("http://localhost:8000/getLayout?layoutId=" + this.layoutId+"&&XDEBUG_SESSION_START=15122")
        .then(response => {
          // JSON responses are automatically parsed.
//          debugger;
          this.cardInstances = response.data.cards;
          this.gridParamDefinition = this.layoutGridParameters(
            response.data.layout.height,
            response.data.layout.width,
            response.data.layout.backgroundColor
          );
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log(e);
          this.errors.push(e);
        });
    },
    methods:{
      layoutGridParameters(height, width, backgroundColor) {
        var heightSize = (95 / height).toFixed(2);
        var widthSize = (98 / width).toFixed(2);
        var gridHeightCss = "grid-template-rows: ";
        var gridWidthCss = "grid-template-columns: ";
        var x = 0;
        for (x = 0; x < height; x++) {
          gridHeightCss = gridHeightCss + heightSize + "% ";
        }
        for (x = 0; x < width; x++) {
          gridWidthCss = gridWidthCss + widthSize + "% ";
        }
        var gridCss =
          "display: grid; grid-gap: 3px; background-color: "+backgroundColor+"; height: 100vh; color: #ffcd90; " +
          gridHeightCss +
          ";" +
          gridWidthCss +
          ";";
        return gridCss;
      },
    }
  };
</script>

<style scoped>

</style>