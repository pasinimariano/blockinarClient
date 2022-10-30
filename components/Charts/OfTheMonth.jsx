import { useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartOfTheMonth({
  reservationsOfTheMonth,
  setReservationsOfTheMonth,
}) {
  const daysInMonth = moment().daysInMonth();

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
    title: {
      text: "Reservas del mes",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#203239", "transparent"],
      },
    },
    xaxis: {
      categories: Object.keys(reservationsOfTheMonth),
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
      data: Object.values(reservationsOfTheMonth),
    },
  ];

  const addCount = () => {
    var count = 1;
    const aux = {};

    while (count <= daysInMonth) {
      aux[count] = 0;
      count += 1;
    }

    setReservationsOfTheMonth(aux);
  };

  useEffect(() => {
    addCount();
  }, []);

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
