// import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Data from "./pages/data"
import Button from './components/Button'

function App() {
  return (
    <Router>
      <Navbar />

      <br /><br /><br /><br />

      <div style={{ textAlign: 'center' }}>
        <Routes>
          <Route path="/" element={<Button />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App