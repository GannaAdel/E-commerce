import React, { useContext ,useState} from 'react'
import logo from '../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext.jsx';
import { cartContext } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function Navbar() {
  let { numOfCartItems} = useContext(cartContext)
  const { token, setToken } = useContext(authContext)
  const [menuOpen, setMenuOpen] = useState(false)
  
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
 
    navigate('/login')

  }
  return <>
   <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-30 shadow-md">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-8" />
        </div>

 
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none text-2xl"
          >
            <i className="fa fa-bars"></i>
          </button>
        </div>

     
        <div className={`flex-col md:flex-row md:flex  items-center gap-4 md:gap-6 bg-gray-100 md:bg-transparent w-full md:w-auto absolute md:static top-16 left-0 px-4 md:px-0 pb-4 md:pb-0 ${menuOpen ? 'flex justify-between' : 'hidden'}`}>
          {token && (
            <div className='flex flex-col md:flex-row gap-6 lg:mr-64'>
              <NavLink to="/" className="active text-gray-700 font-medium hover:text-emerald-600">Home</NavLink>
              <NavLink to="/cart" className="active text-gray-700 font-medium hover:text-emerald-600">Cart</NavLink>
              <NavLink to="/products" className="active text-gray-700 font-medium hover:text-emerald-600">Products</NavLink>
              <NavLink to="/categories" className="active text-gray-700 font-medium hover:text-emerald-600">Categories</NavLink>
              <NavLink to="/brand" className="active text-gray-700 font-medium hover:text-emerald-600">Brands</NavLink>
              <NavLink to="/wishlist" className="active text-gray-700 font-medium hover:text-emerald-600">Wishlist</NavLink>
            </div>
          )}

          <div className="flex items-center gap-4">
           
            <Link to="/cart" className="relative">
              <i className="fa fa-shopping-cart text-xl text-gray-700"></i>
              <span className="absolute -top-2 -left-2 bg-green-100 text-green-800 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {numOfCartItems}
              </span>
            </Link>

          
            {token === null ? (
              <>
                <NavLink to="/login" className="text-gray-600 font-medium hover:text-emerald-600">Login</NavLink>
                <NavLink to="/register" className="text-gray-600 font-medium hover:text-emerald-600">Register</NavLink>
              </>
            ) : (
              <button onClick={logout} className="text-gray-600 font-medium hover:text-red-500">Log out</button>
            )}
          </div>
        </div>
      </div>
    </nav>

  </>
}
