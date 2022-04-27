<template>
  <div id="visualization"></div>
</template>

<script>
import * as d3 from "d3";
import { store } from "../../store.js";
import { color, pack } from "./diagram.js";
import { createHierachie } from "./create_hierachie.js";

export default {
  props: ["rows"],
  data() {
    return {
      store,
      map: {},
    };
  },
  methods: {
    publicationClicked(publication) {
      store.publicationId = publication.id;
    },
    renderChart() {
      var root = pack(this.map);
      console.log(root); //all generated nodes as data
      let focus = root;
      let view;

      //let viewbox = `-${width / 2} -${height / 2} ${width} ${height}` //https://www.mediaevent.de/tutorial/svg-viewbox-koordinaten.html
      let viewbox = `-150 -150 300 300`;

      const svg = d3
        .select("#visualization")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", viewbox)
        .style("display", "block")
        //.style("background", color(0))
        .style("cursor", "pointer")
        .on("click", (event) => {
          zoom(event, root);
          store.visualizationPath = [];
        });

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", (d) => (d.children ? color(d.depth) : "lightgrey")) //lightgrey
        .attr("pointer-events", (d) => (!d.children ? "none" : null))
        .on("mouseover", function () {
          d3.select(this).attr("stroke", "#000");
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", null);
        })
        .on("click", (event, d) => {
          if (d.data.children.length == 0) {
            this.publicationClicked(d.data);
          } else {
            zoom(event, d);
          }
          //store.visualizationPath.push(d.data.name);
          parentPath(d);
          event.stopPropagation();
        });

      const label = svg
        .append("g")
        .attr("text-anchor", "middle")
        .style("font", "5px sans-serif")
        .style("transform", "translate(-12%, -4%)")
        .selectAll("foreignObject")
        .data(root.descendants())
        .enter()
        .append("foreignObject")
        .attr("x", 0)
        .attr("width", "70px")
        .attr("height", "30px")
        .style("display", (d) => (d.parent === root ? "inline" : "none"))
        .on("click", (event, d) => {
          if (d.data.children.length == 0) {
            this.publicationClicked(d.data);
          } else {
            zoom(event, d);
          }
          //store.visualizationPath.push(d.data.name);
          parentPath(d);
          event.stopPropagation();
        });

      label
        .append("xhtml:body")
        .attr("class", "bubble_label")
        .text((d) => d.data.name);

      function parentPath(d) {
        let element = d.data;
        store.visualizationPath = [];
        console.log("NEW PATH");
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (element.parent == null) {
            break;
          }
          console.log(element.name);
          store.visualizationPath.unshift(element.name);
          element = element.parent;
        }
      }

      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v) {
        const k = 300 / v[2];

        view = v;

        label.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
        );
        node.attr("transform", (d) => {
          var kp = `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`;
          //console.log(kp);
          return kp;
        });
        node.attr("r", (d) => d.r * k);
      }

      function zoom(event, d) {
        focus = d;

        const transition = svg
          .transition()
          .duration(event.altKey ? 7500 : 750)
          // eslint-disable-next-line no-unused-vars
          .tween("zoom", (d) => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return (t) => zoomTo(i(t));
          });

        label
          .filter(function (d) {
            return d.parent === focus || this.style.display === "inline";
          })
          .transition(transition)
          .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
          .on("start", function (d) {
            if (d.parent === focus) this.style.display = "inline";
          })
          .on("end", function (d) {
            if (d.parent !== focus) this.style.display = "none";
          });
      }
    },
  },
  mounted() {
    const fields = [
      "orga_unit_id",
      "publication_year",
      "publication_type_key",
      "publication_id",
    ];
    const fieldsName = [
      "orga_unit_name",
      "publication_year",
      "publication_type",
      "publication_title",
    ];

    this.map = createHierachie(this.rows, fields, fieldsName);

    document.getElementById("visualization").innerHTML = "";
    this.renderChart();
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 40vw;
}
</style>
<style>
.bubble_label {
  height: 30px;
  overflow-y: scroll;
  font: 7px sans-serif;
  background-color: transparent;
  text-align: center;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.bubble_label::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.bubble_label {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
