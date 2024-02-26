import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import brandLogo from "../../../public/img/brandLogo.png";
import brandTitle from "../../../public/img/brandTitle.png";


export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-[#2c2c2e] shadow-sm",
    transparent: "bg-transparent",
  };
  

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50  h-[calc(100vh)] w-72  transition-transform duration-300 xl:translate-x-0 border border-primary`}
    >
      <div className={`relative mt-5`}>
        <Link to="/" className="py-10  px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {/* {brandName} */}
            <img src={brandLogo} alt="" className="w-25 h-25 m-auto" />
          </Typography>
             {/* brandTitle */}
          <img src={brandTitle} className="m-auto mt-2"/>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  // color={sidenavType === "dark" ? "white" : "blue-gray"}
                  color={"white"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      // color={
                      //   isActive
                      //     ? sidenavColor
                      //     : sidenavType === "dark"
                      //     ? "white"
                      //     : "blue-gray"
                      // }
                      color={isActive ? "purple" : "blue-gray"}
                      className={`flex items-center gap-x-5 space-y-2 rounded-none capitalize text-white `}
                      fullWidth
                    >
                      <div
                        className={`${
                          isActive ? "text-white" : "text-[#FFFFFF99]"
                        }`}
                      >
                        {icon}
                      </div>

                      <Typography
                        color="inherit"
                        className={`capitalize font-nunito text-lg text font-semibold ${
                          isActive ? "text-white" : "text-[#FFFFFF99]"
                        }`}
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Head Start",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
