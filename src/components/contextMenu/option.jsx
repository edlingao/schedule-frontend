import React from "react"
import selectType from "./selectType"

export default function Option({type, onClick}) {
  const {label, Icon, color} = selectType(type)

  return (
    <div className="option" onClick={onClick}>
      <div className="label">{label}</div>
      <Icon className={`icon ${color}`}/>
    </div> 
  )
}