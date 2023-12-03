import React from 'react'
import logo from '../../../assets/images/4 3.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassRequest() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm()
    
      const onSubmit = (data) => {
        console.log(data)
        axios.post("https://upskilling.com:3002/api/v1/Users/Reset/Request", data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('adminToken')}`
            }
          })
          .then((response) => {
            console.log(response);
            navigate('/reset-pass')
            setTimeout(()=>{
              toast.success("Your Mail send!!"
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
                <h3>Reset Request Password</h3>
                <p className='login-paragraph'>please inter your E-mail and check your inbox.</p>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
               
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

                  <button className='btn btn-success w-100 mt-3'>Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ResetPassRequest