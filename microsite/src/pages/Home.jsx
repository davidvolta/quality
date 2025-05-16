import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const testPages = [
    {
      id: 1,
      title: 'Test Page One',
      description: 'Basic layout with header, sections, and footer',
      path: '/test1',
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      title: 'Test Page Two',
      description: 'Alternating grid layout with varied background sections',
      path: '/test2',
      color: 'var(--color-secondary)'
    },
    {
      id: 3,
      title: 'Test Page Three',
      description: 'Interactive tabs and dynamic content display',
      path: '/test3',
      color: 'var(--color-light-blue)'
    },
    {
      id: 4,
      title: 'Test Page Four',
      description: 'Parallax scrolling effects and hover animations',
      path: '/test4',
      color: 'var(--color-orange)'
    },
    {
      id: 5,
      title: 'Test Page Five',
      description: 'Video background and interactive feature highlights',
      path: '/test5',
      color: 'var(--color-bright-red)'
    }
  ];
  
  return (
    <div className="home-page">
      <header className="bg-primary" style={{color: 'white', padding: '60px 0'}}>
        <div className="container text-center">
          <h1 className="text-3xl mb-md">Construct Microsite Tests</h1>
          <p className="mb-lg">Select one of the test pages to explore different layout and design options</p>
        </div>
      </header>
      
      <main className="container mt-xl mb-xl">
        <div className="lg:grid-cols-3 gap-lg" style={{display: 'grid'}}>
          {testPages.map((page) => (
            <Link 
              key={page.id} 
              to={page.path}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <div 
                className="test-card p-lg mb-lg transition"
                style={{
                  border: `1px solid ${page.color}`,
                  borderRadius: '8px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.backgroundColor = `${page.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div>
                  <h2 className="mb-md" style={{color: page.color}}>{page.title}</h2>
                  <p className="mb-lg">{page.description}</p>
                </div>
                
                <div 
                  className="view-button p-sm text-center"
                  style={{
                    backgroundColor: page.color,
                    color: 'white',
                    borderRadius: '4px'
                  }}
                >
                  View Page
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="bg-dark-gray p-lg">
        <div className="container" style={{color: 'white'}}>
          <p>&copy; 2023 Construct. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;