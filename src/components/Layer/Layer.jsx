import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'


export default function Layer() {
    const [counter,setCounter] = useState(0)

    useEffect(()=>{},[])
  return <>
  <Navbar/>
  <div className='Container p-16'>
    <Outlet/>
  </div>

  </>
}
