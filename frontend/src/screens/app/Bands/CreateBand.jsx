import { Button, Divider, Paper, TextField } from '@mui/material'
import React from 'react'
import { FaTools } from 'react-icons/fa'
import { MdImage, MdMap, MdPortrait, MdSave } from 'react-icons/md'
import GenresSelection from '../Profile/GenresSelection'
import { useDispatch } from 'react-redux'
import { index as fetchGenres } from '../../../store/Actions/Genres.action'
import { useSelector } from 'react-redux'
import { change, store } from '../../../store/Actions/Band.action'

export default function CreateBand() {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.GenresReducer)
    const band = useSelector(state => state.BandReducer.band)

    const [selectedGenres, setSelectedGenres] = React.useState(genres.genres)

    React.useEffect(() => {
        dispatch(fetchGenres())
    }, [])

    const handlerSave = () => {
        const formData = new FormData()
        for (let key in band){
            formData.append(key, band[key]);
        }

        dispatch(store(formData))
    }

  return (
    <div className="container-fluid px-5 pt-4">
        <div className="row">
            <div className="col-md-8">
                <Paper className='p-3'>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField
                            value={band.name}
                            onChange={text => dispatch(change({name: text.target.value}))}
                            placeholder='Name'
                            label={'Name'}/>
                        </div>
                        <div className="col-md-6">
                            <TextField
                            value={band.email}
                            onChange={text => dispatch(change({email: text.target.value}))}
                            type='email'
                            placeholder='Email'
                            label={'Email'}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <TextField
                                value={band.facebookUrl}
                                onChange={text => dispatch(change({facebookUrl: text.target.value}))}
                                type={'text'}
                                label='Facebook URL'
                                placeholder='Facebook URL'
                            />
                        </div>

                        <div className="col-md-4">
                            <TextField
                                value={band.instagramUrl}
                                onChange={text => dispatch(change({instagramUrl: text.target.value}))}
                                type={'text'}
                                label='Instagram URL'
                                placeholder='Instagram URL'
                            />
                        </div>

                        <div className="col-md-4">
                            <TextField
                                value={band.youtubeUrl}
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
                                value={band.release_text}
                                onChange={text => dispatch(change({release_text: text.target.value}))}
                                type={'text'}
                                label='Release Text'
                                placeholder='Release Text'
                                multiline
                                minRows={5}
                                variant={'filled'}
                            />
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
                            onChange={e => {
                                dispatch(change({profile_image: e.target.files[0]}))
                            }}
                            >
                                {
                                    band.profile_image ?
                                    <img src={URL.createObjectURL(band.profile_image)} style={{width: '100%'}} alt='profile_image'/>
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
                            onChange={e => {
                                dispatch(change({technical_rider: e.target.files[0]}))
                            }}
                            >
                                  {
                                      band.technical_rider ?
                                          <img src={URL.createObjectURL(band.technical_rider)} style={{ width: '100%' }} alt='tech_rider'/>
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
                            onChange={e => {
                                dispatch(change({stage_map: e.target.files[0]}))
                            }}
                            >
                                  {
                                      band.stage_map ?
                                          <img src={URL.createObjectURL(band.stage_map)} style={{ width: '100%' }} alt='stage_map' />
                                          :
                                          <MdImage color='#aaa' size={'3rem'} />
                                  }
                                <input type="file" hidden id='stage_map_image'/>
                            </div>
                        </div>
                    </div>
                    <Divider className='my-2'/>
                    <div className="row">
                        <GenresSelection selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
                    </div>
                    <div className="row justify-content-end mt-4">
                        <div className="col-md-4 text-end">
                        <Button
                        onClick={handlerSave}
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
                <Paper className='p-3'>

                </Paper>
            </div>
        </div>
    </div>
  )
}
