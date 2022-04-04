import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change, store } from '../../../store/Actions/Band.action'

export default function GenresSelection() {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.GenresReducer.genres)
    const bandGenres = useSelector(state => state.BandReducer.band.genres)

    const genresList = React.useMemo(()=> {
        
        return genres.map((genre, index) => (
            
            <React.Fragment key={index}>
                <FormControlLabel
                control={<Checkbox
                    checked={bandGenres.findIndex(g => g.id === genre.id) !== -1}
                    onChange={e => {
                        if(e.currentTarget.checked){ 
                            dispatch(change({genres: bandGenres.concat(genre)}))
                        }else{
                            dispatch(change({genres : bandGenres.filter(g => g.id !== genre.id)}))
                        }
                    }}
                />}
                label={genre.name}/>
            </React.Fragment>
        ))
    }
    ,[genres, bandGenres])

  return (
    <div className="text-center">
        <h4 className='mb-4'>Select your music genres</h4>
        <div className="scroll-y" style={{height: '200px'}}>
            {
                genresList
            }
        </div>
    </div>
  )
}
