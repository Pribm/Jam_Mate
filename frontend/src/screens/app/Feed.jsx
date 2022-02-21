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
    const followable_users = useSelector(state => state.FollowsReducer.usersCanBefollowed.data)
    const dispatch = useDispatch()

    const [isLoading, setLoading] = React.useState(true)

    const postField = React.useRef(null)

    React.useEffect(() => {
        dispatch(index()).then(res => setLoading(false))
        dispatch(followsIndex())
    }, [])

    return (
        <>
            <div
            className="container-fluid scroll-y"
            style={{height: 'calc(95vh)'}}
            onScroll={() => {
                if(postField.current.scrollTop >= (postField.current.scrollHeight-500)){
                    console.log('carrega mais')
                }
            }}
            ref={postField}
            >
                <div className="container">
                <div className="row">
                    <div className='col-md-7'>
                        <div className="mt-4">
                            <InputboxPost/>
                        </div>
                        
                        {(isLoading) ? 
                            <div className="d-flex justify-content-center mt-4">
                                <CircularProgress/>
                            </div>
                            :
                            (posts.length === 0) ?
                            <Paper className="d-flex justify-content-center mt-4 py-4">
                                <div className="d-flex flex-column align-items-center">
                                    <Typography variant='h6'>
                                        You Have no posts to show
                                    </Typography>
                                    <img src="img/blog.png" alt="empty_posts" width={'120px'}/>
                                </div>
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
            </div>
        </>
    )
}
