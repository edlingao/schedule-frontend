import React, { useState } from "react";
import Login from '../components/login'
import Register from "../components/register";

export default  function Index() {

  const [register, setRegister] = useState(false)
  const chageRegister = (value) => setRegister(value)
  return (
    <div className="main-container">
      {
        !register ? 
          <Login change={chageRegister}/> :
          <Register change={chageRegister}/>
      }
    </div>
  )
}