import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import ScrollTop from "../components/scrollToTop/ScrollTop";
import AdminNav from "../administrators/AdminNav";

export default function Root() {
  const { pathname } = useLocation()
  const admin = true;
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
            {admin ?
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