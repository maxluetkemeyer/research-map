<template>
  <div>
    <p>Forschungslandkarte</p>
    <p v-for="step in store.visualizationPath" :key="step">
      <i class="fa-solid fa-chevron-right"></i>
      {{ step }}
    </p>
    <img
      src="https://www.wiwi.uni-muenster.de/fakultaet/sites/all/themes/wwucd/assets/images/logos/logo_wiwi_de.png"
    />
    <img
      src="https://www.uni-muenster.de/imperia/md/images/allgemein/farbunabhaengig/wwu.svg"
    />
  </div>
</template>

<script>
import { store } from "../../store";

export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
  margin-right: 10px;
  display: inline;
}
img {
  height: 40px;
  float: right;
  margin-left: 20px;
}
</style>
