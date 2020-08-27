<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- <span v-if="isLoggedIn()">
        <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link> |
      </span> -->
      <router-link to="/logout">Logout</router-link> |
      <router-link to="/user/:id">Profile</router-link> |
      <router-link to="/pantry">Pantry</router-link> |
      <router-link to="/groceries">Grocery List</router-link> |

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    
    getUserId: function() {
      return localStorage.getItem("user_id");
    }
  }
};
</script>