import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import AllCoffees from './components/Admin/AllCoffees/AllCoffees.jsx';
import UpdateCoffee from './components/Admin/UpdateCoffee/UpdateCoffee.jsx';
import AddCoffee from './components/Admin/AddCoffee/AddCoffee.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/Login.jsx';
import User from './components/User/User.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <AllCoffees />,
    loader: () => fetch(`https://server-delta-hazel.vercel.app/coffee`)

  },
  {
    path: "/addCoffee",
    element: (
      <AddCoffee />)
  },
  {
    path: "/updateCoffee/:id",
    element: (
      <UpdateCoffee />
    ),
    loader: ({ params }) => fetch(`https://server-delta-hazel.vercel.app/coffee/${params.id}`)
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/user',
    element: <User/>,
    loader: () => fetch(`https://server-delta-hazel.vercel.app/user`)
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
