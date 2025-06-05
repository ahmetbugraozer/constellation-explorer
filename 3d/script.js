// ===== Global Variables =====
let scene, camera, renderer, controls;
let stars = [];
let constellations = [];
let constellationLines = [];
let constellationLabels = [];
let starField;
let raycaster, mouse;
let hoveredObject = null;
let selectedConstellation = null;

// Settings
let settings = {
    showLines: true,
    showNames: true,
    showStars: true,
    showAtmosphere: false,
    autoRotate: false,
    starCount: 5000,
    starSize: 1.5,
    lineWidth: 2,
    fov: 60,
    rotationSpeed: 0.5,
    glowEffect: true,
    twinkleEffect: true,
    milkyWayEffect: false
};

// Animation
let clock = new THREE.Clock();
let animationId;
let frameCount = 0;
let lastFpsUpdate = 0;

// ===== Constellation Data (Spherical Coordinates) =====
const constellationData = [
    {
        name: "Ursa Major",
        description: "The Great Bear, home to the Big Dipper asterism",
        mythology: "In Greek mythology, Zeus transformed Callisto into a bear and placed her in the sky.",
        stars: [
            { name: "Dubhe", ra: 165.932, dec: 61.751, magnitude: 1.8 },
            { name: "Merak", ra: 165.460, dec: 56.382, magnitude: 2.3 },
            { name: "Phecda", ra: 178.458, dec: 53.695, magnitude: 2.4 },
            { name: "Megrez", ra: 183.857, dec: 57.033, magnitude: 3.3 },
            { name: "Alioth", ra: 193.507, dec: 55.960, magnitude: 1.7 },
            { name: "Mizar", ra: 200.981, dec: 54.925, magnitude: 2.0 },
            { name: "Alkaid", ra: 206.885, dec: 49.313, magnitude: 1.8 }
        ],
        lines: [[0,1], [1,3], [3,2], [3,4], [4,5], [5,6]]
    },
    {
        name: "Orion",
        description: "The Hunter, one of the most recognizable constellations",
        mythology: "Orion was a legendary hunter in Greek mythology, placed in the sky by Zeus.",
        stars: [
            { name: "Betelgeuse", ra: 88.793, dec: 7.407, magnitude: 0.5 },
            { name: "Bellatrix", ra: 81.283, dec: 6.350, magnitude: 1.6 },
            { name: "Alnitak", ra: 85.190, dec: -1.943, magnitude: 1.7 },
            { name: "Alnilam", ra: 84.053, dec: -1.202, magnitude: 1.6 },
            { name: "Mintaka", ra: 83.001, dec: -0.299, magnitude: 2.2 },
            { name: "Saiph", ra: 86.939, dec: -9.670, magnitude: 2.0 },
            { name: "Rigel", ra: 78.634, dec: -8.202, magnitude: 0.1 }
        ],
        lines: [[0,2], [1,4], [2,3], [3,4], [2,5], [4,6]]
    },
    {
        name: "Cassiopeia",
        description: "The Queen, shaped like a 'W' or 'M'",
        mythology: "Queen Cassiopeia was punished for her vanity by being placed upside-down in the sky.",
        stars: [
            { name: "Schedar", ra: 10.127, dec: 56.537, magnitude: 2.2 },
            { name: "Caph", ra: 2.295, dec: 59.150, magnitude: 2.2 },
            { name: "Gamma Cas", ra: 14.177, dec: 60.717, magnitude: 2.4 },
            { name: "Ruchbah", ra: 21.454, dec: 60.235, magnitude: 2.6 },
            { name: "Segin", ra: 28.599, dec: 63.670, magnitude: 3.3 }
        ],
        lines: [[0,1], [1,2], [2,3], [3,4]]
    },
    {
        name: "Scorpius",
        description: "The Scorpion, enemy of Orion",
        mythology: "The scorpion that killed Orion, placed opposite him in the sky.",
        stars: [
            { name: "Antares", ra: 247.352, dec: -26.432, magnitude: 0.9 },
            { name: "Graffias", ra: 241.359, dec: -19.805, magnitude: 2.6 },
            { name: "Dschubba", ra: 240.083, dec: -22.622, magnitude: 2.3 },
            { name: "Sargas", ra: 264.330, dec: -43.000, magnitude: 1.8 },
            { name: "Shaula", ra: 263.402, dec: -37.104, magnitude: 1.6 },
            { name: "Lesath", ra: 262.691, dec: -37.296, magnitude: 2.6 }
        ],
        lines: [[1,2], [2,0], [0,3], [3,4], [4,5]]
    },
    {
        name: "Cygnus",
        description: "The Swan, flying along the Milky Way",
        mythology: "Zeus disguised as a swan, or Orpheus transformed after death.",
        stars: [
            { name: "Deneb", ra: 310.358, dec: 45.280, magnitude: 1.2 },
            { name: "Albireo", ra: 292.680, dec: 27.960, magnitude: 3.0 },
            { name: "Sadr", ra: 305.557, dec: 40.257, magnitude: 2.2 },
            { name: "Gienah", ra: 305.253, dec: 33.970, magnitude: 2.4 },
            { name: "Delta Cyg", ra: 296.244, dec: 45.131, magnitude: 2.8 }
        ],
        lines: [[0,2], [2,1], [3,2], [2,4]]
    },
    {
        name: "Leo",
        description: "The Lion, representing the Nemean Lion",
        mythology: "The Nemean Lion was killed by Hercules as one of his twelve labors.",
        stars: [
            { name: "Regulus", ra: 152.093, dec: 11.967, magnitude: 1.3 },
            { name: "Denebola", ra: 177.265, dec: 14.572, magnitude: 2.1 },
            { name: "Algieba", ra: 146.462, dec: 19.842, magnitude: 2.2 },
            { name: "Zosma", ra: 168.527, dec: 20.524, magnitude: 2.5 },
            { name: "Ras Elased", ra: 147.812, dec: 26.007, magnitude: 2.9 },
            { name: "Adhafera", ra: 150.975, dec: 23.764, magnitude: 3.4 }
        ],
        lines: [[0,2], [2,4], [4,5], [2,3], [3,1]]
    }
];

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    createStarField();
    loadConstellations3D();
    setupEventListeners();
    setupRaycaster();
    hideLoader();
    animate();
    updateStats();
});

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.00005);

    // Camera
    const container = document.getElementById('skyContainer');
    camera = new THREE.PerspectiveCamera(
        settings.fov,
        container.clientWidth / container.clientHeight,
        0.1,
        10000
    );
    camera.position.set(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 0;
    controls.maxDistance = 1;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = settings.autoRotate;
    controls.autoRotateSpeed = settings.rotationSpeed;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambientLight);

    // Resize handler
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    const container = document.getElementById('skyContainer');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// ===== Star Field Creation =====
function createStarField() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < settings.starCount; i++) {
        // Random position on sphere
        const radius = 950;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions.push(x, y, z);

        // Random color (slightly varied white/blue)
        const color = new THREE.Color();
        const colorValue = Math.random() * 0.3 + 0.7;
        color.setRGB(colorValue, colorValue, Math.min(1, colorValue + Math.random() * 0.1));
        colors.push(color.r, color.g, color.b);

        // Random size based on magnitude
        const size = Math.random() * 2 + 0.5;
        sizes.push(size);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Star material
    const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            starSize: { value: settings.starSize }
        },
        vertexShader: `
            uniform float time;
            uniform float starSize;
            attribute float size;
            varying vec3 vColor;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                float twinkle = sin(time + position.x * 0.1) * 0.5 + 0.5;
                gl_PointSize = size * starSize * (300.0 / -mvPosition.z) * (0.5 + twinkle * 0.5);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha);
            }
        `,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    starField = new THREE.Points(geometry, starMaterial);
    scene.add(starField);

    document.getElementById('starCount').textContent = settings.starCount;
}

