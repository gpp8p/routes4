<template>
    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
    </div>
</template>

<script>
  /* eslint-disable no-console,no-debugger */
  import axios from 'axios';
  export default {
    name: "SingleFile",
    data(){
      return {
        file: '',
        user: 'dev'
      }
    },

    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
        let formData = new FormData();

        /*
            Add the form data we need to submit
        */
        formData.append('file', this.file);
        formData.append('usr', this.user);
// eslint-disable-next-line no-debugger
//        debugger;

        /*
          Make the request to the POST /single-file URL
        */
        axios.post( 'http://localhost:8000/imageUpload?XDEBUG_SESSION_START=15617',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(response){
          debugger;
          console.log('SUCCESS!!'+response.data);
          this.$emit('filePath', [response.data]);
        }).bind(this)
          .catch(function(error){
            debugger;
            console.log('FAILURE!!'+error);
          });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  };
</script>

<style scoped>

</style>