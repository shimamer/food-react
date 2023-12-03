import React from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import header from '../../../assets/images/eating a variety of foods-amico.svg'

function Users() {
  return (
    <>

      <Header>
        <div className="header p-4">
          <div className="row align-items-center text-white">
            <div className="col-md-10">
              <h3>users items!</h3>
              <p>You can now add your items that any user can order it from the Application and you can edit</p>

            </div>
            <div className="col-md-2">
              <img className='w-100' src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>

    </>
  )
}

export default Users