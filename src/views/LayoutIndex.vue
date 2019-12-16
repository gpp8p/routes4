<template>
    <span>
        <section class="navbarWrapper">
            <div class="navbar">
                <span v-show="showTopLeftPrompt" class="prompt">Click on the top left cell of where you wish to place the card ?</span>
            </div>
        </section>
        <section v-if="listView" class="intro">
            <div class="content">
                <layoutListHeader></layoutListHeader>
                <LayoutListLine v-for="(layout, index) in allLayouts"
                    :key="index"
                    :id="layout.id"
                    :description="layout.description"
                    :menu_label="layout.menu_label"
                    :height="layout.height"
                    :width="layout.width"
                    @layoutSelected="layoutSelected"
                >
                </LayoutListLine>
            </div>
        </section>
        <section v-if='gridView'>
            <editGrid2 :layoutId="selectedLayoutId" ref="editGrid" @storeValue="cellClicked"></editGrid2>
        </section>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import LayoutListLine from '../components/LayoutListLine.vue';
  import layoutListHeader from '../components/layoutListHeader.vue'
  import EventBus  from '../main.js';
  import axios from 'axios';
  import editGrid2 from '../components/editGrid2';
  export default {
    name: "LayoutIndex",
    components: {LayoutListLine, layoutListHeader, editGrid2},
    data () {
      return {
        WAITINGFORCLICK:0,
        TOPLEFTCLICKED:1,
        BOTTOMRIGHTCLICKED:2,
        SELECTAREAOK:3,
        WAITINGFORNAME:4,
        WAITINGFORTYPE:5,
        WAITINGFORSUBMIT:6,
        WAITINGTOSAVE:8,
        CANCELLAYOUTUPDATE:7,
        
        allLayouts: [],
        gridView: true,
        listView: true,
        selectedLayoutId: '',
        showSelectOkButtons: false,
        showTopLeftPrompt: false,
        showBottomRightPrompt: false,
        showCardNamePrompt: false,
        showCardComponentSelect: false,
        showSubmbitButtons: false,
        nameField:
          {
            value:''
          }

      }
    },
    created: function(){

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
    methods: {
      layoutSelected(msg){
        this.listView=false;
        this.gridView=true;
        this.$refs.editGrid.reloadLayout(msg);
        this.showTopLeftPrompt = true;
        EventBus.$emit('load-layout', msg);
      },
      cellClicked(msg){
        console.log('layoutIndex notified of click in cell:'+msg)
      }
    }

  };
</script>

<style scoped>
    section {
        width: 100vw;
        padding: 0 0%;
        display: table;
        margin: 0;
        max-width: none;
        height: 100vh;

    }
    .content {
        margin: 2px;
        background-color: #dbddd0;
        height:90vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;

    }
    .intro {
        height: 93vh;
        width: 100vw;
        background-color: #ffffff;


    }
    .navbarWrapper {
        height: 7vh;
        width: 100vw;
        background-color: #ffffff;

    }
    .navbar {
        margin: 2px;
        background-color: #ffcd90;
        height:6vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
    }
</style>