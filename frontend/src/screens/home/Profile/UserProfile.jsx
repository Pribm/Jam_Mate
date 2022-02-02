import { Chip, Divider, Paper } from '@mui/material';
import React from 'react';
import {useLocation} from 'react-router-dom'
import { thumbnailUrl } from '../../../config/App';

import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md';
import { CgBrowser } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { index } from '../../../store/Actions/Post.action';
import Post from '../../../components/Post';


export default function UserProfile() {

    const location = useLocation()
    const user = location.state.user;
    const userInstruments = location.state.userInstruments;

    const dispatch = useDispatch()
    const posts = useSelector(state => state.PostReducer.posts)

    React.useEffect(() => {
        dispatch(index({user_id: user.id}))
    }, [])


  return (
      <div className="container mt-4">
          <Paper className='bg-dark p-4 mb-4' elevation={6} style={{marginTop: '10%'}}>
              <div className="row align-items-center" style={{marginTop: '-8%'}}>
                  <div className="col-md-4 order-2 order-md-1 d-flex flex-column mt-md-5 align-items-center mt-2">
                      <Chip label='Invite for your band' className='active my-2' style={{ width: '50%' }} />
                      <Chip label='Follow' className='active my-2' style={{ width: '50%' }} />
                  </div>

                  <div className="col-md-4 text-center order-1 order-md-2">
                      <img src={thumbnailUrl(user)} alt="user_photo" style={{ borderRadius: '50%', width: '60%' }} />
                      <h3 className='text-white my-2'>{user.name}</h3>
                  </div>

                  <div className="col-md-4 order-3 order-md-3">
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center">
                                <AiFillFacebook className='mx-2 facebook-icon-color' size={'2rem'} />
                                <AiFillInstagram className='mx-2 instagram-icon-color' size={'2rem'} />
                                <AiFillYoutube className='mx-2 youtube-icon-color' size={'2.5rem'} />
                            </div>
                            <div className='text-white mt-1 d-flex align-items-center'>
                                <MdEmail className='me-2'/>
                                <h6 className='m-0'>
                                {user.email}
                                </h6>
                            </div>

                            <div className='text-white mt-1 d-flex align-items-center'>
                                <CgBrowser className='me-2'/>
                                <h6 className='m-0' style={{lineHeight: '2em'}}>
                                {user.website_url}
                                </h6>
                            </div>
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

              <Divider className='my-3' sx={{border: 'solid white 1px'}}/>

                <p className='text-gray h6 text-center'>
                    {user.bio}
                </p>

                <Divider className='my-3' sx={{border: 'solid white 1px'}}/>

                <div className='d-flex flex-wrap' style={{height: '150px', marginBottom: '-1.5em', overflowY: 'scroll'}}>
                    {
                        userInstruments.map((instrument, index) => (
                            <React.Fragment key={index}>
                                <Chip variant={'outlined'} className='mb-4 mt-2 mx-4 flex-grow-1' label={instrument.instrument.name}/>
                            </React.Fragment>
                        ))
                    }
                </div>
          </Paper>

          {
              posts.length !== 0 &&
              posts.map((data, index) => (
                  <React.Fragment key={index}>
                    <Post data={data}/>
                  </React.Fragment>
              ))
          }

      </div>
  )
}
