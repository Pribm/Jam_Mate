import { Button, Typography } from '@mui/material'
import React from 'react'

import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigator = useNavigate()
    return (
        <div className="d-flex flex-column" style={{height: 'calc(100vh - 60px)'}}>
            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center" style={{background: `url('${process.env.REACT_APP_PUBLIC_URL}/img/home_photo.jpg') no-repeat center center`, backgroundSize: '100% auto'}}>
                <Typography variant='h2' className='text-white'>
                What are you looking for?
                </Typography>
                <Typography variant='subtitle1' className='text-white'>
                Select the category that best fits your interests
                </Typography>
                <div className="d-flex col-md-6 mt-2">
                    <Button variant='contained' className='flex-grow-1 me-4' onClick={() => navigator('/feed', {replace: true})}>
                    A member for my band
                    </Button>

                    <Button variant='contained' className='flex-grow-1'>
                        find a band
                    </Button>

                    <Button variant='contained' className='flex-grow-1 ms-4'>
                    A freelance musician
                    </Button>
                </div>
            </div>
        </div>
    )
}
