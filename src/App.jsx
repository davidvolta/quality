import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'

// Import pages
import TestOne from './pages/TestOne'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestOne />} />
      </Routes>
    </Router>
  )
}

export default App