// ===== Constellation Creation =====
function loadConstellations3D() {
    constellations = constellationData.map((constellation, index) => {
        const group = new THREE.Group();
        group.name = constellation.name;
        
        // Convert stars to 3D positions
        const stars3D = constellation.stars.map(star => {
            const position = celestialToCartesian(star.ra, star.dec, 900);
            return { ...star, position };
        });

        // Create constellation stars
        const starGeometry = new THREE.SphereGeometry(1, 16, 16);
        
        stars3D.forEach((star, starIndex) => {
            const size = (6 - star.magnitude) * 2;
            const starMaterial = new THREE.MeshBasicMaterial({
                color: getStarColor(star.magnitude),
                emissive: getStarColor(star.magnitude),
                emissiveIntensity: 0.5
            });

            const starMesh = new THREE.Mesh(starGeometry, starMaterial);
            starMesh.scale.setScalar(size);
            starMesh.position.copy(star.position);
            starMesh.userData = {
                name: star.name,
                magnitude: star.magnitude,
                constellation: constellation.name,
                starIndex: starIndex
            };
            
            group.add(starMesh);

            // Add glow effect
            if (settings.glowEffect) {
                const glowGeometry = new THREE.SphereGeometry(size * 2, 8, 8);
                const glowMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        viewVector: { value: new THREE.Vector3() },
                        c: { value: 0.5 },
                        p: { value: 4.5 },
                        glowColor: { value: new THREE.Color(getStarColor(star.magnitude)) }
                    },
                    vertexShader: `
                        uniform vec3 viewVector;
                        uniform float c;
                        uniform float p;
                        varying float intensity;
                        
                        void main() {
                            vec3 vNormal = normalize(normalMatrix * normal);
                            vec3 vNormel = normalize(normalMatrix * viewVector);
                            intensity = pow(c - dot(vNormal, vNormel), p);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 glowColor;
                        varying float intensity;
                        
                        void main() {
                            vec3 glow = glowColor * intensity;
                            gl_FragColor = vec4(glow, intensity);
                        }
                    `,
                    side: THREE.FrontSide,
                    blending: THREE.AdditiveBlending,
                    transparent: true
                });
                
                const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
                glowMesh.position.copy(star.position);
                glowMesh.scale.setScalar(1.5);
                group.add(glowMesh);
            }
        });

        // Create constellation lines
        if (settings.showLines) {
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = [];
            
            constellation.lines.forEach(line => {
                const start = stars3D[line[0]].position;
                const end = stars3D[line[1]].position;
                linePositions.push(start.x, start.y, start.z);
                linePositions.push(end.x, end.y, end.z);
            });
            
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            
            const lineMaterial = new THREE.LineBasicMaterial({
                color: new THREE.Color(`hsl(${index * 60}, 70%, 60%)`),
                opacity: 0.6,
                transparent: true,
                linewidth: settings.lineWidth
            });
            
            const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
            lines.name = `${constellation.name}_lines`;
            group.add(lines);
            constellationLines.push(lines);
        }

        // Create constellation label
        if (settings.showNames) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 64;
            
            context.fillStyle = 'rgba(0, 0, 0, 0)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            context.font = 'Bold 40px Orbitron';
            context.fillStyle = 'rgba(96, 165, 250, 0.9)';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(constellation.name, canvas.width / 2, canvas.height / 2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.8
            });
            
            const sprite = new THREE.Sprite(spriteMaterial);
            const centerPosition = getCenterPosition(stars3D);
            sprite.position.copy(centerPosition);
            sprite.position.multiplyScalar(1.05);
            sprite.scale.set(100, 12.5, 1);
            sprite.name = `${constellation.name}_label`;
            
            group.add(sprite);
            constellationLabels.push(sprite);
        }

        scene.add(group);
        
        return {
            ...constellation,
            group,
            stars3D,
            visible: true
        };
    });
    
    renderConstellationList();
    updateConstellationCount();
}

