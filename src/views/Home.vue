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
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum integer. Integer eu ante ornare amet commetus.</p>

            <form method="post" action="#">
              <div class="row gtr-uniform">
                <div class="col-6 col-12-xsmall"><input type="text" name="name" id="name" placeholder="Name" /></div>
                <div class="col-6 col-12-xsmall"><input type="email" name="email" id="email" placeholder="Email" /></div>
                <div class="col-12"><input type="text" name="subject" id="subject" placeholder="Subject" /></div>
                <div class="col-12"><textarea name="message" id="message" placeholder="Message" rows="6"></textarea></div>
                <div class="col-12">
                  <ul class="actions">
                      <li><input type="submit" class="primary" value="Send Message" /></li>
                      <li><input type="reset" value="Reset Form" /></li>
                  </ul>
                </div>
              </div>
            </form>
            <router-link to="/signup">Signup</router-link>
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

    <!-- <span v-if="logIn()">
      <div class="logout">
        
        <form v-on:submit.prevent="logOut()">
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
        
      </div>
    </span> -->
    
  <!-- </div> -->
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