import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";

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
import AllStaff from "@/api/AllStaff";
import AddStaff from "./AddStaff"
const Orders = () => {
  const [openModal, setOpenModal]=useState(false)
  const [activeTab, setActiveTab] = React.useState("Pending Approval");
  const navigate = useNavigate();
  
  const [sessionLoading, setSessionLoading] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [upComingSessions, setUpComingSessions] = useState(null);
  const [isDelete, setisDelete] = useState(false);
  const [detail, setDetail] = useState(null);
  const [number, setNumber] = useState(1);
  const handleDeleteModalOpen = () => setisDelete(!isDelete);
  const handleDetailModalOpen = () => setDetail(!detail);

  const [staff, setStaff] = useState();
  const [searchStaff, setSearchStaff] = useState([]); 

  const fetchStaffData = async () => {
    try {
      const StaffData = await AllStaff();
      setStaff(StaffData);
      setSearchStaff(StaffData);
    } catch (error) {
      console.log("Error fetching Staff", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

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

  // This logic used for pagination
  const handleLeftArrowClick = () => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (number < 20) {
      setNumber(number + 1);
    }
  };
  useEffect(() => {
    getDashboardStats();
    getUpcomingSessions();
  }, []);

  // This Data is used for Table Head
  const TABLE_HEAD = [
    "ID#",
    "Profile Picture",
    "Member Name",
    "Email Address",
    "Actions",
  ];

  const handleSearch = (search) => {
    const searchTerm = search.target.value.toLowerCase();
    console.log("Search Term:", searchTerm); // Debugging
    const newSearchTerm = staff.filter((staffMember) =>
      staffMember.username.toLowerCase().includes(searchTerm)
    );
    console.log("Filtered Results:", newSearchTerm); // Debugging
    setSearchStaff(newSearchTerm); // Update searchStaff state
  };
  
// console.log(staff);


  return (
    <>
     
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1 pb-12 bg-black ">
        <div className="p-1 m-1 ">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="relative mb-4">
              <input
                className="rounded-full bg-gray-900 text-white p-2 px-4 sm:w-48 md:w-72"
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
            <div className="text-white text-2xl font-nunito">Staff</div>
            <div className="text-gray-700 text-base font-nunito">Manage Your Staff</div>
          </div>
        </div>
        <Card className="overflow-hidden xl:col-span-2 bg-gray-900 shadow-sm mx-2 mr-5">
        { openModal && <AddStaff closeModal={setOpenModal} /> }
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            {/* This div is used for entries, Search and Add Staff Button */}
            <div className="flex gap-2 items-center justify-between w-full md:flex-row md:items-center flex-col">
              <div className="flex flex-row items-center gap-x-2">
                <div className="relative inline-block text-left">
                  <select
                    id=""
                    name=""
                    className="block appearance-none w-full bg-black text-white py-3 px-5 pr-8 rounded-md leading-tight focus:outline-none cursor-pointer"
                  >
                    <option value="">20</option>
                    <option value="">19</option>
                    <option value="">18</option>
                    <option value="">17</option>
                    <option value="">16</option>
                    <option value="">15</option>
                    <option value="">14</option>
                    <option value="">13</option>
                    <option value="">12</option>
                    <option value="">11</option>
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
                <div className="text-gray-400 text-sm mt-2 md:mt-0">
                  Entries Per Page
                </div>
              </div>

              {/* Move search input and "Add Staff" button to the right corner */}
              <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 ">
                <div className="relative flex items-center">
                  <input
                    className="rounded-full text-white bg-black p-2 px-4 sm:w-48 md:w-72 lg:mr-3"
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search"
                  />
                  <div className="absolute right-5 flex items-center justify-center w-8 h-8 p-1 rounded-full">
                    <IoIosSearch className="text-gray-300 text-2xl cursor-pointer" />
                  </div>
                </div>
                <button onClick={()=>setOpenModal(true)}  className="bg-[#BA5EEF] hover:bg-opacity-90  rounded-full text-white py-2 px-7 mt-2 md:mt-0 md:ml-2">
                  Add Staff
                </button>
                
              </div>
            </div>
            
          </CardHeader>
          <CardBody className=" px-0 pt-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto mt-4">
                <thead>
                  <tr className="bg-gray-800">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="cursor-pointer border-blue-gray-100  p-1 px-4 py-4  transition-colors"
                      >
                        <Typography
                          variant="small"
                          color=""
                          className="flex items-center text-[#FFFFFF] font-Nunito gap-2 font-normal leading-none opacity-70"
                        >
                          {head}
                          {head !== "Profile Picture" &&
                            head !== "Email Address" &&
                            head !== "Actions" && (
                              <ChevronUpDownIcon
                                strokeWidth={2}
                                className="h-4 w-4"
                              />
                            )}
                        </Typography>
                      </th>
                    ))}
                    {/* <th>
                      <p className="opacity-0">temp</p>
                    </th> */}
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
                      {searchStaff?.length ? (
                        searchStaff?.map(
                          ({ _id, profilePicture,email, username}, key) => {
                            const className = `py-3 text-center ${
                              key === staff?.length - 1
                                ? "border-b border-gray-800 "
                                : "border-b border-gray-800 "
                            }`;

                            return (
                              <tr key={_id}>
                                <td className={className}>
                                  <Typography className="text-xs font-semibold text-white text-left ml-6">
                                    {key + 1}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <div className="flex items-center gap-4 text-center ml-8 ">
                                    <Avatar
                                      src={profilePicture}
                                      alt={username}
                                      size="sm"
                                    />
                                  </div>
                                </td>
                                <td className={className}>
                                  <div className="overflow-hidden whitespace-nowrap text-left ml-4">
                                    <Typography
                                      variant="small"
                                      color="white"
                                      className=""
                                      style={{ textOverflow: "ellipsis" }}
                                    >
                                      {username}
                                    </Typography>
                                  </div>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs text-gray-400 text-left ml-4">
                                    {email}
                                  </Typography>
                                </td>
                                <td className={className}>
                                  <Typography className="text-xs text-gray-500 text-left ml-4">
                                    <button className="bg-[#FF0000] hover:bg-[#ff0000d0] rounded-md font-nunito text-white py-2 px-4">
                                      Delete
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

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 py-2 px-2 mr-4">
              <button
                className="bg-gray-600 text-gray-300 rounded-md px-4 py-2 focus:outline-none h-8 w-8 flex items-center justify-center"
                onClick={handleLeftArrowClick}
              >
                &lt;
              </button>

              <div className="bg-[#BA5EEF] text-gray-300 rounded-md px-4 py-2 h-8 w-8 flex items-center justify-center">
                {number}
              </div>
              <div className="bg-gray-600 text-gray-300 rounded-md px-4 py-2 focus:outline-none h-8 w-8 flex items-center justify-center">
                {number + 1}
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

export default Orders;
