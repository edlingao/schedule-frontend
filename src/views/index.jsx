import ContextMenu from "components/contextMenu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from '../components/login'
import Register from "../components/register";
import Schedule from "./schedules";
import {
  selectSession
} from 'utils/store/slices/session-slice'

import {
  addVisibility
} from 'utils/store/slices/sliceShowForms'
import AddActivityForm from "components/addActivity";

export default  function Index() {

  const [register, setRegister] = useState(false)
  const [showContext, setShowContext] = useState(false)
  const [contextPosition, setContextPosition] = useState({top: 0,left: 0})
  const chageRegister = (value) => setRegister(value)
  const sessionSelected = useSelector(selectSession)
  const addFormVisibility = useSelector(addVisibility)

  const toggleContextMenu = (e) => {
    e.preventDefault()
    setShowContext(!showContext)
    setContextPosition({left: e.clientX, top: e.clientY})
  }

  const hideContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowContext(false)
  }

  return (
    <div className="main-container" onContextMenu={toggleContextMenu} onClick={hideContextMenu}>
      { showContext ?
        <ContextMenu top={contextPosition.top} left={contextPosition.left}/> :
        <></>
      }
      { !sessionSelected ?
          (!register ? 
            <Login change={chageRegister}/> :
            <Register change={chageRegister}/>
          ) :
          <Schedule />
      }
      
      { addFormVisibility ?
          <AddActivityForm />
          : <></>
      }

    </div>
  )
}