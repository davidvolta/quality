import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'

// Import pages
import Home from './pages/Home'
import TestOne from './pages/TestOne'
import TestTwo from './pages/TestTwo'
import TestThree from './pages/TestThree'
import TestFour from './pages/TestFour'
import TestFive from './pages/TestFive'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test1" element={<TestOne />} />
        <Route path="/test2" element={<TestTwo />} />
        <Route path="/test3" element={<TestThree />} />
        <Route path="/test4" element={<TestFour />} />
        <Route path="/test5" element={<TestFive />} />
      </Routes>
    </Router>
  )
}

export default App
