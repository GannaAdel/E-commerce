import { createContext, useState, useEffect } from "react";
import React from 'react'
import axios from "axios";

export let WishlistContext = createContext({})



export default function WishlistContextProvider({ children }) {
    // let [wishlist , setWishlist] =useState(0)
    let [wishlistId, setWishlistId] = useState(0)
    let [wishlistProducts, setWishlistProducts] = useState([])

    let headers = { token: localStorage.getItem('token') }
    let token = localStorage.getItem('token')

    async function addToWishlist(prodId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId: prodId },
                { headers }
            )
            getUserWishlist()
            return data.data
        } catch (error) {
            return error.response.data.message
        }
    }


    async function getUserWishlist() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers }
            )
            setWishlistId(data.wishlistId);
            setWishlistProducts(data?.data);
            console.log(data);

        } catch (error) {
            console.log(error.response.data.message);

        }
    }

    async function deleteItemFromWishlist(prodId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
                {
                    headers
                }
            )
            setWishlistId(data._id);
            setWishlistProducts(data.data);
            console.log(data.data);
            await getUserWishlist()
            return data;

        } catch (error) {
            return error?.response?.data.message;
        }

    }



    useEffect(() => {
        if (token) {
            getUserWishlist()

        }
    }, [token])

    return <>
        <WishlistContext.Provider value={{ addToWishlist, getUserWishlist, deleteItemFromWishlist, wishlistId, wishlistProducts }}>
            {children}
        </WishlistContext.Provider>
    </>
}
