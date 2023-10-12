import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ScrollTop from "../components/scrollToTop/ScrollTop";
import AdminNav from "../administrators/AdminNav";
import { useEffect, useState } from "react";

export default function Root() {
  const [adminUi, setAdminUi] = useState(false)
  const location = useLocation()
  const { pathname } = useLocation()
  const admin = false;

  useEffect(() => {
    const checkPath = () => {
      if(pathname.includes('administration')){
        setAdminUi(true)
      }else{
        setAdminUi(false)
      }
    }
    checkPath()
  },[location.pathname])
  return (
    <>
      {pathname === '/administration' ?
        // pathname === '/administration' ?
        (
          <Outlet />
        )
        :
        (
          <>
            {adminUi ?
              (
                <>
                <AdminNav />
                <Outlet />
              </>
              )
              :
              (
                <>
                <Navbar />
                <Outlet />
                <Footer />
                <ScrollTop />
              </>
              )
            }
          </>
        )
      }
      {/* {admin ?
        (
          <>
            <AdminNav />
            <Outlet />
          </>
        )
        :
        (
          <>
            <Navbar />
            <Outlet />
            <Footer />
            <ScrollTop />
          </>
        )
      } */}
    </>
  );
}