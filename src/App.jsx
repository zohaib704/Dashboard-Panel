import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChangePassword, ForgetPassword, OTP, SignIn } from "./pages/auth";
import Layout from "./layouts/Layout";
import { Home, Notifications, Profile, Tables } from "./pages/dashboard";
import { UserTable } from "./pages/dashboard/Users/index";
import { PrivateRoutes } from "./components/privateRoutes.js";
import { InstructorTable } from "./pages/dashboard/instructor/tables";
import AddInstructor from "./pages/dashboard/instructor/addInstructor";
import EditInstructor from "./pages/dashboard/instructor/editInstructor";
import { SessionTable } from "./pages/dashboard/sessions/tables";
import AddSession from "./pages/dashboard/sessions/addSession";
import EditSession from "./pages/dashboard/sessions/editSession";
import { UserSupportTable } from "./pages/dashboard/userSupport";
import Orders from "./pages/dashboard/Orders/Orders";
import OrdersB from "./pages/dashboard/Orders/OrdersB";

import Staff from "./pages/dashboard/Staff/Staff";
import OrderDetails from "./pages/dashboard/Orders/OrderDetails";
import StaffEdit from "./pages/dashboard/Staff/StaffEdit";
import EditProduct from "./pages/dashboard/Product/EditProduct";


import Contest from "./pages/dashboard/contest/Contest";
import DetailsContest from "./pages/dashboard/contest/DetailsContest";
import Store from "./pages/dashboard/Store/Store";
import Products from "./pages/dashboard/Product/Product";
import AddEditProduct from "./pages/dashboard/sessions/AddProduct";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Layout>
                <Routes>
                  {/* <Route path="" element={<PrivateRoutes />}> */}
                  <Route path="/" element={<Navigate to="/dashboard/home" />} />
                  <Route path="/dashboard/home" element={<Home />} />
                  <Route path="/dashboard/home/detailscontest" element={<DetailsContest />} />

                  <Route path="/dashboard/users" element={<UserTable />} />
                  <Route path="/dashboard/orders" element={<Orders />} />
                  <Route path="/dashboard/ordersb" element={<OrdersB />} />
                  <Route
                    path="/dashboard/ordersdetail"
                    element={<OrderDetails />}
                  />

                   <Route path="/dashboard/staff" element={<Staff />} />
                   <Route path="/dashboard/staff/staffEdit" element={<StaffEdit />} />

                  <Route path="/dashboard/product" element={<EditProduct />} />
                  <Route path="/dashboard/AddEditProduct" element={<AddEditProduct />}/>

                  <Route path="/dashboard/store" element={<Store />} />
                  <Route path="/dashboard/store/product" element={<Products/>} />
                  <Route path="/dashboard/store/orders" element={<Orders />} />



                {/* contest routes  */}
                  <Route path="/dashboard/contest" element={<Contest />} />
                  <Route
                    path="/dashboard/contest/detailsContest"
                    element={<DetailsContest />}
                  />
                  {/* <Route
                    path="/dashboard/instructor"
                    element={<InstructorTable />}
                  />
                  <Route
                    path="/dashboard/add-instructor"
                    element={<AddInstructor />}
                  />
                  <Route
                    path="/dashboard/edit-instructor/:instructorId"
                    element={<EditInstructor />}
                  />
                  <Route
                    path="/dashboard/sessions"
                    element={<SessionTable />}
                  />
                  <Route
                    path="/dashboard/add-session"
                    element={<AddSession />}
                  />
                  <Route
                    path="/dashboard/edit-session/:sessionId"
                    element={<EditSession />}
                  />
                  <Routes
                    path="/dashboard/user-support"
                    element={<UserSupportTable />}
                  /> */}
                </Routes>
              </Layout>
            </>
          }
        />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/verify-otp/:id/:token" element={<OTP />} />
        <Route
          path="/auth/reset-password/:id/:token"
          element={<ChangePassword />}
        />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
