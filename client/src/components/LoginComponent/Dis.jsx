import React from 'react'
import { useState } from "react";
import DisLogin from "../SupportLoginComponent/DisLogin";

function Dis() {
  const DisUser = {
    id: "dis",
    password: "dis123"
  }

  const [user, setUser] = useState({ id: "", password: "" })
  const [error, setError] = useState("")

  const LoginForDis = (details) => {
    console.log(details);
    if (details.id === DisUser.id && details.password === DisUser.password) {
      setUser({
        id: details.id,
        password: details.password
      })
    }
    else {
      setError('Invalid Credentials')
      setUser({ id: "", password: "" })
    }
  }

  const Logout = () => {
    setUser({ id: "", password: "" })
    setError("")
  }
  return (
    <React.Fragment>


      {(user.id !== "") ? (<div>
        <h1>hello {user.id}</h1>
        <button onClick={Logout}>logout</button>
      </div>) : (<div>
        <DisLogin LoginForDis={LoginForDis} Error={error}></DisLogin>
      </div>)
      }
    </React.Fragment>
  )
}

export default Dis