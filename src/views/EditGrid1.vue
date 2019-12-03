<template>
    <div>
        <h2 ref="prompt">Click On Top Left Cell</h2>
        <div class="softGridWrapper">
            <blank-component v-for="(instance, index) in cardInstances"
                             :key="index"
                             :card-style=instance.card_parameters.style
                             :card-id="instance.id"
                             :card-position=instance.card_position
                             @storeValue="processClick"
                             ref="instance.id">{{instance.message}}</blank-component>
        </div>
    </div>

</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import axios from 'axios';
  import blankComponent from "../components/blankComponent";
  export default {
    name: "EditGrid1",
    components: { blankComponent },
    data() {
      return {
        cardInstances: [],
        topLeftClicked: 0,
        bottomRightClicked: 0
      }
    },
    created: function() {
      axios.get(`http://localhost:8000/getLayout?layoutId=5`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cardInstances = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    methods:{
      processClick(msg){
        console.log(msg[0]);
        debugger;
        if(this.topLeftClicked==0){
          this.topLeftClicked=msg[0];
        }else{
          if(this.bottomRightClicked==0){
            this.bottomRightClicked = msg[0];
          }else{
            this.topLeftClicked=msg[0];
            this.bottomRightClicked=0;
          }
        }
        this.$refs.prompt.innerHTML = "Click Bottom Right Cell";

      }
    }
  };
</script>

<style scoped>
    .softGridWrapper {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10% ;
        grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10% ;
        background-color: #fff;
        height: 90vh;
        color: #444;
    }

</style>