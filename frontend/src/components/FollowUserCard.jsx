import { Avatar, Fab, Paper } from '@mui/material';
import React from 'react';
import { RiUserFollowFill } from 'react-icons/ri';
import { thumbnailUrl } from '../config/App';

export default function FollowUserCard({userData}) {
  return (
    <Paper className='bg-dark mb-3 p-4' elevation={6}>
        <div className="d-flex align-items-center">
            <Avatar src={userData.profile_image && thumbnailUrl(userData)} sx={{width: '3em', height: '3em'}}>
                {!userData.profile_image && userData.name[0]}
            </Avatar>
            <div className="d-flex flex-column align-items-end ms-auto">
                <h3 className='text-white'>{userData.name}</h3>
                <h5 className='text-gray'>{userData.country.name}</h5>
            </div>
            <Fab size='small' className='ms-4' color={'primary'}>
                <RiUserFollowFill/>
            </Fab>
        </div>
    </Paper>
  )
}
