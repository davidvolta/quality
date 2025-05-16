import React, { useEffect, useRef, useState } from 'react';

const AnimatedList = ({ items, color = '#999', fontSize, delay = 100 }) => {
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start showing items one by one with delay
          let timer;
          for (let i = 0; i < items.length; i++) {
            timer = setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, delay * i);
          }
          
          // Clean up observer once all items are shown
          observer.disconnect();
          
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the list is visible
        rootMargin: '0px 0px -100px 0px' // Slightly before the list comes into full view
      }
    );
    
    if (listRef.current) {
      observer.observe(listRef.current);
    }
    
    return () => {
      if (listRef.current) {
        observer.disconnect();
      }
    };
  }, [items.length, delay]);
  
  return (
    <ul 
      ref={listRef} 
      style={{ 
        color: color, 
        fontSize: fontSize || '16px', 
        paddingLeft: '20px', 
        marginBottom: '24px' 
      }}
    >
      {items.map((item, index) => (
        <li 
          key={index} 
          style={{ 
            marginBottom: '8px',
            opacity: visibleItems.includes(index) ? 1 : 0,
            transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AnimatedList; 