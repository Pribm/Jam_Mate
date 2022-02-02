import React from 'react'
import {CgProfile, CgFeed} from 'react-icons/cg'
import {RiShutDownLine} from 'react-icons/ri'
import { Avatar} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './MainNavbar.css'

import { useSelector, useDispatch } from 'react-redux'

import {logout} from '../../store/Actions/Auth.actions'

import { loadUserData } from '../../store/Actions/User.action'
import { thumbnailUrl } from '../../config/App'


export default function MainNavbar({children}) {

    const user = useSelector(state => state.UserReducer.user)
    const userInstruments = useSelector(state => state.UserReducer.instruments)
    
    const dispatch = useDispatch()

    const [headerTitle, setHeaderTitle] = React.useState('')

    const navigation = useNavigate()

    React.useEffect(() => {
        dispatch(loadUserData())
    }, [])

    React.useEffect(() => {
        const buttons = document.querySelectorAll('.navbar-icon')

        function materializeEffect(event) {
            const circle = document.createElement('div')
            const x = event.layerX
            const y = event.layerY
            circle.classList.add('circle')
            circle.style.left = `${x}px`
            circle.style.top = `${y}px`
            this.appendChild(circle)
        }

        buttons.forEach(button => button.addEventListener('click', materializeEffect))
    })

    const setSelected = (e) => {
        document.querySelectorAll('.navbar-icon').forEach(node => node.classList.remove('active'))
        e.currentTarget.classList.add('active')
        setHeaderTitle(e.currentTarget.innerText)
    }

    return (
        
        <>
            {Object.keys(user).length !== 0 && 
            <div className="navbar-overall-container">
                <div className="vertical-navbar bg-primary text-white">
                    <div className="logo-container mb-2 cursor-pointer" onClick={() => navigation('/show-profile', {replace: true, state: {user, userInstruments}})}>
                        {
                            (user.profile_image) ?
                            <div className='d-flex flex-column align-items-center text-center image-avatar'>
                                <img src={thumbnailUrl(user)} alt="profile_image" style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
                                <p className='d-none profile-name'>{user.name}</p>
                            </div>
                            :
                            <Avatar className='me-4 ms-2 text-uppercase' >
                                {user.name[0]}
                            </Avatar>
                        }
                    </div>
                    <div className="navbar-icon"
                        onClick={(e) => {
                            setSelected(e)
                            
                            navigation('/feed', {replace: true})
                        }}
                    >
                        <CgFeed size={35}/>
                        <span className='ms-2'>Feed</span>
                        <div className='markup'></div>
                    </div>

                    <div className="navbar-icon"
                        onClick={(e) => {
                            setSelected(e)
                            navigation('/profile', {replace: true})
                        }}
                    >
                        <CgProfile size={35}/>
                        <span className='ms-2'>Edit User Profile</span>
                        <div className='markup'></div>
                    </div>


                    <div className="navbar-icon"
                        onClick={() => logout()}
                    >
                        <RiShutDownLine size={30}/>
                        <span className='ms-2'>Logout</span>
                        <div className='markup'></div>
                    </div>
                </div>
                <div className="horizontal-navbar-container">
                    <div className='horizontal-navbar-header bg-dark d-none d-md-flex'>
                        <div className='ms-auto me-4'>
                            <img src="img/JAM_MATE.png" alt="jam_mate_logo" height={'40px'} />
                        </div>
                    </div>
                    <div className='navigation-content scroll-y bg-dark-gradient'>
                        {children}
                    </div>
                </div>
            </div>
            }
        </>
        

    )
}
