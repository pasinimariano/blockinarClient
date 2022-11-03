import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function AverangeCostOfRooms({ averangeCost }) {
  const [average, setAverage] = useState();

  const getAverageOfRooms = () => {
    if (Object.values(averangeCost)) {
      const results = Object.values(averangeCost).map((average) => {
        return Math.round(average.total / average.count);
      });

      setAverage(results);
    }
  };

  const options = {
    series: [
      {
        name: "Costo promedio",
        data: average || [],
        color: "#00ff99ff",
      },
    ],
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#ffffff"],
      },
    },
    xaxis: {
      categories: Object.keys(averangeCost) || [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return "$ " + val;
        },
      },
    },
    grid: {
      row: {
        colors: ["#ffffff", "#B2B2B2"],
      },
    },
  };

  useEffect(() => {
    getAverageOfRooms();
  }, [averangeCost, getAverageOfRooms]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={650}
      />
    </div>
  );
}
