document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 800);
    });
    
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('active');
    });
    
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate menu icon
            if (menuToggle.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks?.contains(event.target);
        const isClickOnToggle = menuToggle?.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking a link
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Scroll animations
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Call on page load
    
    // Add reveal classes to elements
    function addRevealClasses() {
        // Add to section headings
        document.querySelectorAll('section h2').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Add to advantage cards
        document.querySelectorAll('.advantage-card').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Add to use cards
        document.querySelectorAll('.use-card').forEach((el, index) => {
            el.classList.add('reveal', index % 2 === 0 ? 'fade-left' : 'fade-right');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Add to weather cards
        document.querySelectorAll('.weather-card').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
        
        // Add to forecast cards
        document.querySelectorAll('.forecast-card').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${0.1 * index}s`;
        });
    }
    
    addRevealClasses();
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Animate numbers in weather cards
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            // Extract the unit if present
            const valueText = obj.textContent;
            const unit = valueText.replace(/[0-9]/g, '');
            
            obj.textContent = value + unit;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animate weather values when they come into view
    const weatherValues = document.querySelectorAll('.weather-card .value');
    
    function animateWeatherValues() {
        weatherValues.forEach(valueEl => {
            const rect = valueEl.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!valueEl.classList.contains('animated')) {
                    valueEl.classList.add('animated');
                    
                    // Extract the number from the text
                    const valueText = valueEl.textContent;
                    const numericValue = parseInt(valueText.match(/\d+/)[0]);
                    
                    // Start from 0 and animate to the actual value
                    animateValue(valueEl, 0, numericValue, 1500);
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateWeatherValues);
    animateWeatherValues(); // Call on page load
    
    // Floating animation for cards
    const cards = document.querySelectorAll('.advantage-card, .use-card, .weather-card, .forecast-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-float');
    });
    
    // Weather page specific functionality
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const useLocationBtn = document.getElementById('useLocation');
    const locationDisplay = document.getElementById('location-display');
    
    // Simulate changing weather data based on location selection
    function updateWeatherData(state, district) {
        if (locationDisplay) {
            locationDisplay.textContent = `Weather for: ${district}, ${state}`;
            
            // Add animation class
            locationDisplay.classList.add('animate-fade-in');
            setTimeout(() => {
                locationDisplay.classList.remove('animate-fade-in');
            }, 1000);
            
            // In a real application, you would fetch actual weather data from an API
            // This is just a simulation
            const temperatures = {
                'maharashtra': { 'pune': 32, 'nashik': 30, 'nagpur': 35, 'amravati': 33, 'solapur': 36 },
                'punjab': { 'pune': 28, 'nashik': 27, 'nagpur': 29, 'amravati': 28, 'solapur': 30 }
            };
            
            const humidity = {
                'maharashtra': { 'pune': 65, 'nashik': 70, 'nagpur': 55, 'amravati': 60, 'solapur': 50 },
                'punjab': { 'pune': 75, 'nashik': 80, 'nagpur': 70, 'amravati': 75, 'solapur': 65 }
            };
            
            // Get random values if the specific location is not in our data
            const temp = temperatures[state]?.[district] || Math.floor(Math.random() * 10) + 25;
            const humid = humidity[state]?.[district] || Math.floor(Math.random() * 30) + 50;
            
            // Update the DOM with new values and animate them
            const tempEl = document.querySelector('.weather-card:nth-child(1) .value');
            const humidEl = document.querySelector('.weather-card:nth-child(2) .value');
            const windEl = document.querySelector('.weather-card:nth-child(3) .value');
            const rainEl = document.querySelector('.weather-card:nth-child(4) .value');
            
            if (tempEl) {
                tempEl.classList.remove('animated');
                setTimeout(() => {
                    animateValue(tempEl, 0, temp, 1500);
                    tempEl.classList.add('animated');
                }, 100);
            }
            
            if (humidEl) {
                humidEl.classList.remove('animated');
                setTimeout(() => {
                    animateValue(humidEl, 0, humid, 1500);
                    humidEl.classList.add('animated');
                }, 200);
            }
            
            if (windEl) {
                const windSpeed = Math.floor(Math.random() * 20) + 5;
                windEl.classList.remove('animated');
                setTimeout(() => {
                    animateValue(windEl, 0, windSpeed, 1500);
                    windEl.classList.add('animated');
                }, 300);
            }
            
            if (rainEl) {
                const rainChance = Math.floor(Math.random() * 70);
                rainEl.classList.remove('animated');
                setTimeout(() => {
                    animateValue(rainEl, 0, rainChance, 1500);
                    rainEl.classList.add('animated');
                }, 400);
            }
            
            // Animate forecast cards
            document.querySelectorAll('.forecast-card').forEach((card, index) => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 500 + (index * 100));
            });
        }
    }
    
    // Handle state selection change
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            if (stateSelect.value && districtSelect.value) {
                updateWeatherData(stateSelect.value, districtSelect.value);
            }
        });
    }
    
    // Handle district selection change
    if (districtSelect) {
        districtSelect.addEventListener('change', function() {
            if (stateSelect.value && districtSelect.value) {
                updateWeatherData(stateSelect.value, districtSelect.value);
            }
        });
    }
    
    // Handle "Use My Location" button click
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', function() {
            // Add loading animation to button
            useLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
            useLocationBtn.disabled = true;
            
            // In a real application, you would use the Geolocation API
            // For this demo, we'll just simulate it
            setTimeout(function() {
                if (stateSelect && districtSelect) {
                    stateSelect.value = 'maharashtra';
                    districtSelect.value = 'pune';
                    updateWeatherData('Maharashtra', 'Pune');
                    
                    // Reset button
                    useLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use My Location';
                    useLocationBtn.disabled = false;
                }
            }, 1500);
        });
    }
    
    // Login page functionality
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Add animation to login button
            const loginBtn = document.querySelector('.login-btn');
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;
            
            // Here you would normally send this data to a server
            console.log('Login attempt:', email, password);
            
            // For demo purposes, simulate a successful login with animation
            setTimeout(() => {
                // Create success notification
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.top = '20px';
                notification.style.right = '20px';
                notification.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                notification.style.color = 'white';
                notification.style.padding = '15px 25px';
                notification.style.borderRadius = '10px';
                notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                notification.style.zIndex = '9999';
                notification.style.transform = 'translateX(100%)';
                notification.style.opacity = '0';
                notification.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                notification.innerHTML = '<i class="fas fa-check-circle"></i> Login successful! Redirecting...';
                
                document.body.appendChild(notification);
                
                // Show notification with animation
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                    notification.style.opacity = '1';
                }, 100);
                
                // Redirect after showing notification
                setTimeout(() => {
                    // In a real app, redirect to dashboard
                    // window.location.href = 'dashboard.html';
                    
                    // For demo, just reset the form
                    loginBtn.innerHTML = 'Login';
                    loginBtn.disabled = false;
                    loginForm.reset();
                    
                    // Hide notification
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    
                    // Remove notification from DOM after animation
                    setTimeout(() => {
                        notification.remove();
                    }, 500);
                }, 3000);
            }, 2000);
        });
        
        // Add floating label effect
        const formInputs = document.querySelectorAll('.form-group input');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check on load if input has value
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    // Add animated background elements
    function createAnimatedBackground() {
        const sections = document.querySelectorAll('.about, .advantages, .uses, .weather-data, .weather-forecast');
        
        sections.forEach(section => {
            // Create animated circles
            for (let i = 0; i < 5; i++) {
                const circle = document.createElement('div');
                circle.className = 'animated-circle';
                circle.style.position = 'absolute';
                circle.style.width = Math.random() * 100 + 50 + 'px';
                circle.style.height = circle.style.width;
                circle.style.borderRadius = '50%';
                circle.style.background = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 150}, ${Math.random() * 50}, 0.05)`;
                circle.style.top = Math.random() * 100 + '%';
                circle.style.left = Math.random() * 100 + '%';
                circle.style.animation = `float ${Math.random() * 5 + 10}s ease-in-out infinite`;
                circle.style.animationDelay = Math.random() * 5 + 's';
                circle.style.zIndex = '0';
                
                section.appendChild(circle);
            }
        });
    }
    
    createAnimatedBackground();
    
    // Add particle effect to hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles-container';
            particlesContainer.style.position = 'absolute';
            particlesContainer.style.top = '0';
            particlesContainer.style.left = '0';
            particlesContainer.style.width = '100%';
            particlesContainer.style.height = '100%';
            particlesContainer.style.overflow = 'hidden';
            particlesContainer.style.zIndex = '0';
            
            hero.appendChild(particlesContainer);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 5 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = 'rgba(255, 255, 255, 0.5)';
                particle.style.borderRadius = '50%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.opacity = Math.random() * 0.5 + 0.3;
                
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    createParticles();
    
    // Add 3D tilt effect to cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.advantage-card, .weather-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                
                const dx = x - xc;
                const dy = y - yc;
                
                this.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(-10px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
    }
    
    addTiltEffect();
});

