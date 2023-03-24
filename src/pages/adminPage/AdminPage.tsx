import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import Banners from "./Banners";
import Notifications from "./Notifications";
import Orders from "./Orders";
import Products from "./Products";
import Shops from "./Shops";
import Error from "../Error";
import Settings from "./Settings";
import Users from "./Users";

const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="shops" />} />
          <Route path="shops/*" element={<Shops />} />
          <Route path="orders/*" element={<Orders />} />
          <Route path="users/*" element={<Users />} />
          <Route path="products/*" element={<Products />} />
          <Route path="banners/*" element={<Banners />} />
          <Route path="notifications/*" element={<Notifications />} />
          <Route path="settings/*" element={<Settings />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminPage;
