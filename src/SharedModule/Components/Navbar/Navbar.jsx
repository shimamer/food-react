import React from 'react'
import avatar from '../../../assets/images/3.png'

function Navbar({ adminData }) {
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              {/* <img src={avatar} alt="" /> */}
              <a className="nav-link" href="#">{adminData?.userName}</a>
            </li>

          </ul>

        </div>
      </nav>
      {/* {console.log(adminData.userName)} */}

    </div>
  )
}

export default Navbar