<script>
  /* eslint-disable no-debugger,no-console */
  import axios from "axios";
  export default {
    name: "CardBase",
    methods: {
      setCardData(cardData, cardDataElement) {
      debugger;
        switch (cardDataElement) {
          case "saveConfiguration":
            this.saveCardConfiguration();
            break;
          case "title":
            this.cardTitle = cardData;
            this.configurationCurrentValues['title']=cardData;
            this.content.title = cardData;
            break;
          case "backgroundColor":
            this.$el.style.backgroundColor=cardData;
            this.configurationCurrentValues['backgroundColor']=cardData;
            this.styling.backgroundColor="background-color:"+cardData+";";
            break
          case "backgroundImage":
            var backGroundImageReference = "url('" + cardData + "')";
            this.$el.style.backgroundImage = backGroundImageReference;
            this.configurationCurrentValues['backgroundImage']=backGroundImageReference;
            this.styling.backgroundImage = "background-image:"+ cardData+";";
            this.$el.style.backgroundSize="100% 100%";
            this.configurationCurrentValues['backgroundSize']="100% 100%";
            this.styling.backgroundSize="background-size:100% 100%;";
            break;
          case "fontFamily":
            this.$el.style.fontFamily=cardData;
            this.configurationCurrentValues['fontFamily']=cardData;
            this.styling.fontFamily = "font-family:"+cardData+";";
            break;
          case "fontSize":
            this.$el.style.fontSize=cardData;
            this.configurationCurrentValues['fontSize']=cardData;
            this.styling.fontSize= "font-size:"+cardData+";";
            break;
          case "fontWeight":
            this.$el.style.fontWeight=cardData;
            this.configurationCurrentValues['fontWeight']=cardData;
            this.styling.fontWeight= "font-weight:"+cardData+";";
            break;
          case "fontStyle":
            this.$el.style.fontStyle=cardData;
            this.configurationCurrentValues['fontStyle']=cardData;
            this.styling.fontStyle= "font-style:"+cardData+";";
            break;
          case "color":
            this.$el.style.color=cardData;
            this.configurationCurrentValues['color']=cardData;
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
          case "shadow":
            if(cardData=="activated"){
              this.$el.style.boxShadow="10px 20px 30px black";
              this.configurationCurrentValues['shadowSize']="default"
              this.styling.boxShadow = "box-shadow:10px 20px 20px black;";
            }else{
              this.$el.style.boxShadow="";
              this.configurationCurrentValues['shadowSize']="";
            }
            break;
          case "shadowSize":
//            debugger;
            switch(cardData){
              case "5px":
                this.$el.style.boxShadow="5px 10px 20px black";
                this.configurationCurrentValues['shadowSize']="5px";
//                this.configurationCurrentValues['shadowSize']="5px";
                break;
              case "10px":
                this.$el.style.boxShadow="10px 10px 30px black";
                this.configurationCurrentValues['shadowSize']="10px";
//                this.configurationCurrentValues['shadowSize']="10px";
                break;
              case "20px":
                this.$el.style.boxShadow="20px 20px 30px black";
                this.configurationCurrentValues['shadowSize']="20px";
//                this.configurationCurrentValues['shadowSize']="20px";
                break;
              case "Shadow Size?":
                this.$el.style.boxShadow="10px 20px 30px black";
                this.configurationCurrentValues['shadowSize']="default";
                break;
            }
            break;
          case "shadowColor":
            switch(this.configurationCurrentValues['shadowSize']){
              case "5px":
                this.$el.style.boxShadow="5px 10px 20px "+cardData;
                this.configurationCurrentValues['shadowSize']="5px";
                break;
              case "10px":
                this.$el.style.boxShadow="10px 10px 30px "+cardData;
                this.configurationCurrentValues['shadowSize']="10px";
                break;
              case "20px":
                this.$el.style.boxShadow="20px 20px 30px cardData";
                this.configurationCurrentValues['shadowSize']="20px";
                break;
              case "Shadow Size?":
                this.$el.style.boxShadow="10px 20px 30px cardData";
                break;
            }
            break;

          case "border":
            if(cardData=='activated'){
              this.$el.style.border="thin solid #0000FF";
            }else{
              this.$el.style.border=cardData;
              this.styling.border= "border:"+cardData+";";
            }
            break;
          case "borderSize":
            this.$el.style.borderWidth = cardData;
            break;
          case "borderColor":
            this.$el.style.borderColor = cardData;
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
        debugger;
        axios.post('http://localhost:8000/saveCardParameters?XDEBUG_SESSION_START=15122', {
          cardParams: jsonCardConfigurationPackage,
        }).then(response=>
        {
            console.log(response);
            this.$emit('configurationHasBeenSaved')
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