// upskilling.eg1@gmail.com
// superadmin@email.com
// @Password123!
import React from 'react'
import logo from '../../../assets/images/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ saveAdminData }) {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    axios.post("http://upskilling-egypt.com:3002/api/v1/Users/Login", data)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        saveAdminData()

        setTimeout(toast.success("Welcom!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }), 3000)

        navigate('/dashboard')

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

      <div className='container-fluid Auth-container'>
        <div className="row bg-overlay align-items-center justify-content-center vh-100">
          <div className="col-md-6">
            <div className="bg-white">
              <div className="login-img w-50 m-auto pt-5">
                <img className='w-100' src={logo} alt="logo" />
              </div>
              <div className="login-details w-75 m-auto pb-5">
                <h3>Log in</h3>
                <p className='login-paragraph'>Welcome back! please inter your details.</p>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <ToastContainer />
                  <div className="form-group mt-3">
                    <input
                      className='form-control '
                      type="email"
                      placeholder='Enter your E-mail'
                      {...register("email",
                        {
                          required: true,
                          pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        })}
                    />
                  </div>
                  {errors.email && errors.email.type === "required" && <span className='text-danger '> email is required </span>}
                  {errors.email && errors.email.type === "pattern" && <span className='text-danger '>Invalid email </span>}

                  <div className="form-group mt-3">
                    <input
                      className='form-control '
                      type="password"
                      placeholder="password"
                      {...register("password",
                        {
                          required: true

                        }
                      )}
                    />
                  </div>

                  {errors.password && errors.password.type === "required" && <span className='text-danger'> password is required </span>}

                 <div className='form-group'>

                 <Link className='text-success d-flex justify-content-end mt-2' to={"/reset-pass-request"}>
                    Foget Password?
                  </Link>

                 </div>

                  <button className='btn btn-success w-100 mt-3'>Log in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login