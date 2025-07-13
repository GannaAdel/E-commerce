import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function AllOrders() {
    let [orders, setOrders] = useState([])
    console.log( orders);
    
    const headers = { token: localStorage.getItem('token') }
    async function getAllOrders() {
        try {
            let { data } = await axios('https://ecommerce.routemisr.com/api/v1/orders/',
                { headers }
            )
            console.log(data.data);
            setOrders(data.data)

        } catch (error) {
            console.log(error.response.data.message);

        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])
    return <>
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
 {orders.length === 0 ? (
        <h2 className="text-xl text-gray-600">You don't have any orders yet.</h2>
      ) : 

            orders?.map((order) => (
                <div key={order._id}
                    className="bg-white rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <div className=" mb-4">
                        <h2 className="text-xl font-semibold text-emerald-600">Order #{order._id}</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm mb-4">
                        <div>
                            <span className=' font-bold' >City:</span > {order?.shippingAddress?.city}
                        </div>
                        <div>
                            <span className=' font-bold' >Details:</span > {order.shippingAddress?.details}
                        </div>
                        <div>
                            <span className=' font-bold' >Phone:</span > {order.shippingAddress?.phone}
                        </div>
                        <div>
                            <span className=' font-bold' >Total Price:</span > {order.totalOrderPrice} EGP
                        </div>
                        <div>
                            <span className=' font-bold' >Payment Method:</span > {order.paymentMethodType}
                        </div>

                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Products:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {order.cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="border rounded-lg p-3 flex items-center gap-4 bg-gray-50">
                               
                                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h4 className="text-sm font-medium">{item.product.title}</h4>
                                        <p className="text-xs text-emerald-500">Count: {item.count}</p>
                                        <p className="text-sm font-semibold">{item.price} EGP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    </>
}
