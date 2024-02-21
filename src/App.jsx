import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChangePassword, ForgetPassword, OTP, SignIn } from "./pages/auth";
import Layout from "./layouts/Layout";
import { Home, Notifications, Profile, Tables } from "./pages/dashboard";
import { UserTable } from "./pages/dashboard/Users";
import { PrivateRoutes } from "./components/privateRoutes.js";
import { InstructorTable } from "./pages/dashboard/instructor/tables";
import AddInstructor from "./pages/dashboard/instructor/addInstructor";
import EditInstructor from "./pages/dashboard/instructor/editInstructor";
import { SessionTable } from "./pages/dashboard/sessions/tables";
import AddSession from "./pages/dashboard/sessions/addSession";
import EditSession from "./pages/dashboard/sessions/editSession";
import { UserSupportTable } from "./pages/dashboard/userSupport";
import Products from "./pages/dashboard/products/Products";
import Contest from "./pages/dashboard/contest/Contest";
import DetailsContest from "./pages/dashboard/contest/DetailsContest"


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
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard/home" />}
                    />
                    <Route path="/dashboard/home" element={<Home />} />
                    <Route path="/dashboard/users" element={<UserTable />} />
                    <Route
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
                    <Route
                      path="/dashboard/user-support"
                      element={<UserSupportTable />}
                    />

                      <Route
                      path="/dashboard/products"
                      element={<Products />}
                    />

                     <Route
                      path="/dashboard/contest"
                      element={<Contest />}
                    />
                    <Route
                      path="/dashboard/contest/detailsContest"
                      element={<DetailsContest />}
                    />

                    {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
                  {/* </Route> */}
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
