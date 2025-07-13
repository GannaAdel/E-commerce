import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { WishlistContext } from '../../context/wishlistContext'
import Loading from '../Loading/Loading'
import toast from 'react-hot-toast';


export default function RecentProducts() {
  const [products, setProducts] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [search, setSearch] = useState('')
  let { addToCart } = useContext(cartContext)
  let { addToWishlist, deleteItemFromWishlist, wishlistProducts } = useContext(WishlistContext)

  async function addProductToCart(prodId) {
    let response = await addToCart(prodId)
if(response.status==='success'){
toast.success('added to cart successfully')

}
  }

  async function addProductToWishlist(prodId) {
    let response = await addToWishlist(prodId)
    const updatedWishlist = [...wishlistItems, prodId]
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlistProducts', JSON.stringify(updatedWishlist))

  }

  async function showAllProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data)
    } catch (error) {
      setProducts([])
    }
  }


  async function toggleWishlist(prodId) {
    const isInWishlist = wishlistItems.includes(prodId);
    if (isInWishlist) {
      await deleteItemFromWishlist(prodId);
      const updated = wishlistItems.filter(id => id !== prodId);
      setWishlistItems(updated);
      localStorage.setItem('wishlistProducts', JSON.stringify(updated));
      toast.success('Removed from wishlist');
    } else {
      await addProductToWishlist(prodId);
      toast.success('Added to wishlist');
    }
  }


  useEffect(() => {
    showAllProducts()
    try {
      const storedWishlist = JSON.parse(localStorage.getItem('wishlistProducts')) || []
      setWishlistItems(storedWishlist)
    } catch (error) {
      console.log(error);

    }

  }, [])

  return <>
    <input
      onChange={(e) => setSearch(e.target.value)}
      placeholder='search'
      type="text"
      id='search'
      name='search'
      className="px-2 py-2 my-8 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
    />

    {products.length > 0 ? (
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products
          .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
          .map((product) => (
            <div key={product._id}>
              <div className="card  group pb-4 hover:rounded-md  hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-green-500 transition-all duration-300 ">
                <Link to={`/productDetails/${product.id}/${product.category.name}`}>

                  <img src={product.imageCover} className='w-full' alt={product.title} />
                  <div className='relative px-4'>
                    <h3 className='text-2xl font-bold'>{product.category.name}</h3>
                    <h5>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
                    <div className="flex justify-between mb-4">
                      <h6>{product.price} EG</h6>
                      <span> <i className='fa fa-star text-amber-300'></i>{product.ratingsAverage} </span>
                    </div>
                  </div>
                </Link>

                <div className='flex flex-row justify-between px-4 items-center'>
                    <button
                    onClick={() => addProductToCart(product._id)}
                    className='bg-green-600 p-2 rounded w-1/2  text-white transition-all duration-300 opacity-0 translate-y-20  group-hover:opacity-100 group-hover:translate-y-0   cursor-pointer '
                  >
                    Add to cart
                  </button>
                  <i
                    onClick={() => toggleWishlist(product._id)}
                    className={`fa fa-heart text-2xl  cursor-pointer ${wishlistItems.includes(product._id)
                      ? 'text-red-500'
                      : 'text-black'}`}
                  ></i>

                
                </div>
              </div>
            </div>
          ))}
      </div>
    ) : (
      <Loading />
    )}
  </>
}