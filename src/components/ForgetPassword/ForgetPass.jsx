import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgetPass() {
    let navigate= useNavigate()
async function forgetPassword(valu){
  try {
      let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    //  email: 'elghonimyganna@gmail.com'
    valu
    )
    console.log(valu);
    console.log(data);
     if (data.statusMsg === 'success') {
        navigate('/verifyResetCode')
    
     }
  } catch (error) {
    console.log(error);
    
  } 
}

let formik = useFormik({
    initialValues:{
        email:''
    },
    onSubmit: forgetPassword
})


  return <>
<form action="" onSubmit={formik.handleSubmit}>
      <div className='flex-col'>
    <h1 className='text-2xl'>please enter your Email</h1>
   <input value={formik.values.email} onChange={formik.handleChange} id='email' name='email' type="email" placeholder='email'  className="px-2 py-2 mt-4 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"/>
        <button type='submit'  className='clear w-1/4 mt-4 bg-emerald-500  py-2 text-xl text-black' >Verify</button>
  </div>
</form>
  
  </>
}
