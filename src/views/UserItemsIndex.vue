<template>
  <div class="UserItems">
    <h1>{{ message }}</h1>
    <br>
    <router-link v-bind:to="`/groceries`">See your Grocery list</router-link>

    <h1> new item: </h1>

    <div>
      Select Item Here: <input type="text" v-model="searchTerm" list="names"/>
      <button v-on:click="addItem(); displayItems()">Add item!</button>
      <datalist id="names">
        <option v-for="item in all_items">{{item.name}}</option>
      </datalist>
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
import Vue2Filters from "vue2-filters";
import axios from "axios";
export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Welcome to you Pantry on the Go!",
      user_items: {} ,
      searchTerm: "",
      all_items: [],

    } ;
  },
  
  created: function() {
    axios.get("/api/user_items").then(response=> { // Create USerITemsShow page based on current user logged in
      console.log("user_item : ", response) ;
      this.user_items = response.data ;
    }) ;
    axios.get("/api/items").then(response=> {
      console.log("all_items:", response.ok);
      this.all_items = response.data ;
    });
  },

  methods: {
    
    addItem: function() {
      var params = {
        name: this.searchTerm,
      } ;
      axios.post("/api/user_items", params).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
      }) ;
    },
    displayItems: function() {
      axios.get("/api/user_items").then(response=> { 
        console.log("user_item : ", response) ;
        this.user_items = response.data ;
      }) ;
    },
  }
};
</script>