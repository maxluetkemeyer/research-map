import { reactive } from "vue";

export const store = reactive({
  query: {
    yearMax: 2022,
    yearMin: 2020,
    bwl: true,
    vwl: true,
    wi: true,
    sonstige: true,
  },
  publicationId: -1,
  sidebar: true,
  baseUrl: "http://localhost:5000",
});
