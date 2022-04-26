<template>
  <details>
    <summary>Mehr Details</summary>
    <table>
      <tr v-for="(value, key) in publicationDetails" :key="value">
        <td
          class="info_key"
          v-if="
            publicationDetails[key] != '' &&
            publicationDetails[key] != undefined &&
            publicationDetails[key] != null
          "
        >
          {{ key }}
        </td>
        <td
          class="info_value"
          v-if="
            publicationDetails[key] != '' &&
            publicationDetails[key] != undefined &&
            publicationDetails[key] != null
          "
          v-html="publicationDetails[key]"
        ></td>
      </tr>
    </table>
  </details>
</template>

<script>
export default {
  props: ["publicationDetails"],
};
</script>

<style scoped>
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
