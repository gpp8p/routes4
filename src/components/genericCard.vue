<template>
    <span>
        <span v-if="cardType=='blankCard'">
            <blank-component
                    :card-style=cardStyle
                    :card-id=cardId
                    :card-key=cardKey
                    :card-position=cardPosition
                    @storeValue="processClick"
                    ref="cardKey"
            ></blank-component>
        </span>

    </span>
    
</template>

<script>
  import BlankComponent from "./blankComponent";
  export default {
    name: "genericCard",
    components: { BlankComponent },
    props: {
      cardType: {
        type: String,
        required: true
      },
      cardStyle: {
        type: String,
        required: true
      },
      cardId: {
        type: String,
        required: true
      },
      cardKey:{
        type: String,
        required: true
      },
      cardPosition: {
        type: Array,
        required: true
      }
    },
    methods: {
      processClick(msg){
        this.$emit('storeValue', [msg])
      }
    }
  };
</script>

<style scoped>

</style>