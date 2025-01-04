import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper";
import LogsContextWrapper from "./context/LogsContextWrapper";
import UsersContextWrapper from "./context/UsersContextWrapper";
import IsLoggedIn from "./components/Routing/isLoggedIn";
import IsLoggedOut from "./components/Routing/isLoggedOut";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberUpload from "./pages/MemberUpload";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SystemLogsTable from "./components/SystemLogsTable";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AdminUsersTable from "./components/AdminUsersTable";
import ChangePassword from "./pages/ChangePassword";
import ManageFees from "./pages/ManageFees";
import FeeStructure from "./pages/FeeStructure";
import FeePayments from "./pages/FeePayments";

function App() {
  return (
    <>
      <AuthContextWrapper>
        <LogsContextWrapper>
          <UsersContextWrapper>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/login" element={<IsLoggedOut />}>
                  <Route index element={<LoginPage />} />
                </Route>
                <Route path="/signup" element={<IsLoggedIn />}>
                  <Route index element={<SignupPage />} />
                </Route>
                <Route path="/profile/add" element={<IsLoggedIn />}>
                  <Route index element={<MemberUpload />} />
                </Route>
                <Route path="/" element={<IsLoggedIn />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/profile" element={<IsLoggedIn />}>
                  <Route index element={<Profile />} />
                </Route>
                <Route path="/profile/edit" element={<IsLoggedIn />}>
                  <Route index element={<EditProfile />} />
                </Route>
                <Route path="/logs" element={<IsLoggedIn />}>
                  <Route index element={<SystemLogsTable />} />
                </Route>
                <Route path="/admin/users" element={<IsLoggedIn />}>
                  <Route index element={<AdminUsersTable />} />
                </Route>
                <Route path="admin/fees/:id" element={<IsLoggedIn />}>
                  <Route index element={<ManageFees />} />
                </Route>
                <Route path="/profile/change-password" element={<IsLoggedIn />}>
                  <Route index element={<ChangePassword />} />
                </Route>
                <Route path="/admin/fees-structure" element={<IsLoggedIn />}>
                  <Route index element={<FeeStructure />} />
                </Route>
                <Route path="/profile/payments" element={<IsLoggedIn />}>
                  <Route index element={<FeePayments />} />
                </Route>

                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </BrowserRouter>
          </UsersContextWrapper>
        </LogsContextWrapper>
      </AuthContextWrapper>
    </>
  );
}

export default App;
