import React, { useEffect, useState, useContext } from 'react'
import style from './ProductDetails.module.css'
import Slider from 'react-slick'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'


export default function ProductDetails() {
  let { addToCart } = useContext(cartContext)


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  let { id, category } = useParams()
  console.log(category);

  async function getProductDetails() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      console.log(data.data)
      setProdDetails(data?.data)
    } catch (error) {
      setProdDetails(error.response.data.message)
    }

  }

  async function addProductToCart(prodId) {
    let response = await addToCart(prodId)
    if (response.status === 'success') {
      toast.success('added to cart successfully')

    }
  }

  async function getrelatedProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      let related = data?.data.filter((cate) => {
        return cate.category.name === category
      })
      console.log(related);

      setRelatedProduct(related)

    } catch (error) {
      setRelatedProduct(related.message)
    }
  }

  const [prodDetails, setProdDetails] = useState(null)
  const [relatedProduct, setRelatedProduct] = useState(null)


  useEffect(() => {
    getProductDetails()
    getrelatedProducts()
  }, [id])
  return <>

    <div className='flex flex-wrap items-center '>
      <div className="part1 w-full mb-8 md:w-1/4 pt-4">
        <Slider {...settings}>
          {prodDetails?.images?.map((src) => {
            return <img src={src} alt={prodDetails?.title} />
          })}

        </Slider>
      </div>
      <div className="part2 w-3/4 ps-2">
        <h1 className='text-2xl font-bold'>{prodDetails?.title}</h1>
        <h4 className='text-gray-500'>{prodDetails?.description}</h4>
        <h3 className='text-green-600 mt-2'>{prodDetails?.category?.name}</h3>

        <div className="flex justify-between font-black mt-4">
          <h6>{prodDetails?.price} EGP</h6>
          <span>{prodDetails?.ratingsAverage}  <i className='fa fa-star text-amber-300'> </i></span>

        </div>
        <button onClick={() => {
          addProductToCart(prodDetails?._id)
        }} className='bg-green-600 p-2 rounded w-full cursor-pointer'>Add to cart</button>

      </div>

    </div>
    <h2 className='text-green-500 text-2xl font-bold mt-20 '> Related products</h2>

    <div className='grid md:grid-cols-3 lg:grid-cols-8 gap-4 mt-8'>
      {relatedProduct?.map((rel) => {
        return <div key={rel._id} >
          <div className="card ">
            <Link to={`/productDetails/${rel.id}/${rel.category.name}`}>
              <img src={rel.imageCover} alt={rel.title} />
              <h3 className='text-2xl font-bold '>{rel.category.name}</h3>
              <h5>{rel.title.split(' ').slice(0, 2).join(' ')}</h5>
              <div className="flex justify-between">
                <h6>{rel.price} EG</h6>
                <span>{rel.ratingsAverage}  <i className='fa fa-star text-amber-300'> </i></span>

              </div>
            </Link>
            <button onClick={() => {
              addProductToCart(rel._id)
            }} className='bg-green-600 p-2 rounded w-full  cursor-pointer'>Add to cart</button>
          </div>

        </div>
      })}

    </div>
  </>
}
