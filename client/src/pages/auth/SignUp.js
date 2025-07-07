import React from 'react'
import { useState } from 'react'
import loginIcons from '../../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../../helpers/imageTobase64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
      email : "",
      password : "",
      name: "",
      confirmPassword : "",
      profilePic : "",
    });

    const navigate = useNavigate();
  
    const handleInput = (e) => {
      const {name, value} = e.target;
      setData((preve) => {
        return {
          ...preve,
          [name] : value
        }
      })
    }

    const handleUploadPic = async(e) => {
      const file = e.target.files[0]

      const imagePic = await imageTobase64(file)
      
      setData((preve)=>{
        return {
          ...preve,
          profilePic : imagePic
        }
      })
    }

    const handleSubmit = async(e) => {
      e.preventDefault();

      if (data.password === data.confirmPassword){

        const dataResponse = await fetch(SummaryApi.SignUp.url, {
          method : SummaryApi.SignUp.method,
          headers : {
            "Content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        console.log(dataResponse)
        const dataApi = await dataResponse.json()
          if (dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          } 
          if(dataApi.error){
            toast.error(dataApi.message)
          }

      } else {
        toast.error("Password and Confirm Password does not match")
      }
    }   
    
    
  return (
    <section id='signup'>
        <div className='container mx-auto p-4'>

            <div className='bg-white p-5 shadow-lg w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                      <img src={data.profilePic || loginIcons} alt="Login" />
                    </div>
                    <form action="">
                      <label >
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-2 pt-2 cursor-pointer py-4 text-center absolute bottom-0 w-full'>
                          Upload Photo
                        </div>
                        <input type="file" className='hidden' onChange={handleUploadPic}/>
                      </label>
                      
                    </form>
                </div>

                <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor="">Name :</label>
                    <div className='bg-slate-100 p-2'>
                      <input 
                      onChange={handleInput} 
                      value={data.name}
                      required
                      type='text' name='name' placeholder='Enter your Name' className='w-full h-full outline-none bg-transparent'/>
                    </div>
                  </div>
                  <div className='grid'>
                    <label htmlFor="">Email :</label>
                    <div className='bg-slate-100 p-2'>
                      <input 
                      onChange={handleInput} 
                      value={data.email}
                      required
                      type='email' name='email' placeholder='Enter your Email' className='w-full h-full outline-none bg-transparent'/>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="">Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name='password' 
                        onChange={handleInput}
                        value={data.password}
                        required
                        placeholder='Enter Your Password' className='w-full h-full outline-none bg-transparent'/>
                      <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                        <span>
                          {
                            showPassword ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="">Confirm Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name='confirmPassword' 
                        onChange={handleInput}
                        required
                        value={data.confirmPassword}
                        placeholder='Confirm Password' className='w-full h-full outline-none bg-transparent'/>
                      <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                        <span>
                          {
                            showConfirmPassword ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className='bg-red-600 hover:bg-red-700 w-full text-white px-6 py-2 cursor-pointer mt-4 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                </form>

                <p className='my-4'>Already have an account ? <Link to={'/login'} className='text-red-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp