import { useState } from 'react'
import Navbar from './Navbar/Navbar'
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Brand from './components/Brand/Brand'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layer from './components/Layer/Layer'
import Notfound from './components/Notfound/Notfound'

import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
// import { AuthContextProvider } from './context/AuthContext'
import AuthContextProvider from './context/AuthContext'
// import toast from 'react-hot-toast';
import CartContextProvider from './context/CartContext';
import CategoryContextProvider from './context/categoryContext';
import WishlistContextProvider from './context/wishlistContext';
import Wishlist from './Wishlist/Wishlist';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Payment from './components/Payment/Payment';
import ForgetPass from './components/ForgetPassword/ForgetPass';
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode';
import NewPassword from './components/NewPassword/NewPassword';
import AllOrders from './components/AllOrders/AllOrders';
import { Toaster } from 'react-hot-toast';

let queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)
  const route = createBrowserRouter([
    {
      path: "", element: <Layer />, children: [

        {
          index: true, element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        {
          path: 'cart', element: <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        },
        {
          path: 'categories', element: <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        }, ,
        {
          path: 'products', element: <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        },
        {
          path: 'productDetails/:id/:category', element: <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        },
        {
          path: 'brand', element: <ProtectedRoutes>
            <Brand />
          </ProtectedRoutes>
        },
        {
          path: 'wishlist', element: <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        },
        {
          path: 'payment', element: <ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>
        },
        {
          path: 'forgetPass', element:
            <ForgetPass />
         
        },
         { path: 'verifyResetCode', element:
            <VerifyResetCode />
         
        },
         { path: 'newPass', element:
            <NewPassword />
         
        },
         { path: 'allorders', element:
            <AllOrders />
         
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> }

      ]
    }
  ])
  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />
    <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <WishlistContextProvider>
          <CategoryContextProvider>
        <AuthContextProvider>
          <RouterProvider router={route}>
           
          </RouterProvider>
        </AuthContextProvider>
        </CategoryContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </QueryClientProvider>


    </>
  )
}

export default App
