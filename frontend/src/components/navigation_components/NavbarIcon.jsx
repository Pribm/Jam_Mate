import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavbarIcon(props) {

    const navigate = useNavigate()

    const setSelected = (e) => {
        document.querySelectorAll('.navbar-icon').forEach(node => node.classList.remove('active'))
        e.currentTarget.classList.add('active')
    }

  return (
      <div className={`navbar-icon ${props.class}`}
          onClick={
            props.action
            ?
            props.action
            :
            (e) => {
                setSelected(e)
                navigate(props.route, { replace: true })
            }
        }
      >
          {props.icon}
          <span className='ms-2'>{props.label}</span>
          <div className='markup'></div>
      </div>
  )
}