// ===== Utility Functions =====
function celestialToCartesian(ra, dec, radius) {
    const raRad = (ra * Math.PI) / 180;
    const decRad = (dec * Math.PI) / 180;
    
    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);
    
    return new THREE.Vector3(x, y, z);
}

function getStarColor(magnitude) {
    if (magnitude < 1) return 0xffffff;
    if (magnitude < 2) return 0xffd700;
    if (magnitude < 3) return 0x87ceeb;
    if (magnitude < 4) return 0xb0c4de;
    return 0x778899;
}

function getCenterPosition(stars) {
    const center = new THREE.Vector3();
    stars.forEach(star => {
        center.add(star.position);
    });
    center.divideScalar(stars.length);
    return center;
}

// ===== Raycaster Setup =====
function setupRaycaster() {
    raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 5;
    mouse = new THREE.Vector2();
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);
    
    // Touch events
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);
}

function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    checkIntersections();
}

function onMouseClick(event) {
    if (hoveredObject && hoveredObject.userData.name) {
        showStarInfo(hoveredObject);
    }
}

function onDoubleClick(event) {
    if (hoveredObject) {
        focusOnObject(hoveredObject);
    }
}

function onTouchStart(event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        checkIntersections();
        if (hoveredObject && hoveredObject.userData.name) {
            showStarInfo(hoveredObject);
        }
    }
}

function onTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        checkIntersections();
    }
}

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    
    const objects = [];
    constellations.forEach(constellation => {
        constellation.group.children.forEach(child => {
            if (child.type === 'Mesh' && child.userData.name) {
                objects.push(child);
            }
        });
    });
    
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0) {
        if (hoveredObject !== intersects[0].object) {
            if (hoveredObject) {
                hoveredObject.scale.divideScalar(1.2);
            }
            hoveredObject = intersects[0].object;
            hoveredObject.scale.multiplyScalar(1.2);
            showTooltip(hoveredObject);
        }
    } else {
        if (hoveredObject) {
            hoveredObject.scale.divideScalar(1.2);
            hoveredObject = null;
            hideTooltip();
        }
    }
}

// ===== UI Functions =====
function showTooltip(object) {
    const tooltip = document.getElementById('tooltip');
    const starData = object.userData;
    
    tooltip.innerHTML = `
        <h4>${starData.name}</h4>
        <p>Constellation: ${starData.constellation}</p>
        <div class="star-info">
            <span><strong>Magnitude:</strong> ${starData.magnitude.toFixed(1)}</span>
        </div>
    `;
    
    // Project 3D position to screen coordinates
    const vector = object.position.clone();
    vector.project(camera);
    
    const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;
    
    tooltip.style.left = x + 20 + 'px';
    tooltip.style.top = y - 10 + 'px';
    tooltip.classList.remove('hidden');
}

function hideTooltip() {
    document.getElementById('tooltip').classList.add('hidden');
}

function showStarInfo(object) {
    const constellation = constellations.find(c => c.name === object.userData.constellation);
    if (constellation) {
        selectedConstellation = constellation;
        showConstellationDetails(constellation);
    }
}

