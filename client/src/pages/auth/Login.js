import React from 'react'
import { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import loginIcons from '../../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Context from '../../context';



const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email : "",
    password : ""
  });

  const navigate = useNavigate();
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

  const handleInput = (e) => {
    const {name, value} = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.SignIn.url, { 
      method : SummaryApi.SignIn.method,
      credentials : 'include',
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }


  return (
    <section id='login'>
        <div className='container mx-auto p-4'>

            <div className='bg-white p-5 shadow-lg w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcons} alt="Login" />
                </div>

                <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                  <div className='grid'>
                    <label htmlFor="">Email :</label>
                    <div className='bg-slate-100 p-2'>
                      <input 
                      onChange={handleInput} 
                      value={data.email}
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
                  <Link to={'/forgot-password'} className='block w-fit ml-auto mt-3 hover:underline hover:text-red-600'>
                        <span>Forgot Password ?</span></Link>
                  <button className='bg-red-600 hover:bg-red-700 w-full text-white px-6 py-2 cursor-pointer mt-4 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>

                <p className='my-4'>Don't have an account ? <Link to={'/sign-up'} className='text-red-600 hover:underline'>Register</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login