<script setup>
import Sidebar from "./components/SideBar.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="grid-container">
    <div id="header">Forschungslandkarte</div>
    <div id="main">
      <Main />
    </div>
    <div id="sidebar">
      <Sidebar />
    </div>
    <div id="footer">
      <Footer />
    </div>
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
  font-size: 20px;
  font-family: sans-serif;
  position: relative;
}

h1 {
  margin-top: 0;
}

#grid-container {
  display: grid;
  grid-template-areas:
    "header header header header header"
    "main main main main sidebar"
    "footer footer footer footer footer";
  gap: 10px;
  background-color: #a5cf39;
  padding: 10px;
}

#grid-container > div {
  background-color: #fff;
  padding: 10px;
}

#header {
  grid-area: header;
}
#main {
  grid-area: main;
  position: relative;
  height: 800px;
  /**grid-area: main / main / sidebar / sidebar;**/
}
#sidebar {
  grid-area: sidebar;
  position: relative;
}
#footer {
  grid-area: footer;
  position: relative;
}
</style>
