import React from 'react'
import { OrbitProgress } from 'react-loading-indicators'

export default function Loading() {
  return <>
<div className='h-screen flex justify-center items-center z-30'>
<OrbitProgress color="#32cd32" size="medium"  />

</div>
  </>
}
