import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "./root";
import SignIn from "../pages/loginpage/Signin";
import Home from "../pages/homepage/Home";
import Category from "../pages/Category";
import Categories from "../pages/categorypage/Categories";
import Search from "../pages/Search";

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
        },
        {
          path:"/categories",
          element: <Categories/>
        }
        ,
        {
            path:"/search",
            element: <Search/>
        }
        ,
        {
            path:"/search",
            element: <Search/>
        }
    ]
  },
]);

export default router;