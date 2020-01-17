<template>
    <div class="mPanel" >
        Here is a moveable panel
    </div>
</template>

<script>
  export default {
    name: "MoveablePanel",
    data(){
      return {
        topNow:100,
        leftNow:100,
        locationStyle:"top: "+this.topNow+'px; left:'+this.leftNow+'px;'
      }
    }
  };
</script>

<style scoped>
    .mpanel {
        position: absolute;
        z-index: 9;
        color: red;
        background-color: #f1baec;
        border: 2px solid #d3321a;
        text-align: center;
        top:100px;
        left:100px;
        height:200px;
        width:200px;
        border-radius: 10px;

    }

</style>