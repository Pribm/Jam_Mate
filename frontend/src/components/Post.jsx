import { Avatar, ButtonBase, Card, CardContent, CardHeader, CardMedia, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { RiProfileLine, RiUserUnfollowLine } from 'react-icons/ri';
import { postThumbnailUrl, URL } from '../config/App';
import { format } from 'date-fns';

import likeButtonAnimation from '../assets/svgs/Animations/like_button.json'
import { Player } from '@lottiefiles/react-lottie-player';

import { destroy } from '../store/Actions/Post.action';

import { useSelector, useDispatch } from 'react-redux';
import { show } from '../store/Actions/User.action';

import { useNavigate } from 'react-router-dom';
import { unfollow } from '../store/Actions/Follows.action';

export default function Post(props) {

    const likeButton = React.useRef(null)

    const dispatch = useDispatch()
    const userData = useSelector(state => state.UserReducer.user)

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const [like, setLike] = React.useState(false)

    const likePost = e => {
        if(!like){
            likeButton.current.setPlayerDirection(1)
        }else{
            likeButton.current.setPlayerDirection(-1)
        }

        likeButton.current.play()
    }

    return (
        <>
            <Card elevation={9} className='p-4 mb-4 bg-dark text-white'>
                <CardHeader
                    avatar={
                        <Avatar alt='name' src={props.data.user.profile_image && postThumbnailUrl({ profile_image: props.data.user.profile_image, user_id: props.data.user.id })}>
                            {props.data.user.name[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            className='bg-black text-white'
                            onClick={e => setAnchorEl(e.currentTarget)}
                            aria-label="settings">
                            <MdMoreVert />
                        </IconButton>
                    }
                    title={props.data.user.name}
                    subheader={format(new Date(props.data.created_at), `MM-dd-yyyy 'at' HH:mm`)}
                    subheaderTypographyProps={{color: '#777'}}
                />

                {props.data.media.length !== 0 &&
                    <CardMedia
                        height='400px'
                        sx={{objectPosition: 'center center', objectFit: 'contain', backgroundColor: 'black'}}
                        component={'img'}
                        image={`${URL.root}thumb/${props.data.user.id}/${props.data.media[0].file_url}?s=media/posts/${props.data.id}`}   
                    />
                }
                
                <CardContent>
                    <Typography>
                        {props.data.post}
                    </Typography>
                </CardContent>

                <div className='d-flex'>
                    <ButtonBase
                    onClick={e => {
                        setLike(!like)
                        likePost(e)
                    }}
                    disableRipple>
                        <Player
                            src={likeButtonAnimation}
                            style={{width: '2rem', height: '2rem'}}
                            ref={likeButton}
                            keepLastFrame
                        />
                    </ButtonBase>
                </div>

            </Card>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                
                {
                    (userData.id === props.data.user.id) ?
                        [<MenuItem key={1} onClick={() => {
                            setAnchorEl(null)
                            dispatch(destroy(props.data.id))
                            }}>
                            <ListItemIcon>
                                <MdDelete />
                            </ListItemIcon>
                            <ListItemText>
                                Delete Post
                            </ListItemText>
                        </MenuItem>
                        ]
                        :
                        [
                            (<MenuItem key={1}
                                onClick={() => {
                                    dispatch(show(props.data.user.id)).then(res => navigate('/show-profile'))
                                }}
                            >
                                <ListItemIcon>
                                    < RiProfileLine />
                                </ListItemIcon>
                                <ListItemText>
                                    See Profile
                                </ListItemText>
                            </MenuItem>),
                            (<MenuItem
                                key={2}
                                onClick={() => {
                                    dispatch(unfollow(props.data.user.id))
                                    setAnchorEl(null)
                                }}
                                >
                                <ListItemIcon>
                                    < RiUserUnfollowLine />
                                </ListItemIcon>
                                <ListItemText>
                                    Unfollow
                                </ListItemText>
                            </MenuItem>)
                        ]
                }
            </Menu>

        </>
    )
}
