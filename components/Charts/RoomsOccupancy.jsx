import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartRoomsOccupancy({ occupancy }) {
  const [series, setSeries] = useState([]);
  const [config, setConfig] = useState({
    labels: [],
    colors: ["#00C851", "#ff4444"],
    bar: {
      dataLabels: {
        position: "top",
      },
    },
    chart: {
      width: "100%",
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Control de habitaciones",
      align: "center",
    },
    legend: {
      show: false,
    },
  });

  useEffect(() => {
    if (occupancy) {
      setSeries(Object.values(occupancy));
      setConfig((prevState) => ({
        ...prevState,
        labels: Object.keys(occupancy),
      }));
    }
  }, [occupancy]);

  return (
    <Box sx={{ mt: 4 }}>
      <ReactApexChart
        options={config}
        series={series}
        type="pie"
        height={300}
      />
    </Box>
  );
}
