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
        padding: isMobile ? '60px 0 40px' : '120px 0 80px',
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
          <div style={{ 
            position: 'relative',
            paddingLeft: '0',
            maxWidth: '1200px',
            margin: isMobile ? '0 20px' : '0 auto'
          }}>
            {/* Image container with responsive styling */}
            <div style={{ 
              width: isMobile ? '100%' : '50%', 
              height: isMobile ? '300px' : '550px',
              backgroundImage: 'url("/assets/photos/HandHeld.png")',
              backgroundSize: 'contain',
              backgroundPosition: isMobile ? 'center' : 'left',
              backgroundRepeat: 'no-repeat',
              float: isMobile ? 'none' : 'left',
              marginBottom: isMobile ? '20px' : '0',
              border: 'none'
            }}></div>
            
            {/* Text container with responsive positioning */}
            <div style={{ 
              marginLeft: isMobile ? '0' : '45%', 
              paddingTop: isMobile ? '0' : '50px',
              maxWidth: isMobile ? '100%' : '600px',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <div style={{ marginBottom: '40px' }}>
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
              <h1 style={{ 
                fontSize: isMobile ? '42px' : isTablet ? '56px' : '72px', 
                fontWeight: '600', 
                lineHeight: '1.1', 
                marginBottom: '24px',
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                The Front-End App for Quality Control
              </h1>
              <p style={{ 
                fontSize: isMobile ? '18px' : '22px', 
                lineHeight: '1.5', 
                color: '#fff', 
                marginBottom: '40px',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}>
                An app purpose built for large scale solar – from the trailer to the field.
              </p>
              
              <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', gap: '16px' }}>
                <a href="https://apps.apple.com/us/app/construct-qc/id1552435031" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                  <img 
                    src="/assets/badges/apple.png" 
                    alt="Download on App Store" 
                    style={{ 
                      height: '48px', 
                      width: 'auto',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.terabase.inspect" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
                  <img 
                    src="/assets/badges/google.png" 
                    alt="Get it on Google Play" 
                    style={{ 
                      height: '48px', 
                      width: 'auto',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </a>
              </div>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>
      </section>

      {/* For Supers & Foremen Section */}
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
                Get it Right the First Time
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                When you're out in the work, every step matters. Construct helps you walk the site, spot issues, log them instantly, and close them out — no paperwork, no desktop, no BS. It's quality assurance that fits in your pocket.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Log issues with GPS-precision from your phone</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Create punchlists that get acted on, not ignored</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Works offline, in the sun, on your terms</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              height: 'auto', 
              backgroundColor: 'transparent',
              border: 'none',
              order: isMobile ? '-1' : '0',
              opacity: '0',
              transform: 'translateY(40px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }} ref={addToImageRefs}>
              <div style={{
                width: '300px',
                height: '150px',
                backgroundImage: 'url("/assets/screenshots/1-1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
              <div style={{
                width: '300px',
                height: '150px',
                backgroundImage: 'url("/assets/screenshots/2-1.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
              <div style={{
                width: '300px',
                height: '150px',
                backgroundImage: 'url("/assets/screenshots/2-2.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
              <div style={{
                width: '300px',
                height: '150px',
                backgroundImage: 'url("/assets/screenshots/2-3.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}></div>
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
              backgroundImage: 'url("/assets/screenshots/ConstructUI2.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
                Safety is The Hidden Cost of Rework 
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                <span style={{ color: '#50B8E2', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>40%</span> of all site injuries happen during rework. Missed issues don't just cost money — they put crews at risk and projects behind schedule. First Time Quality isn't a slogan. It's a way to build smarter, safer, and faster.
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
                  fontFamily: 'Chivo, sans-serif',
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#999',
                  marginTop: '20px',
                  textAlign: 'center'
                }}>
                  Amount of site injuries associated with rework
                </p>
              </div>
            </div>
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
              backgroundImage: 'url("/assets/screenshots/IMG_6850.PNG")',
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

      {/* Inspections Program Section */}
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
              backgroundImage: 'url("/assets/photos/ipad.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
                Inspections Program: From random checks to structured excellence
              </h2>
              <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                Whether you're doing a full handoff inspection or spot-checking piles, Construct makes inspections easy to build, manage, and track.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: isMobile ? '14px' : '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Inspection templates for every scope</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Location-linked findings and status</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Export-ready reports for walkthroughs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Twin Section - Parallax */}
      <section style={{ 
        padding: '0', 
        background: '#000',
        position: 'relative',
        height: isMobile ? '550px' : '700px',
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
          opacity: '0.9',
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
            padding: isMobile ? '40px 30px' : '60px 60px',
            borderRadius: '8px',
            maxWidth: '900px',
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
              fontSize: isMobile ? '24px' : '32px', 
              fontWeight: '600', 
              marginBottom: '26px', 
              color: '#fff'
            }}>
              See the Job, Not Just the List
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

      {/* Reporting & Exports Section */}
      <section style={{ padding: '80px 0', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/screenshots/ConstructUI4.png")',
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
                Reporting & Exports: From punchlist to PowerBI
              </h2>
              <p style={{ fontSize: '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                Need to report out? Construct makes it easy. Export observations, inspections, and summaries in the formats your teams already use.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Custom Excel exports for remediation crews</li>
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

      {/* GPS & Site Navigation Section */}
      <section style={{ padding: '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>
                GPS & Site Navigation: Know where you're needed
              </h2>
              <p style={{ fontSize: '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                You're not just logging data — you're moving through a 1,000-acre job site. Construct uses GPS to help you locate issues, scan the work, and get there faster.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Geotagged observations</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Real-time location on the site map</li>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>AI-powered inspection suggestions based on location (beta)</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/screenshots/IMG_6857.PNG")',
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

      {/* Plugged In Section */}
      <section style={{ padding: '80px 0', background: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/screenshots/ConstructUI3.png")',
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
                You don't need another silo. Construct integrates with the tools you're already using — so nothing gets lost between systems.
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
                }}>CSV/Excel exports compatible with every major platform</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Construct+ Section */}
      <section style={{ padding: '80px 0', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>
                Construct+ (Coming Soon): The future of real-time QA
              </h2>
              <p style={{ fontSize: '18px', color: '#999', marginBottom: '24px', lineHeight: '1.6' }}>
                We're piloting new ways to automate QC using AI, robotics, and aerial capture. From drone imagery to sensor-based scans, Construct+ is building the future of field data — with less manual input, more real-time insight.
              </p>
              <ul ref={addToRefs} style={{ color: '#999', fontSize: '16px', paddingLeft: '20px', marginBottom: '24px' }}>
                <li style={{ 
                  marginBottom: '8px', 
                  opacity: '0', 
                  transform: 'translateY(20px)', 
                  transition: 'opacity 0.5s ease, transform 0.5s ease' 
                }}>Aerial inspection via drones</li>
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
                }}>AI-powered issue detection + trends</li>
              </ul>
            </div>
            <div style={{ 
              width: '100%', 
              height: '350px', 
              backgroundImage: 'url("/assets/photos/solar-farm-construction-aerial.jpg")',
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

      {/* Stay in the Loop Section */}
      <section style={{ 
        padding: isMobile ? '60px 20px' : '100px 0', 
        background: 'linear-gradient(to bottom, #000, #111)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ 
            maxWidth: isMobile ? '100%' : '800px', 
            margin: '0 auto',
            padding: isMobile ? '30px 20px' : '40px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '28px' : '36px', 
              marginBottom: '24px',
              background: 'linear-gradient(to right, var(--color-light-blue), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Stay in the Loop
            </h2>
            <p style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              color: '#999', 
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              We're just getting started. Drop your email and we'll send you updates on new features, field stories, and lessons in First Time Quality.
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              maxWidth: '500px', 
              margin: '0 auto'
            }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{
                  flex: '1',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: isMobile ? '8px' : '8px 0 0 8px',
                  padding: '16px',
                  color: 'white',
                  fontSize: '16px',
                  marginBottom: isMobile ? '10px' : '0'
                }}
              />
              <button style={{
                background: 'var(--color-secondary)',
                color: '#fff',
                border: 'none',
                padding: '16px 24px',
                borderRadius: isMobile ? '8px' : '0 8px 8px 0',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Subscribe
              </button>
            </div>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '16px' }}>
              We'll only send quarterly updates. Your email stays private.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: isMobile ? '30px 20px' : '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'center' : 'center',
            gap: isMobile ? '20px' : '0'
          }}>
            <p style={{ color: '#666' }}>© 2023 Construct. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestOne; 