// Add animated weather icons
function initWeatherIcons() {
    const weatherIcons = document.querySelectorAll('.weather-card i, .forecast-card i');
    
    weatherIcons.forEach(icon => {
        // Add animation based on icon type
        if (icon.classList.contains('fa-cloud-rain') || icon.classList.contains('fa-cloud-showers-heavy')) {
            icon.style.animation = 'float 3s ease-in-out infinite';
        } else if (icon.classList.contains('fa-sun')) {
            icon.style.animation = 'rotate 10s linear infinite';
            icon.style.color = '#FF9800';
        } else if (icon.classList.contains('fa-cloud-sun')) {
            icon.style.animation = 'pulse 3s ease-in-out infinite';
            icon.style.color = '#FFA726';
        } else if (icon.classList.contains('fa-wind')) {
            icon.style.animation = 'slideInLeft 3s ease-in-out infinite';
        } else if (icon.classList.contains('fa-temperature-high')) {
            icon.style.animation = 'pulse 2s ease-in-out infinite';
            icon.style.color = '#FF5722';
        } else if (icon.classList.contains('fa-tint')) {
            icon.style.animation = 'float 2s ease-in-out infinite';
            icon.style.color = '#2196F3';
        }
    });
}

// Call this function after page load
window.addEventListener('load', initWeatherIcons);