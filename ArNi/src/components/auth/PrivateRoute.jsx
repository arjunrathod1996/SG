import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserService from "../service/UserService";

const PrivateRoute = ({ element, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserService.getCurrentUser();
        if (user && user.role) {
          setUserRole(user.role.name || user.role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
