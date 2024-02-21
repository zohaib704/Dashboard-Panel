import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import storeProf from "../../../../public/img/store/storeprof.png";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const Store = () => {
  const chartConfig = {
    type: "area",
    height: 300,
    series: [
      {
        name: "Sales",
        data: [10, 400, 350,400,,260, 20,79, 120,  450,  200, 600],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      
      stroke: {
        colors: ["#BA5EEF"],
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 800,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 800,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#808080",
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
            type: "vertical", // or "horizontal"
            shadeIntensity: 1,
            stops: [0, 100],
            colorStops: [
                {
                    offset: 0,
                    color: "#BA5EEF",
                    opacity: 0.3
                },
                {
                    offset: 100,
                    color: "#BA5EEF",
                    opacity: 0.1
                }
            ]
        }
    },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <section className="flex w-full justify-center">
      <div className="inner-section w-[100%] text-white">
        
          {/* Header Main Section start here  */}
      <div className="header-main-section">
        <div className="header flex sm:flex-row flex-col 
         justify-between
         items-center">
          <div className="relative mx-auto sm:mx-0 flex items-center
           w-[80%] sm:w-[35%]">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white py-2 px-2 
                w-[100%] rounded-3xl "
            />
            <div className="absolute right-1 bg-[#BA5EEF] p-[10px] rounded-full flex items-center pointer-events-none">
              <BsSearch className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="flex justify-around 
          sm:mt-0 mt-5 md:w-[20%]  sm:w-auto  gap-x-1">
            <span className="bg-[#BA5EEF] rounded-lg h-8 w-8 flex items-center justify-center">
              <GiEarthAmerica />
            </span>
            <span className="bg-[#BA5EEF] rounded-lg h-8 w-8 flex items-center justify-center">
              <FaRegBell />
            </span>
            <img
              src={storeProf}
              alt="storeProf"
              className="w-8 h-8 rounded-full ml-7"
            />
          </div>
        </div>
      </div>
          <div className="title mt-10">
            <h3 className="text-xl">Store</h3>
            <p className="text-gray-500 mb-5">Welcome to Store, Andre Genze</p>

            <Card className="bg-[#2C2C2E]">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 justify-between rounded-none md:flex-row md:items-center"
              >
                <div>
                  <Typography variant="h6" color="white">
                    Store Statistics
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="max-w-sm font-normal"
                  >
                    +8.14k Orders Last Year
                  </Typography>
                </div>
                <div className="text-white rounded-lg bg-black px-3 py-2 md:text-left text-center">
                  <select
                    className="
                    bg-black
                    h-6 w-22 text-white outline-none"
                    defaultValue="Year"
                  >
                    <option hidden>Year</option>
                    {Array.from({ length: 11 }, (_, i) => (
                      <option className="text-white " key={i} value={2015 + i}>
                        {2015 + i}
                      </option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
              </CardBody>
            </Card>
          </div>
        </div>

    </section>
  );
};

export default Store;
