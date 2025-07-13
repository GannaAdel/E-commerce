import React, { useEffect, useState } from 'react'
import style from './Brand.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading'


export default function Brand() {
  const [brand, setBrand] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null);


  async function showAllBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      console.log(data?.data);
      setBrand(data.data)
    } catch (error) {
      setBrand(error.response.data.message)
    }
  }

  useEffect(() => {
    showAllBrands()

  }, [])
  return <>

    <h1 className='text-5xl my-8 text-green-600 text-center font-bold'>All Brands</h1>
    {brand.length > 0 ?
      <div className='grid  md:grid-cols-2 lg:grid-cols-4 gap-8 '>
        {brand?.map((brand) => {
          return <div key={brand._id} onClick={() => {
            setOverlay(true);
            setSelectedBrand(brand)

          }} className='flex flex-col border rounded-md border-gray-400  cursor-pointer hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-green-500 transition-all duration-300 '>
            <div>
              <img src={brand.image} alt={brand.name} />
            </div>
            <div>
              <h3 className='text-xl text-black text-center p-8'>{brand.name} </h3>
            </div>
          </div>

        })}
      </div>
      : <Loading />}


    {overlay && <div className="overlay bg-[rgba(0,0,0,0.3)] flex justify-center h-screen fixed inset-0 z-50" onClick={() => {
      setOverlay(false)
    }}>
      <div className={`bg-white lg:w-1/3 h-[300px] flex flex-col flex-wrap mt-8 rounded-lg 
       `} onClick={(e) => {
          e.stopPropagation()
        }}>
        <div className="icon-x relative w-full h-[50px] border-b-2 p-4 border-gray-300">
          <i className='fa fa-xmark absolute right-5 top-5 text-gray-400 hover:text-gray-600 text-2xl' onClick={() => {
            setOverlay(false)
          }}></i>
        </div>
        {selectedBrand && <div className='w-full flex justify-between items-center px-8 '>
          <div className='flex-col flex-wrap'>
            <h2 className='text-3xl  text-emerald-500 mb-4'>{selectedBrand?.name}</h2>
            <p>{selectedBrand?.name}</p>
          </div>
          <img src={selectedBrand?.image} alt="" />

        </div>

        }

        <button onClick={() => {
          setOverlay(false)
        }} className='w-20  bg-gray-400 hover:bg-gray-600 text-white text-xl px-2 ml-auto mr-8 rounded-md '>close</button>


      </div>
    </div>
    }


  </>
}
