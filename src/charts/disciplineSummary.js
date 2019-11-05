import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import Im from "traec/immutable";

export class DisciplineSummary extends React.Component {
  renderBars() {
    return dataCategories.map(category => {
      <Bar dataKey={category} stackId="a" fill={getColorFromCategory(category)} />;
    });
  }

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
        layout="vertical"
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        {this.renderBars()}
      </BarChart>
    );
  }
}

export const getColorFromCategory = category => {
  let colors = Im.Map({
    "Nothing Received": "#EB9999",
    "Pending Approval": "#D1B2D1",
    "Pending Review": "#FFD699",
    "Requires Revision": "#ADC2FF",
    "OK for Submission": "#99EB99",
    "Not for Submission": "#99EB99"
  });

  let color = colors.get(category);
  if (color) {
    return color;
  } else {
    console.warn(`Could not find matching color for: ${category}. Returning gray.`);
    return "#8c8c8c";
  }
};
