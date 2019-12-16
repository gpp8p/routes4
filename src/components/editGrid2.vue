<template>
  <div v-bind:style="gridParamDefinition" v-if="this.displayGrid" class="gridSection">
    <generic-card
      v-for="(instance, index) in cardInstances"
      :key="index"
      :cardType="instance.card_component"
      :card-style="instance.card_parameters.style"
      :card-id="instance.id"
      :card-key="index"
      :card-position="instance.card_position"
      @storeValue="processClick"
      ref="key"
      ></generic-card
    >
  </div>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import axios from "axios";
import EventBus from '../main.js';
import genericCard from '../components/genericCard.vue';

export default {
  name: "editGrid2",
  components: {genericCard},
  props: {
    layoutId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      csrf_token: "",
      cardInstances: [],
      gridParamDefinition: "",
      displayGrid: false,
      evmsg:'',
      topLeftClicked: 0,
      bottomRightClicked: 0,
      cstatus: 0,
      topLeftRow:0,
      topLeftCol:0,
      bottomRightRow:0,
      bottomRightCol:0,
      selectedColor: '#66bb6a',
      unSelectedColor: 'coral',
      newCardType: '',
      scolor: '',


    };
  },
  mounted () {
    EventBus.$on('load-layout', function () {
    console.log('event bus recieved event');
    });
  },
  methods: {
    layoutGridParameters(height, width) {
      var heightSize = (95 / height).toFixed(2);
      var widthSize = (98 / width.toFixed(2));
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
        "display: grid; grid-gap: 3px; background-color: #fff; height: 90vh; color: #444; " +
        gridHeightCss +
        ";" +
        gridWidthCss +
        ";";
      return gridCss;
    },
    reloadLayout: function(msg) {
      this.displayGrid=true;
      this.layoutId = msg;
      console.log("reloading" + msg);
      axios
        .get("http://localhost:8000/getLayout?layoutId=" + this.layoutId)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cardInstances = response.data.cards;
          this.gridParamDefinition = this.layoutGridParameters(
            response.data.layout.height,
            response.data.layout.width
          );
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    processClick(msg){
      console.log('editGrid2 gets storeValue-'+msg);
      this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
      this.$emit('storeValue', [msg])
    },


  }
};
</script>

<style scoped>
  .gridSection {
    margin: 2px;
    background-color: #dbddd0;
    height:82vh;
    width:98vw;
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #0a3aff;

  }
  .prompt {
    font-size: medium;
    color: blue;
    margin-bottom: 5px;
    text-align: left;
  }



</style>
