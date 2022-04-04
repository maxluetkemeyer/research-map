<template>
  <div id="footer_wrapper">
    <h1>Details</h1>

    <table id="info">
      <tr v-for="(key, index) in keys" :key="key">
        <td class="info_key">{{ key }}</td>
        <td class="info_value">{{ values[index] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keys: ["Title", "Autor", "ISBN"],
      values: ["Forschungslandkarten Paper", "Max", "950238529473939"],
    };
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
