// ===== Global Variables =====
let canvas, ctx;
let stars = [];
let constellations = [];
let animationId;
let mouseX = 0, mouseY = 0;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let offsetX = 0, offsetY = 0;
let scale = 1;
let showLines = true;
let showNames = true;
let showGrid = false;
let isNightMode = true;
let selectedConstellation = null;
let hoveredStar = null;

// ===== Constellation Data =====
const constellationData = [
    {
        name: "Ursa Major",
        description: "The Great Bear, home to the Big Dipper asterism",
        mythology: "In Greek mythology, Zeus transformed Callisto into a bear and placed her in the sky.",
        stars: [
            { name: "Dubhe", x: 200, y: 150, magnitude: 1.8 },
            { name: "Merak", x: 180, y: 180, magnitude: 2.3 },
            { name: "Phecda", x: 150, y: 200, magnitude: 2.4 },
            { name: "Megrez", x: 170, y: 170, magnitude: 3.3 },
            { name: "Alioth", x: 140, y: 160, magnitude: 1.7 },
            { name: "Mizar", x: 110, y: 150, magnitude: 2.0 },
            { name: "Alkaid", x: 80, y: 140, magnitude: 1.8 }
        ],
        lines: [[0,1], [1,3], [3,2], [3,4], [4,5], [5,6]]
    },
    {
        name: "Orion",
        description: "The Hunter, one of the most recognizable constellations",
        mythology: "Orion was a legendary hunter in Greek mythology, placed in the sky by Zeus.",
        stars: [
            { name: "Betelgeuse", x: 400, y: 200, magnitude: 0.5 },
            { name: "Bellatrix", x: 450, y: 190, magnitude: 1.6 },
            { name: "Alnitak", x: 410, y: 280, magnitude: 1.7 },
            { name: "Alnilam", x: 425, y: 280, magnitude: 1.6 },
            { name: "Mintaka", x: 440, y: 280, magnitude: 2.2 },
            { name: "Saiph", x: 410, y: 350, magnitude: 2.0 },
            { name: "Rigel", x: 460, y: 340, magnitude: 0.1 }
        ],
        lines: [[0,2], [1,4], [2,3], [3,4], [2,5], [4,6]]
    },
    {
        name: "Cassiopeia",
        description: "The Queen, shaped like a 'W' or 'M'",
        mythology: "Queen Cassiopeia was punished for her vanity by being placed upside-down in the sky.",
        stars: [
            { name: "Schedar", x: 600, y: 120, magnitude: 2.2 },
            { name: "Caph", x: 640, y: 100, magnitude: 2.2 },
            { name: "Gamma Cas", x: 680, y: 110, magnitude: 2.4 },
            { name: "Ruchbah", x: 720, y: 100, magnitude: 2.6 },
            { name: "Segin", x: 760, y: 120, magnitude: 3.3 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4]]
    },
    {
        name: "Leo",
        description: "The Lion, representing the Nemean Lion",
        mythology: "The Nemean Lion was killed by Hercules as one of his twelve labors.",
        stars: [
            { name: "Regulus", x: 300, y: 400, magnitude: 1.3 },
            { name: "Denebola", x: 420, y: 380, magnitude: 2.1 },
            { name: "Algieba", x: 340, y: 360, magnitude: 2.2 },
            { name: "Zosma", x: 380, y: 370, magnitude: 2.5 },
            { name: "Ras Elased", x: 320, y: 340, magnitude: 2.9 },
            { name: "Adhafera", x: 340, y: 330, magnitude: 3.4 }
        ],
        lines: [[0,2], [2,4], [4,5], [2,3], [3,1]]
    },
    {
        name: "Scorpius",
        description: "The Scorpion, enemy of Orion",
        mythology: "The scorpion that killed Orion, placed opposite him in the sky.",
        stars: [
            { name: "Antares", x: 550, y: 450, magnitude: 0.9 },
            { name: "Graffias", x: 520, y: 420, magnitude: 2.6 },
            { name: "Dschubba", x: 530, y: 430, magnitude: 2.3 },
            { name: "Sargas", x: 590, y: 500, magnitude: 1.8 },
            { name: "Shaula", x: 600, y: 520, magnitude: 1.6 },
            { name: "Lesath", x: 610, y: 515, magnitude: 2.6 }
        ],
        lines: [[1,2], [2,0], [0,3], [3,4], [4,5]]
    },
    {
        name: "Cygnus",
        description: "The Swan, flying along the Milky Way",
        mythology: "Zeus disguised as a swan, or Orpheus transformed after death.",
        stars: [
            { name: "Deneb", x: 150, y: 50, magnitude: 1.2 },
            { name: "Albireo", x: 170, y: 120, magnitude: 3.0 },
            { name: "Sadr", x: 160, y: 85, magnitude: 2.2 },
            { name: "Gienah", x: 130, y: 80, magnitude: 2.4 },
            { name: "Delta Cyg", x: 190, y: 90, magnitude: 2.8 }
        ],
        lines: [[0,2], [2,1], [3,2], [2,4]]
    },
    {
        name: "Andromeda",
        description: "The Princess, chained to a rock as sacrifice",
        mythology: "Princess Andromeda was saved by Perseus from the sea monster Cetus.",
        stars: [
            { name: "Alpheratz", x: 750, y: 200, magnitude: 2.1 },
            { name: "Mirach", x: 800, y: 220, magnitude: 2.0 },
            { name: "Almach", x: 850, y: 180, magnitude: 2.1 },
            { name: "Delta And", x: 770, y: 240, magnitude: 3.3 },
            { name: "Mu And", x: 880, y: 160, magnitude: 3.9 }
        ],
        lines: [[0,1], [1,2], [0,3], [2,4]]
    },
    {
        name: "Perseus",
        description: "The Hero, slayer of Medusa",
        mythology: "Perseus rescued Andromeda and slayed the Gorgon Medusa.",
        stars: [
            { name: "Mirfak", x: 650, y: 150, magnitude: 1.8 },
            { name: "Algol", x: 620, y: 180, magnitude: 2.1 },
            { name: "Epsilon Per", x: 680, y: 170, magnitude: 2.9 },
            { name: "Zeta Per", x: 700, y: 200, magnitude: 2.9 },
            { name: "Delta Per", x: 640, y: 140, magnitude: 3.0 }
        ],
        lines: [[0,1], [0,2], [0,4], [1,3], [2,3]]
    },
    {
        name: "Lyra",
        description: "The Harp, instrument of Orpheus",
        mythology: "The lyre of Orpheus, whose music could charm all living things.",
        stars: [
            { name: "Vega", x: 250, y: 80, magnitude: 0.0 },
            { name: "Sheliak", x: 270, y: 110, magnitude: 3.5 },
            { name: "Sulafat", x: 280, y: 115, magnitude: 3.2 },
            { name: "Delta Lyr", x: 290, y: 95, magnitude: 4.3 },
            { name: "Epsilon Lyr", x: 260, y: 70, magnitude: 4.7 }
        ],
        lines: [[0,1], [1,2], [0,3], [0,4]]
    },
    {
        name: "Aquila",
        description: "The Eagle, Zeus's messenger",
        mythology: "The eagle that carried Zeus's thunderbolts and abducted Ganymede.",
        stars: [
            { name: "Altair", x: 320, y: 250, magnitude: 0.8 },
            { name: "Tarazed", x: 310, y: 230, magnitude: 2.7 },
            { name: "Alshain", x: 330, y: 270, magnitude: 3.7 },
            { name: "Delta Aql", x: 350, y: 280, magnitude: 3.4 },
            { name: "Lambda Aql", x: 290, y: 290, magnitude: 3.4 }
        ],
        lines: [[1,0], [0,2], [0,3], [0,4]]
    },
    {
        name: "Pegasus",
        description: "The Winged Horse",
        mythology: "The flying horse born from the blood of Medusa, tamed by Bellerophon.",
        stars: [
            { name: "Markab", x: 820, y: 300, magnitude: 2.5 },
            { name: "Scheat", x: 800, y: 280, magnitude: 2.4 },
            { name: "Algenib", x: 840, y: 320, magnitude: 2.8 },
            { name: "Enif", x: 780, y: 340, magnitude: 2.4 },
            { name: "Homam", x: 810, y: 310, magnitude: 3.4 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,0], [0,4]]
    },
    {
        name: "Taurus",
        description: "The Bull, with the bright star Aldebaran",
        mythology: "Zeus disguised as a bull to abduct Europa.",
        stars: [
            { name: "Aldebaran", x: 500, y: 250, magnitude: 0.9 },
            { name: "Elnath", x: 480, y: 220, magnitude: 1.7 },
            { name: "Alcyone", x: 520, y: 230, magnitude: 2.9 },
            { name: "Maia", x: 525, y: 235, magnitude: 3.9 },
            { name: "Merope", x: 530, y: 240, magnitude: 4.1 }
        ],
        lines: [[0,1], [0,2], [2,3], [3,4]]
    },
    {
        name: "Gemini",
        description: "The Twins, Castor and Pollux",
        mythology: "The twin brothers, one mortal and one immortal, sharing immortality.",
        stars: [
            { name: "Pollux", x: 380, y: 300, magnitude: 1.1 },
            { name: "Castor", x: 360, y: 290, magnitude: 1.6 },
            { name: "Alhena", x: 350, y: 330, magnitude: 1.9 },
            { name: "Wasat", x: 370, y: 315, magnitude: 3.5 },
            { name: "Mebsuta", x: 340, y: 305, magnitude: 3.0 }
        ],
        lines: [[0,1], [0,2], [1,4], [2,3], [3,4]]
    },
    {
        name: "Cancer",
        description: "The Crab, home to the Beehive Cluster",
        mythology: "The crab that pinched Hercules during his fight with the Hydra.",
        stars: [
            { name: "Altarf", x: 320, y: 350, magnitude: 3.5 },
            { name: "Al Tarf", x: 300, y: 340, magnitude: 4.2 },
            { name: "Asellus Borealis", x: 310, y: 330, magnitude: 4.7 },
            { name: "Asellus Australis", x: 315, y: 345, magnitude: 3.9 },
            { name: "Acubens", x: 330, y: 360, magnitude: 4.2 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4], [4,0]]
    },
    {
        name: "Virgo",
        description: "The Virgin, holding an ear of wheat (Spica)",
        mythology: "Associated with harvest goddesses like Ceres and Persephone.",
        stars: [
            { name: "Spica", x: 220, y: 420, magnitude: 1.0 },
            { name: "Zavijava", x: 180, y: 380, magnitude: 3.6 },
            { name: "Porrima", x: 200, y: 400, magnitude: 2.7 },
            { name: "Minelauva", x: 160, y: 360, magnitude: 3.4 },
            { name: "Vindemiatrix", x: 170, y: 370, magnitude: 2.9 }
        ],
        lines: [[1,2], [2,0], [2,3], [3,4]]
    },
    {
        name: "Libra",
        description: "The Scales of Justice",
        mythology: "The scales held by Astraea, goddess of justice.",
        stars: [
            { name: "Zubenelgenubi", x: 280, y: 460, magnitude: 2.7 },
            { name: "Zubeneschamali", x: 320, y: 440, magnitude: 2.6 },
            { name: "Zubenelakrab", x: 340, y: 480, magnitude: 3.9 },
            { name: "Brachium", x: 310, y: 470, magnitude: 3.3 }
        ],
        lines: [[0,1], [1,2], [1,3]]
    },
    {
        name: "Sagittarius",
        description: "The Archer, pointing toward the galactic center",
        mythology: "Chiron the centaur, wise teacher of heroes.",
        stars: [
            { name: "Kaus Australis", x: 450, y: 520, magnitude: 1.8 },
            { name: "Nunki", x: 480, y: 500, magnitude: 2.0 },
            { name: "Ascella", x: 500, y: 510, magnitude: 2.6 },
            { name: "Kaus Media", x: 460, y: 510, magnitude: 2.7 },
            { name: "Kaus Borealis", x: 470, y: 490, magnitude: 2.8 },
            { name: "Albaldah", x: 520, y: 530, magnitude: 2.8 }
        ],
        lines: [[0,3], [3,4], [4,1], [1,2], [2,5], [3,0]]
    },
    {
        name: "Capricornus",
        description: "The Sea Goat, half goat half fish",
        mythology: "Pan transformed into a goat-fish to escape the monster Typhon.",
        stars: [
            { name: "Deneb Algedi", x: 580, y: 480, magnitude: 2.9 },
            { name: "Dabih", x: 550, y: 470, magnitude: 3.1 },
            { name: "Nashira", x: 570, y: 490, magnitude: 3.7 },
            { name: "Algedi", x: 540, y: 460, magnitude: 3.6 }
        ],
        lines: [[3,1], [1,2], [2,0]]
    },
    {
        name: "Aquarius",
        description: "The Water Bearer, pouring celestial waters",
        mythology: "Ganymede, cupbearer to the gods, or Deucalion of the great flood.",
        stars: [
            { name: "Sadalsuud", x: 720, y: 450, magnitude: 2.9 },
            { name: "Sadalmelik", x: 750, y: 430, magnitude: 3.0 },
            { name: "Sadachbia", x: 700, y: 460, magnitude: 3.8 },
            { name: "Albali", x: 680, y: 480, magnitude: 3.8 },
            { name: "Ancha", x: 770, y: 440, magnitude: 4.2 }
        ],
        lines: [[0,1], [0,2], [2,3], [1,4]]
    },
    {
        name: "Pisces",
        description: "The Fishes, swimming in opposite directions",
        mythology: "Aphrodite and Eros transformed into fish to escape Typhon.",
        stars: [
            { name: "Alrescha", x: 900, y: 380, magnitude: 3.8 },
            { name: "Fum al Samakah", x: 880, y: 360, magnitude: 4.5 },
            { name: "Delta Psc", x: 890, y: 370, magnitude: 4.4 },
            { name: "Epsilon Psc", x: 910, y: 390, magnitude: 4.3 },
            { name: "Gamma Psc", x: 920, y: 385, magnitude: 3.7 }
        ],
        lines: [[1,2], [2,3], [3,0], [0,4]]
    },
    {
        name: "Aries",
        description: "The Ram with the Golden Fleece",
        mythology: "The ram that carried Phrixus to safety, its fleece sought by Jason.",
        stars: [
            { name: "Hamal", x: 950, y: 250, magnitude: 2.0 },
            { name: "Sheratan", x: 930, y: 260, magnitude: 2.6 },
            { name: "Mesarthim", x: 925, y: 270, magnitude: 3.9 },
            { name: "41 Ari", x: 970, y: 240, magnitude: 3.6 }
        ],
        lines: [[0,1], [1,2], [0,3]]
    },
    {
        name: "Draco",
        description: "The Dragon wrapped around the north pole",
        mythology: "Ladon, the dragon that guarded the golden apples.",
        stars: [
            { name: "Thuban", x: 350, y: 50, magnitude: 3.7 },
            { name: "Etamin", x: 380, y: 80, magnitude: 2.2 },
            { name: "Rastaban", x: 360, y: 90, magnitude: 2.8 },
            { name: "Altais", x: 320, y: 40, magnitude: 3.1 },
            { name: "Aldhibah", x: 340, y: 60, magnitude: 3.0 }
        ],
        lines: [[0,4], [4,3], [0,1], [1,2]]
    },
    {
        name: "Hercules",
        description: "The Hero kneeling with club raised",
        mythology: "The mighty hero who completed twelve labors.",
        stars: [
            { name: "Kornephoros", x: 280, y: 120, magnitude: 2.8 },
            { name: "Zeta Her", x: 260, y: 100, magnitude: 2.8 },
            { name: "Pi Her", x: 270, y: 90, magnitude: 3.2 },
            { name: "Eta Her", x: 290, y: 85, magnitude: 3.5 },
            { name: "Delta Her", x: 300, y: 130, magnitude: 3.1 }
        ],
        lines: [[0,1], [1,2], [2,3], [0,4]]
    },
    {
        name: "Boötes",
        description: "The Herdsman, following the Great Bear",
        mythology: "The plowman driving the oxen of the Great Bear around the pole.",
        stars: [
            { name: "Arcturus", x: 180, y: 280, magnitude: -0.1 },
            { name: "Nekkar", x: 200, y: 250, magnitude: 3.5 },
            { name: "Seginus", x: 190, y: 260, magnitude: 3.0 },
            { name: "Epsilon Boo", x: 170, y: 290, magnitude: 2.4 },
            { name: "Muphrid", x: 175, y: 300, magnitude: 2.7 }
        ],
        lines: [[0,3], [3,2], [2,1], [0,4]]
    },
    {
        name: "Corona Borealis",
        description: "The Northern Crown, Ariadne's crown",
        mythology: "The crown given to Ariadne by Dionysus, placed in the sky.",
        stars: [
            { name: "Alphecca", x: 240, y: 180, magnitude: 2.2 },
            { name: "Nusakan", x: 250, y: 170, magnitude: 3.7 },
            { name: "Theta CrB", x: 230, y: 175, magnitude: 4.1 },
            { name: "Beta CrB", x: 235, y: 185, magnitude: 3.7 }
        ],
        lines: [[2,3], [3,0], [0,1]]
    }
];

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeCanvas();
    generateRandomStars();
    loadConstellations();
    setupEventListeners();
    hideLoader();
    startAnimation();
    updateTime();
});

