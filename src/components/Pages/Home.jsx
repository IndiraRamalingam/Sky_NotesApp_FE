import React from 'react'
import NavBar from './NavBar';
import CreateNote from './CreateNote';
import ViewNote from './ViewNote';

function Home() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <CreateNote />
        <ViewNote />
      </div>
    </>
  )
}

export default Home