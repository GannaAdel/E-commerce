import { createContext, useEffect, useState } from "react";
import React from 'react'
import axios from "axios";

export let cartContext = createContext(0)

export default function CartContextProvider(props) {

    let [numOfCartItems, setNumOfCartItems] = useState(null)
    let [cartId, setCartId] = useState(null)
    let [totalCartPrice, setTotalCartPrice] = useState(null)
    let [products, setProducts] = useState(null)


    let tokenCart = localStorage.getItem('token')
    let headers = { token: localStorage.getItem('token') }

    async function addToCart(prodId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: prodId },
                { headers }
            )
            
            getUserCart()
            // toast.success('Item added to cart')
            return data
        } catch (error) {
            return error
        }
    }

    async function getUserCart() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                { headers }
            )
            setNumOfCartItems(data?.numOfCartItems);
            setCartId(data?.cartId);
            setTotalCartPrice(data?.data?.totalCartPrice);
            setProducts(data?.data?.products);
            console.log(data);

        } catch (error) {
            console.log(error.response.data.message);

        }
    }

    async function updateCart(prodId, prodCount) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
                {
                    count: prodCount
                },
                {
                    headers
                }
            )
            setNumOfCartItems(data?.numOfCartItems);
            setCartId(data?.cartId);
            setTotalCartPrice(data?.data?.totalCartPrice);
            setProducts(data?.data?.products);
            return data;
        } catch (error) {
            return error.response.data.message;
        }

    }

    async function deleteItemFromCart(prodId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
                {
                    headers
                }
            )
            setNumOfCartItems(data?.numOfCartItems);
            setCartId(data?.cartId);
            setTotalCartPrice(data?.data?.totalCartPrice);
            setProducts(data?.data?.products);
            return data;

        } catch (error) {
            return error?.response?.data.message;
        }

    }

    async function clearCart() {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                }
            )
            setNumOfCartItems(data?.numOfCartItems);
            setCartId(data?.cartId);
            setTotalCartPrice(data?.data?.totalCartPrice);
            setProducts(data?.data?.products);
            return data;

        } catch (error) {
            return error?.response?.data.message;
        }

    }



    useEffect(() => {
        if (tokenCart) {
            getUserCart()

        }
    }, [tokenCart])

    return <>
        <cartContext.Provider value={{ addToCart, updateCart, getUserCart ,deleteItemFromCart, clearCart, numOfCartItems, cartId, totalCartPrice, products, tokenCart }}>
            {props.children}

        </cartContext.Provider>
    </>
}