function initializeCanvas() {
    canvas = document.getElementById('skyCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const container = document.querySelector('.sky-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        document.getElementById('app').classList.add('visible');
    }, 1500);
}

// ===== Star Generation =====
function generateRandomStars() {
    const starCount = 800;
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * 2000,
            y: Math.random() * 1000,
            magnitude: Math.random() * 4 + 1,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    updateStarCount();
}

function loadConstellations() {
    constellations = constellationData.map((constellation, index) => ({
        ...constellation,
        id: index,
        visible: true,
        color: `hsl(${index * 60}, 70%, 60%)`
    }));
    
    renderConstellationList();
    updateConstellationCount();
}

// ===== Rendering =====
function draw() {
    // Clear canvas
    ctx.fillStyle = isNightMode ? '#0a0a0f' : '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Apply transformations
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2 + offsetX, -canvas.height / 2 + offsetY);
    
    // Draw grid if enabled
    if (showGrid) {
        drawGrid();
    }
    
    // Draw random stars
    drawStars();
    
    // Draw constellations
    constellations.forEach(constellation => {
        if (constellation.visible) {
            drawConstellation(constellation);
        }
    });
    
    ctx.restore();
    
    // Draw UI elements that shouldn't be transformed
    drawCompass();
}

function drawStars() {
    stars.forEach(star => {
        const brightness = Math.sin(star.twinkle) * 0.3 + 0.7;
        star.twinkle += star.twinkleSpeed;
        
        const size = (5 - star.magnitude) * scale;
        
        // Create gradient for star
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size);
        
        if (star.magnitude < 2) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
            gradient.addColorStop(0.5, `rgba(255, 235, 59, ${brightness * 0.6})`);
            gradient.addColorStop(1, 'transparent');
        } else if (star.magnitude < 3.5) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.8})`);
            gradient.addColorStop(0.5, `rgba(144, 202, 249, ${brightness * 0.4})`);
            gradient.addColorStop(1, 'transparent');
        } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.6})`);
            gradient.addColorStop(0.5, `rgba(158, 158, 158, ${brightness * 0.3})`);
            gradient.addColorStop(1, 'transparent');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawConstellation(constellation) {
    // Draw constellation lines
    if (showLines) {
        ctx.strokeStyle = isNightMode ? 'rgba(77, 213, 237, 0.5)' : 'rgba(45, 90, 90, 0.6)';
        ctx.lineWidth = 2 * scale;
        ctx.setLineDash([5, 5]);
        
        constellation.lines.forEach(line => {
            const star1 = constellation.stars[line[0]];
            const star2 = constellation.stars[line[1]];
            
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
        });
        
        ctx.setLineDash([]);
    }
    
    // Draw constellation stars
    constellation.stars.forEach(star => {
        const size = (6 - star.magnitude) * scale;
        
        // Star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, constellation.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Star core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw constellation name
    if (showNames) {
        const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length;
        const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length;
        
        ctx.font = `${14 * scale}px Orbitron`;
        ctx.fillStyle = isNightMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(45, 90, 90, 0.9)';
        ctx.textAlign = 'center';
        ctx.fillText(constellation.name, centerX, centerY - 20);
    }
}

function drawGrid() {
    ctx.strokeStyle = isNightMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < 2000; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1000);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < 1000; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(2000, y);
        ctx.stroke();
    }
}

function drawCompass() {
    const compass = document.querySelector('.compass');
    const rotation = offsetX / 10;
    compass.style.transform = `rotate(${rotation}deg)`;
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Canvas interactions
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('dblclick', handleDoubleClick);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    // Control buttons
    document.getElementById('toggleLines').addEventListener('click', toggleConstellationLines);
    document.getElementById('toggleNames').addEventListener('click', toggleConstellationNames);
    document.getElementById('toggleGrid').addEventListener('click', toggleCoordinateGrid);
    document.getElementById('nightMode').addEventListener('click', toggleNightMode);
    
    // Zoom controls
    document.getElementById('zoomIn').addEventListener('click', () => zoomCanvas(1.2));
    document.getElementById('zoomOut').addEventListener('click', () => zoomCanvas(0.8));
    document.getElementById('resetView').addEventListener('click', resetView);
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Help
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    document.getElementById('closeHelp').addEventListener('click', hideHelp);
    
    // Modal
    document.getElementById('closeModal').addEventListener('click', hideModal);
}

// ===== Mouse Interactions =====
function handleMouseDown(e) {
    isDragging = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
    canvas.style.cursor = 'grabbing';
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (isDragging) {
        offsetX = e.clientX - dragStartX;
        offsetY = e.clientY - dragStartY;
    } else {
        checkHover();
    }
}

