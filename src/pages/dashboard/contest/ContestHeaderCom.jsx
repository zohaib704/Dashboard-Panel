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
import CircularProgressBar from "./Progressbar";

const ContestHeaderCom = () => {
  const chartConfig = {
    type: "area",
    height: 300,
    series: [
      {
        name: "Sales",
        data: [10, 400, 350, 400, , 260, 20, 79, 120, 450, 200, 600],
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
              opacity: 0.3,
            },
            {
              offset: 100,
              color: "#BA5EEF",
              opacity: 0.1,
            },
          ],
        },
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
        <div className="title-section mt-16 mb-5">
          <Typography variant="h5" color="white">
            Dashboard
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Welcome to Dashboard, Andre Genze
          </Typography>
        </div>
      </div>

        <Card className="bg-[#2C2C2E] flex justify-center items-center">
          <CardBody className="  w-[90%]">
            <div className="flex justify-around items-center gap-x-4">
              <div>
                <CircularProgressBar underText="Days" text="04" percentage={75} />
              </div>
              <div>
                <CircularProgressBar underText="Hours" text="08" percentage={90} />
              </div>
              <CircularProgressBar underText="Minutes" text="42" percentage={50} />
              <div>
                <CircularProgressBar underText="Second" text="18" percentage={63} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default ContestHeaderCom;