function focusOnObject(object) {
    const targetPosition = object.position.clone();
    const distance = 200;
    
    const direction = targetPosition.normalize();
    const newCameraPosition = direction.multiplyScalar(distance);
    
    // Animate camera movement
    const startPos = camera.position.clone();
    const duration = 1000;
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        camera.position.lerpVectors(startPos, newCameraPosition, easeProgress);
        camera.lookAt(0, 0, 0);
        
        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Control buttons
    document.getElementById('toggleLines').addEventListener('click', toggleConstellationLines);
    document.getElementById('toggleNames').addEventListener('click', toggleConstellationNames);
    document.getElementById('toggleStars').addEventListener('click', toggleBackgroundStars);
    document.getElementById('toggleAtmosphere').addEventListener('click', toggleAtmosphere);
    document.getElementById('autoRotate').addEventListener('click', toggleAutoRotate);
    
    // View buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => setView(e.target.dataset.view));
    });
    
    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => loadPreset(e.target.dataset.preset));
    });
    
    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Modals
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    document.getElementById('closeHelp').addEventListener('click', hideHelp);
    document.getElementById('settingsBtn').addEventListener('click', showSettings);
    document.getElementById('closeSettings').addEventListener('click', hideSettings);
    document.getElementById('closeModal').addEventListener('click', hideModal);
    
    // Settings sliders
    setupSettingsListeners();
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyboard);

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
        
        // Show menu toggle on mobile
        if (window.innerWidth <= 1024) {
            menuToggle.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1024) {
                menuToggle.style.display = 'block';
            } else {
                menuToggle.style.display = 'none';
                document.querySelector('.sidebar').classList.remove('open');
            }
        });
    }
}

function setupSettingsListeners() {
    // Star count slider
    const starCountSlider = document.getElementById('starCountSlider');
    starCountSlider.addEventListener('input', (e) => {
        settings.starCount = parseInt(e.target.value);
        document.getElementById('starCountValue').textContent = settings.starCount;
        regenerateStarField();
    });
    
    // Star size slider
    const starSizeSlider = document.getElementById('starSizeSlider');
    starSizeSlider.addEventListener('input', (e) => {
        settings.starSize = parseFloat(e.target.value);
        document.getElementById('starSizeValue').textContent = settings.starSize;
        if (starField) {
            starField.material.uniforms.starSize.value = settings.starSize;
        }
    });
    
    // Line width slider
    const lineWidthSlider = document.getElementById('lineWidthSlider');
    lineWidthSlider.addEventListener('input', (e) => {
        settings.lineWidth = parseFloat(e.target.value);
        document.getElementById('lineWidthValue').textContent = settings.lineWidth;
        updateLineWidth();
    });
    
    // FOV slider
    const fovSlider = document.getElementById('fovSlider');
    fovSlider.addEventListener('input', (e) => {
        settings.fov = parseInt(e.target.value);
        document.getElementById('fovValue').textContent = settings.fov + '°';
        camera.fov = settings.fov;
        camera.updateProjectionMatrix();
    });
    
    // Rotation speed slider
    const rotationSpeedSlider = document.getElementById('rotationSpeedSlider');
    rotationSpeedSlider.addEventListener('input', (e) => {
        settings.rotationSpeed = parseFloat(e.target.value);
        document.getElementById('rotationSpeedValue').textContent = settings.rotationSpeed;
        controls.autoRotateSpeed = settings.rotationSpeed;
    });
    
    // Checkboxes
    document.getElementById('glowEffect').addEventListener('change', (e) => {
        settings.glowEffect = e.target.checked;
        toggleGlowEffect();
    });
    
    document.getElementById('twinkleEffect').addEventListener('change', (e) => {
        settings.twinkleEffect = e.target.checked;
    });
    
    document.getElementById('milkyWayEffect').addEventListener('change', (e) => {
        settings.milkyWayEffect = e.target.checked;
        toggleMilkyWay();
    });
}

// ===== Toggle Functions =====
function toggleConstellationLines() {
    settings.showLines = !settings.showLines;
    document.getElementById('toggleLines').classList.toggle('active', settings.showLines);
    
    constellationLines.forEach(line => {
        line.visible = settings.showLines;
    });
}

function toggleConstellationNames() {
    settings.showNames = !settings.showNames;
    document.getElementById('toggleNames').classList.toggle('active', settings.showNames);
    
    constellationLabels.forEach(label => {
        label.visible = settings.showNames;
    });
}

function toggleBackgroundStars() {
    settings.showStars = !settings.showStars;
    document.getElementById('toggleStars').classList.toggle('active', settings.showStars);
    
    if (starField) {
        starField.visible = settings.showStars;
    }
}

function toggleAtmosphere() {
    settings.showAtmosphere = !settings.showAtmosphere;
    document.getElementById('toggleAtmosphere').classList.toggle('active', settings.showAtmosphere);
    
    if (settings.showAtmosphere) {
        addAtmosphere();
    } else {
        removeAtmosphere();
    }
}

function toggleAutoRotate() {
    settings.autoRotate = !settings.autoRotate;
    document.getElementById('autoRotate').classList.toggle('active', settings.autoRotate);
    controls.autoRotate = settings.autoRotate;
}

function toggleGlowEffect() {
    scene.traverse((child) => {
        if (child.material && child.material.uniforms && child.material.uniforms.glowColor) {
            child.visible = settings.glowEffect;
        }
    });
}

function toggleMilkyWay() {
    if (settings.milkyWayEffect) {
        addMilkyWay();
    } else {
        removeMilkyWay();
    }
}

