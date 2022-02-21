import { Avatar, Chip, Divider, Paper } from '@mui/material';
import React from 'react';
import { thumbnailUrl } from '../../../config/App';

import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md';
import { CgBrowser } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../../components/Post';

import { show, store, unfollow } from '../../../store/Actions/Follows.action'


export default function UserProfile() {    

    const dispatch = useDispatch()

    const currentUserId = useSelector(state => state.UserReducer.user.id)
    const {posts, ...user} = useSelector(state => state.UserReducer.selectedUser)
    const isFollowing = (Object.keys(useSelector(state => state.FollowsReducer.currentFollower)).length !== 0) ? true : false

    React.useEffect(() => {
        dispatch(show(user.id))
    }, [])

  return (
      <div className="container mt-4">
          <Paper className='bg-dark p-4 mb-4' elevation={6} style={{marginTop: '10%'}}>
              <div className="row align-items-center" style={{marginTop: '-8%'}}>
                  <div className="col-md-4 order-2 order-md-1 d-flex flex-column mt-md-5 align-items-center mt-2">
                      {
                          (currentUserId !== user.id) &&
                          <>
                            <Chip label='Invite for your band' className='active my-2' style={{ width: '50%' }} />
                            {
                                !isFollowing ?
                                <Chip
                                label='Follow'
                                className='active my-2'
                                style={{ width: '50%' }}
                                onClick={() => {
                                    dispatch(store(user)).then(() => dispatch(show(user.id)))
                                }}
                                />
                                :
                                <Chip
                                label='Unfollow'
                                className='active my-2'
                                style={{ width: '50%' }}
                                onClick={() => {
                                    dispatch(unfollow(user.id)).then(() => dispatch(show(user.id)))
                                }}
                                />
                            }
                          </>
                      }
                  </div>

                  <div className="col-md-4 text-center order-1 order-md-2">
                      {
                          user.profile_image ?
                          <img src={thumbnailUrl(user)} alt="user_photo" style={{ borderRadius: '50%', width: '12rem', height: '12rem' }} />
                          :
                          <div className="d-flex justify-content-center">
                              <Avatar sx={{ borderRadius: '50%', width: '12rem', height: '12rem' }}/>
                          </div>
                      }

                      <h3 className='text-white text-capitalize my-2'>{user.name}</h3>
                  </div>

                  <div className="col-md-4 order-3 order-md-3 mt-4">
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center">
                                <AiFillFacebook className='mx-2 facebook-icon-color' size={'2rem'} />
                                <AiFillInstagram className='mx-2 instagram-icon-color' size={'2rem'} />
                                <AiFillYoutube className='mx-2 youtube-icon-color' size={'2.5rem'} />
                            </div>
                            
                            {
                                user.email &&
                                    <div className='text-white mt-1 d-flex align-items-center'>
                                        <MdEmail className='me-2' />
                                        <h6 className='m-0'>
                                            {user.email}
                                        </h6>
                                    </div>
                                    
                            }

                            {
                                user.website_url &&
                                    <div className='text-white mt-1 d-flex align-items-center'>
                                        <CgBrowser className='me-2' />
                                        <h6 className='m-0' style={{ lineHeight: '2em' }}>
                                            {user.website_url}
                                        </h6>
                                    </div>
                            }
                        </div>
                  </div>
              </div>
              
              <div className="d-flex justify-content-center">
                  <h4 className="text-gray">
                      Band Foo |
                  </h4>

                  <h4 className="text-gray">
                      Band Foo |
                  </h4>

                  <h4 className="text-gray">
                      Band Foo |
                  </h4>
              </div>

            {
                user.bio &&
                  <>
                      <Divider className='my-3' sx={{ border: 'solid white 1px' }} />

                      <p className='text-gray h6 text-center'>
                          {user.bio}
                      </p>

                      <Divider className='my-3' sx={{ border: 'solid white 1px' }} />
                  </>
            }

          </Paper>

          {
            posts.map((post, i) => (
                <React.Fragment key={i}>
                    {
                        post.status !== 0 && 
                        <Post data={{...post,user}}/>
                    } 
                </React.Fragment>
            ))
          }
      </div>
  )
}
