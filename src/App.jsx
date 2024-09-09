
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Login from './AuthModule/Components/Login/Login'
import Changepass from './AuthModule/Components/Change-Pass/Changepass'
import Categories from './CategoriesModule/Components/Categories/Categories'
import Home from './HomeModule/Components/Home/Home'
import Recipes from './RecipesModule/Components/Recipes/Recipes'
import Users from './UsersModule/Components/Users/Users'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import ResetPassRequest from './AuthModule/Components/ResetPassRequest/ResetPassRequest';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [adminData, setadminData] = useState(null)

  const saveAdminData = () => {
    let incodedToken = localStorage.getItem("adminToken")
    let decodedToken = jwtDecode(incodedToken)
    console.log(decodedToken);
    setadminData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      saveAdminData();
    }
  }, [])

  const routes = createBrowserRouter([
    {
      path: "dashboard",
      element: 
      <ProtectedRoute adminData={adminData} >
        <MasterLayout adminData={adminData} />
       </ProtectedRoute>
      ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "Users", element: <Users /> },
        { path: "recipes", element: <Recipes /> },
        { path: "categories", element: <Categories /> },
        { path: "Change-pass", element: <Changepass /> },
      ],

    },
    {
      path: "/",
      element:
        // <ProtectedRoute adminData={adminData}>
        <AuthLayout />
        // </ProtectedRoute>
      ,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "reset-pass-request", element: <ResetPassRequest /> },
        { path: "reset-pass", element: <ResetPass /> }

      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );

}

export default App
