<script setup>
import BubbleCluster from "./bubble_cluster/BubbleCluster.vue";
</script>

<template>
  <div id="main_wrapper">
    <!--<div style="width: 300px; height: 300px; background-color: aqua"></div>-->

    <div id="menu">
      <div class="menu_item" id="menu_bubble">
        <i class="fa-solid fa-circle"></i>
      </div>
      <div class="menu_item" id="menu_dendrogram">
        <i class="fa-solid fa-diagram-project"></i>
      </div>
      <div class="menu_item" id="menu_list">
        <i class="fa-solid fa-list"></i>
      </div>
    </div>

    <div id="toggle_sidebar">
      <i class="fa-solid fa-chevron-right"></i>
    </div>

    <BubbleCluster />
  </div>
</template>

<script>
import { store } from "../store.js";
import { build } from "./bubble_cluster/build.js";

export default {
  data() {
    return {
      store,
    };
  },
  mounted() {
    build();
  },
  components: {
    BubbleCluster,
  },
};
</script>

<style scoped>
#main_wrapper {
  position: relative;
  height: 100%;
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
