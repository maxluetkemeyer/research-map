<template>
  <div id="listView">
    <table>
      <tr>
        <th @click="sort('publication_title')">
          Titel
          <i
            class="fa-solid fa-arrow-up"
            v-if="
              currentSort === 'publication_title' && currentSortDir === 'desc'
            "
          ></i>
          <i
            class="fa-solid fa-arrow-down"
            v-if="
              currentSort === 'publication_title' && currentSortDir === 'asc'
            "
          ></i>
        </th>
        <th @click="sort('publication_year')">
          Jahr
          <i
            class="fa-solid fa-arrow-up"
            v-if="
              currentSort === 'publication_year' && currentSortDir === 'desc'
            "
          ></i>
          <i
            class="fa-solid fa-arrow-down"
            v-if="
              currentSort === 'publication_year' && currentSortDir === 'asc'
            "
          ></i>
        </th>
        <th @click="sort('orga_unit_name')">
          Orga Unit
          <i
            class="fa-solid fa-arrow-up"
            v-if="currentSort === 'orga_unit_name' && currentSortDir === 'desc'"
          ></i>
          <i
            class="fa-solid fa-arrow-down"
            v-if="currentSort === 'orga_unit_name' && currentSortDir === 'asc'"
          ></i>
        </th>
      </tr>
      <tr v-for="row in sortedRows" :key="row.publication_id">
        <td>
          {{ row.publication_title }}
        </td>
        <td>{{ row.publication_year }}</td>
        <td>{{ row.orga_unit_name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["rows"],
  data() {
    return {
      currentSort: "publication_title",
      currentSortDir: "asc",
    };
  },
  created() {
    try {
      document.getElementById("listView").innerHTML = "";
    } catch (e) {
      //do nothing
    }
  },
  methods: {
    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
  },
  computed: {
    sortedRows() {
      return [...this.rows].sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
};
</script>

<style scoped>
div {
  height: 40vw;
  font-size: 0.7rem;
  overflow: scroll;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  cursor: pointer;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