// ===== View Controls =====
function setView(direction) {
    const positions = {
        north: new THREE.Vector3(0, 0, 1000),
        south: new THREE.Vector3(0, 0, -1000),
        east: new THREE.Vector3(1000, 0, 0),
        west: new THREE.Vector3(-1000, 0, 0),
        zenith: new THREE.Vector3(0, 1000, 0)
    };
    
    if (positions[direction]) {
        animateCameraToPosition(positions[direction]);
    }
}

function loadPreset(preset) {
    const presets = {
        milkyway: {
            position: new THREE.Vector3(500, 200, 500),
            target: new THREE.Vector3(-500, -200, -500)
        },
        polaris: {
            position: new THREE.Vector3(0, 800, 200),
            target: new THREE.Vector3(0, 1000, 0)
        },
        zodiac: {
            position: new THREE.Vector3(0, 300, 800),
            target: new THREE.Vector3(0, 0, 0)
        },
        full: {
            position: new THREE.Vector3(0, 0, 0),
            target: new THREE.Vector3(0, 0, -1)
        }
    };
    
    if (presets[preset]) {
        animateCameraToPosition(presets[preset].position, presets[preset].target);
    }
}

function animateCameraToPosition(targetPosition, lookAtTarget) {
    const startPosition = camera.position.clone();
    const startTime = Date.now();
    const duration = 1500;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        
        if (lookAtTarget) {
            const currentLookAt = new THREE.Vector3(0, 0, -1);
            currentLookAt.applyQuaternion(camera.quaternion);
            currentLookAt.lerp(lookAtTarget, easeProgress);
            camera.lookAt(currentLookAt);
        } else {
            camera.lookAt(0, 0, 0);
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ===== Keyboard Controls =====
function handleKeyboard(event) {
    if (event.target.tagName === 'INPUT') return;
    
    const rotationSpeed = 0.05;
    
    switch(event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            camera.rotateX(rotationSpeed);
            break;
        case 's':
        case 'arrowdown':
            camera.rotateX(-rotationSpeed);
            break;
        case 'a':
        case 'arrowleft':
            camera.rotateY(rotationSpeed);
            break;
        case 'd':
        case 'arrowright':
            camera.rotateY(-rotationSpeed);
            break;
        case 'q':
            camera.rotateZ(rotationSpeed);
            break;
        case 'e':
            camera.rotateZ(-rotationSpeed);
            break;
        case '+':
        case '=':
            camera.fov = Math.max(30, camera.fov - 5);
            camera.updateProjectionMatrix();
            break;
        case '-':
            camera.fov = Math.min(120, camera.fov + 5);
            camera.updateProjectionMatrix();
            break;
        case ' ':
            resetView();
            break;
        case 'r':
            toggleAutoRotate();
            break;
        case 'f':
            toggleFullscreen();
            break;
        case 'escape':
            hideModal();
            hideHelp();
            hideSettings();
            break;
    }
}

// ===== Special Effects =====
function addAtmosphere() {
    const atmosphereGeometry = new THREE.SphereGeometry(1100, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            atmosphereColor: { value: new THREE.Color(0x87ceeb) }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 atmosphereColor;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
                vec3 atmosphere = atmosphereColor * intensity;
                float alpha = intensity * 0.3 * (sin(time) * 0.1 + 0.9);
                gl_FragColor = vec4(atmosphere, alpha);
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.name = 'atmosphere';
    scene.add(atmosphere);
}

function removeAtmosphere() {
    const atmosphere = scene.getObjectByName('atmosphere');
    if (atmosphere) {
        scene.remove(atmosphere);
    }
}

function addMilkyWay() {
    const milkyWayGeometry = new THREE.SphereGeometry(980, 64, 64);
    const milkyWayTexture = createMilkyWayTexture();
    
    const milkyWayMaterial = new THREE.MeshBasicMaterial({
        map: milkyWayTexture,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    
    const milkyWay = new THREE.Mesh(milkyWayGeometry, milkyWayMaterial);
    milkyWay.name = 'milkyway';
    scene.add(milkyWay);
}

function removeMilkyWay() {
    const milkyWay = scene.getObjectByName('milkyway');
    if (milkyWay) {
        scene.remove(milkyWay);
    }
}

function createMilkyWayTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Create gradient for Milky Way band
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(100, 100, 200, 0)');
    gradient.addColorStop(0.3, 'rgba(150, 150, 255, 0.2)');
    gradient.addColorStop(0.5, 'rgba(200, 200, 255, 0.4)');
    gradient.addColorStop(0.7, 'rgba(150, 150, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(100, 100, 200, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height * 0.3, canvas.width, canvas.height * 0.4);
    
    // Add some noise/stars
    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
        const size = Math.random() * 2;
        const opacity = Math.random() * 0.8;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
}

// ===== Animation Loop =====
function animate() {
    animationId = requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Update controls
    controls.update();
    
    // Update star field
    if (starField && starField.material.uniforms.time) {
        starField.material.uniforms.time.value = time;
    }

    // Update atmosphere
    const atmosphere = scene.getObjectByName('atmosphere');
    if (atmosphere && atmosphere.material.uniforms.time) {
        atmosphere.material.uniforms.time.value = time;
    }
    
    // Update glow effects
    scene.traverse((child) => {
        if (child.material && child.material.uniforms && child.material.uniforms.viewVector) {
            child.material.uniforms.viewVector.value = new THREE.Vector3().subVectors(
                camera.position, child.position
            );
        }
    });
    
    // Render
    renderer.render(scene, camera);
    
    // Update UI
    updateCameraInfo();
    updateFPS();
}

// ===== UI Updates =====
function updateCameraInfo() {
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(camera.position);
    
    const azimuth = THREE.MathUtils.radToDeg(spherical.theta);
    const altitude = THREE.MathUtils.radToDeg(spherical.phi - Math.PI / 2);
    
    document.getElementById('azimuth').textContent = azimuth.toFixed(1) + '°';
    document.getElementById('altitude').textContent = altitude.toFixed(1) + '°';
    document.getElementById('fov').textContent = camera.fov.toFixed(0) + '°';
}

function updateFPS() {
    frameCount++;
    const now = performance.now();
    
    if (now - lastFpsUpdate >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        document.getElementById('fps').textContent = fps;
        frameCount = 0;
        lastFpsUpdate = now;
    }
}

function updateStats() {
    setInterval(() => {
        updateCameraInfo();
    }, 100);
}

// ===== Constellation List Management =====
function renderConstellationList() {
    const listContainer = document.getElementById('constellationList');
    listContainer.innerHTML = '';
    
    constellations.forEach(constellation => {
        const item = document.createElement('div');
        item.className = 'constellation-item';
        if (selectedConstellation && selectedConstellation.name === constellation.name) {
            item.classList.add('highlighted');
        }
        
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
    renderConstellationList();
    
    // Focus camera on constellation
    const center = getCenterPosition(constellation.stars3D);
    focusOnPosition(center);
    
    // Highlight constellation
    highlightConstellation(constellation);
    
    // Show details
    showConstellationDetails(constellation);
}

function highlightConstellation(constellation) {
    // Reset all constellations
    constellations.forEach(c => {
        c.group.children.forEach(child => {
            if (child.type === 'LineSegments') {
                child.material.opacity = 0.6;
                child.material.linewidth = settings.lineWidth;
            }
        });
    });
    
    // Highlight selected
    constellation.group.children.forEach(child => {
        if (child.type === 'LineSegments') {
            child.material.opacity = 1;
            child.material.linewidth = settings.lineWidth * 2;
        }
    });
}

function focusOnPosition(position) {
    const distance = 300;
    const direction = position.clone().normalize();
    const targetPosition = direction.multiplyScalar(distance);
    
    animateCameraToPosition(targetPosition);
}

// ===== Search Functionality =====
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.constellation-item');
    
    items.forEach((item, index) => {
        const constellation = constellations[index];
        const matches = constellation.name.toLowerCase().includes(searchTerm) ||
                       constellation.stars.some(star => star.name.toLowerCase().includes(searchTerm));
        
        item.style.display = matches ? 'flex' : 'none';
        constellation.group.visible = matches || searchTerm === '';
    });
}

// ===== Modal Functions =====
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
                <li>
                    <strong>${star.name}</strong> - Magnitude ${star.magnitude.toFixed(1)}
                    ${getStarType(star.name) ? `<br><em>${getStarType(star.name)}</em>` : ''}
                </li>
            `).join('')}
        </ul>
        
        <h3>Best Viewing</h3>
        <p>${getViewingInfo(constellation.name)}</p>
        
        <h3>Coordinates</h3>
        <p>Right Ascension: ${getConstellationRA(constellation)}h</p>
        <p>Declination: ${getConstellationDec(constellation)}°</p>
    `;
    
    modal.classList.remove('hidden');
}

function getStarType(starName) {
    const starTypes = {
        "Betelgeuse": "Red Supergiant",
        "Rigel": "Blue Supergiant",
        "Deneb": "Blue-white Supergiant",
        "Antares": "Red Supergiant",
        "Regulus": "Blue-white Main Sequence",
        "Dubhe": "Orange Giant"
    };
    return starTypes[starName] || null;
}

function getViewingInfo(constellationName) {
    const viewingInfo = {
        "Ursa Major": "Best viewed in Spring (April-June) in the Northern Hemisphere",
        "Orion": "Best viewed in Winter (December-February) from both hemispheres",
        "Cassiopeia": "Circumpolar in Northern Hemisphere, visible year-round",
        "Scorpius": "Best viewed in Summer (June-August) in the Southern sky",
        "Cygnus": "Best viewed in Summer/Fall (July-October) in the Northern sky",
        "Leo": "Best viewed in Spring (March-May) from both hemispheres"
    };
    return viewingInfo[constellationName] || "Seasonal visibility varies by location";
}

function getConstellationRA(constellation) {
    const avgRA = constellation.stars.reduce((sum, star) => sum + star.ra, 0) / constellation.stars.length;
    return (avgRA / 15).toFixed(1); // Convert to hours
}

function getConstellationDec(constellation) {
    const avgDec = constellation.stars.reduce((sum, star) => sum + star.dec, 0) / constellation.stars.length;
    return avgDec.toFixed(1);
}

function hideModal() {
    document.getElementById('constellationModal').classList.add('hidden');
}

function showHelp() {
    document.getElementById('helpModal').classList.remove('hidden');
}

function hideHelp() {
    document.getElementById('helpModal').classList.add('hidden');
}

function showSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function hideSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

// ===== Fullscreen =====
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.body.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        document.body.classList.remove('fullscreen');
    }
}

// ===== Utility Functions =====
function regenerateStarField() {
    if (starField) {
        scene.remove(starField);
        starField.geometry.dispose();
        starField.material.dispose();
    }
    createStarField();
}

function updateLineWidth() {
    constellationLines.forEach(line => {
        if (line.material) {
            line.material.linewidth = settings.lineWidth;
        }
    });
}

function updateConstellationCount() {
    document.getElementById('constellationCount').textContent = constellations.length;
}

function resetView() {
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);
    controls.reset();
}

// ===== Save/Load Settings =====
function saveSettings() {
    localStorage.setItem('skyExplorer3D_settings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('skyExplorer3D_settings');
    if (saved) {
        const loadedSettings = JSON.parse(saved);
        Object.assign(settings, loadedSettings);
        
        // Apply loaded settings to UI
        document.getElementById('starCountSlider').value = settings.starCount;
        document.getElementById('starCountValue').textContent = settings.starCount;
        document.getElementById('starSizeSlider').value = settings.starSize;
        document.getElementById('starSizeValue').textContent = settings.starSize;
        document.getElementById('lineWidthSlider').value = settings.lineWidth;
        document.getElementById('lineWidthValue').textContent = settings.lineWidth;
        document.getElementById('fovSlider').value = settings.fov;
        document.getElementById('fovValue').textContent = settings.fov + '°';
        document.getElementById('rotationSpeedSlider').value = settings.rotationSpeed;
        document.getElementById('rotationSpeedValue').textContent = settings.rotationSpeed;
        document.getElementById('glowEffect').checked = settings.glowEffect;
        document.getElementById('twinkleEffect').checked = settings.twinkleEffect;
        document.getElementById('milkyWayEffect').checked = settings.milkyWayEffect;
    }
}

// ===== Initialization Complete =====
function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        document.getElementById('app').classList.add('visible');
        
        // Load saved settings
        loadSettings();
        
        // Apply initial settings
        camera.fov = settings.fov;
        camera.updateProjectionMatrix();
        controls.autoRotateSpeed = settings.rotationSpeed;
    }, 2000);
}

