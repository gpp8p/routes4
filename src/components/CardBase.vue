<script>
  /* eslint-disable no-debugger,no-console */
  import axios from "axios";
  export default {
    name: "CardBase",
    methods: {
      setCardData(cardData, cardDataElement) {
//      debugger;
        switch (cardDataElement) {
          case "saveConfiguration":
            this.saveCardConfiguration();
            break;
          case "title":
            this.cardTitle = cardData;
            this.content.title = cardData;
            break;
          case "backgroundColor":
            this.$el.style.backgroundColor=cardData;
            this.styling.backgroundColor="background-color:"+cardData+";";
            break
          case "backgroundImage":
            var backGroundImageReference = "url('" + cardData + "')";
            this.$el.style.backgroundImage = backGroundImageReference;
            this.styling.backgroundImage = "background-image:"+ cardData+";";
            this.$el.style.backgroundSize="100% 100%";
            this.styling.backgroundSize="background-size:100% 100%;";
            break;
          case "fontFamily":
            this.$el.style.fontFamily=cardData;
            this.styling.fontFamily = "font-family:"+cardData+";";
            break;
          case "fontSize":
            this.$el.style.fontSize=cardData;
            this.styling.fontSize= "font-size:"+cardData+";";
            break;
          case "fontWeight":
            this.$el.style.fontWeight=cardData;
            this.styling.fontWeight= "font-weight:"+cardData+";";
            break;
          case "fontStyle":
            this.$el.style.fontStyle=cardData;
            this.styling.fontStyle= "font-style:"+cardData+";";
            break;
          case "color":
            this.$el.style.color=cardData;
            this.styling.color= "color:"+cardData+";";
            break;
          case "textAlign":
            this.$el.style.textAlign=cardData;
            this.styling.textAlign= "text-align:"+cardData+";";
            break;
          case "roundIncluded":
            this.$el.style.borderRadius="6px";
            this.styling.borderRadius="border-radius:6px;";
            break;
          case "shodowIncluded":
            this.$el.style.boxShadow="10px 20px 30px black";
            this.styling.boxShadow = "box-shadow:10px 20px 30px black;";
            break;
          case "border":
            this.$el.style.border=cardData;
            this.styling.border= "border:"+cardData+";";
            break;
        }
        return this.cardKey;
      },
      reloadCardData(cStyle){
//        console.log(cStyle);
        var cssPropertyArray = cStyle.split(';');
        for(var p=0;p<cssPropertyArray.length;p++){
          switch(cssPropertyArray[p]){
            case "background-color":
              break;
          }
        }
      },
      saveCardConfiguration(){
        var cardConfigurationPackage = [this.cardId, this.styling, this.content];
        var jsonCardConfigurationPackage = JSON.stringify(cardConfigurationPackage);
//      debugger;
        axios.post('http://localhost:8000/saveCardParameters?XDEBUG_SESSION_START=15122', {
          cardParams: jsonCardConfigurationPackage,
        }).then(response=>
        {
            console.log(response);
        }).catch(function(error) {
          console.log(error);
        });

        console.log(jsonCardConfigurationPackage);
      }
    }
  };
</script>

<style scoped>

</style>