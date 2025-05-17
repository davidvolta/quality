import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'

// Import pages
import Quality from './pages/Quality'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quality />} />
      </Routes>
    </Router>
  )
}

export default App
