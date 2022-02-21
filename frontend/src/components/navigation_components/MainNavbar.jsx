import React from 'react'
import {CgProfile, CgFeed} from 'react-icons/cg'
import {RiShutDownLine} from 'react-icons/ri'
import { Avatar} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './MainNavbar.css'

import { useSelector, useDispatch } from 'react-redux'

import {logout} from '../../store/Actions/Auth.actions'

import { loadUserData, show } from '../../store/Actions/User.action'
import { thumbnailUrl } from '../../config/App'
import NavbarIcon from './NavbarIcon'
import { FaGuitar } from 'react-icons/fa'


export default function MainNavbar({children, ...props}) {

    const user = useSelector(state => state.UserReducer.user)
    
    const dispatch = useDispatch()

    const [headerTitle, setHeaderTitle] = React.useState('')

    const navigate = useNavigate()

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
                    <div className="logo-container mb-2 cursor-pointer" onClick={() => dispatch(show(user.id)).then(res => navigate('/show-profile'))}>
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

                    <NavbarIcon
                        icon={<CgFeed size={35}/>}
                        label={'Feed'}
                        route={'/feed'}
                    />


                    <NavbarIcon
                        icon={<CgProfile size={35}/>}
                        label={'Edit User Profile'}
                        route={'/profile'}
                    />

                    
                    <NavbarIcon
                        icon={<FaGuitar size={35}/>}
                        label={'Manage Bands'}
                        route={'/band/create'}
                    />


                    <NavbarIcon
                        icon={<RiShutDownLine size={30}/>}
                        label={'Logout'}
                        action={() => logout()}
                    />

                    

                </div>
                <div className="horizontal-navbar-container">
                    <div className='horizontal-navbar-header bg-dark d-none d-md-flex'>
                        <div className='ms-auto me-4'>
                            <img src="/img/JAM_MATE.png" alt="jam_mate_logo" height={'40px'} />
                        </div>
                    </div>
                    <div className='navigation-content bg-dark-gradient' style={{height: 'calc(100vh - 60px)'}}>
                        {children}
                    </div>
                </div>
            </div>
            }
        </>
        

    )
}
