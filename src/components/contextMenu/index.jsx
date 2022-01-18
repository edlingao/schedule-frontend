import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Option from "./option"
import { showAddForm, hideAddForm, addVisibility, showEditForm, hideEditForm, editVisibility } from "utils/store/slices/sliceShowForms"
import { logout } from "utils/store/slices/session-slice"

export default function ContextMenu({top, left}) {

  const dispatch = useDispatch()
  const addFormVisibility = useSelector(addVisibility)
  const editFormVisibility = useSelector(editVisibility)

  const showAddTetraminos = () => {
    dispatch( addFormVisibility ?
        hideAddForm() :
        showAddForm()
    )
    dispatch(hideEditForm())
  }

  const showEditTetraminos = () => {
    dispatch( editFormVisibility ?
      hideEditForm() :
      showEditForm()
    )
    dispatch(hideAddForm())
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
      <Option type="edit"onClick={showEditTetraminos}/>
      <Option type="logout" onClick={logoutEvent}/>
    </div>
  )
} 
