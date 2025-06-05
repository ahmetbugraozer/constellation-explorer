// Shared configuration between 2D and 3D versions
const CONSTELLATION_DATA = {
    // Common constellation data that both versions can use
    constellations: [
        {
            id: "ursa_major",
            name: "Ursa Major",
            description: "The Great Bear, home to the Big Dipper asterism",
            mythology: "In Greek mythology, Zeus transformed Callisto into a bear and placed her in the sky.",
            season: "Spring",
            hemisphere: "Northern",
            bestViewing: "April-June",
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
            id: "orion",
            name: "Orion",
            description: "The Hunter, one of the most recognizable constellations",
            mythology: "Orion was a legendary hunter in Greek mythology, placed in the sky by Zeus.",
            season: "Winter",
            hemisphere: "Both",
            bestViewing: "December-February",
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
            id: "cassiopeia",
            name: "Cassiopeia",
            description: "The Queen, shaped like a 'W' or 'M'",
            mythology: "Queen Cassiopeia was punished for her vanity by being placed upside-down in the sky.",
            season: "Year-round",
            hemisphere: "Northern",
            bestViewing: "Year-round (circumpolar)",
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
            id: "scorpius",
            name: "Scorpius",
            description: "The Scorpion, enemy of Orion",
            mythology: "The scorpion that killed Orion, placed opposite him in the sky.",
            season: "Summer",
            hemisphere: "Southern",
            bestViewing: "June-August",
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
            id: "cygnus",
            name: "Cygnus",
            description: "The Swan, flying along the Milky Way",
            mythology: "Zeus disguised as a swan, or Orpheus transformed after death.",
            season: "Summer/Fall",
            hemisphere: "Northern",
            bestViewing: "July-October",
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
            id: "leo",
            name: "Leo",
            description: "The Lion, representing the Nemean Lion",
            mythology: "The Nemean Lion was killed by Hercules as one of his twelve labors.",
            season: "Spring",
            hemisphere: "Both",
            bestViewing: "March-May",
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
    ],
    
    // Star database for additional information
    starDatabase: {
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
        },
        "Regulus": {
            type: "Blue-white Main Sequence",
            distance: "79 light-years",
            constellation: "Leo",
            fact: "Spins so fast it's oblate - wider at equator than poles"
        },
        "Dubhe": {
            type: "Orange Giant",
            distance: "123 light-years",
            constellation: "Ursa Major",
            fact: "One of the 'pointer stars' that helps locate Polaris"
        }
    },
    
    // Common settings
    defaultSettings: {
        showLines: true,
        showNames: true,
        showGrid: false,
        autoRotate: false,
        starSize: 1.5,
        lineWidth: 2
    },
       
    // Color schemes
    colorSchemes: {
        default: {
            background: '#0a0a0f',
            stars: '#ffffff',
            constellationLines: '#4a7c7e',
            labels: '#6dd5ed',
            grid: 'rgba(255, 255, 255, 0.1)'
        },
        daylight: {
            background: '#87ceeb',
            stars: '#ffd700',
            constellationLines: '#2d5a5a',
            labels: '#1e3a8a',
            grid: 'rgba(0, 0, 0, 0.1)'
        },
        deepSpace: {
            background: '#000000',
            stars: '#ffffff',
            constellationLines: '#1e3a8a',
            labels: '#60a5fa',
            grid: 'rgba(96, 165, 250, 0.1)'
        }
    },
    
    // Shared utility functions
    utils: {
        // Convert Right Ascension and Declination to Cartesian coordinates
        celestialToCartesian: function(ra, dec, radius) {
            const raRad = (ra * Math.PI) / 180;
            const decRad = (dec * Math.PI) / 180;
            
            const x = radius * Math.cos(decRad) * Math.cos(raRad);
            const y = radius * Math.sin(decRad);
            const z = radius * Math.cos(decRad) * Math.sin(raRad);
            
            return { x, y, z };
        },
        
        // Convert Cartesian to 2D projection (for 2D version)
        cartesianToScreenProjection: function(x, y, z, width, height) {
            // Stereographic projection
            const scale = 2 / (1 + z / 1000);
            const screenX = (x * scale + width / 2);
            const screenY = (height / 2 - y * scale);
            
            return { x: screenX, y: screenY };
        },
        
        // Get star color based on magnitude
        getStarColor: function(magnitude) {
            if (magnitude < 1) return '#ffffff';
            if (magnitude < 2) return '#ffeb3b';
            if (magnitude < 3) return '#90caf9';
            if (magnitude < 4) return '#b0c4de';
            return '#778899';
        },
        
        // Calculate distance between two points
        calculateDistance: function(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        },
        
        // Format coordinates for display
        formatCoordinates: function(ra, dec) {
            const raHours = Math.floor(ra / 15);
            const raMinutes = Math.floor((ra % 15) * 4);
            const decDegrees = Math.floor(Math.abs(dec));
            const decMinutes = Math.floor((Math.abs(dec) % 1) * 60);
            const decSign = dec >= 0 ? '+' : '-';
            
            return {
                ra: `${raHours}h ${raMinutes}m`,
                dec: `${decSign}${decDegrees}° ${decMinutes}'`
            };
        }
    }
};

// Export for use in both 2D and 3D versions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONSTELLATION_DATA;
}