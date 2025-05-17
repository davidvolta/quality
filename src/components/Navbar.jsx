import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="nav-container bg-primary p-md" style={{color: 'white'}}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="nav-logo" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem'}}>
          Construct
        </Link>
        
        {/* Test page navigation removed */}
      </div>
    </nav>
  );
};

export default Navbar; 