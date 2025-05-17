import React, { useEffect, useState, useRef } from 'react';
import CircleProgress from '../components/CircleProgress';

const TestOne = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  // Add refs for each section with bullet points
  const sectionRefs = useRef([]);
  // Add refs for module images
  const imageRefs = useRef([]);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add animation effect for bullet points
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const listItems = entry.target.querySelectorAll('li');
          listItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 200 + (150 * index));
          });
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all section refs
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (observer) {
        sectionRefs.current.forEach(ref => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  // Add animation effect for module images
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleImageIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 150);
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    const imageObserver = new IntersectionObserver(handleImageIntersect, observerOptions);
    
    // Observe all image refs
    imageRefs.current.forEach(ref => {
      if (ref) imageObserver.observe(ref);
    });

    return () => {
      if (imageObserver) {
        imageRefs.current.forEach(ref => {
          if (ref) imageObserver.unobserve(ref);
        });
      }
    };
  }, []);

  // Determine if we're on mobile
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Helper function to add ref to section
  const addToRefs = el => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  // Helper function to add ref to image
  const addToImageRefs = el => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  return (
    <div className="test-page test-one" style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero" style={{ 
        padding: isMobile ? '86px 0 57px' : '172px 0 114px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Blurred background image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/photos/panels.JPG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.4)',
          zIndex: 0
        }}></div>
        
        <div className="container" style={{ 
          maxWidth: '100%', 
          padding: 0,
          position: 'relative',
          zIndex: 1
        }}>
          {isMobile && (
            <div style={{ 
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/assets/logos/TerabaseConstructLogo.png" 
                alt="Terabase Construct" 
                style={{ 
                  height: '40px', 
                  width: 'auto',
                  marginBottom: '0',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }} 
              />
            </div>
          )}
          <div style={{ 
            position: 'relative',
            paddingLeft: '0',
            maxWidth: '1200px',
            margin: '0',
            marginRight: isMobile ? '20px' : 'auto'
          }}>
            {/* Image container with responsive styling */}
            {!isMobile && (
              <div style={{ 
                width: isTablet ? '42%' : '60%', 
                height: isTablet ? '462px' : '660px',
                backgroundImage: 'url("/assets/photos/HandHeld.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat',
                float: 'left',
                marginBottom: '0'
              }}></div>
            )}
            
            {/* Text container with responsive positioning */}
            <div style={{ 
              marginLeft: isMobile ? '0' : '45%', 
              paddingTop: isMobile ? '0' : '50px',
              maxWidth: isMobile ? '100%' : '600px',
              textAlign: isMobile || isTablet ? 'center' : 'left',
              margin: isMobile || isTablet ? '0 auto' : '0 0 0 45%',
              paddingLeft: isMobile || isTablet ? '20px' : '0',
              paddingRight: isMobile || isTablet ? '20px' : '0',
              width: isMobile ? '100%' : '100%'
            }}>
              {!isMobile && (
                <div style={{ 
                  marginBottom: '40px',
                  display: 'flex',
                  justifyContent: isMobile || isTablet ? 'center' : 'flex-start'
                }}>
                  <img 
                    src="/assets/logos/TerabaseConstructLogo.png" 
                    alt="Terabase Construct" 
                    style={{ 
                      height: isMobile ? '40px' : '50px', 
                      width: 'auto',
                      marginBottom: '24px',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }} 
                  />
                </div>
              )}
              <h1 style={{ 
                fontSize: isMobile ? '42px' : isTablet ? '48px' : '72px',
                fontWeight: '600', 
                lineHeight: '1.1', 
                marginBottom: '24px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                QC That Keeps the Job Moving
              </h1>
              <p style={{ 
                fontSize: isMobile ? '18px' : '22px', 
                lineHeight: '1.5', 
                color: '#fff', 
                marginBottom: '40px',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}>
                An easy-to-use, completely digital QC workflow purpose built for large-scale solar.
              </p>
              
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: isMobile || isTablet ? 'center' : 'flex-start',
                gap: '16px',
                marginTop: '24px'
              }}>
                <a href="https://apps.apple.com/us/app/construct-qc/id1552435031" target="_blank" rel="noopener noreferrer" style={{ 
                  display: 'inline-block',
                  minWidth: '140px',
                  marginBottom: isMobile || isTablet ? '12px' : '0',
                  marginRight: isMobile || isTablet ? '0' : '16px'
                }}>
                  <img 
                    src="/assets/badges/apple.png" 
                    alt="Download on App Store" 
                    style={{ 
                      height: '48px', 
                      width: 'auto',
                      minWidth: '120px',
                      maxWidth: '100%',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer',
                      display: 'block',
                      margin: isMobile || isTablet ? '0 auto' : '0'
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.terabase.inspect" target="_blank" rel="noopener noreferrer" style={{ 
                  display: 'inline-block',
                  minWidth: '140px'
                }}>
                  <img 
                    src="/assets/badges/google.png" 
                    alt="Get it on Google Play" 
                    style={{ 
                      height: '48px', 
                      width: 'auto',
                      minWidth: '120px',
                      maxWidth: '100%',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer',
                      display: 'block',
                      margin: isMobile || isTablet ? '0 auto' : '0'
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
              </div>
            </div>
            <div style={{ 
              clear: 'both'
            }}></div>
          </div>
        </div>
      </section>

      {/* For Supers & Foremen Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ 
              maxWidth: '1000px', 
              margin: '0 auto',
              border: 'none'
            }}>
            <h2 style={{ 
              fontSize: isMobile ? '24px' : '28px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              color: '#fff',
              textAlign: 'center'
            }}>
              Get it Right the First Time
            </h2>
            <p style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              color: '#999', 
              marginBottom: '30px', 
              lineHeight: '1.6', 
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 30px'
            }}>
              When you're out in the work, every step matters. And every click too. Construct was designed to help production crews and QC teams navigate the project site, capture issues instantly, and close them out — no paperwork, no desktop, no BS.
            </p>
            
            {/* Scroll Story Animation Container */}
            <div 
              style={{
                position: 'relative',
                height: isMobile ? '450px' : '600px', // Increased height from 350px/450px to 450px/600px
                margin: '20px auto', // Reduced top/bottom margin from 40px to 20px
                width: '100%',
                maxWidth: '1000px', // Matched to parent container width
                border: 'none',
                background: 'transparent'
              }}
              ref={el => {
                if (!el) return;
                
                // Animation states
                let animationState = 'waiting'; // 'waiting', 'fadeOutNotebook', 'fadeInList', 'completed'
                let scrollY = 0;
                let isScrollHijacked = false;
                let animationProgress = 0;
                let startTime;
                
                // Duration settings in milliseconds
                const fadeOutDuration = 400;
                const blackScreenDuration = 400;
                const fadeInDuration = 400;
                
                // Elements
                const notebookImage = el.querySelector('.notebook-image');
                const listImage = el.querySelector('.list-image');
                
                // Function to handle scrolling
                const handleScroll = () => {
                  if (animationState === 'completed') return;
                  
                  const rect = el.getBoundingClientRect();
                  const triggerPosition = window.innerHeight * 0.2; // Changed from 0.8 to 0.2 to trigger later
                  
                  // Check if element has reached trigger position and animation hasn't started
                  if (animationState === 'waiting' && rect.top <= triggerPosition) {
                    // Log for debugging
                    console.log('Animation triggered!', { top: rect.top, trigger: triggerPosition });
                    
                    // Save current scroll position
                    scrollY = window.scrollY;
                    
                    // Start the animation sequence
                    startAnimation();
                  }
                };
                
                // Add initial check on load
                setTimeout(() => {
                  handleScroll();
                }, 500);
                
                // Function to start the animation
                const startAnimation = () => {
                  // Enable scroll hijacking
                  isScrollHijacked = true;
                  document.body.style.overflow = 'hidden';
                  
                  // Start animation
                  animationState = 'fadeOutNotebook';
                  startTime = performance.now();
                  requestAnimationFrame(animationFrame);
                };
                
                // Animation frame handler
                const animationFrame = (timestamp) => {
                  if (!startTime) startTime = timestamp;
                  const elapsed = timestamp - startTime;
                  
                  // Handle different animation states
                  if (animationState === 'fadeOutNotebook') {
                    // Notebook fade out animation
                    animationProgress = Math.min(1, elapsed / fadeOutDuration);
                    notebookImage.style.opacity = 1 - animationProgress;
                    
                    // Move to next state after fadeOut completes
                    if (animationProgress === 1) {
                      animationState = 'fadeInList';
                      startTime = timestamp;
                    }
                    
                    requestAnimationFrame(animationFrame);
                  } 
                  else if (animationState === 'fadeInList') {
                    // Wait for black screen duration, then start fadeIn
                    if (elapsed < blackScreenDuration) {
                      requestAnimationFrame(animationFrame);
                      return;
                    }
                    
                    // List fade in animation
                    const fadeInElapsed = elapsed - blackScreenDuration;
                    animationProgress = Math.min(1, fadeInElapsed / fadeInDuration);
                    listImage.style.opacity = animationProgress;
                    
                    // Complete animation
                    if (animationProgress === 1) {
                      completeAnimation();
                    } else {
                      requestAnimationFrame(animationFrame);
                    }
                  }
                };
                
                // Function to complete animation and restore scrolling
                const completeAnimation = () => {
                  animationState = 'completed';
                  notebookImage.style.opacity = 0;
                  listImage.style.opacity = 1;
                  
                  // Show the feature columns
                  const leftFeatures = el.querySelector('.left-features');
                  const rightFeatures = el.querySelector('.right-features');
                  
                  if (leftFeatures && rightFeatures) {
                    // Make the containers visible
                    leftFeatures.style.opacity = '1';
                    rightFeatures.style.opacity = '1';
                    
                    // Directly animate each list item with staggered delays
                    const leftItems = leftFeatures.querySelectorAll('li');
                    const rightItems = rightFeatures.querySelectorAll('li');
                    
                    // Calculate total animation duration
                    const leftDuration = 200 + (100 * (leftItems.length - 1));
                    const rightDuration = 500 + (100 * (rightItems.length - 1));
                    const totalDuration = Math.max(leftDuration, rightDuration);
                    
                    // Animate left feature items
                    leftItems.forEach((item, index) => {
                      setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                      }, 200 + (100 * index));
                    });
                    
                    // Animate right feature items
                    rightItems.forEach((item, index) => {
                      setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                      }, 500 + (100 * index)); // Start right side a bit later
                    });
                    
                    // Release scroll hijacking only after all animations complete
                    setTimeout(() => {
                      isScrollHijacked = false;
                      document.body.style.overflow = '';
                    }, totalDuration + 100); // Add small buffer
                  } else {
                    // If no features to animate, release scroll immediately
                    isScrollHijacked = false;
                    document.body.style.overflow = '';
                  }
                };
                
                // Prevent scroll during animation
                const preventScroll = (e) => {
                  if (isScrollHijacked) {
                    window.scrollTo(0, scrollY);
                  }
                };
                
                // Add event listeners
                window.addEventListener('scroll', handleScroll);
                window.addEventListener('scroll', preventScroll);
                
                // Clean up
                return () => {
                  window.removeEventListener('scroll', handleScroll);
                  window.removeEventListener('scroll', preventScroll);
                  document.body.style.overflow = '';
                };
              }}
            >
              {/* Notebook image (starts visible) */}
              <img 
                className="notebook-image"
                src="/assets/photos/inspection_notebook.png" 
                alt="Traditional paper notebook"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isMobile ? '480px' : isTablet ? '580px' : '600px',
                  height: 'auto',
                  maxHeight: isMobile ? '420px' : '550px', // Increased from 340px/440px
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  opacity: 1,
                  transition: 'opacity 0.3s ease',
                  border: 'none'
                }}
              />
              
              {/* List image (starts invisible) */}
              <img 
                className="list-image"
                src="/assets/screenshots/List.jpeg" 
                alt="Digital task list in Construct app"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'auto',
                  height: isMobile ? '380px' : isTablet ? '480px' : '520px',
                  maxWidth: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  border: 'none'
                }}
              />
              
              {/* Left column features */}
              <ul 
                className="left-features"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: isMobile ? '65%' : isTablet ? '65%' : '70%',
                  transform: 'translateY(-50%)',
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'right',
                  width: isMobile ? '180px' : isTablet ? '220px' : '260px',
                  opacity: 0,
                  pointerEvents: 'none', // Don't interfere with scroll events
                  border: 'none',
                  background: 'transparent'
                }}
              >
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>GIS-based Map</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.05s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Pin Observations on Elements</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.1s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Inspection Checklists</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.15s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Create Non-Compliance Records</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.2s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Assign and Notify QC Issues</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.25s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Add Due Dates</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.3s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>GPS Navigation</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.35s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Manage Status Changes</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.4s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Audit Logs</li>
                <li style={{ 
                  marginBottom: '0', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.45s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Role-based Data Access</li>
              </ul>
              
              {/* Right column features */}
              <ul
                className="right-features"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: isMobile ? '65%' : isTablet ? '65%' : '70%',
                  transform: 'translateY(-50%)',
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'left',
                  width: isMobile ? '180px' : isTablet ? '220px' : '260px',
                  opacity: 0,
                  pointerEvents: 'none', // Don't interfere with scroll events
                  border: 'none',
                  background: 'transparent'
                }}
              >
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Web and Mobile Apps</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.05s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Offline Mode</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.1s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Procore Integration</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.15s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Performance Tracking</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.2s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>KPI Dashboards</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.25s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Export and Send Punchlists</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.3s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>In-app and Email Notifications</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.35s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>1-Click Assigned-to-me View</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.4s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Search QC Issues</li>
                <li style={{ 
                  marginBottom: '0', 
                  opacity: '0', 
                  transform: 'translateY(15px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#aab7c4',
                  transitionDelay: '0.45s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px'
                }}>Unlimited Users</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For PMs & Owners Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#000' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div style={{ 
              width: '100%', 
              height: isMobile ? '250px' : '350px',
              borderRadius: '8px',
              border: 'none',
              order: isMobile ? '-1' : '0',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              backgroundImage: 'url("/assets/photos/ipad.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} ref={addToImageRefs}></div>
            <div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: '600', 
                marginBottom: '24px', 
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left' 
              }}>
               Know the Quality Before the Handoff
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                You can't fix what you can't see. With Construct, you get real-time visibility into field observations, trends, and closeout rates — so you can ensure quality before it hits operations.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>One dashboard for every open issue, inspection, and status</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Share updates with owners and subcontractors automatically</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Analyze trends, not just check boxes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem with Rework Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: '600', 
                marginBottom: '24px', 
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left' 
              }}>
                The Hidden Cost of Rework: Safety 
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                <span style={{ color: '#50B8E2', fontWeight: 'bold' }}>40% of all site injuries happen during rework</span>. Missed issues don't just cost money — they put crews at risk and projects behind schedule. First Time Quality isn't a slogan. It's a way to build smarter, safer, and faster.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Every observation tracked and assigned</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Fewer return trips = less risk, more trust</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Start building a culture of accountability</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              height: isMobile ? '250px' : '350px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              borderRadius: '0',
              border: 'none',
              order: isMobile ? '-1' : '0',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <CircleProgress percentage={40} color="#50B8E2" size={isMobile ? 200 : 300} />
                <p style={{
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#888',
                  marginTop: '20px',
                  textAlign: 'center',
                  maxWidth: isMobile ? '140px' : '300px'
                }}>
                  Amount of site injuries associated with rework
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin Section - Parallax */}
      <section style={{ 
        padding: '0', 
        background: '#000',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Parallax Background Image */}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%', // Taller than container to allow for parallax
          backgroundImage: 'url("/assets/screenshots/ConstructUI2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          zIndex: 1,
          opacity: '0.4',
          transform: 'translateZ(0)',
        }} 
        ref={el => {
          if (el) {
            // Add parallax scroll effect
            const handleScroll = () => {
              const scrollTop = window.pageYOffset;
              const sectionTop = el.parentElement.offsetTop;
              const scrollPosition = scrollTop - sectionTop;
              
              // Only apply parallax if we're viewing the section
              if (scrollTop + window.innerHeight > sectionTop && 
                  scrollTop < sectionTop + el.parentElement.offsetHeight) {
                // Move the background at a slower rate than scroll
                el.style.transform = `translate3d(0, ${scrollPosition * 0.4}px, 0)`;
              }
            };
            
            window.addEventListener('scroll', handleScroll);
            // Clean up event listener on component unmount
            setTimeout(() => handleScroll(), 100); // Initial position
          }
        }}></div>
        
        {/* Text Overlay Box */}
        <div style={{ 
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }}>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            padding: isMobile ? '44px 33px' : '66px 66px',
            borderRadius: '8px',
            maxWidth: '990px',
            width: '90%',
            margin: '0 auto',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <img 
                src="/assets/logos/TerabaseConstructLogo.png" 
                alt="Terabase Construct" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  marginBottom: '10px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </div>
            <h2 style={{ 
              fontSize: isMobile ? '32px' : '42px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              color: '#fff'
            }}>
              See the Job, Not Just the Punchlist
            </h2>
            <ul ref={addToRefs} style={{ 
              color: '#ccc', 
              fontSize: isMobile ? '14px' : '16px', 
              paddingLeft: '0',
              marginBottom: '0',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px',
              justifyContent: 'center',
              listStyleType: 'none'
            }}>
              <li style={{ 
                marginBottom: isMobile ? '8px' : '0', 
                opacity: '0', 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '180px'
              }}>
                <div style={{ marginBottom: '10px', fontSize: '24px', color: 'white' }}>
                  <img 
                    src="/assets/icons/pin.png" 
                    alt="Map pin icon" 
                    style={{ 
                      width: '30px', 
                      height: '30px',
                      margin: '0 auto'
                    }} 
                  />
                </div>
                Map-based interface with every QC activity pinned
              </li>
              <li style={{ 
                marginBottom: isMobile ? '8px' : '0', 
                opacity: '0', 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '180px'
              }}>
                <div style={{ marginBottom: '10px', fontSize: '24px', color: 'white' }}>
                  <img 
                    src="/assets/icons/history.png" 
                    alt="History icon" 
                    style={{ 
                      width: '30px', 
                      height: '30px',
                      margin: '0 auto'
                    }} 
                  />
                </div>
                Historical record of activities
              </li>
              <li style={{ 
                marginBottom: '0', 
                opacity: '0', 
                transform: 'translateY(20px)', 
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '180px'
              }}>
                <div style={{ marginBottom: '10px', fontSize: '24px', color: 'white' }}>
                  <img 
                    src="/assets/icons/findme.png" 
                    alt="Navigation icon" 
                    style={{ 
                      width: '30px', 
                      height: '30px',
                      margin: '0 auto'
                    }} 
                  />
                </div>
                Built-in navigation to find work on site
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Field Mode Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#000' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div style={{ 
              width: '100%', 
              height: isMobile ? '400px' : '550px',
              backgroundImage: 'url("/assets/screenshots/Field_Mode.PNG")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '8px',
              border: 'none',
              order: isMobile ? '-1' : '0',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}></div>
            <div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: '600', 
                marginBottom: '24px', 
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left' 
              }}>
                Field Mode: Offline, But Always On
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                No network? No problem. Construct's Field Mode lets you work fully offline — log observations, add photos, tag locations — then sync it all back at the trailer.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Full offline functionality</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Easy upload once connected</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Built for the real-world conditions of utility-scale sites</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assign, Notify, Close Out Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: '600', 
                marginBottom: '24px', 
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left' 
              }}>
                Move Fast, Stay Accountable
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                No more "who's fixing this?" Assign issues to the right crew, notify them instantly, and track status from open to verified. It's punchlist flow — minus the chaos.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Assign, notfy and close-out issues to users by role, crew, or company</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>In-app and email notifications</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Due dates, priorities, and filters built in</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              height: isMobile ? '250px' : '350px',
              backgroundImage: 'url("/assets/photos/panel_inspectors.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              border: 'none',
              order: isMobile ? '-1' : '0',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}></div>
          </div>
        </div>
      </section>

      {/* Plugged In Section */}
      <section style={{ padding: '80px 0', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/photos/export.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              border: 'none',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}></div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>
                Plugged In: Procore, Sharepoint, and more
              </h2>
              <p style={{ fontSize: '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                You don't need another silo. Construct integrates with the tools you're already using so nothing gets lost between systems. Export observations, inspections, and summaries in the formats your teams already use.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Procore integration for workflows and documents</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Sharepoint connection for plan sets</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Excel exports for remediation crews</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>CSV reports for inspections</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>API access coming soon for PowerBI and Procore</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Construct+ Section */}
      <section style={{ padding: isMobile ? '40px 20px' : '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '40px', 
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontSize: isMobile ? '24px' : '28px', 
                fontWeight: '600', 
                marginBottom: '24px', 
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left' 
              }}>
                Coming Soon: The Future of Real Time QA
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                We're piloting new ways to automate QC using AI, robotics, and aerial capture. From drone imagery to sensor-based scans, Terabase is making field data captue less manual and more real-time.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Advanced AI-powered issue detection</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Robotics-assisted module scan</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Automated Trend Reports and AI Insights</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/photos/construct_plus.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              border: 'none',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}></div>
          </div>
        </div>
      </section>

      {/* Customer Logos Section - Auto-animating Carousel */}
      <section style={{ 
        padding: isMobile ? '60px 20px' : '80px 0', 
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: isMobile ? '24px' : '28px', 
            fontWeight: '600', 
            marginBottom: '40px', 
            color: '#fff',
            textAlign: 'center' 
          }}>
            Proven in the Field, Backed by the Best
          </h2>
          
          <p style={{ 
            fontSize: isMobile ? '16px' : '18px', 
            color: '#999', 
            marginBottom: '30px', 
            maxWidth: '700px',
            margin: '0 auto 40px',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Top EPCs and developers use Construct QC to raise the bar on quality and safety.
          </p>
          
          <div style={{ 
            position: 'relative',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            {/* Auto-scrolling carousel with inline styles */}
            <div style={{
              display: 'flex',
              padding: '20px 0',
              gap: '60px',
              width: 'fit-content',
              animation: 'scrollLogos 18s cubic-bezier(0.45, 0, 0.55, 1) infinite',
              animationDirection: 'alternate'
            }}>
              {/* First set of 8 logos */}
              {[
                { name: 'EDP', file: 'EDP.png' },
                { name: 'Leeward', file: 'Leeward.png' },
                { name: 'IP', file: 'IP.png' },
                { name: 'LSBP', file: 'LSBP.png' },
                { name: 'MCC', file: 'MCC.png' },
                { name: 'Mastec', file: 'Mastec.png' },
                { name: 'NGR', file: 'NGR.png' },
                { name: 'SB', file: 'SB.png' }
              ].map((company, index) => (
                <div key={`customer-${index}`} style={{ 
                  width: isMobile ? '140px' : '200px', 
                  height: '140px',
                  flexShrink: 0,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <img 
                    src={`/assets/logos/companies/${company.file}`}
                    alt={`${company.name} Logo`}
                    style={{ 
                      width: isMobile ? '110px' : '200px',
                      height: 'auto',
                      maxHeight: '140px',
                      objectFit: 'contain',
                      opacity: 0.8
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient overlays on sides */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100px',
              height: '100%',
              background: 'linear-gradient(to right, #000, transparent)',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
            
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100%',
              background: 'linear-gradient(to left, #000, transparent)',
              zIndex: 1,
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>
        
        {/* Add the keyframes for animation */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes scrollLogos {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-200px * 4 - 60px * 4)); }
            }
          `
        }}></style>
      </section>
    </div>
  );
};

export default TestOne;