function handleMouseUp() {
    isDragging = false;
    canvas.style.cursor = 'grab';
}

function handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    zoomCanvas(delta);
}

function handleDoubleClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Center view on clicked position
    offsetX = canvas.width / 2 - x;
    offsetY = canvas.height / 2 - y;
}

// ===== Touch Events =====
function handleTouchStart(e) {
    if (e.touches.length === 1) {
        isDragging = true;
        const touch = e.touches[0];
        dragStartX = touch.clientX - offsetX;
        dragStartY = touch.clientY - offsetY;
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging) {
        const touch = e.touches[0];
        offsetX = touch.clientX - dragStartX;
        offsetY = touch.clientY - dragStartY;
    }
}

function handleTouchEnd() {
    isDragging = false;
}

// ===== Hover Detection =====
function checkHover() {
    const tooltip = document.getElementById('tooltip');
    hoveredStar = null;
    
    // Transform mouse coordinates to world space
    const worldX = (mouseX - canvas.width / 2) / scale + canvas.width / 2 - offsetX;
    const worldY = (mouseY - canvas.height / 2) / scale + canvas.height / 2 - offsetY;
    
    // Check constellation stars
    for (const constellation of constellations) {
        if (!constellation.visible) continue;
        
        for (const star of constellation.stars) {
            const distance = Math.sqrt(Math.pow(star.x - worldX, 2) + Math.pow(star.y - worldY, 2));
            if (distance < 10) {
                hoveredStar = { ...star, constellation: constellation.name };
                showTooltip(star, constellation.name);
                return;
            }
        }
    }
    
    // Hide tooltip if no star is hovered
    tooltip.classList.add('hidden');
}

