import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartRoomsOccupancy({ allRooms }) {
  const [occupancy, setOccupancy] = useState({});
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

  const getRoomsOccupancy = () => {
    if (allRooms) {
      var auxFree = 0;
      var auxOccupies = 0;

      allRooms.map((room) => {
        !room["occupancy"] ? (auxFree += 1) : (auxOccupies += 1);
      });

      setOccupancy({ Libres: auxFree, Ocupadas: auxOccupies });
      setSeries(Object.values(occupancy));
      setConfig((prevState) => ({
        ...prevState,
        labels: Object.keys(occupancy),
      }));
    }
  };

  useEffect(() => {
    getRoomsOccupancy();
  }, [allRooms]);

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
