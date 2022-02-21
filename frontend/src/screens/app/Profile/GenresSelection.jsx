import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default function GenresSelection({selectedGenres, setSelectedGenres}) {

    const genres = useSelector(state => state.GenresReducer.genres)

    const genresList = React.useMemo(()=> {
        return genres.map((genre, index) => (
            <React.Fragment key={index}>
                <FormControlLabel
                control={<Checkbox
                    checked={selectedGenres.findIndex(g => g.genre.id === genre.id) !== -1}
                    onChange={e => {
                        if(e.currentTarget.checked){
                            setSelectedGenres(selectedGenres.concat({genre: genre}))
                        }else{
                            setSelectedGenres(selectedGenres.filter(selected => selected.genre !== genre))
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
