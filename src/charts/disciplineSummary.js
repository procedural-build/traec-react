import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Im from "traec/immutable";

export class DisciplineSummary extends React.Component {
  renderBars() {
    let dataCategories = getDataCategories(this.props.data);
    return dataCategories.map((category, i) => {
      return <Bar key={i} dataKey={category} stackId="a" fill={getColorFromCategory(category)} />;
    });
  }

  render() {
    return (
      <div className="line-chart-wrapper" style={{ width: "100%", height: "500px" }}>
        <ResponsiveContainer>
          <BarChart
            data={this.props.data.toJS()}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 10
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
        </ResponsiveContainer>
      </div>
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

export const getDataCategories = data => {
  let dataKeys = Im.Set();
  data.map(element => {
    const [...elementKeys] = element.keys();
    let difference = Im.Set(elementKeys).subtract(dataKeys);
    if (difference) {
      dataKeys = dataKeys.union(difference);
    }
  });
  dataKeys = dataKeys.delete("name");
  return dataKeys.toArray();
};
