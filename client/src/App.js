import React from 'react'
import Button from './components/Button'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Data from "./pages/data"

function App() {

  return (
    <Router>
      <Navbar />

      <br /><br /><br />

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
