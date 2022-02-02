import React from 'react'

import { CircularProgress, Paper, Typography } from '@mui/material'

import InputboxPost from '../../components/InputboxPost'
import Post from '../../components/Post'

import { useDispatch, useSelector } from 'react-redux'
import { index } from '../../store/Actions/Post.action'
import { followsIndex }  from '../../store/Actions/Follows.action'
import FollowUserCard from '../../components/FollowUserCard'

export default function Feed() {

    const posts = useSelector(state => state.PostReducer.posts)
    const user_id = useSelector(state => state.UserReducer.user.country_id)
    const followable_users = useSelector(state => state.FollowsReducer.usersCanBefollowed.data)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(index())
        dispatch(followsIndex({country_id: user_id}))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className='col-md-7'>
                        <div className="mt-4">
                            <InputboxPost/>
                        </div>
                        {
                            (posts.length === 0) ?
                            <Paper className="d-flex justify-content-center mt-4 py-4">
                                <CircularProgress/>
                            </Paper>
                            :
                            posts.map((post, index) => (
                               post.status !== 0 &&
                                <React.Fragment key={index}>
                                    <div className="mt-4">
                                        <Post data={post} />
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>

                    <div className="col-md-5 mt-4">
                        <Typography variant='h6' className='text-end mb-4 text-white'>
                            Users in the same country
                        </Typography>
                        {
                            followable_users &&
                            followable_users.map((user, index) => (
                                <React.Fragment key={index}>
                                    <FollowUserCard userData={user}/>
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
