<template>
  <div class="UserItems">
    <h1>{{ message }}</h1>
    <br>
    <router-link v-bind:to="`/groceries`">See your Grocery list</router-link>
    <hr>
    
    <h1> new item: </h1>
    <div>
      name: <input type="text" v-model="name" />
      item id: <input type="text" v-model="item_id" />
      <button v-on:click="addItem()">Add item!</button>
    </div>
    
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
      item_id: "",
      name: "",
    } ;
  },
  
  created: function() {
    axios.get("/api/user_items").then(response=> { // Create USerITemsShow page based on current user logged in
      console.log("user_item : ", response) ;
      this.user_items = response.data ;
    }) ;
  },

  methods: {
    
    addItem: function() {
      var params = {
        name: this.name,
        item_id: this.item_id,
      }
      axios.post("/api/user_items", params).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
      }) ;
    }
  }
};
</script>