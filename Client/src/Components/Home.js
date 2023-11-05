import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="homeMain p-1">
        <div className='homeMainChild'>
          <div className='w-50 codeIconDiv'>
            <h1><ion-icon className="icon" name="code-slash-outline"></ion-icon></h1>
          </div>
          <div className='m-4'>
            <h1 className='text-light m-5'>A New Way to Learn</h1>
            <p><h6>Best platform to help you enhance your skills,<br/> expand your knowledge and prepare for technical interviews.</h6></p>
          </div>
        </div>
        <div className='m-5 d-flex justify-content-center align-items-center'>
          <Link to={"/SelectAll"} className='text-decoration-none text-white fs-3'>Start Learning</Link>
          <Link to={"/SelectAll"} className='text-decoration-none text-white fs-3 mt-2 mx-2'><ion-icon name="chevron-forward-outline"></ion-icon></Link>
        </div>
      </div>
    </>
  )
}

export default Home
