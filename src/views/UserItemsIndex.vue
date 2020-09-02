<template>
  



  <div class="UserItems">
    <h1>{{ message }}</h1>
    <br>
    <router-link v-bind:to="`/groceries`">See your Grocery list</router-link>

    <h1> new item: </h1>

    <div>
      Select Item Here: <input type="text" v-model="searchTerm" list="names"/>
      <button v-on:click="addItem(), displayItems()">Add item!</button>
      <datalist id="names">
        <option v-for="item in all_items">{{item.name}}</option>
      </datalist>
    </div>
    
    <hr>

    <div v-for="item in user_items">
      <p> item_name: {{item.item_name}} </p>
      <p> used: {{item.used}} 
          future_interest: {{item.future_interest}} 
      </p>
      <button v-on:click="showItem(item)">Edit</button>
      <hr>
    </div>

    <dialog id="item-edit">
      <form method="dialog">
        <p> Name: {{currentItem.item_name}} </p>
        <button v-on:click="addToGroceryList(currentItem)">Add to Grocery List</button>
        <button v-on:click="destroy(currentItem)">Delete, Dont buy Again</button>
        <button>Close</button>
      </form>
    </dialog>


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
      currentItem: {},
      jwt: localStorage.jwt,

    } ;
  },
  
  created: function() {
    var params = {
      headers: {Authorization: "Bearer " + this.jwt},
    };
    console.log("*" * 45) ;
    console.log("*" * 45) ;
    console.log(localStorage.jwt) ; 
    console.log("*" * 45) ;
    console.log("*" * 45) ;
    
    axios
      .get("/api/user_items", params)
      .then(response=> { // Create USerITemsShow page based on current user logged in
        console.log("user_item : ", response) ;
        this.user_items = response.data ;
      }) ;
      
    axios
      .get("/api/items").then(response=> {
        console.log("all_items:", response.ok);
        this.all_items = response.data ;
      });
  },

  methods: {
    
    addItem: function() { 
      // console.log(localStorage.jwt) ; 
      var params = {
        name: this.searchTerm,
      } ;
      var config = {
        headers: {
          Authorization: "Bearer " + localStorage.jwt
        }
      } ;
      axios.post("/api/user_items", params, config).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
        this.searchTerm = "";
      }) ;
    },

    showItem: function(item) {
      this.currentItem = item;
      document.querySelector("#item-edit").showModal();
    },

    displayItems: function() {
      var config = {
        headers: {
          Authorization: "Bearer " + localStorage.jwt
        }
      } ;
      axios.get("/api/user_items", config).then(response=> { 
        console.log("user_item : ", response) ;
        this.user_items = response.data ;
      }) ;
    },

    addToGroceryList: function(item) {
      var params = {
        used: true,
        future_interest: true,
      };
      var config = {
        headers: {
          Authorization: "Bearer " + localStorage.jwt
        }
      };
      axios
        .put("/api/user_items/" + item.id, params, config)
        .then(response => {
          console.log("User_Item update: ", response);
          this.currentItem = {};
        });
    },

    destroy: function(item) {
      var config = {
        headers: {
          Authorization: "Bearer " + localStorage.jwt
        }
      };
      axios.delete("/api/user_items/" + item.id, config).then(response=>{
        console.log("User_item destroyed: ", response);
        this.currentItem = {};
      });
    }


  }
};
</script>