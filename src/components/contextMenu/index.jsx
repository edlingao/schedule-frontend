import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Option from "./option"
import { showAddForm, hideAddForm, addVisibility } from "utils/store/slices/sliceShowForms"
import { logout } from "utils/store/slices/session-slice"

export default function ContextMenu({top, left}) {

  const dispatch = useDispatch()
  const addFormVisibility = useSelector(addVisibility)
  const [hideOrShowAddForm, setHideOrShowAddForm] = useState(addFormVisibility)

  const showAddTetraminos = () => {
    dispatch( hideOrShowAddForm ?
        hideAddForm() :
        showAddForm()
    )
    setHideOrShowAddForm(!hideOrShowAddForm)
  }

  const logoutEvent = () => {
    dispatch(logout())
  }

  return (
    <div className="glass-container context-menu" 
      style={{
        top: `${top}px`,
        left: `${left}px`
      }}
    >
      {addFormVisibility}
      <Option type="dark"/>
      <Option type="light"/>
      <Option type="add" onClick={showAddTetraminos} />
      <Option type="edit"/>
      <Option type="logout" onClick={logoutEvent}/>
    </div>
  )
} 
