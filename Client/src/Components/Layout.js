import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <nav class="customeClassForNav navbar navbar-expand-lg p-3">
                <div class="container-fluid">
                    <Link class="navbar-brand mx-3 fw-bold" to="/" style={{color:"#fff"}}>Program List</Link>
                    <button class="navbar-toggler bg-light navbarToggleButton" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item mx-3">
                                <Link class="nav-link active" aria-current="page" style={{color:"#fff"}} to="/SelectAll">Programs</Link>
                            </li>
                            {/* <li class="nav-item mx-3">
                                <Link class="nav-link" to="/SelectAllTopic" style={{color:"#fff"}}>Topics</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout
