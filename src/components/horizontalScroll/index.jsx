import React, { useRef, useState } from "react"

import './scroller.scss'

export default function HorizontalScroll({children, thin}) {
  const childrenContainerRef = useRef(null)
  const scrolling = (e) => {
    if(e.deltaY < 0){
      childrenContainerRef.current.scrollTo(childrenContainerRef.current.scrollLeft - 250, 0)
    }else if(e.deltaY > 0 ){
      childrenContainerRef.current.scrollTo(childrenContainerRef.current.scrollLeft + 250, 0)
    }
  }

  return (
    <div className={`horizontal-scroll  ${thin ? 'thin' : ''}` } onWheel={scrolling} ref={childrenContainerRef}>
      <div className="children">
        {children}
      </div>
    </div>
  )
}