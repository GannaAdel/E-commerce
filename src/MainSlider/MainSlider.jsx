import React from 'react'
import Slider from 'react-slick';
import img1 from '../assets/images/41nN4nvKaAL._AC_SY200_.jpg'

import img2 from '../assets/images/61cSNgtEISL._AC_SY200_.jpg'
import img3 from '../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img4 from '../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'


export default function MainSlider() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    
  };

  return <>
  <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
    <div className='w-full md:w-1/4 '>
    <Slider {...settings}>
<img src={img1} className='lg-h-[400px]' alt="" />
<img src={img2} className='lg-h-[400px]' alt="" />
<img src={img3} className='lg-h-[400px]' alt="" />


    </Slider>
    
    </div>
    <div className='w-full md:w-1/4 flex flex-col gap-4'>
    <img src={img4} className='h-[200px] w-full' alt="" />
    <img src={img5} className='h-[200px] w-full' alt="" />
    </div>

  </div>
  
  </>
}
