import React from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
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
    {/* <Footer /> */}
    </>
  )
}

export default Home