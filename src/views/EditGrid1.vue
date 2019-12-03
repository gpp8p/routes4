<template>
    <div>
        <span class="prompt" ref="prompt">Click On Top Left Cell<MyButton buttonLabel="Yes"></MyButton></span>
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
  import MyButton from "../components/MyButton";
  export default {
    name: "EditGrid1",
    components: { blankComponent, MyButton },
    data() {
      return {
        cardInstances: [],
        topLeftClicked: 0,
        bottomRightClicked: 0,
        cstatus: 0
      }
    },
    created: function() {
      this.WAITINGFORCLICK=0;
      this.TOPLEFTCLICKED =1;
      this.BOTTOMRIGHTCLICKED=2;
      this.WAITINGTOSAVE=3;
      this.CANCELLAYOUTUPDFATE=4;
      axios.get(`http://localhost:8000/getLayout?layoutId=5`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cardInstances = response.data;
          this.cstatus=this.WAITINGFORCLICK;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    methods:{
      processClick(msg){
        console.log(msg[0]);
        switch(this.cstatus){
          case this.WAITINGFORCLICK:
            this.topLeftClicked=msg[0];
            this.cstatus=this.TOPLEFTCLICKED;
            this.$refs.prompt.innerHTML = "Click Bottom Right Cell";
            break;
          case this.TOPLEFTCLICKED:
            this.bottomRightClicked = msg[0];
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.$refs.prompt.innerHTML = "Is this the area you wish to fill ? ";
            break;
          case this.BOTTOMRIGHTCLICKED:
            this.$refs.prompt.innerHTML = "Start over - click on top left cell";
            this.cstatus = this.WAITINGFORCLICK;
            this.topLeftClicked=0;
            this.bottomRightClicked
            break;


        }
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

    .prompt {
        font-size: medium;
        color: blue;
    }



</style>