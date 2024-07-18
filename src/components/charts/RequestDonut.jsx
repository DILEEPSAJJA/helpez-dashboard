import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const colorMap = {
  Medical: "#6577F3",
  "Food Resources": "#8FD0EF",
  Clothing: "#0FADCF",
  "Technical Support": "#F39C12",
  "Rescue and Safety": "#E74C3C",
  "Shelter and Housing": "#8E44AD",
  Transportation: "#F3A50E",
  "Hygiene and Sanitation": "#E03C50",
};

export default function RequestDonut({ requests }) {
  const [state, setState] = useState({
    series: [0, 0, 0, 0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({
    Medical: 0,
    "Food Resources": 0,
    Clothing: 0,
    "Technical Support": 0,
    "Rescue and Safety": 0,
    "Shelter and Housing": 0,
    Transportation: 0,
    "Hygiene and Sanitation": 0,
  });
  const [categoryPercents, setCategoryPercents] = useState({
    Medical: 0,
    "Food Resources": 0,
    Clothing: 0,
    "Technical Support": 0,
    "Rescue and Safety": 0,
    "Shelter and Housing": 0,
    Transportation: 0,
    "Hygiene and Sanitation": 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchRequests = async () => {
      if (requests) {
        const data = requests?.docs.map((doc) => doc.data());
        const categories = [
          "Medical",
          "Food Resources",
          "Clothing",
          "Technical Support",
          "Rescue and Safety",
          "Shelter and Housing",
          "Transportation",
          "Hygiene and Sanitation",
        ];
        const series = categories.map(
          (category) =>
            data.filter((request) => request.category === category).length
        );

        setState({ series });

        const counts = data.reduce(
          (acc, request) => {
            acc[request.category] = (acc[request.category] || 0) + 1;
            return acc;
          },
          {
            Medical: 0,
            "Food Resources": 0,
            Clothing: 0,
            "Technical Support": 0,
            "Rescue and Safety": 0,
            "Shelter and Housing": 0,
            Transportation: 0,
            "Hygiene and Sanitation": 0,
          }
        );
        setCategoryCounts(counts);

        // Convert counts to percentages
        const total = data.length;
        const percentages = Object.keys(counts).reduce((acc, key) => {
          acc[key] = ((counts[key] / total) * 100).toFixed(2);
          return acc;
        }, {});

        setCategoryPercents(percentages);
      }
    };
    fetchRequests();
    setLoading(false);
  }, [requests]);

  const options = {
    chart: {
      fontFamily: "sans-serif",
      type: "donut",
    },
    colors: [
      colorMap["Medical"],
      colorMap["Food Resources"],
      colorMap["Clothing"],
      colorMap["Technical Support"],
      colorMap["Rescue and Safety"],
      colorMap["Shelter and Housing"],
      colorMap["Transportation"],
      colorMap["Hygiene and Sanitation"],
    ],
    labels: [
      "Medical",
      "Food Resources",
      "Clothing",
      "Technical Support",
      "Rescue and Safety",
      "Shelter and Housing",
      "Transportation",
      "Hygiene and Sanitation",
    ],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <>
      {!loading && requests && categoryCounts && (
        <>
          <div className="mt-4 sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <div>
                <h5 className="text-xl font-semibold text-black dark:text-white">
                  Requests Analytics
                </h5>
              </div>
            </div>

            <div className="mb-2 flex flex-wrap justify-between items-center">
              <div id="chartThree" className="mx-auto flex justify-center">
                <ReactApexChart
                  options={options}
                  series={state.series}
                  type="donut"
                />
              </div>
              <div className="w-1/2 mt-4 px-8">
                {Object.keys(categoryPercents).map((category, index) => (
                  <div key={index} className="flex w-full items-center mb-2">
                    <span
                      className="mr-2 p-2 block h-3 w-full max-w-2 rounded-full"
                      style={{ backgroundColor: colorMap[category] }}
                    ></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                      <span>{category}</span>
                      <span>
                        {categoryPercents[category]}% (
                        {categoryCounts[category]})
                      </span>
                    </p>
                  </div>
                ))}
                <hr />
                <div className="flex w-full items-center mb-2">
                  <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                    <span>Total</span>
                    <span>
                      {Object.values(categoryCounts).reduce(
                        (sum, count) => sum + count,
                        0
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
