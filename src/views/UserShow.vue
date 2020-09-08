<template>
  <div id="app">
    <div id="wrapper">
      <div id="main">
      <section id="one">
        <div class="image main" data-position="center">
          <img src="/images/pantry_organized.png" alt="" />
        </div>
      </section>
      <section id="two">
        <div class="container">
          <div class="row ">
            <div class="col-sm-3">
              <div class="card">
                <h2> {{ message }}, </h2>
              </div>
            </div>
            <div class="col-sm-9">
              <div class="card">
                <h2> {{user.name }} ! </h2>
              </div>
            </div>
          </div>
          <hr>
          <p> user id: {{user.id }} </p>
          <!-- <p> user name: {{user.name }} </p> -->
          <p> email: {{user.email}}</p>
          <!-- <p> people in your household: {{user.ppl_in_house}} </p> -->
          <hr>
          <!-- logout button -->
          <form method="submit" v-on:submit="logOut()">
            <input type="submit" value="Sign Out">
          </form> 
          <!-- logout button: must hide before log in -->
        </div>
      </section>
      
 
  
      </div>
    </div>
  </div>


</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
  
  data: function() {
    return {
      message: "Welcome",
      user: {} ,

    };

  },
  
  created: function() {
    axios.get(`/api/users/${localStorage.user_id}`).then(response => { // Edit UserShow page based on current user logged in
      console.log("User ", response); 
      this.user = response.data;
    });
  },

  methods: {
    logOut: function() {
      this.$router.push("/logout");
    },
    
  }
};
</script>