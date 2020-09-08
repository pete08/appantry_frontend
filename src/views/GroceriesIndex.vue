<template>

  <div id="app">
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <!-- Three -->
        <section id="three">
          <div class="container">
            <h3>Your Grocery List!</h3>
            <p>This page reminds you of all the obscure items you'll forget about!</p>

              <!-- <div class="outer"> -->
              <div class="row aln-bottom">
                <div class="col-8">

                  Add Item Here: <input type="text" v-model="searchTerm" list="names"/>

                </div>
                <div class="col-4">
                        <button v-on:click="addItem()">Add to Grocery List!</button>
                        <datalist id="names">
                          <option v-for="item in all_items">{{item.name}}</option>
                        </datalist>
                </div>
              </div>
              <!-- </div> -->
              <br>
              <hr>
            <div class="features">
              
                  <div v-for="item in list">
                    <div class="row">
                    <!-- <article> -->
                      <div class="col-4">
                        <h4> {{item.item_name}} </h4> 
                      </div>
                      <div class="col-8">
                          <!-- used: {{item.used}} 
                          future_interest: {{item.future_interest}}  -->
                          <button v-on:click="groceryItem(item)">Edit</button>
                      </div>
                    </div>

                    <!-- </article> -->
                        <hr>
                  </div>
              
              
              <dialog id="item-edit">
                <form method="dialog">

                  <h4> {{currentItem.item_name}} </h4>
                  <form v-on:submit="addToPantry(currentItem)">
                    <ul class="actions">
                      <li><input type="submit" value="Got it! Add to Pantry"/></li>
                    </ul>
                  </form>
                  <button>Close</button>

                </form>
              </dialog>
            </div>
          </div>
        </section>
      </div>
    </div>  
  </div>
  


              <!-- <template>
                <div class="Groceries">
                  <h1>{{ message }}</h1>
                  <br>
                  <router-link v-bind:to="`/pantry`">See Pantry</router-link>

                  <h1> new item: </h1>

                  <div>
                    Select Item Here: <input type="text" v-model="searchTerm" list="names"/>
                    <button v-on:click="addItem()">Add item to Grocery List!</button>
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
                      <button v-on:click="addToPantry(currentItem)">Got it! Add it to the Pantry!</button>
                      <button>Close</button>
                    </form>
                  </dialog>

                </div>
              </template> -->
</template>


<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Welcome to your Grocery List!",
      list: [] ,
      currentItem: {},
      searchTerm: "",
      all_items: [],
      jwt: localStorage.jwt,
    };
  },
  
  created: function() {
    var params = {
      headers: {Authorization: "Bearer " + this.jwt},
    };
    axios.get("/api/groceries", params).then(response=>{ 
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
      var config = {
        headers: {Authorization: "Bearer " + this.jwt},
      } ;
      axios.post("/api/groceries", params, config).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
        this.searchTerm = "";
      }) ;
    },

    displayItems: function() {
      var params = {
        name: this.searchTerm,
      } ;
      var config = {
        headers: {Authorization: "Bearer " + this.jwt},
      } ;
      axios.get("/api/groceries", params, config).then(response=>{ 
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
      var config = {
        headers: {Authorization: "Bearer " + this.jwt},
      } ;
      axios.put("/api/groceries/" + item.id, params, config).then(response => {
        console.log("User_Item update: ", response);
        this.currentItem = {};
        item = "";
      });
    },
  }
};
</script>