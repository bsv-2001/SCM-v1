import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import './AdminComponent.css'
function AdminLogin({ LoginForAdmin, Error }) {

  const [details, setDetails] = useState({ id: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();
    LoginForAdmin(details);
  }
  return (
    <div className='AdminLogin'>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <div className='form-group'>
            <h2 className='h2'>Admin Node Login</h2>
          </div>
          <div className="form-group">
            <input type="text" name="id" id="id" placeholder='Admin ID' onChange={e => setDetails({ ...details, id: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="password" name="pwd" id="pwd" placeholder='Password' onChange={e => setDetails({ ...details, password: e.target.value })} />
          </div>
          <div className='form-group'>
            <Button variant="primary"size="lg" active onClick={submitHandler}>Create</Button>
            <span>{(Error !== "") ? (<div className='error'>{Error}</div>) : ("")}</span>
          </div>
         

        </div>
      </form>
    </div>

  );
}

export default AdminLogin;