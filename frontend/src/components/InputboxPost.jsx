import { ButtonBase,InputBase, Paper, CircularProgress } from '@mui/material';
import React from 'react';

import 'react-h5-audio-player/lib/styles.css';

import {useDispatch, useSelector} from 'react-redux'

import { store, changePost, update } from '../store/Actions/Post.action';
import { HttpAuth } from '../config/Http';
import { MdMusicNote, MdPhoto, MdSend } from 'react-icons/md';

export default function InputboxPost() {

  const dispatch = useDispatch()
  const data = useSelector(state => state.PostReducer.post)


  const [tempUploadThumbnail, setTempUploadThumnail] = React.useState(null)
  const [progress, setprogress] = React.useState(null)

  const [updating, setUpdating] = React.useState(false)

  React.useEffect(() => {
    dispatch(store())
  }, [])

  const songButton = React.useRef(null)

  const addSong = e => {
    songButton.current.play()
  }

  const handleUpload = e => {
    let post = new FormData()
    post.append('file', e.target.files[0])
    post.append('post_id', data.id);

    setTempUploadThumnail(URL.createObjectURL(e.target.files[0]))

    HttpAuth.post('media', post, {
      onUploadProgress: e => {
        setprogress(Math.round((e.loaded * 100) / e.total))
      }
    }).then(res => {
      setprogress(null)
    })
  }

  const sendPost = e => {
    setUpdating(true)
    dispatch(update(data)).then(res => {
      setUpdating(false)
      setTempUploadThumnail(null)
    })
    
  }

  return (
    <Paper className='bg-dark position-relative overflow-hidden px-2 pt-2' elevation={6}>
      <InputBase
        fullWidth
        multiline
        className={'p-4 bg-white'}
        minRows={5}
        maxRows={5}
        placeholder='Share your musical ideas with us'
        value={data.post || ''}
        onChange={text => dispatch(changePost({...data, post: text.target.value}))}
      >
      </InputBase>
      {
        updating &&
        <div className='d-flex justify-content-center align-items-center pb-4' style={{position: 'absolute', top: '0', width: '100%', height: '100%'}}>
          <CircularProgress/>
        </div>
      }
      {
        tempUploadThumbnail &&
        <div className='ms-4' style={{width: '120px', height: '120px', position: 'relative'}}>
          <CircularProgress size={'50px'} variant='determinate' value={progress} sx={{position: 'absolute', bottom: 'calc(50% - 25px)', right: 'calc(50% - 25px)'}}/>
          <img className='mt-2' src={tempUploadThumbnail} style={{width: '120px', height: '120px', objectFit: 'cover'}}/>
        </div>
      }
      <div className="d-flex align-items-center">

        <ButtonBase
          style={{ width: '4rem', height: '4rem', overflow: 'hidden' }}
          disableRipple
          onClick={addSong}>
          <MdMusicNote size={'1.6em'} className='bg-white rounded-1'/>
        </ButtonBase>

        <ButtonBase
          disableRipple
          style={{ width: '4rem', height: '4rem', overflow: 'hidden' }}
          onClick={() => {
            document.getElementById('upload_photo').click()
          }}>
          <MdPhoto size={'2em'} className='text-white cursor-pointer'/>
          <input type="file" id="upload_photo" className='d-none' onChange={handleUpload} />
        </ButtonBase>


        <ButtonBase
          style={{ width: '4rem', height: '4rem', overflow: 'hidden' }}
          disableRipple
          className='ms-auto me-2'
          onClick={sendPost}>
          <MdSend className='text-white' size={'1.8em'}/>
        </ButtonBase>
      </div>
    </Paper>
  )
}
