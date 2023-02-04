import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { useState } from 'react';

export default function AuthorizedUser() {
    const { currentUser } = useAuth();
    const [ user , setUser ] = useState(()=>{
      return currentUser
    });
    
  return (
    <div>
      {user !== null ? <Dashboard userProfile={user} /> : <Navigate to="/" />}
    </div>
  )
}
