import React, { useState, useEffect, useRef } from 'react';

const CircleProgress = ({ percentage = 40, color = '#50B8E2', size = 250, scrollAnimation = true }) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [scale, setScale] = useState(0.9);
  const circleRef = useRef(null);
  
  const radius = 45;
  const strokeWidth = 10;
  const normalizedRadius = radius - (strokeWidth / 2);
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  useEffect(() => {
    if (!scrollAnimation) {
      setDisplayPercentage(percentage);
      setScale(1);
      return;
    }

    // Initialize with a small percentage already
    setDisplayPercentage(5);

    // Track document scroll position rather than element position
    const handleScroll = () => {
      if (!circleRef.current) return;
      
      // Get total document height
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight
      );
      
      // Get viewport height
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      
      // Get the element's position relative to the document
      const elementPos = circleRef.current.getBoundingClientRect().top + window.scrollY;
      
      // Current scroll position
      const scrollPos = window.scrollY;
      
      // Trigger point - start animating when we're 1.5 viewport heights away from the element
      const triggerPoint = Math.max(0, elementPos - (viewHeight * 1.5));
      
      // Target point - when animation should be complete (element is 1/4 into viewport)
      const targetPoint = Math.max(0, elementPos - (viewHeight * 0.25));
      
      // Don't go below the trigger point
      if (scrollPos < triggerPoint) {
        setDisplayPercentage(5); // Keep a minimal percentage for visual appeal
        setScale(0.9);
        return;
      }
      
      // Calculate progress between trigger and target points
      const progress = Math.min(1, (scrollPos - triggerPoint) / (targetPoint - triggerPoint));
      
      // Set display percentage and scale based on progress
      setDisplayPercentage(Math.min(percentage, 5 + Math.floor((percentage - 5) * progress)));
      setScale(0.9 + (0.2 * progress));
    };

    // Run once immediately and set up scroll listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Force an immediate check after a short delay
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [percentage, scrollAnimation]);

  return (
    <div 
      ref={circleRef} 
      style={{ 
        width: size, 
        height: size, 
        transform: `scale(${scale})`,
        transition: 'transform 0.3s ease-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto'
      }}
    >
      <svg
        height={size}
        width={size}
        viewBox={`0 0 100 100`}
      >
        <circle
          stroke="#EEEEEE"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-out' }}
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy=".3em"
          fontSize="26"
          fontWeight="bold"
          fill="white"
          fontFamily="var(--font-mono)"
          style={{ filter: 'drop-shadow(0 0 5px rgba(80, 184, 226, 0.5))' }}
        >
          {displayPercentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgress; 