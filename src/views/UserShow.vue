<template>
  <div class="usershow">
    <h1>{{ message }}</h1>
    <br>
    <hr>
    <br>
    <h1> {{user.name }}  </h1>
    <p> user id: {{user.id }} </p>
    <p> user name: {{user.name }} </p>
    <p> email: {{user.email}}</p>
    <p> ppl in your house: {{user.ppl_in_house}} </p>
    

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

  methods: {}
};
</script>