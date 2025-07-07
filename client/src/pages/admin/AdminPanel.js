import React, { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser, FaUsers, FaBoxOpen } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ROLE from '../../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    })

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col' >
                <div className='text-5xl cursor-pointer relative flex justify-center' >
                    {
                    user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                    ): (
                    <FaRegCircleUser/>
                    )
                    }
                </div>
                <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                <p className='text-sm font-semibold'>{user?.role}</p>
            </div>
            {/* Navigate */}
            <div className=''>
                <nav className='grid p-4'>
                <Link to="all-users" className="flex items-center px-2 py-1 hover:bg-slate-100">
                    <FaUsers className="mr-2" /> All Users
                    </Link>
                <Link to="all-products" className="flex items-center px-2 py-1 hover:bg-slate-100">
                    <FaBoxOpen className="mr-2" /> All Products
                </Link>
                </nav>
            </div>
        </aside>
        <main className='w-full h-full p-4'>
            <Outlet/>
        </main>
    </div>
    
  )
}

export default AdminPanel