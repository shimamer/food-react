import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { TiHome } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
import { MdFastfood } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import logo from '../../../assets/images/4 3.png'
import { RxHamburgerMenu } from "react-icons/rx";


function SideBar({ adminData }) {

  const [isCollapse,setIsCollapse] = useState(false);

  const collapsed = () =>{
      setIsCollapse(!isCollapse)
    }
  

  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login")
  }

  return (
    <ProSidebarProvider >
      <Sidebar defaultCollapsed={isCollapse} className='vh-100 bg-side border-sidebar '>
        <Menu>
        <MenuItem onClick={collapsed} icon={<RxHamburgerMenu />}> </MenuItem>


          <MenuItem icon={<TiHome />} component={<Link to="/dashboard" />}>  Home </MenuItem>
          <MenuItem icon={<HiUsers />}  component={<Link to="/dashboard/users" />}>  Users </MenuItem>
          <MenuItem icon={< MdFastfood />} component={<Link to="/dashboard/recipes" />}> recipes </MenuItem>
          <MenuItem icon={<FaUnlockAlt />} component={<Link to="/dashboard/Change-pass" />}> change password </MenuItem>
          <MenuItem icon={<IoLogOutOutline />} onClick={logout}>  Log out </MenuItem>
        </Menu>
      </Sidebar>
    </ProSidebarProvider>
  )
}

export default SideBar
{/* <button className='btn btn-danger' onClick={logout}>Log Out</button> */ }
