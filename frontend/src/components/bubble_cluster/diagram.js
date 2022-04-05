import * as d3 from "d3";

export const color = (detph) => {
  switch (detph) {
    case 0:
      return "lightgrey";
    case 1:
      return "#d9ebad";
    case 2:
      return "#cce6ff";
    case 3:
      return "#ffddcc";
  }
};

const whiteCircleSize = 60;

export const pack = (data) =>
  d3
    .pack()
    .size([whiteCircleSize, whiteCircleSize]) //size of white circles (leafs)
    .padding(4)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );
