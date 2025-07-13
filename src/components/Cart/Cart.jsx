import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { cartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
export default function Cart() {

  const { totalCartPrice, numOfCartItems, products, updateCart, deleteItemFromCart, clearCart, getUserCart } = useContext(cartContext)
  useEffect(() => { }, [])

  async function handleUpdate(prodId, prodCount) {
    let response = await updateCart(prodId, prodCount)
    console.log(response);

  }

  async function handleDelete(prodId) {
    let response = await deleteItemFromCart(prodId)
    console.log(response);
    toast.success('Item removed from cart')


  }

  async function handleClear() {
    let response = await clearCart()
    console.log(response);
    await getUserCart()


  }


  return <>

    <div>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-3xl font-semibold'>Cart Shop</h1>
        <Link to={'/payment'}>
          <button className='text-white w-full mt-4 bg-green-500 px-4 rounded-md cursor-pointer  py-2 text-xl ' >Check out</button>
        </Link>
      </div>
      <div className='flex  flex-row justify-between items-center mt-8'>
        <h2 className='text-lg font-bold'>Total price : <span className='text-green-500 font-semibold'>{totalCartPrice}</span></h2>
        <h2 className='text-lg font-bold'>
          Total number of items : <span className='text-green-500 font-semibold' > {numOfCartItems}</span>
        </h2>

      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 text-center">
        <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">


          {products?.map((item) => {

            return <div key={item?.product?._id} className="py-16 flex flex-row justify-between items-center bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className='flex items-center flex-col md:flex-row px-16 '>
                <div className="p-4 ">
                  <img src={item?.product?.imageCover} className=" w-64 md:w-32" alt={item?.title} />
                </div>

                <div className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white flex-col ">

                  {item?.product?.title.split(' ').slice(0, 2).join(' ')}


                  <h1 className=" py-4 font-semibold text-green-600 dark:text-white text-start">
                    {`${item?.price} EGP`}
                  </h1>

                  <h1>
                    <a onClick={() => {
                      handleDelete(item?.product?._id)
                    }} className="cursor-pointer font-normal text-red-600 dark:text-red-500 "><i className='fa fa-trash'></i> Remove</a>
                  </h1>
                </div>
              </div>
              <div className='pe-8 flex flex-row items-center pt-64 md:pt-0'>

                <button onClick={() => {
                  handleUpdate(item?.product?._id, item?.count - 1)
                }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <div>
                  <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item?.count} required />
                </div>
                <button onClick={() => {
                  handleUpdate(item?.product?._id, item?.count + 1)
                }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>

              </div>

            </div>
          })}



        </div>
        <button onClick={handleClear} className='cursor-pointer p-2 rounded-lg border-[1px] text-black text-xl border-green-600 w-1/4 mx-auto my-4' >Clear Cart</button>

      </div>


    </div>
  </>
}
