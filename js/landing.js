// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === '2') {
        window.location.href = '2d/index.html';
    } else if (e.key === '3') {
        window.location.href = '3d/index.html';
    }
});

// Add hover sound effects (optional)
const modeCards = document.querySelectorAll('.mode-card');
modeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle animation
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Particle background enhancement
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'white';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = Math.random();
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 20000 + 10000;
    particle.animate([
        { transform: 'translateY(0)', opacity: particle.style.opacity },
        { transform: `translateY(${window.innerHeight + 10}px)`, opacity: '0' }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 200);

// Easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);