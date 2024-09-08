import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import header from '../../../assets/images/eating a variety of foods-amico.svg'
import NoData from '../../../SharedModule/Components/NoData/NoData'
import noData from '../../../assets/images/freepik--Character--inject-70.png'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import { ModalBody } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Users() {

  const [usersList, setUsersList] = useState()
  const [showState, setShowState] = useState('close');
  const [itemID, setItemID] = useState();
  const [pageArray, setPageArray] = useState();
  const [searchUser, setSearchUser] = useState();
  const [searchEmail, setSearchEmail] = useState();

  const getUsers = (pageNo, name, email) => {
    axios.get('https://upskilling-egypt.com:3006/api/v1/Users/',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        params: {
          email: email,
          pageSize: 10,
          pageNumber: pageNo,
          userName: name
        }
      })
      .then((response) => {
        setUsersList(response.data.data)
        setPageArray(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUsers(1)
  }, [])

  const handleClose = () => {
    setShowState('close');
  }

  const handleShowDelete = (id) => {
    setShowState('delete-state');
    setItemID(id)

  }

  const deleteUser = () => {
    axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${itemID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      }
    }).then((response) => {
      console.log(response);
      handleClose();
      getUsers()
      toast.success(`User deleted successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
    )
  }

  const getNameValue = (e) => {
    setSearchUser(e.target.value)
    getUsers(1, e.target.value, searchEmail);
  }

  const getEmailValue = (e) => {
    setSearchEmail(e.target.value)
    getUsers(1, searchUser, e.target.value);
  }
  
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

      <div className=" p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Users Table Details</h5>
            <span className='text-muted'>You can check all details</span>
          </div>
        </div>
      </div>

      <Modal show={showState == 'delete-state'} onHide={handleClose}>
        <ModalBody>
          <div className='text-center'>
            <img src={noData} alt="" />
            <h4 className='mt-2'>Delete This Recipe ?</h4>
            <p className='text-muted p-2'>are you sure you want to delete this item? if you are sure just click on delete it</p>
            <hr className='text-muted w-75 m-auto' />
            <div className='d-flex justify-content-end mt-3'>
              <button className='btn btn-outline-danger' onClick={deleteUser}>Delete this item</button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div className="row">
        <div className="col-md-6">
          <input type="text" placeholder='Search by User name...' className='form-control'
            onChange={getNameValue} />
        </div>

        <div className="col-md-6">
          <input type="text" placeholder='Search by email...' className='form-control'
            onChange={getEmailValue} />
        </div>
      </div>

      {
        usersList?.length > 0 ?
          <div className="p-4">
            <table className="table table-striped p-4">
              <thead className='table-light'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>

                {
                  usersList?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{user.id}</th>
                        <td>{user.userName}</td>
                        <td scope="col">
                          {
                            user.imagePath
                              ? <img className='width-img'
                                src={`https://upskilling-egypt.com:3006/` + user?.imagePath}
                                alt="" />
                              : <img className='width-img'
                                src={noData}
                                alt="" />
                          }                        </td>
                        <td scope="col">{user.phoneNumber}</td>
                        <td scope="col">{user.email}</td>
                        <td>
                          <MdDelete onClick={() => handleShowDelete(user.id)} className='text-danger text-center' />
                        </td>
                      </tr>
                    )
                    // console.log(usersList);
                  })
                }

              </tbody>
            </table>

            <nav aria-label="..." className='d-flex justify-content-end'>
              <ul className="pagination pagination-sm">
                {
                  pageArray.map((pageNo, index) => {
                    return (
                      <li key={index} onClick={() => getUsers(pageNo, searchUser, searchEmail)} className="page-item disabled px-0 cursor-pointer">
                        <a className="page-link">{pageNo}</a>
                      </li>
                    )
                    {/* <li className="page-item px-0"><a className="page-link" href="#">2</a></li> */ }

                  })
                }
              </ul>
            </nav>
          </div>
          : <NoData />
      }

    </>
  )
}

export default Users