function showTooltip(star, constellationName) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <h4>${star.name}</h4>
        <p>Constellation: ${constellationName}</p>
        <p>Magnitude: ${star.magnitude.toFixed(1)}</p>
    `;
    
    tooltip.style.left = mouseX + 20 + 'px';
    tooltip.style.top = mouseY - 10 + 'px';
    tooltip.classList.remove('hidden');
}

// ===== Control Functions =====
function toggleConstellationLines() {
    showLines = !showLines;
    document.getElementById('toggleLines').classList.toggle('active', showLines);
}

function toggleConstellationNames() {
    showNames = !showNames;
    document.getElementById('toggleNames').classList.toggle('active', showNames);
}

function toggleCoordinateGrid() {
    showGrid = !showGrid;
    document.getElementById('toggleGrid').classList.toggle('active', showGrid);
}

function toggleNightMode() {
    isNightMode = !isNightMode;
    document.body.classList.toggle('light-mode', !isNightMode);
    document.getElementById('nightMode').classList.toggle('active', isNightMode);
}

function zoomCanvas(factor) {
    const newScale = scale * factor;
    if (newScale >= 0.5 && newScale <= 3) {
        scale = newScale;
    }
}

function resetView() {
    offsetX = 0;
    offsetY = 0;
    scale = 1;
}

// ===== Constellation List =====
function renderConstellationList() {
    const listContainer = document.getElementById('constellationList');
    listContainer.innerHTML = '';
    
    constellations.forEach(constellation => {
        const item = document.createElement('div');
        item.className = 'constellation-item';
        item.innerHTML = `
            <div>
                <div class="constellation-name">${constellation.name}</div>
                <div class="constellation-info">${constellation.stars.length} stars</div>
            </div>
            <span class="constellation-visibility ${constellation.visible ? 'visible' : 'hidden'}"></span>
        `;
        
        item.addEventListener('click', () => {
            selectConstellation(constellation);
        });
        
        listContainer.appendChild(item);
    });
}

function selectConstellation(constellation) {
    selectedConstellation = constellation;
    
    // Update active state in list
    document.querySelectorAll('.constellation-item').forEach((item, index) => {
        item.classList.toggle('active', index === constellation.id);
    });
    
    // Center view on constellation
    const centerX = constellation.stars.reduce((sum, star) => sum + star.x, 0) / constellation.stars.length;
    const centerY = constellation.stars.reduce((sum, star) => sum + star.y, 0) / constellation.stars.length;
    
    offsetX = canvas.width / 2 - centerX * scale;
    offsetY = canvas.height / 2 - centerY * scale;
    
    // Show constellation details
    showConstellationDetails(constellation);
}

function showConstellationDetails(constellation) {
    const modal = document.getElementById('constellationModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    title.textContent = constellation.name;
    body.innerHTML = `
        <h3>Description</h3>
        <p>${constellation.description}</p>
        
        <h3>Mythology</h3>
        <p>${constellation.mythology}</p>
        
        <h3>Notable Stars</h3>
        <ul>
            ${constellation.stars.map(star => `
                <li>${star.name} - Magnitude ${star.magnitude.toFixed(1)}</li>
            `).join('')}
        </ul>
        
        <h3>Visibility</h3>
        <p>Best viewed during: ${getVisibilityInfo(constellation.name)}</p>
    `;
    
    modal.classList.remove('hidden');
}

function getVisibilityInfo(constellationName) {
    const visibility = {
        "Ursa Major": "Spring (April-June)",
        "Orion": "Winter (December-February)",
        "Cassiopeia": "Year-round (circumpolar)",
        "Leo": "Spring (March-May)",
        "Scorpius": "Summer (June-August)",
        "Cygnus": "Summer (July-September)"
    };
    return visibility[constellationName] || "Various times";
}

// ===== Search Functionality =====
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.constellation-item');
    
    items.forEach((item, index) => {
        const constellation = constellations[index];
        const matches = constellation.name.toLowerCase().includes(searchTerm);
        item.style.display = matches ? 'flex' : 'none';
    });
}

// ===== Modal Functions =====
function hideModal() {
    document.getElementById('constellationModal').classList.add('hidden');
}

function showHelp() {
    document.getElementById('helpModal').classList.remove('hidden');
}

function hideHelp() {
    document.getElementById('helpModal').classList.add('hidden');
}

// ===== Statistics Update =====
function updateStarCount() {
    document.getElementById('starCount').textContent = stars.length;
}

function updateConstellationCount() {
    document.getElementById('constellationCount').textContent = constellations.length;
}

function updateTime() {
    const updateClock = () => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('currentTime').textContent = time;
    };
    
    updateClock();
    setInterval(updateClock, 1000);
}

function startAnimation() {
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();
    
    // Occasionally create shooting stars
    setInterval(createShootingStar, 5000);
}

// ===== Special Effects =====
function createShootingStar() {
    if (!isNightMode || Math.random() > 0.7) return;
    
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position at the edge of the screen
    const side = Math.floor(Math.random() * 4);
    let startX, startY;
    
    switch(side) {
        case 0: // top
            startX = Math.random() * window.innerWidth;
            startY = 0;
            break;
        case 1: // right
            startX = window.innerWidth;
            startY = Math.random() * window.innerHeight;
            break;
        case 2: // bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight;
            break;
        case 3: // left
            startX = 0;
            startY = Math.random() * window.innerHeight;
            break;
    }
    
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 300;
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    shootingStar.style.setProperty('--endX', endX + 'px');
    shootingStar.style.setProperty('--endY', endY + 'px');
    
    document.querySelector('.sky-container').appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
        shootingStar.remove();
    }, 1000);
}

// ===== Utility Functions =====
function getStarColor(magnitude) {
    if (magnitude < 1) return '#ffffff';
    if (magnitude < 2) return '#ffeb3b';
    if (magnitude < 3) return '#90caf9';
    if (magnitude < 4) return '#b0bec5';
    return '#757575';
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// ===== Easter Eggs =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create a special animation
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        font-family: 'Orbitron', sans-serif;
        color: #ffd700;
        text-shadow: 0 0 20px #ffd700;
        z-index: 9999;
        animation: easterEgg 3s ease-out;
    `;
    message.textContent = '✨ COSMIC MODE ACTIVATED! ✨';
    document.body.appendChild(message);
    
    // Add special effects
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createShootingStar(), i * 100);
    }
    
    // Rainbow constellation lines
    let hue = 0;
    const rainbowInterval = setInterval(() => {
        hue += 5;
        constellations.forEach((constellation, index) => {
            constellation.color = `hsl(${hue + index * 30}, 70%, 60%)`;
        });
    }, 50);
    
    setTimeout(() => {
        message.remove();
        clearInterval(rainbowInterval);
        // Reset colors
        constellations.forEach((constellation, index) => {
            constellation.color = `hsl(${index * 60}, 70%, 60%)`;
        });
    }, 3000);
}

