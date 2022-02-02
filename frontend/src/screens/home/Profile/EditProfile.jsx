import { Checkbox,Avatar, Chip, CircularProgress, Divider, Fab, FormControlLabel, Paper, TextField, Typography, Button } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'

import React from 'react'
import { MdSave } from 'react-icons/md'

import DateAdapter from '@mui/lab/AdapterDateFns';
import { differenceInYears, format } from 'date-fns'

import { useSelector, useDispatch } from 'react-redux'

import { index as fetchGenres } from '../../../store/Actions/Genres.action'
import { updateUser } from '../../../store/Actions/User.action'
import { HttpAuth } from '../../../config/Http'
import CustomLoader from '../../../assets/svgs/CustomLoader'

import InstrumentsSelection from './InstrumentsSelection'
import ProfileInfoCard from './ProfileInfoCard';

export default function Profile() {

    const dispatch = useDispatch()

    const userDataGlobal = useSelector(state => state.UserReducer)

    const [countries, setCountries] = React.useState(null)
    const [selectedDate, handleDateChange] = React.useState(new Date());
    
    const [userData, setUserData] = React.useState(userDataGlobal)
    

    const [selectedInstruments, setSelectedInstruments] = React.useState([])

    React.useEffect(() => {
        dispatch(fetchGenres())
        HttpAuth.get('/app/countries').then(res => {
            setCountries(res.data)
        })  
    }, [])

    return (
        <>
            {
                Object.keys(userData).length === 0 ?
                <CustomLoader/>
                :
                <div className="mx-5 mt-4">

                <Button
                onClick={() => dispatch(updateUser({user: userData.user, instruments: selectedInstruments}))}
                className='shadow'
                variant='primary-button' sx={{backgroundColor: 'white', position: 'fixed', bottom: '25px', right: '40px'}}>
                    <MdSave className='me-2'/>
                    Save
                </Button>

                <div className="row">
                    <div className="col-md-8">
                        <Paper elevation={6} className='p-3 mb-4' id='main_user_info' >
                        <Typography className='mt-2 ms-3 text-start' variant='h1'>Basic Info</Typography>
                            <div className="d-flex flex-column align-items-center">

                                <div className="container">

                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <TextField
                                            value={userData.user.name || ''}
                                            onChange={text => setUserData({...userData, user: {...userData.user, name: text.target.value}})}
                                            type={'text'}
                                            label='Name'/>
                                        </div>

                                        <div className="col-md-6">
                                            <TextField
                                            onChange={text => setUserData({...userData, user: {...userData.user, email: text.target.value}})}
                                            value={userData.user.email || ''}
                                            type={'email'}
                                            label='E-mail'
                                            />
                                        </div>
                                    </div>
                
                                    <div className="row">
                                        <div className="col-md-4">
                                            <TextField
                                                onChange={text => setUserData({...userData, user: {...userData.user, facebook_id: text.target.value}})}
                                                value={userData.user.facebook_id || ''}
                                                type={'text'}
                                                label='Facebook URL'
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <TextField
                                                onChange={text => setUserData({...userData, user: {...userData.user, instagram_id: text.target.value}})}
                                                value={userData.user.instagram_id || ''}
                                                type={'text'}
                                                label='Instagram URL'
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <TextField
                                                onChange={text => setUserData({...userData, user: {...userData.user, youtube_id: text.target.value}})}
                                                value={userData.user.youtube_id || ''}
                                                type={'text'}
                                                label='Youtube URL'
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2 align-items-center">
                                        <div className="col-md-4">
                                            <div className={`custom-select-box ${userData.user.country_id !== '' && 'selected'}`}>
                                                <select
                                                    
                                                    value={userData.user.country_id || ''}
                                                    placeholder='Country'
                                                    onChange={e => {
                                                        setUserData({...userData, user: {...userData.user, country_id: e.target.value}})
                                                        if (e.target.selectedIndex !== -1) {
                                                            e.currentTarget.parentNode.classList.add('selected')
                                                        }
                                                    }}
                                                >
                                                    {countries &&
                                                        countries.map((country, i) => (
                                                            <React.Fragment key={i}>
                                                                <option value={country.id}>{country.name}</option>
                                                            </React.Fragment>
                                                        ))

                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <LocalizationProvider dateAdapter={DateAdapter}>
                                                <MobileDatePicker
                                                    disableFuture
                                                    label='Birthday'
                                                    value={selectedDate}
                                                    onChange={newValue => {
                                                        handleDateChange(newValue)
                                                        setUserData({...userData, user: {...userData.user, birth_date: format(newValue, 'yyyy-MM-dd HH:MM:ss')}})
                                                    }}
                                                    renderInput={(params) => <TextField {...params}/>}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="col-md-2">
                                            <TextField
                                            label='Age'
                                            value={differenceInYears(new Date(), (userData.user.birth_date) ? new Date(userData.user.birth_date) : selectedDate)}/>
                                        </div>

                                        <div className="col-md-4">
                                            <TextField
                                            onChange={text => setUserData({...userData, user: {...userData.user, website_url: text.target.value}})}
                                            value={userData.user.website_url || ''}
                                            label='Website'
                                            />
                                        </div>
                                    </div>

                                    <Divider  className='my-3'/>
                                        
                                        <TextField
                                            onChange={text => setUserData({...userData, user: {...userData.user, bio: text.target.value}})}
                                            value={userData.user.bio || ''}
                                            variant='filled'
                                            label='Description'
                                            multiline
                                            minRows={5}
                                            maxRows={5}
                                        />

                                    <Divider className='my-3'/>
                                    
                                    <InstrumentsSelection selectedInstruments={selectedInstruments} setSelectedInstruments={setSelectedInstruments}/>
                                </div>
                            </div>
                        </Paper>
                    </div>

                    <ProfileInfoCard userDataGlobal={userDataGlobal} userData={userData} setUserData={setUserData}/>
                </div>
            </div>
            }
        </>
    )
}