// ===== Performance Optimization =====
function optimizePerformance() {
    // Reduce quality on mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        settings.starCount = 2000;
        settings.glowEffect = false;
        regenerateStarField();
    }
}

// ===== Window Events =====
window.addEventListener('beforeunload', saveSettings);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animate();
    }
});

// ===== Easter Egg =====
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
    console.log('🌟 Cosmic Mode Activated! 🌟');
    
    // Rainbow constellation colors
    let hue = 0;
    const rainbowInterval = setInterval(() => {
        hue += 2;
        constellations.forEach((constellation, index) => {
            constellation.group.children.forEach(child => {
                if (child.type === 'LineSegments') {
                    child.material.color.setHSL((hue + index * 60) / 360, 0.7, 0.6);
                }
            });
        });
        
        if (hue >= 360) {
            clearInterval(rainbowInterval);
            // Reset colors after animation
            setTimeout(() => {
                constellations.forEach((constellation, index) => {
                    constellation.group.children.forEach(child => {
                        if (child.type === 'LineSegments') {
                            child.material.color.setHSL((index * 60) / 360, 0.7, 0.6);
                        }
                    });
                });
            }, 3000);
        }
    }, 50);
    
    // Create special effects
    createCosmicExplosion();
}

function createCosmicExplosion() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const velocities = [];
    
    for (let i = 0; i < particleCount; i++) {
        positions.push(0, 0, 0);
        
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, 0.6);
        colors.push(color.r, color.g, color.b);
        
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        velocities.push(velocity);
    }
    
    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    particleSystem.name = 'cosmicExplosion';
    scene.add(particleSystem);
    
    // Animate explosion
    let explosionTime = 0;
    const explosionDuration = 3000;
    const startTime = Date.now();
    
    function animateExplosion() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / explosionDuration;
        
        if (progress < 1) {
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i].x * (1 - progress);
                positions[i3 + 1] += velocities[i].y * (1 - progress);
                positions[i3 + 2] += velocities[i].z * (1 - progress);
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.material.opacity = 1 - progress;
            
            requestAnimationFrame(animateExplosion);
        } else {
            scene.remove(particleSystem);
            particleSystem.geometry.dispose();
            particleSystem.material.dispose();
        }
    }
    
    animateExplosion();
}

