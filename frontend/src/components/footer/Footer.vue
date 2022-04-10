<template>
  <div id="footer_wrapper">
    <h1 id="details_headding">Details</h1>

    <table id="info" v-if="store.publicationId != -1">
      <tr v-for="(value, key) in store.publicationDetail" :key="value">
        <td class="info_key">{{ key }}</td>
        <td class="info_value" v-html="store.publicationDetail[key]"></td>
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
      keys: ["publication_title", "publication_year", "orga_unit_name"],
      values: ["Title", "Jahr", "Organisation"],
    };
  },
  methods: {
    async updateData() {
      /*const rows = await fetchDetails({
        publicationId: this.store.publicationId,
      });*/
      const rows = details_response;

      const publication = rows[0]; //TODO:

      this.store.publicationDetail = publication;

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
