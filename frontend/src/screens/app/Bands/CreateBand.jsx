import { Button, CircularProgress, Divider, Paper, TextField } from '@mui/material'
import React from 'react'
import { FaTools } from 'react-icons/fa'
import { MdImage, MdMap, MdPortrait, MdSave } from 'react-icons/md'
import GenresSelection from '../Bands/GenresSelection'
import { useDispatch } from 'react-redux'
import { index as fetchGenres } from '../../../store/Actions/Genres.action'
import { useSelector } from 'react-redux'
import { change, getBandImage, index, store, uploadImage } from '../../../store/Actions/Band.action'
import BandCard from './BandCard'

export default function CreateBand() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.UserReducer.user)
    const band = useSelector(state => state.BandReducer.band)
    const errors = useSelector(state => state.BandReducer.errors)
    const bandList = useSelector(state => state.BandReducer.bands)

    React.useEffect(() => {
        dispatch(store())
        dispatch(index())
        dispatch(fetchGenres())

        return () => dispatch(change('clear'))
    }, [])

    const uploadFile = (e,imageType) => {
        const file = new FormData()
        file.append(imageType, e.target.files[0])
        dispatch(uploadImage(file, imageType, band.id))
    } 

    const handleSave = () => {
        dispatch(store(band)).then(res => console.log(res))
    }

  return (
    <div className='container mt-4 mb-4'>
        <div className="row">
            <div className="col-md-8">
                <Paper className='p-3'>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField
                            value={band.name || ''}
                            onChange={text => {
                                errors.name && delete errors.name
                                dispatch(change({name: text.target.value}))
                            }}
                            placeholder='Name'
                            label={'Name'}/>
                            {errors.name && <strong className='text-danger'>{errors.name}</strong>}
                        </div>
                        <div className="col-md-6">
                            <TextField
                            value={band.email || ''}
                            onChange={text => {
                                errors.email && delete errors.email
                                dispatch(change({email: text.target.value}))
                            }}
                            type='email'
                            placeholder='Email'
                            label={'Email'}/>
                            {errors.email && <strong className='text-danger'>{errors.email}</strong>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <TextField
                                value={band.facebookUrl || ''}
                                onChange={text => dispatch(change({facebookUrl: text.target.value}))}
                                type={'text'}
                                label='Facebook URL'
                                placeholder='Facebook URL'
                            />
                        </div>

                        <div className="col-md-4">
                            <TextField
                                value={band.instagramUrl || ''}
                                onChange={text => dispatch(change({instagramUrl: text.target.value}))}
                                type={'text'}
                                label='Instagram URL'
                                placeholder='Instagram URL'
                            />
                        </div>

                        <div className="col-md-4">
                            <TextField
                                value={band.youtubeUrl || ''}
                                onChange={text => dispatch(change({youtubeUrl: text.target.value}))}
                                type={'text'}
                                label='Youtube URL'
                                placeholder='Youtube URL'
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <TextField
                                value={band.release_text || ''}
                                onChange={text => {
                                    errors.release_text && delete errors.release_text
                                    dispatch(change({release_text: text.target.value}))
                                }}
                                type={'text'}
                                label='Release Text'
                                placeholder='Release Text'
                                multiline
                                minRows={5}
                                variant={'filled'}
                            />
                            {errors.release_text && <strong className='text-danger'>{errors.release_text}</strong>}
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="col-md-4">
                            <Button
                                variant='contained'
                                fullWidth
                                startIcon={<MdPortrait/>}
                                sx={{borderRadius: '5px'}}
                            >
                                Add Profile Image
                            </Button>
                            <div className='band-image-field'
                            onClick={() => document.getElementById('profile_image').click()}
                            onChange={(event) => uploadFile(event, 'profile_image')}
                            >
                                {
                                    band.profile_image ?
                                    <img src={getBandImage(user.id, band.profile_image, band.id, 'profile_image')}  style={{width: '100%'}} alt='profile_image'/>
                                    :
                                    <MdImage color='#aaa' size={'3rem'}/>
                                }
                                <input type="file" hidden id='profile_image'/>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <Button
                                variant='contained'
                                fullWidth
                                startIcon={<FaTools/>}
                                sx={{borderRadius: '5px'}}
                            >
                                Add Technical Rider
                            </Button>
                            <div className='band-image-field'
                            onClick={() => document.getElementById('technical_rider_image').click()}
                            onChange={(event) => uploadFile(event, 'technical_rider_url')}
                            >
                                  {
                                      band.technical_rider_url ?
                                          <img src={getBandImage(user.id, band.technical_rider_url, band.id, 'technical_rider_url')} style={{ width: '100%' }} alt='tech_rider'/>
                                          :
                                          <MdImage color='#aaa' size={'3rem'} />
                                  }
                                <input type="file" hidden id='technical_rider_image'/>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <Button
                                variant='contained'
                                fullWidth
                                startIcon={<MdMap/>}
                                sx={{borderRadius: '5px'}}
                            >
                                Add Stage Map
                            </Button>
                            <div className='band-image-field'
                            onClick={() => document.getElementById('stage_map_image').click()}
                            onChange={(event) => uploadFile(event, 'stagemap_url')}
                            >
                                  {
                                      band.stagemap_url ?
                                          <img src={getBandImage(user.id, band.stagemap_url, band.id, 'stagemap_url')} style={{ width: '100%' }}  alt='stagemap'/>
                                          :
                                          <MdImage color='#aaa' size={'3rem'} />
                                  }
                                <input type="file" hidden id='stage_map_image'/>
                            </div>
                        </div>
                    </div>
                    <Divider className='my-2'/>
                    <div className="row">
                        {
                            Object.keys(band).length === 0 ?
                            <div className='d-flex justify-content-center mt-4'>
                                <CircularProgress/>
                            </div>
                            :
                            <GenresSelection/>
                        }
                    </div>
                    <div className="row justify-content-end mt-4">
                        <div className="col-md-4 text-end">
                        <Button
                        onClick={() => handleSave()}
                        sx={{borderRadius: '5px'}}
                        variant={'contained'}
                        startIcon={(<MdSave/>)}>
                            Save
                        </Button>
                        </div>
                    </div>
                </Paper>
            </div>
            <div className="col-md-4">
                {
                    bandList.map((band, index) => (
                        <React.Fragment key={index}>
                            <BandCard band={band}/>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
