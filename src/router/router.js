import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "./root";
import SignIn from "../pages/loginpage/Signin";
import Home from "../pages/homepage";
import Categories from "../pages/categorypage";
import GetIdea from "../pages/getidea";
import HowItWorks from "../pages/howitworkpage/HowItWorks";
import Freelancer from "../pages/Freelancer";
import ResultSearch from "../pages/resultsearchpage";
import UserHome from "../pages/userHome";
import Terms from "../pages/terms&conditions";
import Faq from "../pages/faq";
import Membership from "../pages/membership";
import BidOnJob from "../pages/bidonjob";
import Portfolio from "../pages/portfoliopage";
import Register from "../pages/loginpage/Register";
import PostJob from "../pages/postjobpage/index";
import Job from "../pages/jobPage";
import CompleteRegister from "../pages/completeregister";
import MyProfile from "../pages/myprofile";
import ProfileEdit from "../pages/profileedit";
import Settings from "../pages/settings";
import Help from "../pages/helpcontactus";
import InviteFriend from "../pages/inviteFriend";
import Payment from "../pages/payment";
import AboutUs from "../pages/aboutuspage";
import Myjobs from "../pages/myjobs";

const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/signIn",
            element: <SignIn />
          }
          ,
          {
            path: "/userhome",
            element: <UserHome />
          },
          {
            path: "/categories",
            element: <Categories />
          }
          ,
          {
            path: "/getidea",
            element: <GetIdea />
          },
          {
            path: "/howitworks",
            element: <HowItWorks />
          },
          {
            path: "/freelancer/:UserID",
            element: <Freelancer />
          },
          {
            path: "/resultssearch",
            element: <ResultSearch />
          },
          {
            path: "/terms&conditions",
            element: <Terms />
          },
          {
            path: "/faq",
            element: <Faq />
          },
          {
            path: "/membership",
            element: <Membership />
          },
          {
            path: "/bidproposal",
            element: <BidOnJob />
          },
          {
            path: "/portfoliopage/:CardId",
            element: <Portfolio />
          },
          {
            path: "/register",
            element: <Register />
          },
          {
            path: "/postjob",
            element: <PostJob />
          },
          {
            path: "/jobprofile/:JobID",
            element: <Job />
          },
          {
            path: "/completeregister",
            element: <CompleteRegister />
          },
          {
            path: "/myprofile",
            element: <MyProfile />
          },
          {
            path: "/profileedit",
            element: <ProfileEdit />
          },
          {
            path: "/settings",
            element: <Settings />
          },
          {
            path: "/help",
            element: <Help />
          },
          {
            path: "/invitefriend",
            element: <InviteFriend />
          },
          {
            path: "/payment",
            element: <Payment />
          },
          {
            path: "/aboutus",
            element: <AboutUs />
          },
          {
            path:"/myjobs",
            element:<Myjobs/>
          }
        ]
      },
]);

export default router;