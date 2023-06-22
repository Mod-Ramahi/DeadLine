import * as React from "react";
import {
  createBrowserRouter, 
} from "react-router-dom";
import Root from "./root";
import SignIn from "../pages/loginpage/Signin";
import Home from "../pages/homepage/Home";
import Categories from "../pages/categorypage/Categories";
import Search from "../pages/Search";
import HowItWorks from "../pages/howitworkpage/HowItWorks";
import Freelancer from "../pages/Freelancer";
import ResultSearch from "../pages/resultsearchpage";
import UserHome from "../pages/userHome";
import Terms from "../pages/terms&conditions";
import Faq from "../pages/faq";
import Membership from "../pages/membership";
import BidOnJob from "../pages/bidonjob";
import Portfolio from "../pages/portfoliopage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
            path:"/signIn",
            element: <SignIn/>
        }
        ,
        {
            path:"/userhome",
            element: <UserHome/>
        },
        {
          path:"/categories",
          element: <Categories/>
        }
        ,
        {
            path:"/search",
            element: <Search/>
        },
        {
          path:"/howitworks",
          element: <HowItWorks/>
        },
        {
          path:"/freelancer/:UserID",
          element:<Freelancer/>
        },
        {
          path:"/resultssearch",
          element:<ResultSearch/>
        },
        {
          path:"/terms&conditions",
          element:<Terms/>
        },
        {
          path:"/faq",
          element:<Faq/>
        },
        {
          path:"/membership",
          element:<Membership/>
        },
        {
          path:"/bidproposal",
          element:<BidOnJob/>
        },
        {
          path:"/portfoliopage",
          element:<Portfolio/>
        }
    ]
  },
]);

export default router;