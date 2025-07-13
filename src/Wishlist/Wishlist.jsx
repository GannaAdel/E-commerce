import React, { useContext } from 'react'
import { WishlistContext } from '../context/wishlistContext'
import { cartContext } from '../context/CartContext'
import Loading from '../components/Loading/Loading'
import toast from 'react-hot-toast'

export default function Wishlist() {

  let { wishlistProducts, wishlistId, deleteItemFromWishlist } = useContext(WishlistContext)
  let { addToCart } = useContext(cartContext)


  async function handleDelete(prodId) {
    let response = await deleteItemFromWishlist(prodId)
    console.log(response);
    toast.success('removed from wishlist')

  }

   async function addProductToCart(prodId) {
    let response = await addToCart(prodId)
if(response.status==='success'){
toast.success('added to cart successfully')

}
  }


  return <>

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <h1 className='text-3xl px-12 my-8 font-semibold'>My wish List</h1>

      <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
       
          <div className=''>

            {wishlistProducts?.map((item) => {

              return <div key={item?._id} className="py-16 flex justify-between items-center bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div className='flex flex-col md:flex-row items-center px-16 '>
                  <div className="p-4 ">
                    <img src={item?.imageCover} className="w-64 md:w-32 max-w-full max-h-full" alt={item?.title} />
                  </div>

                  <div className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white flex-col ">

                    {item?.title}


                    <h1 className=" py-4 font-semibold text-green-600 dark:text-white text-start">
                      {`${item?.price} EGP`}
                    </h1>

                    <h1>
                      <a onClick={() => {
                        handleDelete(item?._id)
                      }} className="cursor-pointer font-normal text-red-600 dark:text-red-500 "><i className='fa fa-trash'></i> Remove</a>
                    </h1>
                  </div>
                </div>
                <div className='pe-8 pt-64 md:pt-0 w-1/2 md:w-[300px]'>
                  <button onClick={() => {
                    addProductToCart(item._id)
                  }} className='cursor-pointer p-2 rounded-lg border-[1px] text-black text-xl border-green-600 w-full'>Add to cart</button>
                </div>

              </div>
            })}
          </div>
         
      </div>


    </div>
  </>
}
