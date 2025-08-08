document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Toggle hamburger to X
            const spans = this.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Google Form button functionality for the "Fill the Form" button in the hero section
    const openGoogleFormHeroBtn = document.getElementById('openGoogleFormHero');
    if (openGoogleFormHeroBtn) {
        openGoogleFormHeroBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5ipXZmeUTUHt-QQRhgRwPnZe-1EOgLeMNb2p2x0m8yVhKUw/viewform?usp=dialog', '_blank');
        });
    }

    // Google Form button functionality for the "Open Study Inquiry Form" button in the contact section
    const openGoogleFormContactBtn = document.getElementById('openGoogleFormContact');
    if (openGoogleFormContactBtn) {
        openGoogleFormContactBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5ipXZmeUTUHt-QQRhgRwPnZe-1EOgLeMNb2p2x0m8yVhKUw/viewform?usp=dialog', '_blank');
        });
    }

    // Google Form button functionality for the sidebar CTA
    const openGoogleFormSidebarBtn = document.getElementById('openGoogleFormSidebar');
    if (openGoogleFormSidebarBtn) {
        openGoogleFormSidebarBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5ipXZmeUTUHt-QQRhgRwPnZe-1EOgLeMNb2p2x0m8yVhKUw/viewform?usp=dialog', '_blank');
        });
    }

    // "Explore Opportunities" button functionality (from index.html)
    const exploreOpportunitiesBtn = document.getElementById('exploreOpportunitiesBtn');
    if (exploreOpportunitiesBtn) {
        exploreOpportunitiesBtn.addEventListener('click', function() {
            window.location.href = 'supply-chain.html';
        });
    }

    // "About This Study" button functionality (from index.html) - scrolls to the top of the page (home section)
    const aboutStudyBtn = document.getElementById('aboutStudyBtn');
    if (aboutStudyBtn) {
        aboutStudyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                document.querySelector('#home').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = 'index.html#home';
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Add a class to header on scroll for subtle design change
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Background image cycling for the hero section (only on index.html)
    const heroMediaPlaceholder = document.querySelector('.hero-media-placeholder');
    if (heroMediaPlaceholder) {
        const bgImages = heroMediaPlaceholder.querySelectorAll('.hero-bg-image');
        let currentImageIndex = 0;

        if (bgImages.length > 0) {
            bgImages[currentImageIndex].classList.add('active');
        }

        function changeBackgroundImage() {
            bgImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % bgImages.length;
            bgImages[currentImageIndex].classList.add('active');
        }

        setInterval(changeBackgroundImage, 7000);
    }

    // Dynamic Static Table of Contents Logic
    const staticTocList = document.getElementById('static-toc-list') || document.getElementById('table-of-contents-list');
    let sections;

    if (window.location.pathname.includes('supply-chain.html')) {
        sections = document.querySelectorAll('.main-content h2[id]');
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        sections = document.querySelectorAll('section[id]');
    }

    if (staticTocList && sections && sections.length > 0) {
        // Only create TOC items if not on mobile
        if (window.innerWidth > 768) {
            sections.forEach(section => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${section.id}`;
                link.className = 'toc-link';
                
                if (window.location.pathname.includes('supply-chain.html')) {
                    link.textContent = section.textContent.split(': ')[0];
                } else {
                    // For index.html, use the simplified section names
                    const sectionId = section.id;
                    let sectionName = '';
                    switch(sectionId) {
                        case 'home':
                            sectionName = '1. Home';
                            break;
                        case 'understanding-nuclear':
                            sectionName = '2. Nuclear Power Explained';
                            break;
                        case 'kenyas-journey':
                            sectionName = '3. Kenya\'s Nuclear Journey';
                            break;
                        case 'key-opportunities':
                            sectionName = '4. Supply Chain Opportunities';
                            break;
                        case 'contact':
                            sectionName = '5. Contact & Participation';
                            break;
                        default:
                            sectionName = section.textContent;
                    }
                    link.textContent = sectionName;
                }

                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });

                listItem.appendChild(link);
                staticTocList.appendChild(listItem);
            });

            const updateActiveTocLink = () => {
                if (window.innerWidth <= 768) return; // Skip on mobile
                
                let currentActive = null;
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
                        currentActive = section.id;
                        break;
                    }
                }

                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                    link.classList.remove('hover-active');
                });

                if (currentActive) {
                    const activeLink = document.querySelector(`.toc-link[href="#${currentActive}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            };

            window.addEventListener('scroll', updateActiveTocLink);
            window.addEventListener('load', updateActiveTocLink);
        }
    }

    // Handle mobile behavior for the beaming CTA
    const beamingCta = document.querySelector('.beaming-cta');
    if (beamingCta) {
        function updateBeamingCtaPosition() {
            if (window.innerWidth <= 768) {
                // Mobile behavior
                beamingCta.style.position = 'fixed';
                beamingCta.style.bottom = '15px';
                beamingCta.style.right = '15px';
                beamingCta.style.zIndex = '1000';
                
                // Scale based on screen size
                if (window.innerWidth <= 480) {
                    beamingCta.style.maxWidth = '130px';
                    beamingCta.style.padding = '6px 10px';
                    beamingCta.querySelector('h3').style.fontSize = '0.9em';
                    beamingCta.querySelector('p').style.fontSize = '0.7em';
                    beamingCta.querySelector('button').style.fontSize = '0.7em';
                } else {
                    beamingCta.style.maxWidth = '150px';
                    beamingCta.style.padding = '8px 12px';
                    beamingCta.querySelector('h3').style.fontSize = '0.9em';
                    beamingCta.querySelector('p').style.fontSize = '0.7em';
                    beamingCta.querySelector('button').style.fontSize = '0.7em';
                }
            } else {
                // Desktop behavior
                beamingCta.style.position = '';
                beamingCta.style.bottom = '';
                beamingCta.style.right = '';
                beamingCta.style.zIndex = '';
                beamingCta.style.maxWidth = '';
                beamingCta.style.padding = '';
            }
        }

        // Initialize position
        updateBeamingCtaPosition();
        
        // Update on resize
        window.addEventListener('resize', updateBeamingCtaPosition);
    }

    // Make all images responsive
    document.querySelectorAll('img').forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });

    // Prevent horizontal scrolling
    function preventHorizontalScroll() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }
    
    preventHorizontalScroll();
    window.addEventListener('resize', preventHorizontalScroll);
});