<template>
  <div class="UserItemsShow">
    <h1>{{ message }}</h1>
    <br>
    <hr>
    <div v-for="item in user_items">
    <ul>
      <br>
      <li> item_name: {{item.item_name}} </li>
      <li> used: {{item.used}} </li>
      <li> future_interest: {{item.future_interest}} </li>
      <hr>
    </ul>
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
      message: "Welcome to you Pantry on the Go!",
      user_items: {} ,
    };
  },
  
  created: function() {
    axios.get("/api/user_items/1").then(response=> { // Create USerITemsShow page based on current user logged in
      console.log("user_items pantry: ", response) ;
      this.user_items = response.data ;
    });
  },

  methods: {}
};
</script>