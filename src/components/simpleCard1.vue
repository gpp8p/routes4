<template>
    <div class="flex-item-combo" v-bind:style=cardStyle>
        <div class="top-flex-item">
            Top - {{cardId}}
        </div>
        <div class="bottom-flex-item">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "simpleCard1",
    props: {
      cardStyle: {
        type: String,
        required: true
      },
      cardId: {
        type: String,
        required: true
      }
    }
  };
</script>

<style scoped>
    .flex-item-combo {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    }

    .top-flex-item {
        background: #1bff2f;
        width: 100%;
        height: 75%;


        line-height: 30px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;

    }

    .bottom-flex-item {
        background: blue;
        width: 100%;
        height: 25%;


        line-height: 30px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        text-align: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

    }
</style>