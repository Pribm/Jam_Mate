import React from 'react'

import {AppBar, Container, Toolbar, Avatar, Tooltip , IconButton, Typography } from '@mui/material'


export default function NavBar() {

    const userData = JSON.parse(localStorage.getItem('user_profile_data'))

    return (
        <AppBar position='static' color=''>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={'div'}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img src="img/jamate_icon.png" height={40} alt="" />
                    </Typography>

                    <Tooltip title='account settings'>
                        <IconButton className='ms-auto text-capitalize'
                            onClick={() => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('user_profile_data')
                            window.location.href = '/'
                            return false
                        }}>

                            <Avatar alt={(userData.name) ? userData.name : ''} src={(userData.thumbnail) ? userData.thumbnail : ''}>
                                {(!userData.thumbnail) && userData.name[0]}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
