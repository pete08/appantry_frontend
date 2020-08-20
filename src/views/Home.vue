<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <br>
    <hr>

  </div>
</template>

<style>
</style>

<script>
export default {
  
  data: function() {
    return {
      message: "Welcome to you Pantry on the Go!",
      user: {} ,
    };
  },
  
  created: function() {

  },

  methods: {}
};
</script>