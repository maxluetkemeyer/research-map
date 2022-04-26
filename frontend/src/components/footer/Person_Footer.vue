<template>
  <div class="footer_chapter">
    <div class="footer_i"><i class="fa-solid fa-user"></i></div>
    <div class="footer_table">
      <p style="font-size: 1.2rem">
        <span
          v-html="publicationDetails['prof_salutation']"
          style="margin-right: 6px"
        ></span>
        <span
          v-html="publicationDetails['prof_academic_title']"
          style="margin-right: 6px"
        ></span>
        <span
          v-html="publicationDetails['prof_first_name']"
          style="margin-right: 6px"
        ></span>
        <span v-html="publicationDetails['prof_last_name']"></span>
      </p>
      <p v-html="publicationDetails['prof_status']"></p>
      <p v-html="publicationDetails['function']"></p>
      <p v-html="publicationDetails['email']"></p>
      <p v-html="publicationDetails['phone']"></p>
      <p v-html="publicationDetails['fax']"></p>
      <p v-html="publicationDetails['room']"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["publicationDetails"],
};
</script>
