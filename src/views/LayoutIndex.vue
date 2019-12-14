<template>
    <span>
        <section class="navbarWrapper">
            <div class="navbar">

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
        <section v-if='gridView' class="gridSection">
            <editGrid2 :layoutId="selectedLayoutId" ref="editGrid"></editGrid2>
        </section>
    </span>
</template>

<script>
  /* eslint-disable no-debugger */

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
        allLayouts: [],
        gridView: true,
        listView: true,
        selectedLayoutId: ''
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
        EventBus.$emit('load-layout', msg);
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
    }
    .gridSection {
        height: 93vh;
        width: 100vw;
        background-color: #ffffff;
    }
</style>