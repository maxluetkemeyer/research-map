<template>
  <div id="footer_wrapper">
    <h1>Details</h1>

    <table id="info" v-if="store.publication.id != -1">
      <tr v-for="(key, index) in keys" :key="key">
        <td class="info_key">{{ values[index] }}</td>
        <td class="info_value">{{ store.publicationDetail[key] }}</td>
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
      //let rows = await fetchData(store.query);
      //let rows = custom_response;

      //const rows = await fetchDetails();
      const rows = details_response;

      const publication = rows[0]; //TODO:

      this.store.publicationDetail = publication;
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

.info_key {
  font-weight: bold;
  padding-right: 40px;
}

.info_value {
  color: black;
}
</style>
