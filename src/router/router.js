import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "./root";
import SignIn from "../pages/loginpage/SignIn";
import Home from "../pages/homepage/Home";
import Category from "../pages/Category";

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
            path:"/category",
            element: <Category/>
        }
    ]
  },
]);

export default router;