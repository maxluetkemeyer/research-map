<template>
  <div id="footer_wrapper">
    <h1 id="details_headding">Details</h1>
    <p v-for="step in store.visualizationPath" :key="step">
      <i class="fa-solid fa-chevron-right"></i>
      {{ step }}
    </p>
    <br /><br />
    <table id="info" v-if="store.publicationId != -1">
      <tr v-for="(value, key) in store.publicationDetail" :key="value">
        <td
          class="info_key"
          v-if="
            store.publicationDetail[key] != '' &&
            store.publicationDetail[key] != undefined &&
            store.publicationDetail[key] != null
          "
        >
          {{ key }}
        </td>
        <td
          class="info_value"
          v-if="
            store.publicationDetail[key] != '' &&
            store.publicationDetail[key] != undefined &&
            store.publicationDetail[key] != null
          "
          v-html="store.publicationDetail[key]"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { store } from "../../store.js";
// eslint-disable-next-line no-unused-vars
import { fetchDetails } from "./fetch_details.js";
import { details_response } from "./response.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    async updateData() {
      /*const rows = await fetchDetails({
        publicationId: this.store.publicationId,
      });*/
      const rows = details_response;

      if (rows.length == 0) return;

      const publication = rows[0]; //TODO:

      this.store.publicationDetail = publication;
      console.log(publication);

      setTimeout(() => {
        document.getElementById("details_headding").scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }, 100);
    },
  },
  async mounted() {
    console.log("Footer Mounted!");
    await this.updateData();
  },
};
</script>

<style>
#footer_wrapper {
  position: relative;
}
h1 {
  display: inline;
  margin-right: 10px;
}
p {
  padding: 0;
  margin: 0;
  margin-right: 10px;
  display: inline;
}

table,
tr {
  border: 1px solid black;
  border-collapse: collapse;
}
td {
  padding: 5px;
  border-right: 1px solid black;
}

.info_key {
  font-weight: bold;
  padding-right: 40px;
}

.info_value {
  color: black;
}
</style>
