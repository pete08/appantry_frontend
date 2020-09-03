<template>

  <div id="app">
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <!-- Three -->
        <section id="three">
          <div class="container">
            <h3>Your Pantry!</h3>
            <p>This is the page to browse when your shopping and totally forgot you had low-sodium soy sauce.</p>
            <div class="features">
              <!-- <article> -->
              <!-- <a href="/#" class="image"><img src="images/pic01.jpg" alt="" /></a> -->
              <div class="outer">
                <div>
                  Add Item Here: <input type="text" v-model="searchTerm" list="names"/>
                  <button v-on:click="addItem(), displayItems()">Add item!</button>
                  <datalist id="names">
                    <option v-for="item in all_items">{{item.name}}</option>
                  </datalist>
                </div>
              </div>
              <!-- </article> -->
              <!-- NOT USED Due to modal DISSAPEARING when selected -->
                <!-- <hr>
                <div v-for="item in user_items">
                  <article>
                  <a href="/#" class="image"><img src="images/pic01.jpg" height= "125" alt="" /></a>
                  <div class="inner">
                      <div class="col-6">
                        <h4> {{item.item_name}} </h4>
                        <p> 
                        used: {{item.used}} 
                        future_interest: {{item.future_interest}} 
                        
                        <button v-on:click="showItem(item)">Edit</button>
                        </p>
                        <form v-on:submit="showItem(item)">
                          <ul class="actions">
                            <button v-on:click="addItem(), displayItems()">Add item!</button>
                            <li><input type="submit" value="Edit"/></li>
                          </ul>
                        </form>

                      </div>
                  </div>
                  </article>
                </div> -->

                  





    



            <!-- <div class="UserItems"> -->
              <!-- <h1>{{ message }}</h1>
              <br>
              <router-link v-bind:to="`/groceries`">See your Grocery list</router-link>

              <h1> new item: </h1> -->

              <!-- <div>
                Select Item Here: <input type="text" v-model="searchTerm" list="names"/>
                <button v-on:click="addItem(), displayItems()">Add item!</button>
                <datalist id="names">
                  <option v-for="item in all_items">{{item.name}}</option>
                </datalist>
              </div> -->
              
              <hr>
              
              <div v-for="item in user_items">
                <h4> {{item.item_name}} </h4> 
                <p> used: {{item.used}} 
                    future_interest: {{item.future_interest}} 
                </p>
                <button v-on:click="showItem(item)">Edit</button>
                <hr>
              </div>

              <dialog id="item-edit">
                <form method="dialog">

                  <h4> {{currentItem.item_name}} </h4>
                  <form v-on:submit="addToGroceryList(currentItem)">
                    <ul class="actions">
                      <li><input type="submit" value="Add to Grocery List"/></li>
                    </ul>
                  </form>
                  <form v-on:submit="destroy(currentItem)">
                    <ul class="actions">
                      <li><input type="submit" value="Eww!Yuk!    Dont buy That Again"/></li>
                    </ul>
                  </form>
                  <!-- <button v-on:click="addToGroceryList(currentItem)">Add to Grocery List</button>
                  <button v-on:click="destroy(currentItem)">Delete, Dont buy Again</button> -->

                  <button>Close</button>

                </form>
              </dialog>

            <!-- </div> -->
        
      


      
            </div>
          </div>
        </section>
      </div>
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
      console.log("!" * 50);
      console.log(item);
      console.log(document);
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