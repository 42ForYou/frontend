import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const pieData = data.map((item) => item.percent);
    const pieLabels = data.map((item) => item.label);
    const backgroundColors = data.map((item) => item.color);

    const pieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: pieLabels,
        datasets: [
          {
            data: pieData,
            backgroundColor: backgroundColors,
            borderColor: "rgba(255, 255, 255, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      pieChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
