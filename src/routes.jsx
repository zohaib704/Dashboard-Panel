import { HomeIcon } from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { GiTeacher } from "react-icons/gi";
import { UserTable } from "./pages/dashboard/Users";
import { BiSolidCategory } from "react-icons/bi";
import { InstructorTable } from "./pages/dashboard/instructor/tables";
import { SiGoogleclassroom } from "react-icons/si";
import { SessionTable } from "./pages/dashboard/sessions/tables";
import { MdSupportAgent } from "react-icons/md";
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
        icon: <BiSolidCategory {...icon} />,
        name: "Users",
        path: "/users",
        element: <UserTable />,
      },
      {
        icon: <GiTeacher {...icon} />,
        name: "Instructor",
        path: "/instructor",
        element: <InstructorTable />,
      },
      {
        icon: <SiGoogleclassroom {...icon} />,
        name: "Sessions",
        path: "/sessions",
        element: <SessionTable />,
      },
      {
        icon: <MdSupportAgent {...icon} />,
        name: "User Support",
        path: "/user-support",
        element: <SessionTable />,
      },
    ],
  },
];

export default routes;