// ===== Performance Optimization =====
let lastFrameTime = 0;
const targetFPS = 60;
const frameInterval = 1000 / targetFPS;

function optimizedDraw(timestamp) {
    const deltaTime = timestamp - lastFrameTime;
    
    if (deltaTime >= frameInterval) {
        draw();
        lastFrameTime = timestamp - (deltaTime % frameInterval);
    }
    
    animationId = requestAnimationFrame(optimizedDraw);
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
        case 'l':
            toggleConstellationLines();
            break;
        case 'n':
            toggleConstellationNames();
            break;
        case 'g':
            toggleCoordinateGrid();
            break;
        case 'd':
            toggleNightMode();
            break;
        case '+':
        case '=':
            zoomCanvas(1.2);
            break;
        case '-':
            zoomCanvas(0.8);
            break;
        case 'r':
            resetView();
            break;
        case '?':
        case 'h':
            showHelp();
            break;
        case 'escape':
            hideModal();
            hideHelp();
            break;
    }
});

// ===== Mobile Gesture Support =====
let touchStartDistance = 0;
let initialScale = 1;

canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        touchStartDistance = calculateDistance(
            touch1.clientX, touch1.clientY,
            touch2.clientX, touch2.clientY
        );
        initialScale = scale;
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = calculateDistance(
            touch1.clientX, touch1.clientY,
            touch2.clientX, touch2.clientY
        );
        
        const scaleFactor = currentDistance / touchStartDistance;
        scale = Math.max(0.5, Math.min(3, initialScale * scaleFactor));
    }
});

