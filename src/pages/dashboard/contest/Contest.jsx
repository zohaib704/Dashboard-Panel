import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  CardFooter,
} from "@material-tailwind/react";

import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";
import { FiChevronsRight } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import { GrAchievement } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";

import { IoStatsChart } from "react-icons/io5";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import ContestHeaderCom from "./ContestHeaderCom";

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
];

const Contest = () => {
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

  return (
    <section>
      {/* Header Component called here  */}
      <ContestHeaderCom />

      <div className=" flex flex-col lg:flex-row gap-3  w-full">
        {/*    Left Section    */}

        <div className="Left_section lg:w-[70%]">
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
                  Contest Participants
                </Typography>
                <Typography variant="small">Ends in 4d 18h</Typography>
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
                          (
                            { _id, Rank, Picture, Mail, Votes, Actions },
                            key,
                          ) => {
                            const className = `py-3 px-5  ${
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
                                  className="border-b-[2px]  border-gray-800"
                                >
                                  {/* Rank */}
                                  <td className={className}>
                                    <div
                                      className={`${classNames} flex gap-x-2  py-[10%] px-2 rounded-lg w-[70%]`}
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

                      {/* ----------View All Records-----------  */}

                      <tr>
                        <td colSpan={7} className="w-full ">
                          <Typography className="flex justify-end text-white mt-3 items-center mr-3">
                            <NavLink to="#">View All</NavLink>{" "}
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

        {/* Right Side Start  */}

        <div
          className="Right_section text-white 
             w-[100%] sm:w-[80%] md:w-[60%] lg:w-[30%]
             m-auto "
        >
          <Card className="overflow-hidden xl:col-span-2 mt-5 bg-[#1f1f21]">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none h-[14.8rem]"
            >
              <img
                src="https://s3-alpha-sig.figma.com/img/acee/b628/c2547d3df1f9b9af3bda07a191890a36?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Je9~5xXJDHLzIyGWvgYd~qkJjQLY7gPud15JfhoPzvjKw7UiiSBtipSnqHxvIf5sOW5NsF6bPAOKnFF5KbeJf08b6JRTCE2v1TSz4ChWJGrh~h-3fcEZeMCf-B8UbX5sNXHqYBDYXaQnGW7uRVztAml50Vh56AJaVT4Rq9nqqxELA1brkypxRPKMDt6F80REfBqZmrCP3W8FStt5CIvXYnD2rlp9nxtNU9UZ6vBtjDYEKbaPqz1NfFpMFf7zqzgqjoU1xMcL0sCmtlNR9SEKCLe6EHDinMOt2QjtvxvrBnMtdgwBf6wSdm8HDzyvxgjpkWXqY4TRuhCtG3fJVxcQsw__"
                alt="ui/ux review check"
                className="w-[100%] h-[15rem]"
              />
              <div className="absolute bottom-0 right-0 text-white p-4">
                <div
                  className={` flex gap-x-2  py-[10%] px-2 rounded-lg bg-[#BA5EEF] items-center justify-center`}
                >
                  <GrAchievement className="text-xl" />
                  <Typography className="text-lg font-semibold ">1</Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="">
              <div className="flex justify-between">
                <Typography variant="p" color="white" className="">
                  1455 Votes
                </Typography>
                <Typography variant="p" color="white" className="">
                  24-02-2023
                </Typography>
              </div>
              <div className="-mb-[20px]">
                <Typography variant="p" color="gray" className="">
                  jonDeo@gmail.com
                </Typography>
              </div>
            </CardBody>
            <hr className="border border-gray-800" />
            <CardFooter className="pt-[2px]">
              <Typography className="flex justify-end text-white mt-3 items-center mr-3">
                <NavLink to="detailsContest">Old Contest Winners</NavLink>
                <FiChevronsRight className="ml-1" />
              </Typography>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contest;
