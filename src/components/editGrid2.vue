<template>
  <div v-bind:style="gridParamDefinition">
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
import { EventBus } from './event-bus.js';

export default {
  name: "editGrid2",
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
      gridParamDefinition: ""
    };
  },
  mounted () {
    EventBus.$on('load-layout', function (msg) {
        this.reloadLayout(msg);
    });
  },
  created: function() {
    axios
      .get("http://localhost:8000/getLayout?layoutId=" + this.layoutId)
      .then(response => {
        // JSON responses are automatically parsed.
        this.cardInstances = response.data.cards;
        this.gridParamDefinition = this.layoutGridParameters(
          response.data.layout.height,
          response.data.layout.width
        );
        debugger;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    layoutGridParameters(height, width) {
      var heightSize = Math.round(100 / height);
      var widthSize = Math.round(100 / width);
      var gridHeightCss = "grid-template-rows: ";
      var gridWidthCss = "grid-template-rows: ";
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
      console.log("reloading" + msg);
    }
  }
};
</script>

<style scoped></style>
