import React from 'react'
import logo from '../../../assets/images/4 3.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPass() {

  const navigate = useNavigate()

  const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm()
  
    const onSubmit = (data) => {
      console.log(data);

      axios.post("http://upskilling-egypt.com:3002/api/v1/Users/Reset", data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
          })
          .then((response) => {
            console.log(response);
            navigate('/login')
            setTimeout(()=>{
              toast.success("Update your password!"
              ,{ position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               })
           }, 1)
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
                <h3>Reset Password</h3>
                <p className='login-paragraph'>please inter your Otp or check your inbox.</p>
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
                      type="text"
                      placeholder='Otp'
                      {...register("seed",
                        {
                          required: true,
                        })}
                    />
                  </div>
                  {errors.seed && errors.seed.type === "required" && <span className='text-danger '> seed is required </span>}
                  

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

                  <div className="form-group mt-3">
                    <input
                      className='form-control '
                      type="password"
                      placeholder="confirm Password"
                      {...register("confirmPassword",
                        {
                          required: true

                        }
                      )}
                    />
                  </div>

                  {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className='text-danger'> confirm New Password is required </span>}

                  <button className='btn btn-success w-100 mt-3'>Reset Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ResetPass