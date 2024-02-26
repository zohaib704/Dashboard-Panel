import { HomeIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { GiTeacher } from "react-icons/gi";
import { UserTable } from "./pages/dashboard/Users";
import  Contest  from "./pages/dashboard/contest/Contest";
import { ImUsers } from "react-icons/im";
import { SessionTable } from "./pages/dashboard/sessions/tables";
import { MdSupportAgent } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoMdAppstore } from "react-icons/io";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FaRegUser   {...icon} />,
        name: "Users",
        path: "/users",
        element: <UserTable />,
      },
      {
        icon: <GiTeacher {...icon} />,
        name: "Contest",
        path: "/Contest",
        element: <Contest />,
      },
      {
        icon: <IoMdAppstore  {...icon} />,
        name: "Store",
        path: "/Store",
        element: <SessionTable />,
      },
      {
        icon: <ImUsers  {...icon} />,
        name: "Staff",
        path: "/staff",
        element: <SessionTable />,
      },
    ],
  },
];

export default routes;
