import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Root/Root';
import Home from '../Pages/Home';
import AllProducts from '../Pages/AllProducts';
import CreateProject from '../Pages/CreateProject';
import MyBids from '../Pages/MyBids';
import MyProducts from '../Pages/MyProducts';
import Registration from '../Components/Registration/Registration';
import Login from '../Components/Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "allproducts",
            element: <AllProducts />, 
        },
        {
            path: "createproject",
            element: <CreateProject />, 
        },
        {
            path: "mybids",
            element: <MyBids />
        },
        {
            path: "myproducts",
            element: <MyProducts />
        },
        {
            path: "register",
            element: <Registration/>
        },
        {
            path: "login",
            element: <Login/>
        }
    ]
  },
]);

export default router;