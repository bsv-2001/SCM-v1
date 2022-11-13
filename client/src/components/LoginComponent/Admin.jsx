import React from 'react'
import { useState } from "react";
import AdminLogin from '../SupportLoginComponent/AdminLogin'
import './Admin.css';
import Logic from "../../components/Start/Logic";
function Admin() {
  const adminUser = {
    id: "admin",
    password: "admin123"
  }

  const [user, setUser] = useState({ id: "", password: "" })
  const [error, setError] = useState("")

  const LoginForAdmin = (details) => {
    console.log(details);
    if (details.id === adminUser.id && details.password === adminUser.password) {
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
        <Logic/>
        <button onClick={Logout}>logout</button>
      </div>) : (<div>
        <AdminLogin LoginForAdmin={LoginForAdmin} Error={error}></AdminLogin>
      </div>)
      }
    </React.Fragment>

  )
}

export default Admin