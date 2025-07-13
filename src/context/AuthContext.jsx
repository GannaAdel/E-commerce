import { createContext, useEffect, useState } from "react";
import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export let authContext = createContext(0)




export default function AuthContextProvider(props) {
    let [token, setToken] = useState(localStorage.getItem('token'))

    async function verifyToken() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
                {
                    headers:
                    {
                        token: localStorage.getItem('token')
                    }

                })
            console.log(data);

        } catch (error) {
            console.log(error.response.data.message);
            setToken(null)
            localStorage.removeItem('token')

        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    return (
        <div>
            < authContext.Provider value={{ token, setToken }}>
                {props.children}
            </authContext.Provider>
        </div>
    )
}