// ===== Mobile Touch Gestures =====
let touchStartDistance = 0;
let touchStartTime = 0;

renderer.domElement.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    
    if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        touchStartDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
    }
});

renderer.domElement.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        
        const scale = currentDistance / touchStartDistance;
        camera.fov = Math.max(30, Math.min(120, settings.fov / scale));
        camera.updateProjectionMatrix();
    }
});

renderer.domElement.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    
    // Long press to show info
    if (touchDuration > 500 && e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        checkIntersections();
        if (hoveredObject && hoveredObject.userData.name) {
            showStarInfo(hoveredObject);
        }
    }
    
    // Save new FOV setting
    if (e.touches.length === 0) {
        settings.fov = camera.fov;
        document.getElementById('fovSlider').value = settings.fov;
        document.getElementById('fovValue').textContent = settings.fov + '°';
    }
});

// ===== Advanced Camera Movement =====
class CameraPath {
    constructor() {
        this.points = [];
        this.duration = 10000; // 10 seconds
    }
    
    addPoint(position, lookAt) {
        this.points.push({ position, lookAt });
    }
    
    play() {
        if (this.points.length < 2) return;
        
        let currentIndex = 0;
        const startTime = Date.now();
        
        const animatePath = () => {
            const elapsed = Date.now() - startTime;
            const totalProgress = (elapsed % this.duration) / this.duration;
            const segmentCount = this.points.length - 1;
            const segmentProgress = totalProgress * segmentCount;
            const index = Math.floor(segmentProgress);
            const localProgress = segmentProgress - index;
            
            if (index < segmentCount) {
                const start = this.points[index];
                const end = this.points[index + 1];
                
                camera.position.lerpVectors(start.position, end.position, localProgress);
                
                const lookAt = new THREE.Vector3().lerpVectors(start.lookAt, end.lookAt, localProgress);
                camera.lookAt(lookAt);
                
                requestAnimationFrame(animatePath);
            }
        };
        
        animatePath();
    }
}

