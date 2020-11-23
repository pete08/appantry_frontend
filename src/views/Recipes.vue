<template>

  <div id="app">
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <!-- Three -->
        <section id="three">
          <div class="container">
            <h3>Recipe Roullette</h3>
            <p>Your destination to look up popular recipes based on your current pantry. &nbsp; &nbsp; Feel free to add items to your grocery list if your recipe has ingredients not in your pantry!</p>
            <br>
            <p> Click below for 3 randomly geenrated recipes </p>
            <div class="features">
              <div class="outer">
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
                    <h4>{{recipe.source_url}} </h4>
                    <p> <b> Add items you'll need to Grocery List: </b> </p>
                    <ul>
                      <div v-for="subItem in recipe.need">
                        <li>{{subItem}}
                        <button @click="addItemGrocery(subItem)"> + </button>
                        </li>
                      </div>
                    </ul>
                  </div>
                </article>
                <div v-for="singleStep in recipe.steps">
                  <p> - {{singleStep}} </p>
                </div>

                <hr>
              </div>



              <!-- <div v-for="item in list">
                <h4> Recipe for: <b> {{item.item_name}} </b> </h4> 
                <p> used: {{item.used}} 
                    future_interest: {{item.future_interest}} 
                </p>
                <button v-on:click="groceryItem(item)">Edit</button>
                <hr>
              </div> -->


              <!-- <dialog id="item-edit">
                <form method="dialog">

                  <h4> <b> {{currentItem}} </b> </h4>
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
              </dialog> -->
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
      // someItem: "garbonzo beans",
      singleStep: "",
      all_items: [],
      jwt: localStorage.jwt,
      recipes: [],
      // recipe: {},
      // subItem: ""
    };
  },
  
  created: function() {

    axios.get("/api/items").then(response=> {
      console.log("all_items:", response.ok);
      this.all_items = response.data ;
    });
  },

  methods: {

    reversesubItem: function() {
      this.subItem = this.subItem.split("").reverse().join("");
      console.log("this.subItem : ") ;
      console.log(this.subItem) ;
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

    addItemGrocery: function(subItem) {
      var params = {
        name: subItem,
      } ;
      var config = {
        headers: {Authorization: "Bearer " + this.jwt},
      } ;
      axios.post("/api/groceries", params, config).then(response=> {
        console.log("made item!") ; 
        console.log("new user_item: ", response) ; 
        console.log("response.data: ") ;
        console.log(response.data) ;

      }) ;
    },

    
  }
};
</script>