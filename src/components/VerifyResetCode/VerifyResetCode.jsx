import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function VerifyResetCode() {

       let navigate= useNavigate()
    async function ResetCode(valu) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                valu
            )
            console.log(valu);
            console.log(data);
            if (data.status === 'Success') {
                console.log('success');
                navigate('/newPass')

            }
        } catch (error) {
            console.log(error);

        }

    }

    let formik = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: ResetCode
    })


    return <>
        <form action="" onSubmit={formik.handleSubmit}>
            <div className='flex-col'>
                <h1 className='text-2xl'>please enter your verification code</h1>
                <input value={formik.values.resetCode} onChange={formik.handleChange} id='resetCode' name='resetCode' placeholder='code' className="px-2 py-2 mt-4 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                <button type='submit' className='clear w-1/4 mt-4 bg-emerald-500  py-2 text-xl text-black' >Verify</button>
            </div>
        </form>

    </>
}