document.addEventListener('DOMContentLoaded', () => {
    tsParticles.load("particles-js", {
        particles: {
            number: {
                value: 30, // Fewer particles for subtlety
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#cccccc" // Light gray for a softer look
            },
            shape: {
                type: "circle" // Simple circular particles
            },
            opacity: {
                value: 0.3, // Reduced opacity for a gentle effect
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 1, // Slower speed for smoothness
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse" // Gentle push-away effect on hover
                },
                onclick: {
                    enable: true,
                    mode: "push" // Add particles on click
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing after animation triggers
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => observer.observe(element));
});

const elements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

elements.forEach(element => observer.observe(element));

document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');

    // Move the cursor with the mouse
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });

    // Scale and change color when hovering over links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.backgroundColor = '#ffffff'; // White on hover
        });
        link.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = '#ffa500'; // Back to orange
        });
    });

    // Shrink briefly when clicking
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

document.querySelectorAll('.special-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorDot.style.backgroundColor = '#00ffff'; // Cyan color
    });
    item.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.backgroundColor = '#ffa500'; // Back to orange
    });
});

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = `${scrollPercent}%`;
});