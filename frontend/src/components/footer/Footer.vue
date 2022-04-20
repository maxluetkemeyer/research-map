<template>
  <div id="footer_wrapper">
    <h1 id="details_headding">Details</h1>
    <p v-for="step in store.visualizationPath" :key="step" class="legende">
      <i class="fa-solid fa-chevron-right"></i>
      {{ step }}
    </p>
    <br /><br />

    <div v-if="store.publicationId != -1">
      <div id="footer_paper">
        <div class="footer_i"><i class="fa-solid fa-file-lines"></i></div>
        <div class="footer_table">
          <p
            v-html="store.publicationDetail['title']"
            style="font-size: 2rem; font-weight: bold"
          ></p>
          <p
            v-html="store.publicationDetail['authors']"
            style="font-size: 1.2rem; color: #03a5fc; opacity: 0.8"
          ></p>
          <p style="font-size: 0.9rem; opacity: 0.7">
            <span
              v-html="store.publicationDetail['language']"
              style="margin-right: 20px"
            ></span>
            <span
              v-html="store.publicationDetail['venue']"
              style="margin-right: 20px"
            ></span>
            <span
              v-html="store.publicationDetail['publication_year']"
              style="margin-right: 20px"
            ></span>
            <span v-html="store.publicationDetail['publication_type']"></span>
          </p>
          <p
            v-html="store.publicationDetail['conference']"
            style="font-size: 0.9rem; opacity: 0.7"
          ></p>
        </div>
      </div>
      <div id="footer_person">
        <div class="footer_i"><i class="fa-solid fa-user"></i></div>
        <div class="footer_table">
          <p style="font-size: 1.2rem">
            <span
              v-html="store.publicationDetail['prof_salutation']"
              style="margin-right: 6px"
            ></span>
            <span
              v-html="store.publicationDetail['prof_academic_title']"
              style="margin-right: 6px"
            ></span>
            <span
              v-html="store.publicationDetail['prof_first_name']"
              style="margin-right: 6px"
            ></span>
            <span v-html="store.publicationDetail['prof_last_name']"></span>
          </p>
          <p v-html="store.publicationDetail['prof_status']"></p>
          <p v-html="store.publicationDetail['function']"></p>
          <p v-html="store.publicationDetail['email']"></p>
          <p v-html="store.publicationDetail['phone']"></p>
          <p v-html="store.publicationDetail['fax']"></p>
          <p v-html="store.publicationDetail['room']"></p>
        </div>
      </div>
      <div id="footer_orga_unit">
        <div class="footer_i"><i class="fa-solid fa-building"></i></div>
        <div class="footer_table">
          <p v-html="store.publicationDetail['name_searchable']"></p>
          <a
            :href="store.publicationDetail['url']"
            v-html="store.publicationDetail['url']"
            style="margin-bottom: 30px"
          ></a>

          <p style="font-size: 0.9rem">
            <span
              v-html="store.publicationDetail['street']"
              style="margin-right: 20px"
            ></span>
            <span
              v-html="store.publicationDetail['postal_code']"
              style="margin-right: 20px"
            ></span>
            <span
              v-html="store.publicationDetail['city']"
              style="margin-right: 20px"
            ></span>
            <span v-html="store.publicationDetail['country']"></span>
          </p>
          <p v-html="store.publicationDetail['description']"></p>
        </div>
      </div>
      <details>
        <summary>Mehr Details</summary>
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
      </details>
    </div>
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
.legende {
  padding: 0;
  margin: 0;
  margin-right: 10px;
  display: inline;
}

#info,
#info tr {
  border: 1px solid black;
  border-collapse: collapse;
}
#info tr td {
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

#footer_paper,
#footer_person,
#footer_orga_unit {
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
