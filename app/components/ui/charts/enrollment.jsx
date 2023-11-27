import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "<9",
    male: 4000,
    female: 2400,
    amt: 2400,
  },
  {
    name: "9-13",
    male: 3000,
    female: 1398,
    amt: 2210,
  },
  {
    name: "14-18",
    male: 2000,
    female: 9800,
    amt: 2290,
  },
  {
    name: "18+",
    male: 2780,
    female: 3908,
    amt: 2000,
  },
];

export default class EnrollmentChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="male"
            fill="#57BEBB"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="female"
            fill="#B7E325"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
