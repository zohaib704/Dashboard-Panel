import { Typography } from "@material-tailwind/react";
import React from "react";
import Chart from "react-apexcharts";

const DashChartCard = ({ icon, title, total ,gradient }) => {

  const chartConfig = {
    type: "bar",
    height: 100,
    width: 65,
   background: gradient,
    series: [
      {
        name: "Sales",
        data: [30, 4, 15, 18, 50, 34, 15, 18, 50, 35],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
    
      dataLabels: {
        enabled: false,
      },
      colors: [gradient],
      plotOptions: {
        
        bar: {
          columnWidth: "80%",
          borderRadius: 2,
          
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        borderColor: "red",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
        
          top: 0,
          right: 10,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <div className="bg-[#2C2C2E] grid grid-cols-6 
    rounded-lg text-white py-2 px-3 space-y-1">
    <div className="col-span-4 gap-y-3 flex flex-col"> 
      <div >
        <Typography variant="small">{title}</Typography>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center gap-x-2">
          <div>
            <img src={icon} />
          </div>
          <Typography>+1.45k</Typography>
        </div>
      </div>
      <div>
        <Typography variant="h5">{total}</Typography>
      </div>
    </div>
    <div className="col-span-2"> {/* Adjust this line */}
      <Chart {...chartConfig} />
    </div>
  </div>
  
  );
};

export default DashChartCard;
