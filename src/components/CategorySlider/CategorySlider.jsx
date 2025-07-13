import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {
var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    const [cateSlider, setCateSlider] = useState(null)

    async function getCategoriesSlider() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            console.log(data?.data);
            setCateSlider(data?.data)
        } catch (error) {
            setCateSlider(error.response.data.message)

        }
    }

    useEffect(() => {
        getCategoriesSlider()
    }, [])

    return <>
       <div className='grid grid-cols-1 my-8'>
        <Slider {...settings}>
         {cateSlider?.map((cateS)=>{
            return <div key={cateS?._id}>
             <img  src={cateS?.image} className='w-full h-[200px]' alt={cateS?.name} />
            <h3 className='text-center'>{cateS?.name}</h3>
           </div>
            
         })}
       </Slider>
       </div>
    </>
}
