<template>
  <div class="Groceries">
    <h1>{{ message }}</h1>
    <br>
    <router-link v-bind:to="`/pantry`">See Pantry</router-link>
    <hr>
    <div v-for="item in list">
      <br>
      <p> item_name: {{item.item_name}} </p>
      <p> used: {{item.used}} </p>
      <p> future_interest: {{item.future_interest}} </p>
      <hr>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to your Grocery List!",
      list: {} ,
    };
  },
  
  created: function() {
    axios.get("/api/groceries").then(response=>{ 
      console.log("groceries: ", response) ;
      this.list = response.data ;
    });
  },

  methods: {}
};
</script>