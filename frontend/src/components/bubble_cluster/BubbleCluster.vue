<template>
  <div>
    <div id="visualization"></div>
    <div style="display: none">{{ store }}</div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { store } from "../../store.js";
import { color, pack } from "./diagram.js";
import { build } from "./build.js";

export default {
  methods: {
    publicationClicked(publication) {
      console.log(publication);

      store.publication = publication;
    },
    renderChart() {
      var root = pack(store.data);
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
        .on("click", (event) => zoom(event, root));

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
        .on("click", (event, d) => (zoom(event, d), event.stopPropagation())); //focus !== d &&

      const dy = 6;
      const fontSize = 5;
      const charLength = 20;

      const label = svg
        .append("g")
        .style("font", fontSize + "px sans-serif")
        //.attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .on(
          "click",
          (event, d) => (
            this.publicationClicked(d.data), event.stopPropagation()
          )
        )
        .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
        .style("display", (d) => (d.parent === root ? "inline" : "none"))
        .style("fill", "#000")
        .style("font-weight", "bold");

      label
        .append("tspan")
        // eslint-disable-next-line no-unused-vars
        .attr("x", (d) => 0)
        .attr("dy", "0")
        .text((d) => {
          let output;
          try {
            output = d.data.name.toString().substring(0, charLength);
          } catch {
            output = "broken";
          }
          return output;
        });

      label
        .append("tspan")
        // eslint-disable-next-line no-unused-vars
        .attr("x", (d) => 0)
        .attr("dy", dy)
        .text((d) => {
          let output;
          try {
            output = d.data.name
              .toString()
              .substring(charLength, charLength * 2);
          } catch {
            output = "broken";
          }
          return output;
        });

      label
        .append("tspan")
        // eslint-disable-next-line no-unused-vars
        .attr("x", (d) => 0)
        .attr("dy", dy)
        .text((d) => {
          let output;
          try {
            output = d.data.name
              .toString()
              .substring(charLength * 2, charLength * 3);
          } catch {
            output = "broken";
          }
          return output;
        });

      label
        .append("tspan")
        // eslint-disable-next-line no-unused-vars
        .attr("x", (d) => 0)
        .attr("dy", dy)
        .text((d) => {
          let output;
          try {
            output = d.data.name
              .toString()
              .substring(charLength * 3, charLength * 4);
          } catch {
            output = "broken";
          }
          return output;
        });

      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v) {
        const k = 300 / v[2];

        view = v;

        label.attr(
          "transform",
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k - 10})`
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
  async mounted() {
    console.log("BubbleCluster Mounted!");
    await build();
    document.getElementById("visualization").innerHTML = "";
    this.renderChart();
  },
};
</script>

<style scoped>
#visualization {
  width: 100%;
  height: 40vw;
}
</style>
