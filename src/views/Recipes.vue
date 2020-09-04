<template>

  <div id="app">
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <!-- Three -->
        <section id="three">
          <div class="container">
            <h3>Check out Recipes</h3>
            <p>Your destination to look up popular recipes based on your current pantry. &nbsp; &nbsp; Feel free to add items to your grocery list if your recipe has ingredients not in your pantry!</p>
            <div class="features">

              <div class="outer">
                <div>
                  Add Item Here: <input type="text" v-model="searchTerm" list="names"/>
                  <button v-on:click="addItem(), displayItems()">Add to Grocery List!</button>
                  <datalist id="names">
                    <option v-for="item in all_items">{{item.name}}</option>
                  </datalist>
                </div>
              <hr>

                <div>
                  <button v-on:click="recipesList()">Recipes Ideas!</button>
                </div>

              </div>
              <hr>
              
              <div v-for="recipe in recipes">
                <article>
                <img class="image" v-bind:src="recipe.image" alt="" height="200px" /> 
                  <div class="inner">
                    <h4>{{recipe.title}} </h4>
                    <p> <b> Items not in your Pantry:</b> </p>
                    <div v-for="subItem in recipe.need">
                      <p> - {{subItem}} &nbsp; <button v-on:click="groceryItem(subItem)"> + grocery list</button></p>
                    </div>
                  </div>
                </article>
                <div v-for="subItem in recipe.steps">
                  <p> - {{subItem}} </p>
                </div>

                <hr>
              </div>



              <div v-for="item in list">
                <h4> Recipe for: <b> {{item.item_name}} </b> </h4> 
                <p> used: {{item.used}} 
                    future_interest: {{item.future_interest}} 
                </p>
                <button v-on:click="groceryItem(item)">Edit</button>
                <hr>
              </div>
              <dialog id="item-edit">
                <form method="dialog">

                  <h4> <b> {{currentItem.item_name}} </b> </h4>
                  <form v-on:submit="addToGroceryList(currentItem)">
                    <ul class="actions">
                      <li><input type="submit" value="Add to Grocery List"/></li>
                    </ul>
                  </form>
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
  
</template>


<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "search for Recipes!",
      list: {} ,
      currentItem: {},
      searchTerm: "",
      all_items: [],
      jwt: localStorage.jwt,
      recipes: [],
    };
  },
  
  created: function() {
    // var params = {
    //   headers: {Authorization: "Bearer " + this.jwt},
    // };
    // axios.get("/api/groceries", params).then(response=>{ 
    //   console.log("groceries: ", response) ;
    //   this.list = response.data ;
    // });
    // ^^^ for grocery items list
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
        console.log("you added to groceries list! :") ; 
        console.log("new user_item: ", response) ; 
        this.user_item = response.data ;
        this.searchTerm = "";
      }) ;
    },
    recipesList: function() {
      var config = {
        headers: {Authorization: "Bearer " + this.jwt},
      } ;
      axios.get("/api/recipes", config).then(response=> {
        console.log("check out 3 recipes") ; 
        console.log("spoonacular recipes: ", response) ; 
        this.recipes = response.data ;
 
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
        // this.currentItem = {};
        // item = "";
      });
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
          // this.currentItem = {};
          // item = "";
        });
    },

    
  }
};
</script>