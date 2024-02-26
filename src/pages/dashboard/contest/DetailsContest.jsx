import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
} from "@material-tailwind/react";

import storeProf from "../../../../public/img/store/storeprof.png";

import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { FiChevronsRight } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import { GrAchievement } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";

import { IoStatsChart } from "react-icons/io5";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { FaEdit, FaRegBell } from "react-icons/fa";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdDeleteForever,
} from "react-icons/md";

import { IoIosSearch } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
  {
    Rank: 5,
    Picture:
      "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
    Mail: "user3@example.com",
    Votes: 70,
    Actions: ["Like", "Comment"],
  },
  {
    Rank: 6,
    Picture:
      "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
    Mail: "user3@example.com",
    Votes: 70,
    Actions: ["Like", "Comment"],
  },
  {
    Rank: 7,
    Picture:
      "https://pixabay.com/get/g3ea0bc9f2382326f18c8e7d362a8d4921f7b73f907b95c35a33ba55bd6e4e6c60000be35efee9b3d783560b7ee1100938089aafbde9d67b7717d3c9f27d441b7bf02bd25dceb5b91046b6de1f93ea161_640.jpg",
    Mail: "user3@example.com",
    Votes: 70,
    Actions: ["Like", "Comment"],
  },
];

const Contest = () => {
  const navigate = useNavigate();
  const [pageActive, setPageActive] = useState();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [upComingSessions, setUpComingSessions] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [detail, setDetail] = useState(null);
  const handleDeleteModalOpen = () => setisDelete(!isDelete);
  const handleDetailModalOpen = () => setDetail(!detail);

  const TABLE_HEAD = ["Rank", "Picture", "Mail", "Votes", "Actions"];

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

  //  --------------------- Pagination
  const getItemProps = (index) => ({
    variant: pageActive === index ? "filled" : "text",
    color: "gray",
    onClick: () => setPageActive(index),
  });

  const next = () => {
    if (pageActive === 5) return;

    setPageActive(pageActive + 1);
  };

  const prev = () => {
    if (pageActive === 1) return;

    setPageActive(pageActive - 1);
  };

  return (
    <section>
      <div>
        {/* -------------upper header Search icons profile---------- */}
        <CardHeader floated={false} shadow={false} color="transparent">
          <div className="header flex  py-2 sm:flex-row flex-col justify-between items-center">
            <div className="relative mx-auto sm:mx-0 flex items-center w-[80%] sm:w-[35%]">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white py-2 px-2 
                w-[100%] rounded-3xl outline-none "
              />
              <div className="absolute right-1 bg-[#BA5EEF] p-[10px] rounded-full flex items-center pointer-events-none">
                <BsSearch className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex text-white justify-around sm:mt-0 mt-5 sm:gap-x-3 gap-x-0">
              <span className="bg-[#BA5EEF] rounded-lg h-8 w-8 flex items-center justify-center">
                <GiEarthAmerica />
              </span>
              <span className="bg-[#BA5EEF] rounded-lg h-8 w-8 flex items-center justify-center">
                <FaRegBell />
              </span>
              <img
                src={storeProf}
                alt="storeProf"
                className="w-8 h-8 rounded-full ml-2"
              />
            </div>
          </div>
          <div className="title mt-10">
            <Typography variant="h5" color="white">
              Contest
            </Typography>
            <p className="text-gray-500 mb-5">Manage the Contest</p>
          </div>
        </CardHeader>
        {/* ----------Main Card----------  */}
        <Card className="overflow-hidden xl:col-span-2  mt-5 bg-[#1f1f21]">
          {/* -----------Card Header Section -----------------  */}
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center bg-transparent justify-between p-6"
          >
            <div className="flex gap-2 items-center justify-between w-[100%] md:flex-row flex-col">
              <div className="flex items-center gap-x-2">
                <div className="relative inline-block text-left">
                  <select
                    id=""
                    name=""
                    className="block appearance-none w-full bg-black text-white py-3 px-5 pr-8 rounded-md leading-tight focus:outline-none cursor-pointer"
                  >
                    <option value="">10</option>
                    <option value="">9</option>
                    <option value="">8</option>
                    <option value="">7</option>
                    <option value="">6</option>
                    <option value="">5</option>
                    <option value="">4</option>
                    <option value="">3</option>
                    <option value="">2</option>
                    <option value="">1</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12l-6-6 1.5-1.5L10 9.8l4.5-4.5L16 6l-6 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-gray-400 text-sm ml-2">
                  Entries Per Page
                </div>
              </div>

              <div>
                <div className="relative ">
                  <input
                    className="rounded-full bg-black p-2 px-4 sm:w-48 md:w-72"
                    type="text"
                    placeholder="Search"
                  ></input>
                  <div className=" flex items-center justify-center w-8 h-8 top-1 right-2 absolute p-1 rounded-full">
                    <IoIosSearch className="text-gray-300 text-2xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className=" px-0 pt-0 overflow-x-auto ">
            <table className="w-full min-w-[640px] table-auto">
              {/* ----------Table Header---------- */}
              <thead className=" w-[100%] ">
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer  bg-[#333333] p-4 hover:bg-blue-gray-50 hover:text-black text-white"
                    >
                      <Typography
                        variant="h6"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
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
                        ({ _id, Rank, Picture, Mail, Votes, Actions }, key) => {
                          const className = `py-3 px-5  ${
                            key === upComingSessions?.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;
                          // styling for TDs
                          const classNames =
                            Rank === 1
                              ? "bg-[#BA5EEF] text-[white]"
                              : Rank === 2 || Rank === 3
                              ? "bg-[white] text-[black]"
                              : "bg-[pink] text-[black]";

                          return (
                            <>
                              {/*---------- All Data TDs -----------------------  */}
                              <tr
                                key={_id}
                                className="border-b-[2px]  border-gray-800"
                              >
                                {/* Rank */}
                                <td className={className}>
                                  <div
                                    className={`${classNames} flex gap-x-2   py-[10%] px-2 rounded-lg w-[50%]`}
                                  >
                                    <GrAchievement />
                                    <Typography className="text-xs font-semibold ">
                                      {Rank}
                                    </Typography>
                                  </div>
                                </td>

                                <td className={className}>
                                  <div className="flex items-center ">
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
                                  <div className="overflow-hidden whitespace-nowrap">
                                    <Typography
                                      variant="small"
                                      color="white"
                                      className="font-semibold "
                                      style={{ textOverflow: "ellipsis" }}
                                    >
                                      {Mail}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-blue-gray-500">
                                    {Votes}
                                  </Typography>
                                </td>

                                {/* ------------------actions icons-----------------  */}

                                <td className={className}>
                                  <div className="flex gap-x-3 items-center">
                                    {/* ----View icon------  */}
                                    <span>
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
                                    </span>
                                    {/* -----edit icon------ */}
                                    <span>
                                      <FaEdit
                                        className="cursor-pointer 
                                      text-[#BA5EEF]"
                                        onClick={() => {
                                          navigate(
                                            `/dashboard/edit-session/${_id}?go=dashboard`,
                                          );
                                        }}
                                      />
                                    </span>
                                    {/* ----delete icon---- */}
                                    <span>
                                      <MdDeleteForever
                                        className="text-red-700 cursor-pointer"
                                        onClick={() => {
                                          setisDelete(true);
                                          setselectedItem({ _id });
                                        }}
                                      />
                                    </span>
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

                    {/* ----------Paginations-----------  */}

                    <tr>
    <td colSpan={7} className="w-full pt-5">
        <div className="flex justify-end mr-[4%] text-white ">
        <ButtonGroup variant="outlined"  className="text-white gap-2 ">
      <IconButton className="bg-gray-600 rounded-md" onClick={prev}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4  text-white " />
      </IconButton>
      <IconButton  className="text-white rounded-md bg-[#BA5EEF]" {...getItemProps(1)}>1</IconButton>
      <IconButton  className="text-white rounded-md bg-gray-600"  {...getItemProps(2)}>2</IconButton>
      <IconButton className="bg-[#BA5EEF] rounded-md" onClick={next}>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
      </IconButton>
    </ButtonGroup>
        </div>
    </td>
</tr>

                  </>
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Contest;
