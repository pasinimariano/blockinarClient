import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartOfTheMonth({ reservationsOfTheMonth }) {
  const daysInMonth = moment().daysInMonth();
  const [tableValues, setTableValues] = useState({});

  const config = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#9c27b0ff"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["#203239", "transparent"],
      },
    },
    xaxis: {
      categories: Object.keys(tableValues),
      title: {
        text: "Días del mes",
      },
    },
    yaxis: {
      title: {
        text: "Cantidad",
      },
    },
  };

  const series = [
    {
      name: "Cantidad",
      data: Object.values(tableValues),
    },
  ];

  const addCount = () => {
    var count = 1;
    const aux = {};

    while (count <= daysInMonth) {
      reservationsOfTheMonth[count]
        ? (aux[count] = reservationsOfTheMonth[count])
        : (aux[count] = 0);

      count += 1;
    }
    setTableValues(aux);
  };

  useEffect(() => {
    addCount();
  }, [reservationsOfTheMonth]);

  return (
    <div id="chart">
      <ReactApexChart
        options={config}
        series={series}
        type="line"
        height={400}
      />
    </div>
  );
}
