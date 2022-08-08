import React from "react";
import Chart from "react-apexcharts";

const LineChats = () => {
  const series = [
    //data on the y-axis
    {
      name: "Temperature in Celsius",
      data: [440, 505, 414, 571, 227, 413, 201, 352],
    },
  ];
  const options = {
    //data on the x-axis
    chart: { id: "bar-chart" },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" width="550" />
    </div>
  );
};

export default LineChats;
