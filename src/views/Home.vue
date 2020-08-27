<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <br>
    <hr>
    <router-link to="/signup">Signup</router-link>
    <div class="login">
      <form v-on:submit.prevent="logIn()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>

    <!-- <span v-if="logIn()">
      <div class="logout">
        
        <form v-on:submit.prevent="logOut()">
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
        
      </div>
    </span> -->
    
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  
  data: function() {
    return {
      message: "Welcome to your Pantry on the Go!",
      user: {} ,
      email: "",
      password: "",
      errors: []
    };
  },
  
  created: function() {

  },

  methods: {
    logIn: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("user", response.data.name);
          this.$router.push(`/user/${response.data.user_id}`);
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    logOut: function() {
      delete axios.defualts.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.$router.push("/");
    },
  }
};
</script>