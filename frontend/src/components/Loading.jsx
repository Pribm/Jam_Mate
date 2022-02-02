import { Modal, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import bandPlaying from '../assets/svgs/Animations/metronome.json'
import { Player } from '@lottiefiles/react-lottie-player';

import React from 'react'

export default function Loading(props) {

    const state = useSelector(state => state.LoadingReducer)

    return (
        <Modal
            open={state.open}
            className='d-flex align-items-center justify-content-center'
        >
            <div className='bg-white d-flex align-items-center rounded-3 outline-none py-2 px-3' id='loader-badge'>
                    <div className='d-flex justify-content-center align-items-center' style={{width: '50px',height: '50px', overflow: 'hidden'}}>
                        <Player
                            src={bandPlaying}
                            autoplay
                            loop
                            speed={1}
                            style={{width: '100px', marginRight: '15px'}}
                        />
                    </div>
                <Typography className='me-4'>{state.msg}</Typography>
            </div>
        </Modal>
    )
}
