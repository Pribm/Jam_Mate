import React from 'react'
import {CgProfile, CgFeed} from 'react-icons/cg'
import {RiShutDownLine} from 'react-icons/ri'
import { Avatar, Button, TextField} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import './MainNavbar.css'

import { useSelector, useDispatch } from 'react-redux'

import {logout} from '../../store/Actions/Auth.actions'

import { loadUserData, show } from '../../store/Actions/User.action'
import { thumbnailUrl } from '../../config/App'
import NavbarIcon from './NavbarIcon'
import { FaGuitar, FaSearch } from 'react-icons/fa'
import { HttpAuth } from '../../config/Http'
import { useLocation } from 'react-router-dom'


const SearchResults = props => (
    <div className="bg-white"
        style={{
            position: 'absolute',
            top: '50px',
            zIndex: '25',
            width: '98%',
            boxShadow: '2px 2px 2px 2px rgba(0,0,0,.3)',
            borderRadius: '5px'
        }}>
        {
            (Object.keys(props.searchList).length !== 0) &&
            props.searchList.data ?
            props.searchList.data.map((user, key, array) => (
                <React.Fragment key={key}>
                <div
                className='d-flex align-items-center searchBoxResults py-4 px-2'
                >
                    <div className='me-auto'>{user.name}</div>
                    <Button className='mx-2' variant='contained'>Bands</Button>
                    <Button className='mx-2' variant='contained'>Profile</Button>
                </div>
                {
                (key < array.length-1) && <hr className='m-0'/>
                }
                </React.Fragment>
            ))
            :
            <div>
                No users found!
            </div>
        }
    </div>
)


export default function MainNavbar({children, ...props}) {

    const user = useSelector(state => state.UserReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const [isLoading, setLoading] = React.useState(true)
    const [isLoadingMore, setLoadingMore] = React.useState(false)

    const [searchBox, setSearchBox] = React.useState('')
    const [boxFocused, setBoxFocused] = React.useState(false)
    const [searching, setSearching] = React.useState(false)
    const [searchList, setSearchList] = React.useState({})
    const [timer, setTimer] = React.useState(null)

    React.useEffect(() => {
        dispatch(loadUserData()).then(() => setLoading(false))
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

    React.useEffect(() => {
        if(searching){
            HttpAuth.get('network/seach-user?'+new URLSearchParams({searchBox})).then(res => {
                if(typeof res !== 'undefined'){
                    if(res.status === 200){
                        setSearchList(res.data)
                        setSearching(false)
                    }
                }
            })
            .catch(error => {
                setSearching(false)
                console.log(error)
            })
        }

        searchBox.length === 0 && setSearchList({})
    }, [searching])

    React.useEffect(() => {
        setSearchBox('')
    }, [location])

    const scrollTrigger = e => {
        if(e.target.scrollTop  === (e.target.scrollHeight - e.target.offsetHeight)){
            setLoadingMore(true)
        }
    }

    const handleSearch = e => {
        setSearchBox(e.target.value)

        clearTimeout(timer)
    
        const newTimer = setTimeout(() => {
          setSearching(true)
        }, 500)
    
        setTimer(newTimer)
    }

    return ( 
        <>
            {!isLoading && 
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
                        <div className="container">
                            <div className="row align-items-center ms-5">
                                <div className="col-md-12 position-relative">
                                    <TextField
                                    type={'text'}
                                    autoComplete='off'
                                    onFocus={() => setBoxFocused(true)}
                                    onBlur={() => setBoxFocused(false)}
                                    value={searchBox}
                                    onChange={handleSearch}
                                    InputProps={{
                                        endAdornment: <FaSearch/>,
                                    }}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'white',
                                        },
                                        '& input': {
                                            color: 'white',
                                        },
                                        '& .Mui-focused':{
                                            color: 'white',
                                        },
                                        '& svg': {
                                            color: 'white',
                                        }
                                    }}
                                    label={'Search users'}
                                    size='small'
                                    />
                                    
                                    {
                                        (Object.keys(searchList).length > 0 && boxFocused) &&
                                        <SearchResults searchList={searchList}/>
                                    }
                                </div>
                                
                            </div>
                        </div>
                        <div className="me-4">
                            <img
                            src={process.env.REACT_APP_PUBLIC_URL+"/img/JAM_MATE.png"}
                            alt="jam_mate_logo"
                            height={'40px'} />
                        </div>
                    </div>
                    <div
                    onScroll={scrollTrigger}
                    className='navigation-content bg-dark-gradient scroll-y'
                    style={{height: 'calc(100vh - 60px)'}}>
                        <Outlet context={[isLoadingMore, setLoadingMore]}/>
                    </div>
                </div>
            </div>
            }
        </>
        

    )
}
