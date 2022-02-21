import { Avatar, Fab, Paper } from '@mui/material';
import React from 'react';
import { RiUserFollowFill } from 'react-icons/ri';
import { thumbnailUrl } from '../config/App';
import { useDispatch } from 'react-redux';
import { followsIndex, store } from '../store/Actions/Follows.action';
import { show } from '../store/Actions/User.action';
import { useNavigate } from 'react-router-dom';

export default function FollowUserCard({userData}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <Paper className='bg-dark mb-3 p-4' elevation={6}>
        <div className="d-flex align-items-center">
            <Avatar
            className='cursor-pointer text-uppercase'
            onClick={() => dispatch(show(userData.id)).then(res => navigate('/show-profile'))}
            src={userData.profile_image && thumbnailUrl(userData)} sx={{width: '3em', height: '3em'}}
            >
                {!userData.profile_image && userData.name[0]}
            </Avatar>
            <div className="d-flex flex-column align-items-end ms-auto">
                <h3 className='text-white'>{userData.name}</h3>
                
            </div>
            <Fab
            onClick={() => {
                dispatch(store(userData)).then(() => dispatch(followsIndex()))
            }}
            size='small'
            className='ms-4'
            color={'primary'} >
                <RiUserFollowFill/>
            </Fab>
        </div>
    </Paper>
  )
}
