<script setup>
import BubbleCluster from "./bubble_cluster/BubbleCluster.vue";
import ListView from "./list_view/ListView.vue";
</script>

<template>
  <div id="main_wrapper">
    <div id="menu">
      <div class="menu_item" id="menu_bubble" @click="currentView = 'bubble'">
        <i class="fa-solid fa-circle"></i>
      </div>
      <!--<div class="menu_item" id="menu_dendrogram">
        <i class="fa-solid fa-diagram-project"></i>
      </div>-->
      <div
        class="menu_item"
        id="menu_list"
        @click="
          currentView = 'list';
          store.visualizationPath = [];
        "
      >
        <i class="fa-solid fa-list"></i>
      </div>
    </div>

    <div id="toggle_sidebar" v-on:click="toggleSidebar">
      <i class="fa-solid fa-chevron-right" v-if="store.sidebar"></i>
      <i class="fa-solid fa-chevron-left" v-if="!store.sidebar"></i>
    </div>

    <BubbleCluster
      :key="rows[0]"
      :rows="rows"
      v-if="currentView === 'bubble'"
    />
    <ListView :key="rows[0]" :rows="rows" v-if="currentView === 'list'" />
  </div>
</template>

<script>
import { store } from "../store.js";
import { fetchData } from "../fetch/publications/fetch_publications.js";

export default {
  data() {
    return {
      store,
      rows: [],
      currentView: "bubble",
    };
  },
  components: {
    BubbleCluster,
    ListView,
  },
  async created() {
    let rows = await fetchData(store.query);
    this.rows = rows;
  },
  methods: {
    toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const main = document.getElementById("main");
      store.sidebar = !store.sidebar;

      if (store.sidebar) {
        sidebar.style.display = "unset";
        main.style.gridArea = "main";
      } else {
        sidebar.style.display = "none";
        main.style.gridArea = "main / main / sidebar / sidebar";
      }
    },
  },
};
</script>

<style scoped>
#main_wrapper {
  position: relative;
}

#toggle_sidebar {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

#menu {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  font-size: 1.5rem;
}

.menu_item {
  padding: 5px;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.menu_item:hover {
  color: #a5cf39;
}
</style>
