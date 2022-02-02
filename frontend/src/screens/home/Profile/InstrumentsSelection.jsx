import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chip, Divider } from '@mui/material'
import { index, changeInstruments } from '../../../store/Actions/Instruments.action';

const InstrumentsSelection = ({selectedInstruments, setSelectedInstruments}) => {

    const [load, setLoad] = React.useState(true)

    React.useEffect(() => {
        dispatch(index()).then(res => {
            setLoad(false)
            setSelectedInstruments([...userInstrumentsList])
        })
    }, [])

    const dispatch = useDispatch()
    const instruments = useSelector(state => state.InstrumentsReducer)
    const userInstrumentsList = useSelector(state => state.UserReducer.instruments)

    const selectInstrumentCattegory = (e, type) => {
        Object.keys(e.currentTarget.parentNode.children).forEach(i => e.currentTarget.parentNode.children[i].classList.remove('active'))
        e.currentTarget.classList.add('active')
        dispatch(index(type))
    }

  return (
      load === false &&
      <div className='text-center'>
          
          <h4>Select your instrument cattegory</h4>
          {
            <>
                <div className="d-flex flex-wrap mt-4 justify-content-between">
                    {
                        instruments.instrument_type.map((type, index) => (
                            <React.Fragment key={index}>
                                <Chip
                                    clickable
                                    onClick={e => selectInstrumentCattegory(e, type)}
                                    className='flex-grow-1 my-2 mx-2'
                                    label={type.name} />
                            </React.Fragment>
                        ))
                    }
                </div>
                
                <Divider className='mt-2'/>

                {
                    instruments.instruments.length !== 0 ?
                    <div className="d-flex mt-2 justify-content-between flex-wrap">
                        {
                            instruments.instruments.map((instrument, i) => (
                                <React.Fragment key={i}>
                                    <Chip
                                    variant={
                                        (selectedInstruments.findIndex(user => user.instrument.id === instrument.id) !== -1) ?
                                        'selected' :
                                        'filled'
                                    }
                                    className='flex-grow-1 mx-2 my-2'
                                    label={instrument.name}
                                    onClick={() => {
                                        if(selectedInstruments.findIndex(user => user.instrument.id === instrument.id) === -1){
                                            setSelectedInstruments(selectedInstruments.concat({instrument}))
                                        }else{
                                            setSelectedInstruments(selectedInstruments.filter(user => user.instrument.id !== instrument.id))
                                        }
                                    }}
                                    />
                                </React.Fragment>
                            ))
                            
                        }
                    </div>
                    :
                    <div className='p-4 text-center'>
                        <h4 className='text-gray'>Please, select a instrument cattegory</h4>
                        <img height='250px' src="img/musica-ao-vivo.png" alt="select_instrument" />
                    </div>
                }
            </>
          }
      </div>
  );
}

export default React.memo(InstrumentsSelection)
