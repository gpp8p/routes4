<template>
    <div>
        <h2>Soft Grid</h2>
        <div class="softGridWrapper">
            <blank-component v-for="(instance, index) in cardInstances" :key="index" :card-style=instance.card_parameters.style :card-id="instance.id">{{instance.message}}</blank-component>
        </div>
    </div>

</template>

<script>
  /* eslint-disable no-debugger */

  import axios from 'axios';
  import blankComponent from "../components/blankComponent";
  export default {
    name: "SoftGrid1",
    components: { blankComponent },
    data() {
      return {
        cardInstances: []
      }
    },
    created: function() {
      axios.get(`http://localhost:8000/cardinstances?layout_name=Front_Page`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cardInstances = response.data;
          debugger;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  };
</script>

<style scoped>
    .softGridWrapper {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: 33% 33% 33%;
        grid-template-rows: 50% 50%;
        background-color: #fff;
        height: 90vh;
        color: #444;
    }

</style>