import { Paper } from '@mui/material'
import React from 'react'

export default function BandCard({band}) {
  return (
    <Paper className='bg-dark mb-2'>
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    foto
                </div>
                <div className="col-md-10">
                    <h2>{band.name}</h2>
                    <h5>{band.email}</h5>
                </div>
            </div>
        </div>
    </Paper>
  )
}
