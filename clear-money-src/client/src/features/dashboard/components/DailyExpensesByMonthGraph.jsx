import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const DailyExpensesByMonthGraph = ({ dailyExpensesByMonth }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const sortByMonthYear = (a, b) => {
    const [aMonth, aYear] = a.month.split(" ");
    const [bMonth, bYear] = b.month.split(" ");
    const aDate = new Date(`${aYear}-${aMonth}`);
    const bDate = new Date(`${bYear}-${bMonth}`);
    return aDate - bDate;
  };

  dailyExpensesByMonth?.sort(sortByMonthYear);

  const years = [...new Set(dailyExpensesByMonth?.map((item) => item.month.split(" ")[1]))];

  const [selectedYear, setSelectedYear] = useState("");

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredDailyExpenses = selectedYear
    ? dailyExpensesByMonth?.filter((item) => item.month.includes(selectedYear))
    : dailyExpensesByMonth;

  const chartData = {
    labels: filteredDailyExpenses?.map((item) => item.month),
    datasets: [
      {
        label: "total",
        data: filteredDailyExpenses?.map((item) => item.total.toFixed(2)),
        fill: false,
        borderColor: "#6D28D9",
        tension: 0.1,
      },
    ],
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;

  return (
    <div className="border mt-4 p-4 bg-white rounded-lg">
      <div className="flex flex-row justify-between h-10 mb-16 mt-4">
        <h1 className="mb-6 text-2xl">
          Your Total Daily Expenses By Month :
        </h1>
        <select
          value={selectedYear}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option value="">All Years</option>
          {years &&
            years?.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  label += formatCurrency(context.parsed.y);
                  return label;
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: formatCurrency,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DailyExpensesByMonthGraph;
