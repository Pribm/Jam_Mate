import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'
import { changeAlert } from '../store/Actions/Alert.action'

export default function AlertCOmponent() {

    const state = useSelector(state => state.AlertReducer)
    const dispatch = useDispatch()

    return (
        <Snackbar
        open={state.open}
        anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
        autoHideDuration={2000}
        onClose={() => dispatch(changeAlert({open:false}))}
        >
            <Alert severity={state.class}
            >
                {state.msg}
            </Alert>
        </Snackbar>
    )
}
