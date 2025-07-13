import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes({children}) {
    
  return (
    <div>
   { localStorage.getItem('token')? children :<Navigate to={'/login'} />}
 </div>
  )
}
