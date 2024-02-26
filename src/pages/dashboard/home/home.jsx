import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { FaEdit, FaMobile, FaRegBell, FaUsers } from "react-icons/fa";

import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { GiEarthAmerica, GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { DialogDefault } from "@/components/Modal";
import { DetailSession } from "../sessions/DetailSession";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import { IoEyeSharp, IoStatsChart } from "react-icons/io5";

import storeProf from "../../../../public/img/store/storeprof.png";
import FaSortUp from "../../../../public/img/home/faSortUp.png";
import FaSortDown from "../../../../public/img/home/faSortDown.png";
import DashChartCard from "./DashChartCard";
import ReactApexChart from "react-apexcharts";
import { FiChevronsRight } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";

// Area Chart Settings
const AreachartConfig = {
  type: "area",
  height: 200,
  series: [
    {
      name: "Sales",
      data: [10, 20, 24,79,10,90,23, 12, 8, 3,70, 100],
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
        "Jan",
        "Febr",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 200,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 200,
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

export function Home() {
  // Bar Chart Settings

  const [chartData, setChartData] = useState({
    series: [
      {
        data: [44, 55, 57, 56, 61, 58, 63, 90, 66],
      },

      {
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      legend: {
        show: false, // Set to true if legend is not already visible
      },
      chart: {
        type: "bar",
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
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
      stroke: {
        show: true,
        width: 3,
        colors: ["BA5EEF", ""],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {},
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#BA5EEF", "#87d12a"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [upComingSessions, setUpComingSessions] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [detail, setDetail] = useState(null);
  const handleDeleteModalOpen = () => setisDelete(!isDelete);
  const handleDetailModalOpen = () => setDetail(!detail);
  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/api/class/deleteClass/${
          selectedItem?._id
        }`,
      );
      getUpcomingSessions();
      toast.success(data.message);
      setisDelete(false);
      setselectedItem(null);
    } catch (error) {
      setisDelete(false);
      setselectedItem(null);
      console.log(error);
      toast.error("Server error,Please refresh the page...");
    }
  };
  const getDashboardStats = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard/getDashboardStats`,
      );
      let result = data?.data;
      let arrangeData = [
        {
          color: "white",
          icon: <IoStatsChart size={24} className="text-primary" />,
          title: "Total Users",
          value: result?.users,
        },
        {
          color: "white",
          icon: <IoStatsChart size={24} className="text-primary" />,
          title: "Total Instructor",
          value: result?.instructor,
        },
        {
          color: "white",
          icon: <IoStatsChart size={24} className="text-primary" />,
          title: "Total Sessions",
          value: result?.sessions,
        },
        {
          color: "white",
          icon: <IoStatsChart size={24} className="text-primary" />,
          title: "Total Sessions",
          value: result?.sessions,
        },
      ];
      setStats(arrangeData);
      setStatsLoading(false);
    } catch (error) {
      setStatsLoading(false);
      console.log(error);
      toast.error("Server error.Please refresh the page..");
    }
  };
  const getUpcomingSessions = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/dashboard/getUpcomingSessions`,
      );
      setUpComingSessions(data?.sessions);
      setSessionLoading(false);
    } catch (error) {
      setSessionLoading(false);
      console.log(error);
      toast.error("Server error.Please refresh the page..");
    }
  };
  useEffect(() => {
    getDashboardStats();
    getUpcomingSessions();
  }, []);

  // Tables Data
  const TABLE_HEAD = ["Rank", "Picture", "Mail", "Votes", ""];
  const contestData = [
    {
      Rank: 1,
      Picture:
        "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
      Mail: "user1@example.com",
      Votes: 100,
      Actions: ["Like", "Comment", "Share"],
    },
    {
      Rank: 2,
      Picture:
        "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
      Mail: "user2@example.com",
      Votes: 85,
      Actions: ["Like", "Share"],
    },
    {
      Rank: 3,
      Picture:
        "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
      Mail: "user3@example.com",
      Votes: 70,
      Actions: ["Like", "Comment"],
    },
    {
      Rank: 4,
      Picture:
        "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
      Mail: "user3@example.com",
      Votes: 70,
      Actions: ["Like", "Comment"],
    },
    
  ];

  return (
    <>
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
          <Typography variant="h4" color="white"
          className="font-nunito font-bold text-3xl"
          >
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

      {/* ------------ Main Section start here----------------  */}
      <div className="main-section">
        {/* upper 4 Cards */}
        <div className=" upper-Card-Section p-0">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <DashChartCard 
            title="Active Members" 
            icon={FaSortUp} 
            total="21.2K"
            gradient="#BA5EEF"
             />
            <DashChartCard
              title="Registered Members"
              icon={FaSortUp}
              total="19.2K"
              gradient="#53EAF3"
            />
            <DashChartCard
              title="Active Barbershops"
              icon={FaSortDown}
              total="10.5k"
              gradient="#FD6492"
            />
            <DashChartCard
              title="Registered Barbershops"
              icon={FaSortDown}
              total="7.00k"
              gradient="#B0FA51" 
            />
          </div>
        </div>

        {/*  Both Charts Section  */}

        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 md:my-5 my-8 gap-4">
          <div className=" col-span-5 lg:col-span-2">
            <Card className="bg-[#2C2C2E]">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 justify-between rounded-none md:flex-row md:items-center"
              >
                <div>
                  <Typography variant="h5" color="white" className="font-nunito font-semibold">
                    Users Statistics
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="max-w-sm font-normal"
                  >
                    View Your Success Rate
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
                <div className="flex gap-5 justify-end mr-3">
                  <div className="flex gap-x-1 items-center">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#BA5EEF] to-[#0065E8]"></span>
                    <Typography variant="small">Members</Typography>
                  </div>
                  <div className="flex gap-x-1 items-center">
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#B0FA51] to-[#6EB711]"></span>
                    <Typography variant="small">Barbershops</Typography>
                  </div>
                </div>
                <div>
                  <div id="chart">
                    <ReactApexChart
                      options={chartData.options}
                      series={chartData.series}
                      type="bar"
                      height={200}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className=" col-span-5 lg:col-span-2">
            <Card className="bg-[#2C2C2E]">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 justify-between rounded-none md:flex-row md:items-center"
              >
                <div>
                  <Typography variant="h5" color="white" className="font-nunito font-semibold">
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
              <CardBody className="px-2 pb-0 pt-11">
                <Chart {...AreachartConfig} />
              </CardBody>
            </Card>
          </div>
          <div className=" col-span-5  md:col-span-5 
          lg:col-span-1   ">
          <div className="justify-between gap-x-1
           lg:space-y-[32%] space-y-1">
          <div className="bg-[#2C2C2E]  rounded-xl text-white 
          py-2 md:py-8 px-3 space-y-2">
              <div>
                <Typography variant="h6" className="font-nunito">Stamps Assigned</Typography>
              </div>

              <div>
                <Typography variant="h4">12.2k</Typography>
              </div>
            </div>

            <div className="bg-[#2C2C2E]  
            rounded-xl text-white py-2 md:py-8 px-3  space-y-2 ">
              <div >
                <Typography variant="h6" className="font-nunito">Contest Participants</Typography>
              </div>

              <div>
                <Typography  variant="h4">10.0k</Typography>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* -------------------Contest Member BarberShop Cards section start here-------------  */}
        <div className="Contest-Member-Barbershop-cards-section 
        gap-4 flex lg:flex-row flex-col">
          {/* Contest Participants Section  */}
          <div className="Contest-section lg:w-[46%] w-[100%]">
            <Card className="overflow-hidden xl:col-span-2  
             bg-[#1f1f21]">
              {/* -----------Card Header Section Start-----------------  */}
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex flex-col md:flex-row items-center justify-between sm:p-6 p-2"
              >
                <div className="md:w-auto w-full mb-5 sm:mb-0">
                  <Typography variant="h5"  color="white" 
                  className="mb-1 font-nunito font-semibold">
                    Contest Participants
                  </Typography>
                  <Typography variant="small">Ends in 4d 18h</Typography>
                </div>
              </CardHeader>
              <CardBody className=" px-0 pt-0 overflow-x-auto ">
                <table className="w-full ">
                  {/* ----------Table Header---------- */}
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={index}
                          className="cursor-pointer ps-3  bg-[#333333] 
                        py-3   "
                        >
                          <Typography
                            variant="h6"
                            className="flex items-center  
                            text-sm font-normal font-nunito text-gray-500 ">
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {/* --------table Body------  */}
                  <tbody>
                    {sessionLoading ? (
                      <tr>
                        <td colSpan={8} className="text-center p-3">
                          <div role="status" className="text-center p-3">
                            <svg
                              aria-hidden="true"
                              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {contestData?.length ? (
                          contestData?.map(
                            (
                              { _id, Rank, Picture, Mail, Votes, Actions },
                              key,
                            ) => {
                              const className = `py-[2.2%] ${
                                key === upComingSessions?.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              }`;
                              // styling for TDs
                              const classNames =
                                Rank === 1
                                  ? "bg-[#BA5EEF] text-[white]"
                                  : "bg-[white]  text-[black]";

                              return (
                                <>
                                  {/*- All Data TDs -*/}
                                  <tr
                                    key={_id}
                                    className=" border-b-[2px] border-gray-800"
                                  >
                                    {/* Rank */}
                                    <td className={className}>
                                      <div
                                        className={`${classNames} py-2 flex 
                                       items-center justify-center 
                                      gap-x-1 ml-2 rounded-lg `}
                                      >
                                        <GrAchievement className="text-xs" />
                                        <Typography className="text-xs  ">
                                          {Rank}
                                        </Typography>
                                      </div>
                                    </td>

                                    <td className={className}>
                                      <div className="flex justify-center items-center ">
                                        {/* <Avatar
                                        src={`${
                                          import.meta.env.VITE_BASE_URL
                                        }/${instructor?.image}`}
                                        alt={instructor?.image}
                                        size="sm"
                                      /> */}
                                        <img
                                          src={Picture}
                                          className="
                                      w-[2rem]
                                      rounded-full "
                                        />
                                      </div>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-sm  font-nunito text-gray-400 font-normal">
                                        {Mail}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-nunito text-center text-gray-400 font-light">
                                        {Votes}
                                      </Typography>
                                    </td>

                                    {/* ------------------actions icons-----------------  */}

                                    <td className={className}>
                                      <div className="flex gap-x-3 justify-center items-center">
                                        <BsThreeDotsVertical />
                                        {/* ----View icon------  */}
                                        {/* <span>
                                        <IoEyeSharp
                                          className="text-white cursor-pointer"
                                          onClick={() => {
                                            setDetail({
                                              _id,
                                              photo,
                                              name,
                                              purpose,
                                              description,
                                              instructor,
                                              date,
                                              startTime,
                                              length,
                                              attendees,
                                            });
                                          }}
                                        />
                                      </span> */}
                                        {/* -----edit icon------ */}
                                        {/* <span>
                                        <FaEdit
                                          className="cursor-pointer 
                                      text-[#BA5EEF]"
                                          onClick={() => {
                                            navigate(
                                              `/dashboard/edit-session/${_id}?go=dashboard`,
                                            );
                                          }}
                                        />
                                      </span> */}
                                        {/* ----delete icon---- */}
                                        {/* <span>
                                        <MdDeleteForever
                                          className="text-red-700 cursor-pointer"
                                          onClick={() => {
                                            setisDelete(true);
                                            setselectedItem({ _id });
                                          }}
                                        />
                                      </span> */}
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            },
                          )
                        ) : (
                          <tr>
                            <td colSpan={8} className="text-center">
                              <span className="text-sm"> No record found</span>
                            </td>
                          </tr>
                        )}

                        {/* ----------View All Records-----------  */}

                        <tr>
                          <td colSpan={7} className="w-full ">
                            <Typography className="flex justify-end text-white text-sm mt-3 items-center mr-3">
                              <NavLink to="detailsContest">View All</NavLink>
                              <FiChevronsRight className="ml-1" />
                            </Typography>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
          {/* Members  */}
          <div className="Contest-section lg:w-[27%] md:w-[100%]  w-[100%]">
            <Card className="overflow-hidden xl:col-span-2  bg-[#1f1f21]">
              {/* -----------Card Header Section Start-----------------  */}
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex flex-col md:flex-row items-center justify-between sm:p-6 p-2"
              >
                <div className="md:w-auto w-full mb-5 sm:mb-0">
                  <Typography variant="h5" color="white" 
                  className="mb-1 font-nunito font-semibold">
                    Members
                  </Typography>
                  <Typography variant="small">
                    View or Manage Your Members
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className=" px-0 pt-0 overflow-x-auto ">
                <table className="w-[100%]">
                  {/* ----------Table Header---------- */}
                  <thead className=" ">
                    <tr>
                      <th
                        colSpan={3}
                        className=" cursor-pointer w-[100%] bg-[#333333] 
                        py-3 
                         "
                      >
                        <Typography
                          variant="h6"
                          className="flex items-center ps-3
                            text-sm font-normal font-nunito text-gray-500 "
                        >
                          Members
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  {/* --------table Body------  */}
                  <tbody>
                    {sessionLoading ? (
                      <tr>
                        <td colSpan={8} className="text-center p-3">
                          <div role="status" className="text-center p-3">
                            <svg
                              aria-hidden="true"
                              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {contestData?.length ? (
                          contestData?.map(
                            (
                              { _id, Rank, Picture, Mail, Votes, Actions },
                              key,
                            ) => {
                              const className = `py-2 ${
                                key === upComingSessions?.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              }`;
                              // styling for TDs
                              const classNames =
                                Rank === 1
                                  ? "bg-[#BA5EEF] text-[white]"
                                  : "bg-[white]  text-[black]";

                              return (
                                <>
                                  {/*---------- All Data TDs -----------------------  */}
                                  <tr
                                    key={_id}
                                    className="border-b-[2px]    border-gray-800"
                                  >
                                    <td className={className}>
                                      <div className="flex justify-center items-center ">
                                        {/* <Avatar
                                        src={`${
                                          import.meta.env.VITE_BASE_URL
                                        }/${instructor?.image}`}
                                        alt={instructor?.image}
                                        size="sm"
                                      /> */}
                                        <img
                                          src={Picture}
                                          className="
                                      w-[2rem]
                                      rounded-full "
                                        />
                                      </div>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-sm text-gray-300 font-nunito "
                                      >
                                        Name
                                      </Typography>
                                      <Typography className="text-xs font-nunito">
                                        {Mail}
                                      </Typography>
                                    </td>

                                    {/* ------------------actions icons-----------------  */}

                                    <td className={className}>
                                      <div className="flex gap-x-3 justify-center items-center">
                                        <BsThreeDotsVertical />
                                        {/* ----View icon------  */}
                                        {/* <span>
                                        <IoEyeSharp
                                          className="text-white cursor-pointer"
                                          onClick={() => {
                                            setDetail({
                                              _id,
                                              photo,
                                              name,
                                              purpose,
                                              description,
                                              instructor,
                                              date,
                                              startTime,
                                              length,
                                              attendees,
                                            });
                                          }}
                                        />
                                      </span> */}
                                        {/* -----edit icon------ */}
                                        {/* <span>
                                        <FaEdit
                                          className="cursor-pointer 
                                      text-[#BA5EEF]"
                                          onClick={() => {
                                            navigate(
                                              `/dashboard/edit-session/${_id}?go=dashboard`,
                                            );
                                          }}
                                        />
                                      </span> */}
                                        {/* ----delete icon---- */}
                                        {/* <span>
                                        <MdDeleteForever
                                          className="text-red-700 cursor-pointer"
                                          onClick={() => {
                                            setisDelete(true);
                                            setselectedItem({ _id });
                                          }}
                                        />
                                      </span> */}
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            },
                          )
                        ) : (
                          <tr>
                            <td colSpan={8} className="text-center">
                              <span className="text-sm"> No record found</span>
                            </td>
                          </tr>
                        )}

                        {/* ----------View All Records-----------  */}

                        <tr>
                          <td colSpan={7} className="w-full ">
                            <Typography className="flex justify-end text-white text-sm mt-3 items-center mr-3">
                              <NavLink to="#">View All</NavLink>
                              <FiChevronsRight className="ml-1" />
                            </Typography>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
          {/* Barbershops */}
          <div className="Contest-section lg:w-[27%] md:w-[100%] w-[100%]">
            <Card className="overflow-hidden xl:col-span-2   bg-[#1f1f21]">
              {/* -----------Card Header Section Start-----------------  */}
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex flex-col md:flex-row items-center justify-between sm:p-6 p-2"
              >
                <div className="md:w-auto w-full mb-5 sm:mb-0">
                  <Typography variant="h5" color="white"
                   className="mb-[3%] font-nunito font-semibold">
                  Barbershops
                  </Typography>
                  <Typography variant="small">
                  View or Manage Barbershops
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className=" px-0 pt-0 overflow-x-auto ">
                <table className="w-[100%]">
                  {/* ----------Table Header---------- */}
                  <thead className=" ">
                    <tr>
                      <th
                        colSpan={3}
                        className=" cursor-pointer w-[100%] bg-[#333333] 
                        py-3  hover:bg-blue-gray-50 hover:text-black
                         text-white"
                      >
                        <Typography
                          variant="h6"
                          className="
                           flex items-center ps-3
                            text-sm font-normal font-nunito text-gray-500
                           "
                        >
                          Barbershops
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  {/* --------table Body------  */}
                  <tbody>
                    {sessionLoading ? (
                      <tr>
                        <td colSpan={8} className="text-center p-3">
                          <div role="status" className="text-center p-3">
                            <svg
                              aria-hidden="true"
                              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {contestData?.length ? (
                          contestData?.map(
                            (
                              { _id, Rank, Picture, Mail, Votes, Actions },
                              key,
                            ) => {
                              const className = `py-2 ${
                                key === upComingSessions?.length - 1
                                  ? ""
                                  : "border-b border-blue-gray-50"
                              }`;
                              // styling for TDs
                              const classNames =
                                Rank === 1
                                  ? "bg-[#BA5EEF] text-[white]"
                                  : "bg-[white]  text-[black]";

                              return (
                                <>
                                  {/*---------- All Data TDs -----------------------  */}
                                  <tr
                                    key={_id}
                                    className="border-b-[2px]    border-gray-800"
                                  >
                                    <td className={className}>
                                      <div className="flex justify-center items-center ">
                                        {/* <Avatar
                                        src={`${
                                          import.meta.env.VITE_BASE_URL
                                        }/${instructor?.image}`}
                                        alt={instructor?.image}
                                        size="sm"
                                      /> */}
                                        <img
                                          src={Picture}
                                          className="
                                      w-[2rem]
                                      rounded-full "
                                        />
                                      </div>
                                    </td>
                                    <td className={className}>
                                      <Typography
                                        variant="small"
                                        className="text-sm text-gray-300 font-nunito "
                                      >
                                        Name
                                      </Typography>
                                      <Typography className="text-xs font-nunito">
                                        {Mail}
                                      </Typography>
                                    </td>

                                    {/* -----------------actions icons-----------------  */}

                                    <td className={className}>
                                      <div className="flex gap-x-3 justify-center items-center">
                                        <BsThreeDotsVertical />
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            },
                          )
                        ) : (
                          <tr>
                            <td colSpan={8} className="text-center">
                              <span className="text-sm"> No record found</span>
                            </td>
                          </tr>
                        )}

                        {/* ----------View All Records-----------  */}

                        <tr>
                          <td colSpan={7} className="w-full ">
                            <Typography className="flex justify-end text-white text-sm mt-3 items-center mr-3">
                              <NavLink to="#">View All</NavLink>
                              <FiChevronsRight className="ml-1" />
                            </Typography>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
