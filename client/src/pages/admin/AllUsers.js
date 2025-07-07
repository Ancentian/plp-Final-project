import React, { useEffect } from 'react'
import { useState } from 'react'
import SummaryApi from '../../common'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../../components/ChangeUserRole';


const AllUsers = () => {

  const [allUser, setAllUsers] = useState([])
  //Modal Like
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : "",
    name  : "",
    role  : "",
    _id   : ""
  })

  const fetchUsers = async() => {
    const fetchData = await fetch(SummaryApi.allUsers.url, {
      method : SummaryApi.allUsers.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error){
      toast.error(dataResponse.message)
    }
    
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable '>
        <thead>
          <tr className='bg-gray-100'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              allUser.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{moment(user?.createdAt).format("ll")}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                      onClick={()=> {
                        setUpdateUserDetails(user)
                        setOpenUpdateRole(true)
                      }}>
                        <MdModeEdit/>
                    </button>
                  </td>
                </tr>
              ))
            }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails?.name}
            email={updateUserDetails?.email}
            role={updateUserDetails?.role}
            userId={updateUserDetails?._id}
            callFunc={fetchUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers