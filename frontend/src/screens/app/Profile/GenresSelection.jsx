import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeGenres } from '../../../store/Actions/Genres.action'

export default function GenresSelection() {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.GenresReducer.genres)
    const selectedGenres = useSelector(state => state.GenresReducer.selectedGenres)
    const userGenres = useSelector(state => state.UserReducer.user.music_genres)

    React.useEffect(() => {
        dispatch(changeGenres(userGenres))
    }, [])

    const genresList = React.useMemo(()=> {
        
        return genres.map((genre, index) => (
            
            <React.Fragment key={index}>
                <FormControlLabel
                control={<Checkbox
                    checked={selectedGenres.findIndex(g => g.id === genre.id) !== -1}
                    onChange={e => {
                        if(e.currentTarget.checked){
                            dispatch(changeGenres(selectedGenres.concat(genre)))
                        }else{
                            dispatch(changeGenres(selectedGenres.filter(g => g.id !== genre.id)))
                        }
                    }}
                />}
                label={genre.name}/>
            </React.Fragment>
        ))
    }
    ,[genres, selectedGenres])

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
