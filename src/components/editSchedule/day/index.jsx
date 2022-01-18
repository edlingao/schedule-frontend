import React from "react"

export default function Day({day, value, onClick, selected}) {
  return (
    <div className={`day-button ${selected && 'selected'}`} tabIndex={-1} onClick={(e) => onClick(e, value)}>
      <p className="fs-18 fc-white">{day}</p>
    </div>
  )
}