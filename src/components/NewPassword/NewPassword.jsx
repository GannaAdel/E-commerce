import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

export default function NewPassword() {
    let navigate = useNavigate()
    async function resetPass(valu) {
        try {
            let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                valu
            )
            console.log(valu);
            console.log(data);
            if (data.token) {
                // console.log('success');
                navigate('/login')

            }
        } catch (error) {
            console.log(error);

        }

    }

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        onSubmit: resetPass
    })


    return <>
        <form action="" onSubmit={formik.handleSubmit}>
            <div className='flex-col'>
                <h1 className='text-2xl'>please enter your new-password</h1>
                <input value={formik.values.email} onChange={formik.handleChange} id='email' name='email' placeholder='email' className="px-2 py-2 mt-4 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                <input value={formik.values.newPassword} onChange={formik.handleChange} type='password' id='newPassword' name='newPassword' placeholder='new-password' className="px-2 py-2 mt-4 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                <button type='submit' className='clear w-1/4 mt-4 bg-emerald-500  py-2 text-xl text-black' >Save changes</button>
            </div>
        </form>
    </>
}
