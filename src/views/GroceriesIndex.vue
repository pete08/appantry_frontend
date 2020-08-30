<template>
  <div class="Groceries">
    <h1>{{ message }}</h1>
    <br>
    <router-link v-bind:to="`/pantry`">See Pantry</router-link>

    <h1> new item: </h1>

    <div>
      Select Item Here: <input type="text" v-model="searchTerm" list="names"/>
      <button v-on:click="addItem(); displayItems()">Add item!</button>
      <datalist id="names">
        <option v-for="item in all_items">{{item.name}}</option>
      </datalist>
    </div>

    <hr>
    <div v-for="item in list">
      <br>
      <p> item_name: {{item.item_name}} </p>
      <p> used: {{item.used}} </p>
      <p> future_interest: {{item.future_interest}} </p>
      <button v-on:click="groceryItem(item)">Edit</button>
      <hr>
    </div>

    <dialog id="item-edit">
      <form method="dialog">
        <p> Name: {{currentItem.item_name}} </p>
        <button v-on:click="addToPantry(currentItem)">Add to Pantry!</button>
        <button>Close</button>
      </form>
    </dialog>

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
      currentItem: {},
      searchTerm: "",
      all_items: [],
    };
  },
  
  created: function() {
    axios.get("/api/groceries").then(response=>{ 
      console.log("groceries: ", response) ;
      this.list = response.data ;
    });
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
      axios.post("/api/groceries", params).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
        this.searchTerm = "";
      }) ;
    },

    displayItems: function() {
      axios.get("/api/groceries").then(response=>{ 
        console.log("groceries: ", response) ;
        this.list = response.data ;
      });
    },

    groceryItem: function(item) {
      this.currentItem = item;
      document.querySelector("#item-edit").showModal();
    },


    addToPantry: function(item) {
      var params = {
        used: false,
        future_interest: true,
      };
      axios
        .put("/api/groceries/" + item.id, params)
        .then(response => {
          console.log("User_Item update: ", response);
          this.currentItem = {};
        });
    },
  }
};
</script>