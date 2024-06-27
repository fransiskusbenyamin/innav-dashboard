<template>
  <div>
    <div class="sidebar">
      <router-link to="/dashboard" class="active" href="#">Home</router-link>
      <!-- <router-link to="/traffic" class="btn1" href="#">Traffic</router-link> -->
      <router-link to="/editlokasi" class="btn2" href="#">Edit Lokasi</router-link>
      <router-link to="/manage" class="btn3" href="#">Atur Jarak</router-link>
      <!-- <a href="#contact">Contact</a>
      <a href="#about">About</a> -->
      <router-link to="/login" class="active1" href="#">Log Out</router-link>
    </div>

    <div class="content">
      <div class="main">
        <div class="overlay"></div>
        <div class="navbar">
          <!-- Navbar content (commented out in the original) -->
        </div>
        <div class="heading">
          <h1 class="head">WELCOME <span> ADMIN</span></h1>
          <!-- <h3 class="sub">Lorem ipsum dolor sit amet</h3> -->
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <router-link to="/traffic" class="btn1" href="#">TRAFFIC</router-link>
<router-link to="/editlokasi" class="btn2" href="#">FEEDBACK</router-link> -->
<script>
export default {
  // Add any JavaScript code or Vue lifecycle methods here if needed
};
</script>

<style scoped>
/* Styles for the main content and sidebar */
body {
  margin: 0;
  padding: 0;
  background: #fafafa;
  color: #fff;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #04aa6d;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

.sidebar a.active1 {
  background-color: #e04848;
  color: white;
}

.sidebar a:hover:not(.active1) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

.main {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #4caf50; /* For browsers that do not support gradients */
  background-image: linear-gradient(#4caf50, rgb(101, 204, 161));
}

.main .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.main .navbar {
  position: absolute;
  height: auto;
  width: 100%;
  margin: 2% 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 10px 0;
}

.main .navbar .logo {
  position: relative;
  height: auto;
  width: 20%;
  left: 10%;
  float: left;
  font-family: 'Lato', sans-serif;
  font-size: 35px;
  font-weight: 600;
  cursor: pointer;
  text-shadow: 0px 0.5px 5px rgba(0, 0, 0, 0.2);
  transition: 0.1s ease-in-out;
}

.main .navbar .logo:hover {
  color: rgba(0, 0, 0, 0.4);
}

.main .navbar ul {
  position: relative;
  float: right;
  width: 50%;
  right: -14%;
  height: auto;
  margin: auto;
}

.main .navbar ul li {
  list-style-type: none;
  display: inline-block;
  height: 100%;
  width: auto;
  border: 1px solid rgba(255, 255, 255, 0.88);
  border-radius: 2px;
  cursor: pointer;
  padding: 10px;
  box-shadow: 0px 0.5px 5px rgba(0, 0, 0, 0.2);
  transition: 0.1s ease-in-out;
  box-sizing: border-box;
}

.main .navbar ul li a {
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-family: 'cinzel', sans-serif;
  font-size: 15px;
  font-weight: 300;
  display: block;
}

.main .navbar ul li:hover {
  background: rgba(0, 0, 0, 0.4);
}

.main .heading {
  position: absolute;
  height: auto;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  text-shadow: 0px 0.5px 5px rgba(0, 0, 0, 0.2);
}

.main .heading .head {
  position: relative;
  font-family: 'RacingSansOne', sans-serif;
  font-size: 48px;
  font-weight: 600;
  color: #fff;
}

.main .heading .head span {
  color: #4caf50;
}

.main .heading .sub {
  position: relative;
  font-family: 'cinzel', sans-serif;
  font-size: 22px;
  font-weight: 300;
  color: #fff;
  margin: -2% 0 2% 0;
}

.main .heading .btns {
  height: auto;
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
}

.main .heading .btns a {
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-family: 'cinzel', sans-serif;
  font-size: 15px;
  font-weight: 300;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: auto;
  width: 150px;
  padding: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-left: 1%;
  border-radius: 2px;
  transition: 0.5s ease-in-out;
}

.main .heading .btns a:hover {
  background: #4caf50;
  border: 1px solid #4caf50;
}

.main .heading .btns .btn1 {
  background: #4caf50;
  border: 1px solid #4caf50;
}

.main .heading .btns .btn1:hover {
  background: #4caf50;
  border: 1px solid #4caf50;
  color: rgba(255, 255, 255, 0.95);
}
</style>
