document.addEventListener('DOMContentLoaded', () => {
    // Initial animation for heading
    const upSpan = document.querySelector('.title .up');
    const downSpan = document.querySelector('.title .down');

    function wrapLetters(span, startDelay) {
        const text = span.textContent;
        span.innerHTML = '';
        text.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'letter';
            letterSpan.textContent = letter;
            letterSpan.style.animationDelay = `${startDelay + index * 0.1}s`;
            span.appendChild(letterSpan);
        });
    }

    // Apply initial letter animation to "SOFTWARE ENGINEER"
    wrapLetters(upSpan, 0);
    wrapLetters(downSpan, 0.8);

    // Particle animation code (unchanged)
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    let mouseX = null;
    let mouseY = null;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1;
            this.dx = (Math.random() - 0.5) * 0.5;
            this.dy = (Math.random() - 0.5) * 0.5;
            this.color = 'rgba(255, 221, 0, 0.3)';
            this.originalDx = this.dx;
            this.originalDy = this.dy;
        }
        update() {
            if (mouseX !== null && mouseY !== null) {
                const dxToMouse = this.x - mouseX;
                const dyToMouse = this.y - mouseY;
                const distance = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse);
                if (distance < 100) {
                    const angle = Math.atan2(dyToMouse, dxToMouse);
                    this.dx += Math.cos(angle) * 0.1;
                    this.dy += Math.sin(angle) * 0.1;
                } else {
                    this.dx += (this.originalDx - this.dx) * 0.05;
                    this.dy += (this.originalDy - this.dy) * 0.05;
                }
            }
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Title cycling logic
    const titles = [
        { up: 'SOFTWARE', down: 'ENGINEER' },
        { up: 'AIML', down: 'ENGINEER' },
        { up: 'WEB', down: 'DEVELOPER' },
        { up: 'ML', down: 'RESEARCHER' }
    ];
    const titleElement = document.querySelector('.title');
    let currentIndex = 0;

    function setTitle(up, down) {
        titleElement.innerHTML = `<span class="up">${up}</span><br><span class="down">${down}</span>`;
    }

    function cycleTitle() {
        titleElement.classList.add('fade'); // Start fade-out
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length; // Move to next title
            const nextTitle = titles[currentIndex];
            setTitle(nextTitle.up, nextTitle.down); // Update content
            titleElement.classList.remove('fade'); // Start fade-in
        }, 1500); // Matches the 1.5s transition duration
    }

    // Start cycling after initial animation completes
    setTimeout(() => {
        setInterval(cycleTitle, 6000); // Cycle every 6 seconds
    }, 1000); // Wait 2.5s for initial animation to finish
});