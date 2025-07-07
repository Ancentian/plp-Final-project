import React from 'react'
import { useState } from 'react'
import {CgClose} from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from "react-icons/fa"
import  uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import {MdDelete} from 'react-icons/md'
import SummaryApi from '../common'
import { toast } from 'react-toastify';


const AdminEditProduct = ({
  onClose,
  productData,
  fetchdata
}) => {
  const [data, setData] = useState({
    ...productData,
    productName   : productData?.productName,
    brandName     : productData?.brandName,
    category      : productData?.category,
    productImage  : productData?.productImage || [],
    description   : productData?.description,
    price         : productData?.price,
    sellingPrice  : productData?.sellingPrice,
})

const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
const [fullScreenImage,setFullScreenImage] = useState("")

const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name]  : value
      }
    })
}

const handleUploadProduct = async(e) => {
  const file = e.target.files[0]

  const uploadImageCloudinary = await uploadImage(file)
  setData((preve)=>{
    return{
      ...preve,
      productImage : [ ...preve.productImage, uploadImageCloudinary.url]
    }
  }) 
}

const handleDeleteProductImage = async(index)=>{
  console.log("index", index)
  const newProductImage = [...data.productImage]
  newProductImage.splice(index, 1)

  setData((preve)=>{
    return{
      ...preve,
      productImage : [ newProductImage]
    }
  }) 
}

// Upload Product
const handleSubmit = async(e) => {
  e.preventDefault()
  
  const response = await fetch(SummaryApi.updateProduct.url, {
    method : SummaryApi.updateProduct.method,
    credentials : 'include',
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify(data)
  })

  const responseData = await response.json()

  if(responseData.success){
    toast.success(responseData?.message)
    onClose()
    fetchdata()
  }

  if(responseData.error){
    toast.error(responseData?.message)
  }
}
  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

          <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Edit Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </div>
          </div>

          <form className='grid p-2 gap-3 overflow-y-scroll h-full' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name :</label>
            <input
              type='text'
              id='productName'
              name='productName'
              placeholder='Enter Product Name'
              className='p-2 bg-slate-100 border rounded'
              value={data.productName}
              onChange={handleOnChange}
              required
            />
            <label className='mt-3' htmlFor='brandName'>Brand Name :</label>
            <input
              type='text'
              id='brandName'
              name='brandName'
              placeholder='Enter Brand Name'
              className='p-2 bg-slate-100 border rounded'
              value={data.brandName}
              onChange={handleOnChange}
              required
            />

            <label className='mt-3' htmlFor='brandName'>Category :</label>
            <select name="category" value={data.category} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' id="">
              <option value={""}>Select Category</option>
              {
                productCategory.map((cat, index)=>{
                  return(
                      <option value={cat.value} key={cat.value+index}>{cat.label}</option>
                  )
                })
              }
            </select>

            <label htmlFor='productImage' className='mt-3'>Product Image :</label>
            <label htmlFor="uploadImageInput">
              <div className='p-2 bg-slate-100 border w-full h-32 rounded cursor-pointer'>
                  <div className='w-full h-full text-slate-500 flex justify-center items-center flex-col cursor-pointer'>
                      <span className='text-3xl'><FaCloudUploadAlt /></span>
                      <p className='text-sm text-gray-600'>Drag and Drop, or click to upload</p>
                      <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />  
                  </div>
              </div>
            </label>
            <div>
              {
                data?.productImage[0] ? (
                  <div className='flex items-center gap-2'>
                      {
                        data.productImage.map((image, index) =>{
                          return(
                          <div className='relative group'>
                              <img 
                            src={image} width={80} 
                            height={80} 
                            className='bg-slate-100 border cursor-pointer' alt={image}
                            onClick={() => {
                              setOpenFullScreenImage(true); 
                              setFullScreenImage(image)}}/>
                            <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}>
                              <MdDelete />
                            </div>
                          </div>
                          )
                        })
                      }
                  </div>
                ) : (
                  <p> <span className='text-red-600'>*</span> Please Upload Product Image</p>
                )
              }
            </div>

            <label htmlFor='price' className='mt-3'>Price :</label>
                    <input 
                      type='number' 
                      id='price' 
                      placeholder='enter price' 
                      value={data.price} 
                      name='price'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                    />
            <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input 
                      type='number' 
                      id='sellingPrice' 
                      placeholder='enter selling price' 
                      value={data.sellingPrice} 
                      name='sellingPrice'
                      onChange={handleOnChange}
                      className='p-2 bg-slate-100 border rounded'
                      required
                    />

                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea 
                      className='h-28 bg-slate-100 border resize-none p-1' 
                      placeholder='enter product description' 
                      rows={3} 
                      onChange={handleOnChange} 
                      name='description'
                      value={data.description}
                      required
                    >
                    </textarea>

                    <button className='px-2 py-1 bg-red-600 text-white rounded mb-10 hover:bg-red-700' type='submit'>Update Product</button>
          </form>

      </div>
      {/* Display Product Image */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )
      }
    </div>
  )
}

export default AdminEditProduct