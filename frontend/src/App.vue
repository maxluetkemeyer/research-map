<script setup>
import Sidebar from "./components/SideBar.vue";
import Main from "./components/Main.vue";
import Footer from "./components/footer/Footer.vue";
import Header from "./components/header/Header.vue";
</script>

<template>
  <div id="site-wrapper">
    <div id="grid-container">
      <div id="header">
        <Header />
      </div>
      <div id="main">
        <Main :key="store.query" />
      </div>
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="footer">
        <Footer :key="store.publicationId" />
      </div>
    </div>
    <p id="credits">Von Max Lütkemeyer</p>
  </div>
</template>

<script>
import { store } from "./store.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    resize() {
      const wrapper = document.getElementById("site-wrapper");
      const clientWidth = wrapper.clientWidth;
      wrapper.style.width = clientWidth - 15 + "px";
    },
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
  font-size: 20px;
  font-family: sans-serif;
  position: relative;
  background-color: #a5cf39;
}

h1 {
  margin-top: 0;
}

#credits {
  position: relative;
  float: right;
  color: #858585;
}

#site-wrapper {
  position: relative;
  width: 100vw;
  padding: 10px;
}

#grid-container {
  position: relative;
  display: grid;
  grid-template-areas:
    "header header header header header"
    "main main main main sidebar"
    "footer footer footer footer footer";
  gap: 10px;
  background-color: #a5cf39;
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
  /**grid-area: main / main / sidebar / sidebar;**/
}
#sidebar {
  grid-area: sidebar;
  position: relative;
  display: unset;
}
#footer {
  grid-area: footer;
  position: relative;
}
</style>
