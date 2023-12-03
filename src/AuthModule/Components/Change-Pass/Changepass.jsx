import React from 'react'
import { useForm } from 'react-hook-form'
import logo from '../../../assets/images/4 3.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CiLock } from "react-icons/ci";


function Changepass({handleClose}) {

  const {
    register,
    formState: { errors }, handleSubmit
  } =
    useForm()

  const onSubmit = (data) => {
    console.log(data);
    console.log(localStorage.getItem('adminToken'))
    axios.put("https://upskilling.com:3002/api/v1/Users/changePassword", data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      .then((response) => {
        console.log(response);
        handleClose();
        toast.success(`your password apdated successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // navigate('/dashboard')

      })
  }

  return (
    <>

            <div className="bg-white">
              <div className="Auth-img w-50 m-auto pt-5">
                <img className='w-100' src={logo} alt="logo" />
              </div>
              <div className="Auth-details w-75 m-auto pb-5">
                <h3>Change Password</h3>
                <p className='Auth-paragraph'>inter your details below</p>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <ToastContainer />

                  <div className="form-group mt-3 position-relative">
                  <CiLock className='style-icon'/> 

                    <input
                      className='form-control ps-4'
                      type="password"
                      placeholder="Old password"
                      {...register("oldPassword",
                        {
                          required: true

                        }
                      )}
                    />
                  </div>

                  {errors.oldPassword && errors.oldPassword.type === "required" && <span className='text-danger'> old Password is required </span>}

                  <div className="form-group mt-3 position-relative">
                  <CiLock className='style-icon'/> 
                    <input
                      className='form-control ps-4'
                      type="password"
                      placeholder="New password"
                      {...register("newPassword",
                        {
                          required: true
                        }
                      )}
                    />
                  </div>

                  {errors.newPassword && errors.newPassword.type === "required" && <span className='text-danger'> new password is required </span>}

                  <div className="form-group mt-3 position-relative">
                  <CiLock className='style-icon '/> 
                    <input
                      className='form-control ps-4'
                      type="password"
                      placeholder="confirm new password"
                      {...register("confirmNewPassword",
                        {
                          required: true

                        }
                      )}
                    />
                  </div>

                  {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" && <span className='text-danger'> confirm New Password is required </span>}

                  <button className='btn btn-success w-100 mt-3'>Change Password</button>
                </form>
              </div>
            </div>
        

    </>
  )
}

export default Changepass