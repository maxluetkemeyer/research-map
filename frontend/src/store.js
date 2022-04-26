import { reactive } from "vue";

export const store = reactive({
  query: {
    yearMax: 2022,
    yearMin: 2020,
    bwl: false,
    vwl: false,
    wi: true,
    sonstige: false,
  },
  publicationId: -1,
  sidebar: true,
  baseUrl: "http://localhost:5000",
  visualizationPath: [],
  testMode: true,
});
