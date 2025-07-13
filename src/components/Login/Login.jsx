import React, { useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import { WishlistContext } from '../../context/wishlistContext'
import toast from 'react-hot-toast';

export default function Login() {
  let navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let { token, setToken } = useContext(authContext)
  let { getUserCart ,getLoggedUserCart} = useContext(cartContext)
  let { getUserWishlist} = useContext(WishlistContext)
  

  async function submitForm(val) {
    try {
      setError('')
      setLoading(true)
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', val)
      setLoading(false)
      console.log(data.token);
      if (data.message === 'success') {
       toast.success('Logged in successfully!');
        localStorage.setItem('token', data.token)
        setToken(data.token)
      await  getLoggedUserCart()
  await getUserCart()
  await getUserWishlist()
       
 navigate('/')
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
        toast.error(error.response.data.message)

      }
    }
  }

  function validationSchema() {
    let validation = Yup.object().shape({
      email: Yup.string().required('Input is required').email('Invalid email'),
      password: Yup.string().required('Input is required').matches(/^[A-Z][a-z0-9]{4,9}$/, 'Invalid password'),
    })
    return validation
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm
  })
  // console.log(formik);



  useEffect(() => {
   }, [])

  return <>

    <div className="bg-gray-100 flex min-h-screen py-8 items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt='' />
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login Now
          </h2>
          {error && <h3 className='bg-red-300 text-red-600'>{error}</h3>}

          <form className="space-y-6 " onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name="email" type="email-address" autoComplete="email-address" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>
            </div>
            <div>

              {formik.errors.email && formik.touched.email ? <div className="mt-5 flex items-center justify-between p-5 leading-normal text-red-600 bg-red-100 rounded-lg" role="alert">
                <p>{formik.errors.email}</p>
                <svg onclick="return this.parentNode.remove();" className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
                </svg>
              </div> : null}


              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name="password" type="password" autoComplete="password" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
              </div>
            </div>

            {formik.errors.password && formik.touched.password ? <div className="mt-5 flex items-center justify-between p-5 leading-normal text-red-600 bg-red-100 rounded-lg" role="alert">
              <p>{formik.errors.password}</p>
              <svg onclick="return this.parentNode.remove();" className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
              </svg>
            </div> : null}





            <div>
              <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                {loading ? <i className='fas fa-spinner fa-spin'></i> :
                  'Login now'}
              </button>
            </div>
          </form>
          <Link to={'/forgetPass'}>Forget Password?</Link>
        </div>
      </div>
    </div>
  </>
}
