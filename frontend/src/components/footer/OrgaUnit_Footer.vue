<template>
  <div class="footer_chapter">
    <div class="footer_i"><i class="fa-solid fa-building"></i></div>
    <div class="footer_table">
      <p v-html="publicationDetails['name_searchable']"></p>
      <a
        :href="publicationDetails['url']"
        v-html="publicationDetails['url']"
        style="margin-bottom: 30px"
      ></a>

      <p style="font-size: 0.9rem; margin-bottom: 20px">
        <span
          v-html="publicationDetails['street']"
          style="margin-right: 20px"
        ></span>
        <span
          v-html="publicationDetails['postal_code']"
          style="margin-right: 20px"
        ></span>
        <span
          v-html="publicationDetails['city']"
          style="margin-right: 20px"
        ></span>
        <span v-html="publicationDetails['country']"></span>
      </p>
      <p v-html="orga_unit_description"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["publicationDetails"],
  computed: {
    orga_unit_description() {
      const str = this.publicationDetails["description"];
      return str.split("[[[entry:1]]]").pop().split("[[[/entry]]]")[0];
    },
  },
};
</script>
