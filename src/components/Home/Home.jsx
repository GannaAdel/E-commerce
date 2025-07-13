import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../../MainSlider/MainSlider'
import toast from 'react-hot-toast'

export default function Home() {
    const [counter,setcounter] = useState(null)


  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProducts/>
  
  </>
}
