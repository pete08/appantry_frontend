<template>
  <div id="app">
    <div id="wrapper">
      <div id="main">
        <section id="one">
          <div class="image main" data-position="center">
            <img src="/images/pantry_organized.png" alt="" />
          </div>
        </section>
        <section id="four">
          <div class="container">
                <div class="signup">
                  <form v-on:submit.prevent="submit()">
                    <h2>Signup here for one hell of a time!</h2>
                    <ul>
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                    <div class="form-group">
                      <label>Name:</label> 
                      <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                      <label>Email:</label>
                      <input type="email" class="form-control" v-model="email">
                    </div>
                    <!-- <div class="form-group">
                      <label>People in House:</label>
                      <input type="integer" class="form-control" v-model="ppl_in_house">
                    </div> -->
                    <div class="form-group">
                      <label>Password:</label>
                      <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="form-group">
                      <label>Password confirmation:</label>
                      <input type="password" class="form-control" v-model="passwordConfirmation">
                    </div>
                    <br>
                    <input type="submit" class="btn btn-primary" value="Submit">
                  </form>
                </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      ppl_in_house: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        ppl_in_house: 1,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>