// ===== Save/Load View State =====
function saveViewState() {
    const state = {
        offsetX,
        offsetY,
        scale,
        showLines,
        showNames,
        showGrid,
        isNightMode
    };
    localStorage.setItem('skyViewState', JSON.stringify(state));
}

function loadViewState() {
    const saved = localStorage.getItem('skyViewState');
    if (saved) {
        const state = JSON.parse(saved);
        offsetX = state.offsetX || 0;
        offsetY = state.offsetY || 0;
        scale = state.scale || 1;
        showLines = state.showLines !== undefined ? state.showLines : true;
        showNames = state.showNames !== undefined ? state.showNames : true;
        showGrid = state.showGrid !== undefined ? state.showGrid : false;
        isNightMode = state.isNightMode !== undefined ? state.isNightMode : true;
        
        // Update UI
        document.getElementById('toggleLines').classList.toggle('active', showLines);
        document.getElementById('toggleNames').classList.toggle('active', showNames);
        document.getElementById('toggleGrid').classList.toggle('active', showGrid);
        document.getElementById('nightMode').classList.toggle('active', isNightMode);
        document.body.classList.toggle('light-mode', !isNightMode);
    }
}

// Load saved state on startup
loadViewState();

// Save state before leaving
window.addEventListener('beforeunload', saveViewState);

// ===== Export Sky Map =====
function exportSkyMap() {
    const link = document.createElement('a');
    link.download = 'night-sky-map.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Add export button functionality if needed
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        exportSkyMap();
    }
});

// ===== Constellation Animation =====
function animateConstellationHighlight(constellation) {
    let opacity = 0;
    let increasing = true;
    
    const highlightInterval = setInterval(() => {
        if (increasing) {
            opacity += 0.05;
            if (opacity >= 1) increasing = false;
        } else {
            opacity -= 0.05;
            if (opacity <= 0) {
                clearInterval(highlightInterval);
                return;
            }
        }
        
        // Apply highlight effect in next draw
        constellation.highlight = opacity;
    }, 50);
}

