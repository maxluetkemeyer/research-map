<script setup>
import Document_Footer from "./Document_Footer.vue";
import Person_Footer from "./Person_Footer.vue";
import OrgaUnit_Footer from "./OrgaUnit_Footer.vue";
import Details_Footer from "./Details_Footer.vue";
</script>

<template>
  <div id="footer_wrapper">
    <h1 id="details_headding">Details</h1>
    <p v-for="step in store.visualizationPath" :key="step" class="path">
      <i class="fa-solid fa-chevron-right"></i>
      {{ step }}
    </p>
    <br />
    <br />

    <div v-if="store.publicationId != -1">
      <Document_Footer :publicationDetails="store.publicationDetail" />
      <Person_Footer :publicationDetails="store.publicationDetail" />
      <OrgaUnit_Footer :publicationDetails="store.publicationDetail" />
      <Details_Footer :publicationDetails="store.publicationDetail" />
    </div>
  </div>
</template>

<script>
import { store } from "../../store.js";
import { fetchDetails } from "../../fetch/details/fetch_details.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    async updateData() {
      const rows = await fetchDetails({
        publicationId: this.store.publicationId,
      });

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
    await this.updateData();
  },
};
</script>

<style scoped>
h1 {
  display: inline;
  margin-right: 10px;
}
</style>

<style>
#footer_wrapper {
  position: relative;
}

.path {
  padding: 0;
  margin: 0;
  margin-right: 10px;
  display: inline;
}

.footer_chapter {
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
}

.footer_i {
  width: 20vw;
  display: flex;
  justify-content: center;
}

.footer_i i {
  font-size: 7vw;
  color: gray;
  opacity: 0.7;
}
.footer_table {
  width: 70vw;
  border: 0px solid black;
}
.footer_table p,
.footer_table a {
  margin: 0;
  padding: 0;
}
</style>
