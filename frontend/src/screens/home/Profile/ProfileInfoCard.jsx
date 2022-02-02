import React from 'react';

import {  thumbnailUrl } from '../../../config/App'
import { Paper, Typography, CircularProgress, Avatar, Button } from '@mui/material';
import { MdOutlineAddAPhoto } from 'react-icons/md';

import {useDispatch} from 'react-redux'

import { uploadThumbnail } from '../../../store/Actions/User.action';

export default function ProfileInfoCard({userData, setUserData, userDataGlobal}) {

    const [loadThumbnail, setLoadThumbnail] = React.useState(false)

    const dispatch = useDispatch()

    const handleUpload = e => {
        setLoadThumbnail(true)
        let formData = new FormData()
        formData.append('file', e.target.files[0])

        dispatch(uploadThumbnail(formData)).then(res => {
            setLoadThumbnail(false)
            if(typeof res !== 'undefined'){
                setUserData({...userData, user: {...userData.user, profile_image: res, profile_image_is_custom: 1}})
            }
        })

    }

  return (
    <div className="col-md-4 d-md-block d-none mb-4">
    <Paper elevation={6} className='p-3'>
       <div className="row">
           <div className="col-md-12 text-center">
               <Typography className='my-2'>
                   Profile
               </Typography>
               
               <div className="position-relative">
                    {
                        (userData.user.profile_image) ?
                        <>
                        <img src={thumbnailUrl(userData.user)} className='rounded-full my-2' style={{width: '100px', height: '100px', objectFit: 'cover'}}/>
                        
                        {(loadThumbnail === true) && <CircularProgress sx={{position: 'absolute', top: '50%', right: '50%', translate: '50% -50%'}}/>}
                        </>
                        :
                        <div className="d-flex justify-content-center">
                            <Avatar sx={{width: '100px', height: '100px'}}/>
                        </div>
                        
                    }
               </div>

               <Typography variant='h6' color={'primary'} className='my-2'>
                   {userDataGlobal.user.name}
                </Typography>
           </div>
       </div>
       <div className="mb-4 text-center">
           <Button
           onClick={() => {
               document.querySelector('#imgupload').click()
           }}
           variant='outlined'
           >
               Upload New Photo
               <MdOutlineAddAPhoto className='ms-2'/>
           </Button>
           <input type="file" className='d-none' id='imgupload' onChange={handleUpload}/>
       </div>

       <div className="row justify-content-center my-5">
           <div className="col-md-6">
               <div className="d-flex justify-content-between">
                   <div className="d-flex flex-column align-items-center">
                       <Typography variant='h4'>
                            {userDataGlobal.total_following}
                       </Typography>
                       <Typography variant='h7'>
                            Following
                       </Typography>
                   </div>

                    <div style={{width: '2px', backgroundColor: '#ccc', height: 'inherit'}}></div>

                   <div className="d-flex flex-column align-items-center">
                       <Typography variant='h4'>
                            {userDataGlobal.total_followers}
                       </Typography>
                       <Typography variant='h7'>
                            Followers
                       </Typography>
                   </div>

                   <div style={{width: '2px', backgroundColor: '#ccc', height: 'inherit'}}></div>

                   <div className="d-flex flex-column align-items-center">
                       <Typography variant='h4'>
                            {userDataGlobal.total_posts}
                       </Typography>
                       <Typography variant='h7'>
                            Posts
                       </Typography>
                   </div>
               </div>
           </div>
       </div>

       <div className="row justify-content-center my-4">
            <div className="col-md-6 d-flex flex-column align-items-center" style={{textAlign: 'justify'}}>
                <Typography variant='h5'>
                    Bio
                </Typography>
                
                <Typography variant='p'>
                    {userDataGlobal.user.bio}
                </Typography>
            </div>
       </div>
    </Paper>
</div>
  )
}
