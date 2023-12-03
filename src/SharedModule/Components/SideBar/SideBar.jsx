import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { TiHome } from "react-icons/ti";
import { HiUsers } from "react-icons/hi";
import { MdFastfood } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import logo from '../../../assets/images/3.png'
import { RxHamburgerMenu } from "react-icons/rx";
import Modal from 'react-bootstrap/Modal';
import Changepass from '../../../AuthModule/Components/Change-Pass/Changepass'
import { BiSolidCategory } from "react-icons/bi";


function SideBar({ adminData }) {

  const [isCollapse, setIsCollapse] = useState(false);

  const collapsed = () => {
    setIsCollapse(!isCollapse)
  }

  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login")
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="sidebar-container">

      <Modal show={show} onHide={handleClose}>

        <Changepass handleClose={handleClose} />

      </Modal>


      <ProSidebarProvider >
        <Sidebar defaultCollapsed={isCollapse} className='vh-100 border-sidebar position-fixed'>
          <Menu>
            <MenuItem onClick={collapsed} icon={< RxHamburgerMenu />}> </MenuItem>
            {/* {<img className='w-img' src={logo}/>} */}

            <MenuItem icon={<TiHome />} component={<Link to="/dashboard" />}>  Home </MenuItem>
            <MenuItem icon={<HiUsers />} component={<Link to="/dashboard/users" />}>  Users </MenuItem>
            <MenuItem icon={< MdFastfood />} component={<Link to="/dashboard/recipes" />}> recipes </MenuItem>
            <MenuItem icon={<BiSolidCategory />} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
            <MenuItem icon={<FaUnlockAlt />} onClick={handleShow}> change password </MenuItem>
            <MenuItem icon={<IoLogOutOutline />} onClick={logout}>  Log out </MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  )
}

export default SideBar
{/* <button className='btn btn-danger' onClick={logout}>Log Out</button> */ }
