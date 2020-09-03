<template>
  <div id="wrapper">
    <div id="main">
      <section id="one">
        <div class="image main" data-position="center">
          <img src="/images/pantry_organized.png" alt="" />
        </div>
      </section>
      <section id="four">
          <div class="container">
            <h3>{{ message }}</h3>
            <h3>Login Here</h3>
            <p>Enter your login or select to sign up.</p>
            <!-- <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul> -->
            <form method="submit" v-on:submit.prevent="logIn()">
              <div class="row gtr-uniform">
                <div class="col-6 col-12-xsmall"><input type="email" v-model="email" placeholder="Email"></div>
                <!-- <input id="email" type="email" name="email" placeholder="Email" /> -->
                <div class="col-6 col-12-xsmall"><input type="password" v-model="password" placeholder="Password"></div>
                <!-- <input type="password" name="subject" id="subject" placeholder="Password" /> -->
                <div class="col-12">
                  <ul class="actions">
                    <li><input type="submit" class="primary" value="Log In" /></li>
                    <li><input type="reset" value="Reset Form" /></li>                 
                  </ul>
                </div>
              </div>
            </form>
            <h3>Sign Up Here</h3>
            <form v-on:submit="signUp()">
              <ul class="actions">
                <li><input type="submit" value="Sign Up"/></li>
              </ul>
            </form>
            <!-- logout button -->
            <form method="submit" v-on:submit="logOut()">
              <input type="submit" value="Sign Out">
            </form> 
            <!-- logout button: must hide before log in -->

          </div>
      </section>
    </div>
  </div>
  <!-- <div class="home">

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

    <span v-if="logIn()">
      <div class="logout">
        
        <form v-on:submit.prevent="logOut()">
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
        
      </div>
    </span>
    
  </div> -->
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
          this.email = "";
          this.password = "";
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    logOut: function() {
      this.$router.push("/logout");
    },
    signUp: function() {
      this.$router.push("/signup");
    },
  }
};
</script>