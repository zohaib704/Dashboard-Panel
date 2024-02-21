import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { FaMobile, FaUsers } from "react-icons/fa";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DialogDefault } from "@/components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";
import { IoStatsChart } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import orderimg1 from "../../../../public/img/Orderimg/world.png";
import orderimg2 from "../../../../public/img/Orderimg/bell.png";
import orderimg3 from "../../../../public/img/Orderimg/rounded.png";
import { tr } from "date-fns/locale";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
const OrdersB = () => {
  const [activeTab, setActiveTab] = React.useState("Pending Approval");
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [upComingSessions, setUpComingSessions] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [detail, setDetail] = useState(null);
  const [number, setNumber] = useState(1);
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
  const handleLeftArrowClick = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (number < 10) {
      setNumber(number + 1);
    }
  };
  useEffect(() => {
    getDashboardStats();
    getUpcomingSessions();
  }, []);
  const TABLE_HEAD = [
    "Order#",
    "Photo",
    "Name",
    "Quantity",
    "Price",
    "Date & Time",
    "Action",
  ];
  const TABS = [
    {
      label: "Pending Approval",
      value: "Pending Approval",
    },
    {
      label: "Delivered",
      value: "Delivered",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
  ];

  // Assuming hardcoded data
  const hardcodedSessions = [
    {
      _id: 1,
      name: "Coutery Henry",
      picture: "Purpose 1",
      quantity: "01",
      price: "Rs20",
      orderDate: Date(),
    },
    {
      _id: 2,
      name: "Coutery Henry",
      picture: "Purpose 2",
      quantity: "02",
      price: "Rs20",
      orderDate: Date(),
    },
    {
      _id: 3,
      name: "David",
      picture: "Purpose 3",
      quantity: "03",
      price: "Rs40",
      orderDate: Date(),
    },
    {
      _id: 4,
      name: "Miller",
      picture: "Purpose 4",
      quantity: "04",
      price: "Rs50",
      orderDate: Date(0, 9),
    },
  ];
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1 pb-12 bg-black">
        <div className="p-1 m-1 ">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-4">
              <input
                className="rounded-full bg-gray-900 text-white font-nunito p-2 px-4 sm:w-48 md:w-72"
                type="text"
                placeholder="Search"
              ></input>
              <div className=" flex items-center justify-center w-8 h-8 text-white top-1 right-1 absolute bg-[#BA5EEF] p-1 rounded-full">
                <IoIosSearch className="cursor-pointer" />
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <img
                  src={orderimg1}
                  alt=""
                  className="h-[80%] cursor-pointer"
                />
              </div>
              <div>
                <img
                  src={orderimg2}
                  alt=""
                  className="h-[80%] cursor-pointer"
                />
              </div>
              <div>
                <img
                  src={orderimg3}
                  alt=""
                  className="h-[80%] cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="pt-12">
            <div className="text-white text-[28px]">Orders</div>
            <div className="text-gray-500">Manage Your Orders Here</div>
          </div>
        </div>
        <Card className="overflow-hidden xl:col-span-2 bg-gray-900 shadow-sm mx-2 mr-5">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
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
                    className="rounded-full bg-black text-white font-nunito p-2 px-4 sm:w-48 md:w-72"
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
          <CardBody className=" px-0 pt-0 pb-2">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row border-b border-gray-800 text-white">
              <Tabs value={activeTab}>
                <TabsHeader
                  className="rounded-none bg-transparent p-0 gap-7 left-2"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-white shadow-none rounded-none ",
                  }}
                >
                  {TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={
                        activeTab === value
                          ? "text-white text-justify whitespace-nowrap font-nunito"
                          : "text-gray-500 text-justify whitespace-nowrap font-nunito"
                      }
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto mt-4">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="cursor-pointer border-blue-gray-100  p-4 lg:right-0 transition-colors">
                      <input
                        type="checkbox"
                        class="custom-checkbox cursor-pointer"
                      />
                    </th>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-blue-gray-100  p-1 transition-colors font-nunito"
                      >
                        <Typography
                          variant="small"
                          color=""
                          className="flex items-center text-white gap-2 font-nunito leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {sessionLoading ? (
                    <td colSpan={8}>
                      <div role="status" className="text-center p-3">
                        <svg
                          aria-hidden="true"
                          class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
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
                        <span class="sr-only">Loading...</span>
                      </div>
                    </td>
                  ) : (
                    <>
                      {hardcodedSessions?.length ? (
                        hardcodedSessions?.map(
                          (
                            {
                              _id,
                              name,
                              picture,
                              quantity,
                              price,
                              orderDate,
                              DeliveredAt,
                            },
                            key,
                          ) => {
                            const className = `py-3 text-center ${
                              key === hardcodedSessions?.length - 1
                                ? "border-b border-gray-800 "
                                : "border-b border-gray-800 "
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <input
                                    type="checkbox"
                                    class="custom-checkbox cursor-pointer"
                                  />
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs font-nunito text-white text-left ml-6">
                                    {key + 1}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center gap-4 text-center ">
                                    <Avatar
                                      src={orderimg3}
                                      alt={picture}
                                      size="sm"
                                    />
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="overflow-hidden whitespace-nowrap text-left ml-2">
                                    <Typography
                                      variant="small"
                                      color="white"
                                      className=""
                                      style={{ textOverflow: "ellipsis" }}
                                    >
                                      {name}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs text-gray-400 text-left ml-3">
                                    {quantity}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs text-gray-400 text-left ml-2">
                                    {price}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs text-gray-400 text-left ml-2">
                                    {moment(orderDate).format(
                                      "DD/MM/YYYY HH:mm",
                                    )}
                                  </Typography>
                                </td>

                                <td className={className}>
                                  <Typography className="text-xs text-gray-500 text-left font-nunito">
                                    <button className="bg-[#BA5EEF] rounded-md text-white py-2 px-4">
                                      Approve
                                    </button>
                                    <button className="bg-gray-600 rounded-md text-opacity-38 text-white py-2 px-4 ml-4">
                                      Reject
                                    </button>
                                  </Typography>
                                </td>
                              </tr>
                            );
                          },
                        )
                      ) : (
                        <td colSpan={8} className="text-center">
                          <span className="text-sm"> No record found</span>
                        </td>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end gap-2 py-4 px-2 mr-4">
              <button
                className="bg-gray-600 text-white text-opacity-38  rounded-md px-4 py-2 focus:outline-none h-8 w-8 flex items-center justify-center"
                onClick={handleLeftArrowClick}
              >
                &lt;
              </button>

              <div className="bg-[#BA5EEF] text-gray-300 rounded-md px-4 py-2 h-8 w-8 flex items-center justify-center">
                {number}
              </div>

              <button
                className="bg-[#BA5EEF] text-gray-300 rounded-md px-4 py-2 focus:outline-none h-8 w-8 flex items-center justify-center"
                onClick={handleRightArrowClick}
              >
                &gt;
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default OrdersB;
