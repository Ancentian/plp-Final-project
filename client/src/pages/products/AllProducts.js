import React, { useEffect, useState } from 'react'
import UploadProduct from '../../components/UploadProduct'
import SummaryApi from '../../common'
import AdminProductCard from '../../components/AdminProductCard'


const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])
  
  // Fetch All Products
  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Add Product</button>
      </div>

      {/* All Products */}
      <div className='flex items-center flex-wrap gap-5 py-4'>
        {
          allProduct.map((product, index) => {
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
        }
      </div>

      {/* Upload Product  Component */}

      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }

    </div>
    
  )
}

export default AllProducts