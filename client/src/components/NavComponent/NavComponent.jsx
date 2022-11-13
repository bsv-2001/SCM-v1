import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import './nav.css'
class NavComponent extends Component {
  state = {}
  render() {
    return (
      <div className='NavBar'>
        <ul className='main-nav'>
          <li>
            <Link to="/" className='l'>Supply Chain Management using Ethereum Blockchain</Link>
          </li>
          <li>
            <Link className='l' to="adminNode">Admin</Link>
          </li>
          <li>
            <Link className='l' to="disNode">Distributor</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavComponent;