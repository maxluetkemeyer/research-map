<template>
  <div id="sidebar_wrapper">
    <h1>Datenauswahl</h1>

    <div id="settings_years">
      <p id="settings_years_label">Jahre:</p>
      <Slider
        id="settings_yearSlider"
        v-model="slider_values"
        :min="yearMin"
        :max="yearMax"
        :direction="direction"
      />
      <!--:merge="8"-->
    </div>
    <p>{{ slider_values[1] }} - {{ slider_values[0] }}</p>

    <ul id="settings_degreeprograms">
      <li class="settings_degreeprograms">
        <input id="settings_bwl_input" type="checkbox" v-model="bwl" />
        <label for="settings_bwl_input">BWL Einrichtungen</label>
      </li>
      <li class="settings_degreeprograms">
        <input id="settings_vwl_input" type="checkbox" v-model="vwl" />
        <label for="settings_vwl_input">VWL Einrichtungen</label>
      </li>
      <li class="settings_degreeprograms">
        <input id="settings_wi_input" type="checkbox" v-model="wi" />
        <label for="settings_wi_input">WI Einrichtungen</label>
      </li>
      <li class="settings_degreeprograms">
        <input
          id="settings_sonstige_input"
          type="checkbox"
          v-model="sonstige"
        />
        <label for="settings_sonstige_input">Sonstige Einrichtungen</label>
      </li>
    </ul>

    <button id="settings_button" @click="clickedButton">Suche starten</button>
  </div>
</template>

<script>
import { store } from "../store";
import Slider from "@vueform/slider";

export default {
  data() {
    return {
      store,
      yearMax: 2022,
      yearMin: 1978,
      direction: "rtl",
      slider_values: [store.query.yearMin, store.query.yearMax],
      bwl: false,
      vwl: false,
      wi: true,
      sonstige: false,
    };
  },
  components: {
    Slider,
  },
  methods: {
    clickedButton() {
      this.store.query = {
        yearMax: this.slider_values[1],
        yearMin: this.slider_values[0],
        bwl: this.bwl,
        vwl: this.vwl,
        wi: this.wi,
        sonstige: this.sonstige,
      };
      console.log(store);
    },
  },
};
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
#sidebar_wrapper {
  position: relative;
  height: 100%;
}

h1 {
  margin-bottom: 40px;
}

#settings_degreeprograms {
  padding: 0;
}

.settings_degreeprograms {
  list-style: none;
  margin-bottom: 0.5rem;
}

.settings_degreeprograms input {
  width: 0.8rem;
  height: 0.8rem;
  cursor: pointer;
}

.settings_degreeprograms label {
  cursor: pointer;
}

#settings_button {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 1.2rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  background-color: #a5cf39;
  border-radius: 5px;
  border: 1px solid #9cc536;
  transition: 200ms;
  cursor: pointer;
}

#settings_button:hover {
  background-color: #bbe74a;
}

#settings_years {
  justify-content: start;
  display: flex;
}

#settings_years_label {
  margin: 0;
  font-size: 1rem;
  padding-right: 40px;
}

#settings_yearSlider {
  flex-grow: 100;
  display: inline-block;
  transform: translateY(150%);
  margin-right: 20px;
}
</style>
