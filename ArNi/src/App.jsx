import React, { lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import UserService from "./components/service/UserService";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import PrivateRoute from "./components/auth/PrivateRoute";
import "flowbite";
import Home from "./components/auth/beforeLogin/Home";
import BusinessTable from "./components/Tables/BusinessTable";
import CountryPage from "./components/Tables/CountryPage";
import RegionPage from "./components/Tables/RegionPage";
import MerchantPage from "./components/Tables/MerchantPage";
import RolePage from "./components/Tables/RolePage";
import MyApp from "./components/myApp/MyApp";
import CustomerPage from "./components/Tables/CustomerPage";

const PNPHome = lazy(() => import("./pages/PNPHome/PNPHome"));
const PnpCreatePageComponent = lazy(() => import("./pages/PnpCreatePage"));
import { IntlProvider } from "react-intl"; // Import IntlProvider
import enMessages from "./locales/en.json";
import esMessages from "./locales/es.json";
import MyPendingAction from "./pages/pnp/MyPendingAction/MyPendingAction";
import MyPendingActionTest from "./pages/pnp/MyPendingAction/DocumentViewPending/DocumentViewPendingTest";

// Arun Arjun Sairam
const messages = {
  en: enMessages,
  es: esMessages,
};


// Sairam Rathod
function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locale, setLocale] = useState("en");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await UserService.getCurrentUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    UserService.logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const RedirectIfLoggedIn = ({ children }) => {
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <LoginPage onLogin={handleLogin} />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/pnp/home"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PNPHome user={user} />
                </React.Suspense>
              }
            />
            <Route
              path="/pnp/create"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PnpCreatePageComponent user={user} />
                </React.Suspense>
              }
            />
            <Route
              path="/home"
              element={
                <RedirectIfLoggedIn>
                  <Home />
                </RedirectIfLoggedIn>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={
                    <div className="container">
                      <ProfilePage user={user} />
                    </div>
                  }
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                  user={user}
                />
              }
            />
            <Route
              path="/dashboard/business"
              element={
                <PrivateRoute
                  element={<BusinessTable user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/dashboard/merchant"
              element={
                <PrivateRoute
                  element={<MerchantPage user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/dashboard/role"
              element={
                <PrivateRoute
                  element={<RolePage user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/my_app"
              element={
                <PrivateRoute
                  element={<MyApp user={user} />}
                  allowedRoles={["ROLE_CUSTOMER"]}
                />
              }
            />
            <Route
              path="/dashboard/customer"
              element={
                <PrivateRoute
                  element={<CustomerPage user={user} />}
                  allowedRoles={["ROLE_MERCHANT_STAFF", "ROLE_MERCHANT_ADMIN"]}
                />
              }
            />
            <Route
              path="/dashboard/country"
              element={
                <PrivateRoute
                  element={<CountryPage user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/dashboard/region"
              element={
                <PrivateRoute
                  element={<RegionPage user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            4
            <Route
              path="/pnp/my-pending-action"
              element={
                <PrivateRoute
                  element={<MyPendingAction user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/pnp/my-pending-action_"
              element={
                <PrivateRoute
                  element={<MyPendingActionTest user={user} />}
                  allowedRoles={[
                    "ROLE_ADMIN",
                    "ROLE_MERCHANT",
                    "ROLE_MERCHANT_STAFF",
                    "ROLE_MERCHANT_ADMIN",
                    "ROLE_ASSOCIATE",
                  ]}
                />
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute
                  element={<RegistrationPage />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_MERCHANT_ADMIN"]}
                />
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <PrivateRoute
                  element={<UserManagementPage />}
                  allowedRoles={["ROLE_ADMIN", "ROLE_MERCHANT_ADMIN"]}
                />
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
