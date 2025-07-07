import React, { useEffect, useState, useContext } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify';
import Context from '../context';


const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(context.cartProductCount).fill(null)

  const fetchData = async() => {
    setLoading(true)
    const fetchData = await fetch(SummaryApi.addToCartProductView.url, {
      method : SummaryApi.addToCartProductView.method,
      credentials : 'include',
      headers : {
        "Content-type" : "application/json"
      }
    })
    setLoading(false)

    const responseData = await fetchData.json()
    
    if(responseData.success){
      setData(responseData.data)
    }

    if(responseData.error){
      toast.error(responseData.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  console.log("Cart data",data)
  return (
    <div className='container mx-auto'>

        <div className='text-center text-lg my-3'>
          {
            data.length === 0 && !loading && (
              <p>No Data</p>
            )
          }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
          {/* View Products */}
          <div className='w-full max-w-3xl'>
                {
                  loading ? (
                    loadingCart.map((el,index) => {
                      return(
                        <div key={el+"Add to Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                        </div>
                      )
                    })
                  ) : (
                    data.map((product,index) => {
                      <div key={product+"Add to Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                        </div>
                    })
                  )
                }
          </div>
         
            {/* Summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
              {
                loading ? (
                  <div className='h-36 bg-slate border border-slate-300 animate-pulse'>
                      Total
                  </div>
                ) : (
                  <div className='h-36 bg-slate '>
                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                        <p>Quantity</p>
                        <p>{context.cartProductCount}</p>
                    </div>
                  </div>
                )
              }
            </div>
        </div>
    </div>
  )
}

export default Cart