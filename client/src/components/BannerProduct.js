import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/img1.webp'
import image2 from '../assets/banner/img2.webp'
import image3 from '../assets/banner/img3.jpg'
import image4 from '../assets/banner/img4.jpg'
import image5 from '../assets/banner/img5.webp'

import img1_mobile from '../assets/banner/img1_mobile.jpg'
import img2_mobile from '../assets/banner/img2_mobile.webp'
import img3_mobile from '../assets/banner/img3_mobile.jpg'
import img4_mobile from '../assets/banner/img4_mobile.jpg'
import img5_mobile from '../assets/banner/img5_mobile.png'

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]
    const mobileImages = [
        img1_mobile,
        img2_mobile,
        img3_mobile,
        img4_mobile,
        img5_mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>
                
                {/**desktop and tablet version */}
              <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((imageURl,index)=>{
                        return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                            <img src={imageURl} className='w-full h-full'/>
                        </div>
                        )
                    })
                }
              </div>


                {/**mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((imageURl,index)=>{
                        return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                            <img src={imageURl} className='w-full h-full object-cover'/>
                        </div>
                        )
                    })
                }
                </div>
        </div>
    </div>
  )
}

export default BannerProduct