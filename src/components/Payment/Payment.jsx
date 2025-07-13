import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { cartContext } from '../../context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function Payment() {
  let { cartId ,clearCart } = useContext(cartContext)
  let [isOnline, setIsOnline] = useState(true)
  let headers = { token: localStorage.getItem('token') }

  async function payOnline(val) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress: val }
        , { headers })
      console.log(data);
      if (data.status === 'success') {
        console.log(data.session.url);
        window.location.href = data.session.url
      }
    } catch (error) {
      console.log(error);

    }
  }


  async function payCash(val) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: val }
        , { headers })
      console.log(data);
      if (data.status === 'success') {
        console.log(data.status);
        toast.success(data.status)
       await clearCart()
      }
    } catch (error) {
      console.log(error);

    }

  }

  async function checkPayment(val) {
    if (isOnline) {
      payOnline(val)
    } else {
      payCash(val)
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },

    onSubmit: checkPayment
  })




  return <>
    <form action="" onSubmit={formik.handleSubmit} className=' mt-16 px-20'>
      <label htmlFor="details" className='block'>Details</label>
      <input value={formik.values.details} onChange={formik.handleChange} type="text" id='details' name='details' className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
      <label htmlFor="phone" className='block'>Phone</label>
      <input value={formik.values.phone} onChange={formik.handleChange} type="text" id='phone' name='phone' className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
      <label htmlFor="city" className='block'>City</label>
      <input value={formik.values.city} onChange={formik.handleChange} type="text" id='city' name='city' className="px-2 py-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
      <div className='flex flex-col'>
        <button onClick={() => {
          setIsOnline(true)
        }} type='submit' className='clear w-full md:w-1/3 mt-8 bg-green-500 rounded-md mx-auto py-2 text-xl text-white' >Pay online</button>
        <button onClick={() => {
          setIsOnline(false)
        }} type='submit' className='clear w-full md:w-1/3 mt-4 bg-green-500 rounded-md mx-auto py-2 text-xl text-white' >Pay cash</button>
      </div>

    </form>
  </>
}
