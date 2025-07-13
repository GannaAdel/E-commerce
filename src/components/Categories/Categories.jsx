import React, { useEffect, useState, useContext } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { categoryContext } from '../../context/categoryContext';
import Loading from '../Loading/Loading';


export default function Categories() {
  const { category } = useContext(categoryContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [subcategories, setSubcategories] = useState([]);


  async function getRelatedCategories(id, name) {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);

    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${id}`);
      setSubcategories(data.data);

      console.log(data.data);


    } catch (error) {
      console.log(error.response.data.message);
    }
  }


  useEffect(() => {

  }, [])

  return <>
  {category.length>0 ?
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
      {category?.map((category) => {
        return <div key={category._id} className='flex flex-col cursor-pointer border rounded-md border-gray-400 hover:rounded-md  hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-green-500 transition-all duration-300 ' onClick={() => {
          getRelatedCategories(category._id, category.name)
        }}>
          <div>
            <img src={category.image} alt={category.name} className='w-full h-[400px]' />
          </div>
          <div>
            <h3 className='text-3xl text-green-500 text-center p-8'>{category.name} </h3>
          </div>
        </div>

      })}
    </div>
    :<Loading/>}

    {selectedCategoryId && selectedCategoryName && (
      <div className="mt-10">
        <h2 className="text-3xl mb-4 text-center text-green-500 font-bold ">{selectedCategoryName} Subcategories</h2>
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        
          {subcategories.map(sub => (
            <li key={sub._id} className="text-3xl text-center border p-4 mb-2 rounded-md border-gray-400 hover:rounded-md  hover:outline-none hover:ring-2 hover:ring-green-500 hover:border-green-500 transition-all duration-300 ">
              {sub.name}
            </li>
          ))}
        </ul>
      </div>
    )}


  </>
}
