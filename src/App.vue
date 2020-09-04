<template>
  <div id="app">
    <section id="header">
      <header>
        <span class="image avatar"><img src="images/avatar.jpg" alt="" /></span>
        <h1 id="logo">
          
          <a href="/user/:id"></a>
        </h1>
          <!-- <p v-if="loggedIn() === true"></p> -->
          <!-- <p v-else>    -->
          <p>
          An app to track your foods
          </p>
      </header>
      <nav id="nav">
        <ul>
          <li><a href="/home" >Home</a></li>
          <!-- <li><a href="/logout" >Logout</a></li> -->
          <li><a href="/user/:id">Profile</a></li>
          <li><a href="/pantry">Pantry</a></li>
          <li><a href="/groceries">Grocery List</a></li>
          <li><a href="/recipes">Recipe Ideas</a></li>
        </ul>
      </nav>



    </section>


<!--  USE AS TEMPLATE FOR VARIOUS SECTIONS _______________________-->
<!-- <template> -->
  <!-- <div id="app">
    <div id="wrapper">
      <div id="main">
        
      </div>
    </div>
  </div> -->
<!-- </template>-->
<!--  USE AS TEMPLATE FOR VARIOUS SECTIONS ^^^^^^^^^^^^^^^^^^^^^^^-->



    <div id="wrapper">

      <!-- Main -->
      <div id="main">

        <!-- One -->
        <!-- <section id="one">
          <div class="image main" data-position="center">
            <img src="/images/pantry_organized.png" alt="" />
          </div>
          <div class="container">
            <header class="major">
              <h2>Read Only</h2>
              <p>An incredibly responsive site<br />
              template freebie by <a href="/http://html5up.net">HTML5 UP</a>.</p>
            </header>
            <p>Faucibus sed lobortis aliquam lorem blandit. Lorem eu nunc metus col. Commodo id in arcu ante lorem ipsum sed accumsan erat praesent faucibus commodo ac mi lacus. Adipiscing mi ac commodo. Vis aliquet tortor ultricies non ante erat nunc integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum.</p>
          </div>
        </section> -->

        <!-- Two -->
        <!-- <section id="two">
          <div class="container">
            <h3>Things I Can Do</h3>
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum integer lorem ipsum dolor sit amet.</p>
            <ul class="feature-icons">
              <li class="icon solid fa-code">Write all the code</li>
              <li class="icon solid fa-cubes">Stack small boxes</li>
              <li class="icon solid fa-book">Read books and stuff</li>
              <li class="icon solid fa-coffee">Drink much coffee</li>
              <li class="icon solid fa-bolt">Lightning bolt</li>
              <li class="icon solid fa-users">Shadow clone technique</li>
            </ul>
          </div>
        </section> -->

        <!-- Three -->
        <!-- <section id="three">
          <div class="container">
            <h3>A Few Accomplishments</h3>
            <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer non. Adipiscing cubilia elementum integer. Integer eu ante ornare amet commetus.</p>
            <div class="features">
              <article>
                <a href="/#" class="image"><img src="images/pic01.jpg" alt="" /></a>
                <div class="inner">
                  <h4>Possibly broke spacetime</h4>
                  <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
                </div>
              </article>
              <article>
                <a href="/#" class="image"><img src="images/pic02.jpg" alt="" /></a>
                <div class="inner">
                  <h4>Terraformed a small moon</h4>
                  <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
                </div>
              </article>
              <article>
                <a href="/#" class="image"><img src="images/pic03.jpg" alt="" /></a>
                <div class="inner">
                  <h4>Snapped dark matter in the wild</h4>
                  <p>Integer eu ante ornare amet commetus vestibulum blandit integer in curae ac faucibus integer adipiscing ornare amet.</p>
                </div>
              </article>
            </div>
          </div>
        </section> -->

        <!-- Four -->
        <!-- <section id="four">
          <div class="container">
            <h3>Contact Me</h3>
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
          </div>
        </section> -->
      </div>
    </div>
    
    <router-view/>
    
      <section id="footer">
        <!-- <footer> -->
          <div class="container">
            <ul class="icons">
              
              <li><a href="/#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
              <li><a href="/#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
              <li><a href="/#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
              <li><a href="/#" class="icon brands fa-github"><span class="label">Github</span></a></li>
              <li><a href="/#" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
            </ul>

            <ul class="copyright">
              <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        <!-- </footer> -->
      </section>
  </div>

</template>

<style>


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