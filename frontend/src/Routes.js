import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';

import React from 'react';

import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './screens/app/Home';
import Profile from './screens/app/Profile/EditProfile'
import Feed from './screens/app/Feed';
import UserProfile from './screens/app/Profile/UserProfile';
import CreateBand from './screens/app/Bands/CreateBand';

const routes = (props) => {

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

                    <Route path='/band'>
                        <Route path='create' element={<CreateBand/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default routes