// Create a scenic tour
function createScenicTour() {
    const tour = new CameraPath();
    
    // Add tour points through major constellations
    tour.addPoint(
        new THREE.Vector3(500, 200, 500),
        new THREE.Vector3(0, 0, 0)
    );
    tour.addPoint(
        new THREE.Vector3(-500, 300, -200),
        new THREE.Vector3(100, 0, -100)
    );
    tour.addPoint(
        new THREE.Vector3(0, 600, 0),
        new THREE.Vector3(0, 0, 0)
    );
    tour.addPoint(
        new THREE.Vector3(300, -200, -600),
        new THREE.Vector3(-100, 0, 100)
    );
    
    tour.play();
}

// ===== Screenshot Feature =====
function takeScreenshot() {
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = `constellation-explorer-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
}

// Add screenshot keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        takeScreenshot();
    }
});

// ===== Final Initialization =====
console.log('%c🌌 3D Constellation Explorer Initialized! 🌌', 
    'font-size: 20px; color: #60a5fa; text-shadow: 0 0 20px #60a5fa;');
console.log('%cControls:', 'font-size: 14px; color: #90caf9; font-weight: bold;');
console.log('%c• Mouse: Left drag to rotate, scroll to zoom', 'font-size: 12px; color: #e0e7ff;');
console.log('%c• Keyboard: WASD/Arrows to rotate, Space to reset', 'font-size: 12px; color: #e0e7ff;');
console.log('%c• Try the Konami Code for a cosmic surprise!', 'font-size: 12px; color: #e0e7ff;');

// ===== Performance Monitoring =====
const stats = {
    drawCalls: 0,
    triangles: 0,
    points: 0,
    lines: 0
};

function updatePerformanceStats() {
    stats.drawCalls = renderer.info.render.calls;
    stats.triangles = renderer.info.render.triangles;
    stats.points = renderer.info.render.points;
    stats.lines = renderer.info.render.lines;
    
    // Log performance info in debug mode
    if (window.location.hash === '#debug') {
        console.log('Performance Stats:', stats);
    }
}

// ===== Export API =====
window.ConstellationExplorer3D = {
    // Core objects
    scene,
    camera,
    renderer,
    controls,
    
    // Methods
    getConstellations: () => constellations,
    selectConstellation: (name) => {
        const constellation = constellations.find(c => c.name === name);
        if (constellation) selectConstellation(constellation);
    },
    
    // Camera controls
    setCameraPosition: (x, y, z) => camera.position.set(x, y, z),
    getCameraPosition: () => camera.position.clone(),
    resetCamera: resetView,
    
    // Visual settings
    setStarCount: (count) => {
        settings.starCount = count;
        regenerateStarField();
    },
    toggleEffect: (effect) => {
        switch(effect) {
            case 'lines': toggleConstellationLines(); break;
            case 'names': toggleConstellationNames(); break;
            case 'stars': toggleBackgroundStars(); break;
            case 'atmosphere': toggleAtmosphere(); break;
            case 'milkyway': toggleMilkyWay(); break;
        }
    },
    
    // Utilities
    takeScreenshot,
    createTour: createScenicTour,
    
    // Settings
    getSettings: () => settings,
    saveSettings,
    loadSettings
};

// ===== Optimize for initial load =====
optimizePerformance();

// ===== Ready! =====
document.dispatchEvent(new CustomEvent('constellation-explorer-ready', {
    detail: { version: '3.0', mode: '3D' }
}));