import React from 'react'
// import SideBar from '../../../SharedModule/Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';

function MasterLayout({ adminData }) {
  return (
    <>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-md-2 p-0 ">
            <div>
              <SideBar adminData={adminData} />
            </div>
          </div>
          <div className="col-md-10">
            <div>
              <Navbar adminData={adminData} />
              <Header/>        
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterLayout