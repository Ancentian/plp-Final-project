import React, { useState, useContext } from 'react'
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import {  FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'  
    })

    const data = await fetchData.json()

    if (data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if (data.error){
      toast.error(data.message)
    }
  }
  // console.log("Header", context)

  const handleSearch = (e) =>{
    const {value} = e.target
    if (value.length > 0){
      navigate(`/search?query=${value}`)
    } else {
      navigate(`/`)
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link to={'/'}><Logo w={90} h={50}/></Link>
            </div>

            {/* Search */}
            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
              <input type="text" placeholder='Search Product here...' className='w-full outline-none' onChange={handleSearch}/>
              <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full'>
                  <GrSearch/>
              </div>
            </div>

            {/* Icons */}
            <div className='flex items-center gap-7'>
              <div className='relative flex justify-center'>
                {
                  user?._id && (
                    <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                      {
                        user?.profilePic ? (
                        <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                        ): (
                        <FaRegCircleUser/>
                        )
                      }
                    </div>
                  )
                }

                {
                  menuDisplay && (
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                      <nav>
                        {
                          user?.role ===ROLE.ADMIN && (
                            <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=> setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                          )
                        }
                        
                      </nav>

                    </div>
                  )
                }
                
              </div>
              {
                  user?._id && (
                    <Link to={"/cart"} className='text-2xl cursor-pointer relative'>
                      <span><FaShoppingCart/></span>
                      
                          <div className='bg-red-600 text-white flex items-center justify-center absolute -top-2 -right-2 text-xs w-5 h-5 rounded-full'>
                            <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                        
                      
                    </Link>
                  )
                }

              <div>
                {
                  user?._id?(
                    <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Logout</button>
                  ) : (
                    <Link to={'/login'} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</Link>
                  )
                }     
              </div>

              
            </div>
        </div>
    </header>
  )
}

export default Header