// ===== Add CSS for Easter Egg Animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes easterEgg {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    .shooting-star {
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, transparent, #ffffff, transparent);
        transform-origin: top left;
        animation: shootingStarAnimation 1s linear;
    }
    
    @keyframes shootingStarAnimation {
        from {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(var(--endX), var(--endY)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Final Initialization =====
console.log('%c✨ Welcome to the Constellation Explorer! ✨', 
    'font-size: 20px; color: #4dd5ed; text-shadow: 0 0 10px #4dd5ed;');
console.log('%cPress "H" for help, or try the Konami Code for a surprise!', 
    'font-size: 14px; color: #90caf9;');

// ===== Additional Features =====

// Real-time constellation visibility based on date/time
function updateConstellationVisibility() {
    const now = new Date();
    const month = now.getMonth();
    
    // Simple seasonal visibility (can be enhanced with real astronomical data)
    const seasonalVisibility = {
        "Orion": [10, 11, 0, 1, 2], // November to March
        "Leo": [2, 3, 4, 5], // March to June
        "Scorpius": [5, 6, 7, 8], // June to September
        "Cygnus": [6, 7, 8, 9], // July to October
        "Cassiopeia": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Year-round
        "Ursa Major": [2, 3, 4, 5, 6] // March to July
    };
    
    constellations.forEach(constellation => {
        const visibleMonths = seasonalVisibility[constellation.name] || [];
        constellation.currentlyVisible = visibleMonths.includes(month);
    });
}

// Star information database
const starDatabase = {
    "Betelgeuse": {
        type: "Red Supergiant",
        distance: "548 light-years",
        constellation: "Orion",
        fact: "One of the largest known stars, could explode as a supernova anytime in the next 100,000 years"
    },
    "Rigel": {
        type: "Blue Supergiant",
        distance: "863 light-years",
        constellation: "Orion",
        fact: "Actually a multiple star system with at least 4 stars"
    },
    "Polaris": {
        type: "Yellow Supergiant",
        distance: "433 light-years",
        constellation: "Ursa Minor",
        fact: "The current North Star, used for navigation for centuries"
    },
    "Antares": {
        type: "Red Supergiant",
        distance: "600 light-years",
        constellation: "Scorpius",
        fact: "Name means 'rival of Mars' due to its reddish color"
    },
    "Deneb": {
        type: "Blue-white Supergiant",
        distance: "2,616 light-years",
        constellation: "Cygnus",
        fact: "One of the most luminous stars visible to the naked eye"
    }
};

// Enhanced tooltip with star database info
function showEnhancedTooltip(star, constellationName) {
    const tooltip = document.getElementById('tooltip');
    const starInfo = starDatabase[star.name] || {};
    
    tooltip.innerHTML = `
        <h4>${star.name}</h4>
        <p><strong>Constellation:</strong> ${constellationName}</p>
        <p><strong>Magnitude:</strong> ${star.magnitude.toFixed(1)}</p>
        ${starInfo.type ? `<p><strong>Type:</strong> ${starInfo.type}</p>` : ''}
        ${starInfo.distance ? `<p><strong>Distance:</strong> ${starInfo.distance}</p>` : ''}
        ${starInfo.fact ? `<p style="font-style: italic; margin-top: 5px;">${starInfo.fact}</p>` : ''}
    `;
    
    tooltip.style.left = mouseX + 20 + 'px';
    tooltip.style.top = mouseY - 10 + 'px';
    tooltip.classList.remove('hidden');
}

// Parallax effect for depth
let parallaxStars = [];

function generateParallaxStars() {
    for (let i = 0; i < 200; i++) {
        parallaxStars.push({
            x: Math.random() * 2000,
            y: Math.random() * 1000,
            depth: Math.random() * 3 + 1,
            size: Math.random() * 2
        });
    }
}

function drawParallaxStars() {
    parallaxStars.forEach(star => {
        const parallaxOffset = star.depth * 0.5;
        const x = star.x + (offsetX * parallaxOffset / 100);
        const y = star.y + (offsetY * parallaxOffset / 100);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 / star.depth})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size / star.depth, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Initialize parallax stars
generateParallaxStars();

// Update draw function to include parallax
const originalDraw = draw;
draw = function() {
    // Clear canvas
    ctx.fillStyle = isNightMode ? '#0a0a0f' : '#87ceeb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw parallax background stars first
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2 + offsetX * 0.5, -canvas.height / 2 + offsetY * 0.5);
    drawParallaxStars();
    ctx.restore();
    
    // Continue with original draw
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2 + offsetX, -canvas.height / 2 + offsetY);
    
    if (showGrid) {
        drawGrid();
    }
    
    drawStars();
    
    constellations.forEach(constellation => {
        if (constellation.visible) {
            drawConstellation(constellation);
        }
    });
    
    ctx.restore();
    drawCompass();
};

// Auto-save preferences
setInterval(() => {
    saveViewState();
}, 30000); // Save every 30 seconds

// Performance monitoring
let fps = 0;
let frameCount = 0;
let lastFpsUpdate = performance.now();

function updateFPS() {
    frameCount++;
    const now = performance.now();
    const elapsed = now - lastFpsUpdate;
    
    if (elapsed >= 1000) {
        fps = Math.round((frameCount * 1000) / elapsed);
        frameCount = 0;
        lastFpsUpdate = now;
        
        // Log performance warnings
        if (fps < 30) {
            console.warn('Performance warning: FPS below 30');
        }
    }
}

// Add FPS monitoring to animation loop
const originalAnimate = startAnimation;
startAnimation = function() {
    function animate() {
        updateFPS();
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();
    setInterval(createShootingStar, 5000);
};

// Initialize everything
updateConstellationVisibility();

// Final message
console.log('%cEnjoy exploring the night sky! 🌟', 
    'font-size: 16px; color: #4dd5ed; font-weight: bold;');

// Export functions for potential API usage
window.ConstellationExplorer = {
    getConstellations: () => constellations,
    getStars: () => stars,
    centerOnConstellation: (name) => {
        const constellation = constellations.find(c => c.name === name);
        if (constellation) {
            selectConstellation(constellation);
        }
    },
    exportMap: exportSkyMap,
    toggleNightMode: toggleNightMode,
    resetView: resetView
};