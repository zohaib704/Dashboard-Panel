import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from "@material-tailwind/react";

import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { FiChevronsRight } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import TabPanel from "../orders/TabPanel";

import moment from "moment";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { IoStatsChart } from "react-icons/io5";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Store from "./StoreStatitics";

const StoreOrders = () => {
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

  const TABLE_HEAD = [
    "Order #",
    "Photo",
    "Name",
    "Quantity",
    "Price",
    "Date and Time",
    "Actions",
  ];
  const demoData = [
    {
      "Order #": "ORD12345",
      Photo: "url/to/photo1",
      Name: "Product 1",
      Quantity: 2,
      Price: 29.99,
      "Date and Time": "2024-02-20 10:00 AM",
      Actions: ["View", "Cancel"],
    },
    {
      "Order #": "ORD67890",
      Photo: "url/to/photo2",
      Name: "Product 2",
      Quantity: 1,
      Price: 39.99,
      "Date and Time": "2024-02-21 2:00 PM",
      Actions: ["View", "Cancel"],
    },
  ];

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

  return (
    <section>
      <Card className="overflow-hidden xl:col-span-2  mt-5 bg-[#1f1f21]">
        {/* -----------Card Header Section Start-----------------  */}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex flex-col md:flex-row items-center justify-between sm:p-6 p-2"
        >
          <div className="md:w-auto w-full mb-5 sm:mb-0">
            <Typography variant="h5" color="white" className="mb-1">
              Orders
            </Typography>
            <Typography variant="small">Manage Your Products</Typography>
          </div>
          <div className="flex gap-x-1 sm:gap-x-3 justify-start md:justify-end w-[100%] md:w-[50%]">
            <div className="relative flex items-center w-[70%] sm:[55%] md:w-[60%]">
              <input
                type="text"
                placeholder="Search..."
                className="bg-black text-white py-2 px-2 w-[100%] rounded-3xl"
              />
              <div className="absolute right-3   flex items-center pointer-events-none">
                <BsSearch className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </CardHeader>

        {/* ---------tabs section----------  */}
        <TabPanel />

        <CardBody className=" px-0 pt-0 overflow-x-auto ">
          <table className="w-full min-w-[640px] table-auto">
            {/* ----------Table Header---------- */}
            <thead className=" w-[100%] ">
              <tr>
                <th className="text-left  p-4 bg-[#333333]">
                  <input
                    type="checkbox"
                    className=" custom-checkbox-header h-4 w-4 bg-blue-gray-50/50 "
                  />
                </th>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="  bg-[#333333] p-4 "
                  >
                    <Typography
                      variant="h6"
                      className="flex items-center justify-between gap-2 font-nunito text-base text-gray-400 font-semibold"
                    >
                      {head}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
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
                  {demoData?.length ? (
                    demoData?.map(
                      (
                        {
                          _id,
                          photo,
                          Name,
                          description,
                          Quantity,
                          instructor,
                          date,
                          startTime,
                          length,
                          attendees,
                        },
                        key,
                      ) => {
                        const className = `py-3 px-5  ${
                          key === upComingSessions?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <>
                            {/*---------- All Data TDs -----------------------  */}
                            <tr
                              key={_id}
                              className="border-b-[2px]  border-gray-800"
                            >
                              <td className={className}>
                                <input type="checkbox" className="custom-checkbox" />
                              </td>

                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {key + 1}
                                </Typography>
                              </td>

                              <td className={className}>
                                <div className="flex items-center gap-4">
                                  <Avatar
                                    src={`${import.meta.env.VITE_BASE_URL}/${
                                      instructor?.image
                                    }`}
                                    alt={instructor?.image}
                                    size="sm"
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
                                    {Name}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-500">
                                  {Quantity}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-500">
                                  Price
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-500">
                                  {moment(date).format("DD/MM/YYYY")}
                                </Typography>
                              </td>

                              {/* ------------------actions Approve and Rejected-----------------  */}

                              <td className={className}>
                                <div className="flex gap-x-3 items-center text-white text-sm">
                                  <button className="bg-[#BA5EEF] px-2 rounded-lg  py-2">
                                    Approve
                                  </button>
                                  <button className="bg-[#7c7c7d] px-2 rounded-lg  py-2">
                                    Reject
                                  </button>
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
                    <td colSpan={8} className="w-full ">
                      <Typography className="flex justify-end text-white mr-28 mt-3 items-center">
                        <NavLink to="orders">View All</NavLink>
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
    </section>
  );
};

export default StoreOrders;
