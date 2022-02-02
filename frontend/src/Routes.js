import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';

import React from 'react';

import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './screens/home/Home';
import Profile from './screens/home/Profile/EditProfile'
import Feed from './screens/home/Feed';
import UserProfile from './screens/home/Profile/UserProfile';

export default () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='*' element={<Login />} /> {/* Make a not found route */}
                <Route  element={<ProtectedRoutes/>}>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/show-profile' element={<UserProfile/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
