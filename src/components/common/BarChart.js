import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartData = data.map((item) => item.percent);
    const chartLabels = data.map((item) => item.label);
    const backgroundColors = data.map((item) => item.color);

    const barChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: "Statistics",
            data: chartData,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map((color) => `${color}99`),
            borderWidth: 1,
            barThickness: 20, // Adjust bar thickness here if needed
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = "";
                if (context.parsed.y !== null) {
                  label += `${context.raw} (${(context.parsed.y * 100).toFixed(2)}%)`;
                }
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return (value * 100).toFixed(0) + "%";
              },
              stepSize: 0.2, // Here we set the step size to 20%
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
