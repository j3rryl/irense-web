import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    male: 4000,
    female: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    male: 3000,
    female: 1398,
    amt: 2210,
  },
  {
    name: "March",
    male: 2000,
    female: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    male: 2780,
    female: 3908,
    amt: 2000,
  },
  {
    name: "May",
    male: 1890,
    female: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    male: 2390,
    female: 3800,
    amt: 2500,
  },
  {
    name: "July",
    male: 3490,
    female: 4300,
    amt: 2100,
  },
];

export default class SimpleLineChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line
            type="monotone"
            dataKey="female"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="male" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
