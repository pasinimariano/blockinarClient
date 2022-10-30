import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function RevenueChart({ revenue }) {
  const currentYear = new Date().getFullYear();

  const setup = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    colors: ["#9c27b0ff"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: `Revenue del año ${currentYear}`,
      align: "center",
    },
    grid: {
      row: {
        colors: ["#203239", "transparent"],
      },
    },
    xaxis: {
      categories: Object.keys(revenue),
      title: {
        text: "Mes",
      },
    },
    yaxis: {
      title: {
        text: "Ganancias",
        opposite: true,
      },
    },
  };

  const series = [
    {
      name: "Ganancia",
      data: Object.values(revenue),
    },
  ];

  return (
    <div id="chart">
      <ReactApexChart
        options={setup}
        series={series}
        type="area"
        height={550}
      />
    </div>
  );
}
