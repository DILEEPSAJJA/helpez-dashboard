import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function IncidentDonut({ incidents }) {
  const [state, setState] = useState({
    series: [0, 0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState();
  const [categoryPercents, setCategoryPercents] = useState({
    Natural: 0,
    Accident: 0,
    Medical: 0,
    Environmental: 0,
    Technological: 0,
    Miscellaneous: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchIncidents = async () => {
      if (incidents) {
        const data = incidents?.docs.map((doc) => doc.data());
        const categories = [
          "Natural",
          "Accident",
          "Medical",
          "Environmental",
          "Technological",
          "Miscellaneous",
        ];
        const series = categories.map(
          (category) =>
            data.filter((incident) => incident.category === category).length
        );

        setState({ series });

        const counts = data.reduce(
          (acc, incident) => {
            acc[incident.category] = (acc[incident.category] || 0) + 1;
            return acc;
          },
          {
            Natural: 0,
            Accident: 0,
            Medical: 0,
            Environmental: 0,
            Technological: 0,
            Miscellaneous: 0,
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
    fetchIncidents();
    setLoading(false);
  }, [incidents]);

  const options = {
    chart: {
      fontFamily: "sans-serif",
      type: "donut",
    },
    colors: ["#6577F3", "#8FD0EF", "#0FADCF", "#F39C12", "#E74C3C", "#8E44AD"],
    labels: [
      "Natural",
      "Accident",
      "Medical",
      "Environmental",
      "Technological",
      "Miscellaneous",
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

  const colorMap = {
    Natural: "#6577F3",
    Accident: "#8FD0EF",
    Medical: "#0FADCF",
    Environmental: "#F39C12",
    Technological: "#E74C3C",
    Miscellaneous: "#8E44AD",
  };
  return (
    <>
      {!loading && incidents && categoryCounts && (
        <>
          <div className="mt-4 sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
              <div>
                <h5 className="text-xl font-semibold text-black dark:text-white">
                  Incidents Analytics
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
