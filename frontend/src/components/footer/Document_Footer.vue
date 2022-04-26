<template>
  <div class="footer_chapter">
    <div class="footer_i"><i class="fa-solid fa-file-lines"></i></div>
    <div class="footer_table">
      <p
        v-html="publicationDetails['title']"
        style="font-size: 2rem; font-weight: bold"
      ></p>
      <p
        v-html="publicationDetails['authors']"
        style="font-size: 1.2rem; color: #03a5fc; opacity: 0.8"
      ></p>
      <p style="font-size: 0.9rem; opacity: 0.7">
        <span
          v-html="publicationDetails['venue']"
          style="margin-right: 10px"
        ></span>
        <span
          v-html="publicationDetails['publication_year']"
          style="margin-right: 10px"
        ></span>
        <span
          v-html="publicationDetails['publication_type']"
          style="margin-right: 10px"
        ></span>
        <span v-html="publicationDetails['language']"></span>
      </p>
      <p
        v-html="publicationDetails['conference']"
        style="font-size: 0.9rem; opacity: 0.7"
      ></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["publicationDetails"],
};
</script>
