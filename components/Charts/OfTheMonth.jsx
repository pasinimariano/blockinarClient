import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function ChartOfTheMonth({ allReservations }) {
  const [reservationsOfTheMonth, setReservationsOfTheMonth] = useState({});
  const currentMonth = `0${moment().month() + 1}`.slice(-2);
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

  const getReservationsOfTheMont = () => {
    if (allReservations) {
      allReservations.map((reservation) => {
        const day = Number(reservation["check_in_date"].slice(8, 10));
        const month = reservation["check_in_date"].slice(5, 7);

        if (month === currentMonth) {
          setReservationsOfTheMonth((prevState) => ({
            ...prevState,
            [day]: (prevState[day] += 1),
          }));
        }
      });
    }
  };

  useEffect(() => {
    addCount();
  }, []);

  useEffect(() => {
    getReservationsOfTheMont();
  }, [allReservations]);

  return (
    <div id="chart">
      <ReactApexChart
        options={config}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
}
