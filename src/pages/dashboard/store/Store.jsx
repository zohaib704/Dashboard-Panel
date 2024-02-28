import React, { useEffect, useState } from "react";
import { Typography, Card, CardHeader } from "@material-tailwind/react";

import axiosInstance from "@/utils/axiosConfigure";
import toast from "react-hot-toast";

import TabPanel from "./TabPAnel";

import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { IoStatsChart } from "react-icons/io5";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import StoreOrders from "./StoreOrders";
import StoreStatic from "./StoreStatitics";
import AddProduct from "../sessions/AddProduct";
import ActiveProducts from "@/api/ActiveProduct";
import StoreProducts from "./StoreProduct";
const Store = () => {
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

  const [addProduct, setAddProduct] = useState(false);
  const [viewProduct, setViewProduct] = useState(true);

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
      <StoreStatic />

      <StoreProducts />

      <StoreOrders />
    </section>
  );
};

export default Store;
