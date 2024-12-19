import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../navbar/Header";
import Footer from "../footer/Footer";

function SharedComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default SharedComponent;
