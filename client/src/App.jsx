import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import AddProject from './pages/AddProject'

function App() {

  return (
    <>
     <BrowserRouter>
      <div className='app'>
        <Navbar />

        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-project/*" element={<AddProject />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
