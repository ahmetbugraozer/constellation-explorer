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
        },
        {
            id: "andromeda",
            name: "Andromeda",
            description: "The Princess, chained to a rock as sacrifice",
            mythology: "Princess Andromeda was saved by Perseus from the sea monster Cetus.",
            season: "Fall",
            hemisphere: "Northern",
            bestViewing: "September-December",
            stars: [
                { name: "Alpheratz", ra: 2.097, dec: 29.090, magnitude: 2.1 },
                { name: "Mirach", ra: 17.433, dec: 35.621, magnitude: 2.0 },
                { name: "Almach", ra: 30.975, dec: 42.330, magnitude: 2.1 },
                { name: "Delta And", ra: 8.378, dec: 30.861, magnitude: 3.3 },
                { name: "Mu And", ra: 38.499, dec: 38.500, magnitude: 3.9 }
            ],
            lines: [[0,1], [1,2], [0,3], [2,4]]
        },
        {
            id: "perseus",
            name: "Perseus",
            description: "The Hero, slayer of Medusa",
            mythology: "Perseus rescued Andromeda and slayed the Gorgon Medusa.",
            season: "Fall/Winter",
            hemisphere: "Northern",
            bestViewing: "October-January",
            stars: [
                { name: "Mirfak", ra: 51.081, dec: 49.861, magnitude: 1.8 },
                { name: "Algol", ra: 47.042, dec: 40.956, magnitude: 2.1 },
                { name: "Epsilon Per", ra: 58.533, dec: 39.999, magnitude: 2.9 },
                { name: "Zeta Per", ra: 58.533, dec: 31.883, magnitude: 2.9 },
                { name: "Delta Per", ra: 47.787, dec: 47.788, magnitude: 3.0 }
            ],
            lines: [[0,1], [0,2], [0,4], [1,3], [2,3]]
        },
        {
            id: "lyra",
            name: "Lyra",
            description: "The Harp, instrument of Orpheus",
            mythology: "The lyre of Orpheus, whose music could charm all living things.",
            season: "Summer",
            hemisphere: "Northern",
            bestViewing: "June-September",
            stars: [
                { name: "Vega", ra: 279.234, dec: 38.784, magnitude: 0.0 },
                { name: "Sheliak", ra: 284.736, dec: 33.363, magnitude: 3.5 },
                { name: "Sulafat", ra: 284.736, dec: 32.690, magnitude: 3.2 },
                { name: "Delta Lyr", ra: 287.446, dec: 36.898, magnitude: 4.3 },
                { name: "Epsilon Lyr", ra: 281.903, dec: 39.613, magnitude: 4.7 }
            ],
            lines: [[0,1], [1,2], [0,3], [0,4]]
        },
        {
            id: "aquila",
            name: "Aquila",
            description: "The Eagle, Zeus's messenger",
            mythology: "The eagle that carried Zeus's thunderbolts and abducted Ganymede.",
            season: "Summer",
            hemisphere: "Both",
            bestViewing: "July-September",
            stars: [
                { name: "Altair", ra: 297.696, dec: 8.868, magnitude: 0.8 },
                { name: "Tarazed", ra: 296.565, dec: 10.613, magnitude: 2.7 },
                { name: "Alshain", ra: 298.829, dec: 6.407, magnitude: 3.7 },
                { name: "Delta Aql", ra: 302.197, dec: 3.115, magnitude: 3.4 },
                { name: "Lambda Aql", ra: 287.439, dec: -4.882, magnitude: 3.4 }
            ],
            lines: [[1,0], [0,2], [0,3], [0,4]]
        },
        {
            id: "pegasus",
            name: "Pegasus",
            description: "The Winged Horse",
            mythology: "The flying horse born from the blood of Medusa, tamed by Bellerophon.",
            season: "Fall",
            hemisphere: "Northern",
            bestViewing: "September-November",
            stars: [
                { name: "Markab", ra: 346.190, dec: 15.205, magnitude: 2.5 },
                { name: "Scheat", ra: 345.943, dec: 28.083, magnitude: 2.4 },
                { name: "Algenib", ra: 3.309, dec: 15.184, magnitude: 2.8 },
                { name: "Enif", ra: 326.046, dec: 9.875, magnitude: 2.4 },
                { name: "Homam", ra: 341.897, dec: 19.800, magnitude: 3.4 }
            ],
            lines: [[0,1], [1,2], [2,3], [3,0], [0,4]]
        },
        {
            id: "taurus",
            name: "Taurus",
            description: "The Bull, with the bright star Aldebaran",
            mythology: "Zeus disguised as a bull to abduct Europa.",
            season: "Winter",
            hemisphere: "Both",
            bestViewing: "November-February",
            stars: [
                { name: "Aldebaran", ra: 68.980, dec: 16.509, magnitude: 0.9 },
                { name: "Elnath", ra: 81.573, dec: 28.607, magnitude: 1.7 },
                { name: "Alcyone", ra: 56.871, dec: 24.105, magnitude: 2.9 },
                { name: "Maia", ra: 56.457, dec: 24.368, magnitude: 3.9 },
                { name: "Merope", ra: 57.291, dec: 23.948, magnitude: 4.1 }
            ],
            lines: [[0,1], [0,2], [2,3], [3,4]]
        },
        {
            id: "gemini",
            name: "Gemini",
            description: "The Twins, Castor and Pollux",
            mythology: "The twin brothers, one mortal and one immortal, sharing immortality.",
            season: "Winter",
            hemisphere: "Both",
            bestViewing: "December-March",
            stars: [
                { name: "Pollux", ra: 116.329, dec: 28.026, magnitude: 1.1 },
                { name: "Castor", ra: 113.650, dec: 31.888, magnitude: 1.6 },
                { name: "Alhena", ra: 99.428, dec: 16.399, magnitude: 1.9 },
                { name: "Wasat", ra: 107.098, dec: 22.514, magnitude: 3.5 },
                { name: "Mebsuta", ra: 95.740, dec: 25.131, magnitude: 3.0 }
            ],
            lines: [[0,1], [0,2], [1,4], [2,3], [3,4]]
        },
        {
            id: "cancer",
            name: "Cancer",
            description: "The Crab, home to the Beehive Cluster",
            mythology: "The crab that pinched Hercules during his fight with the Hydra.",
            season: "Winter/Spring",
            hemisphere: "Both",
            bestViewing: "February-April",
            stars: [
                { name: "Altarf", ra: 136.040, dec: 9.185, magnitude: 3.5 },
                { name: "Al Tarf", ra: 130.822, dec: 18.154, magnitude: 4.2 },
                { name: "Asellus Borealis", ra: 130.109, dec: 21.469, magnitude: 4.7 },
                { name: "Asellus Australis", ra: 130.831, dec: 18.154, magnitude: 3.9 },
                { name: "Acubens", ra: 134.622, dec: 11.858, magnitude: 4.2 }
            ],
            lines: [[0,1], [1,2], [2,3], [3,4], [4,0]]
        },
        {
            id: "virgo",
            name: "Virgo",
            description: "The Virgin, holding an ear of wheat (Spica)",
            mythology: "Associated with harvest goddesses like Ceres and Persephone.",
            season: "Spring/Summer",
            hemisphere: "Both",
            bestViewing: "April-June",
            stars: [
                { name: "Spica", ra: 201.298, dec: -11.161, magnitude: 1.0 },
                { name: "Zavijava", ra: 177.674, dec: 1.764, magnitude: 3.6 },
                { name: "Porrima", ra: 190.415, dec: -1.449, magnitude: 2.7 },
                { name: "Minelauva", ra: 195.544, dec: 10.959, magnitude: 3.4 },
                { name: "Vindemiatrix", ra: 195.544, dec: 10.959, magnitude: 2.9 }
            ],
            lines: [[1,2], [2,0], [2,3], [3,4]]
        },
        {
            id: "libra",
            name: "Libra",
            description: "The Scales of Justice",
            mythology: "The scales held by Astraea, goddess of justice.",
            season: "Summer",
            hemisphere: "Both",
            bestViewing: "May-July",
            stars: [
                { name: "Zubenelgenubi", ra: 222.720, dec: -16.042, magnitude: 2.7 },
                { name: "Zubeneschamali", ra: 229.252, dec: -9.383, magnitude: 2.6 },
                { name: "Zubenelakrab", ra: 236.013, dec: -25.282, magnitude: 3.9 },
                { name: "Brachium", ra: 233.679, dec: -14.789, magnitude: 3.3 }
            ],
            lines: [[0,1], [1,2], [1,3]]
        },
        {
            id: "sagittarius",
            name: "Sagittarius",
            description: "The Archer, pointing toward the galactic center",
            mythology: "Chiron the centaur, wise teacher of heroes.",
            season: "Summer",
            hemisphere: "Southern",
            bestViewing: "June-August",
            stars: [
                { name: "Kaus Australis", ra: 276.993, dec: -34.385, magnitude: 1.8 },
                { name: "Nunki", ra: 283.816, dec: -26.297, magnitude: 2.0 },
                { name: "Ascella", ra: 287.441, dec: -29.828, magnitude: 2.6 },
                { name: "Kaus Media", ra: 278.806, dec: -29.828, magnitude: 2.7 },
                { name: "Kaus Borealis", ra: 279.867, dec: -25.421, magnitude: 2.8 },
                { name: "Albaldah", ra: 290.972, dec: -40.615, magnitude: 2.8 }
            ],
            lines: [[0,3], [3,4], [4,1], [1,2], [2,5], [3,0]]
        },
        {
            id: "capricornus",
            name: "Capricornus",
            description: "The Sea Goat, half goat half fish",
            mythology: "Pan transformed into a goat-fish to escape the monster Typhon.",
            season: "Fall",
            hemisphere: "Both",
            bestViewing: "August-October",
            stars: [
                { name: "Deneb Algedi", ra: 325.023, dec: -16.127, magnitude: 2.9 },
                { name: "Dabih", ra: 311.552, dec: -14.781, magnitude: 3.1 },
                { name: "Nashira", ra: 320.339, dec: -16.662, magnitude: 3.7 },
                { name: "Algedi", ra: 304.513, dec: -12.544, magnitude: 3.6 }
            ],
            lines: [[3,1], [1,2], [2,0]]
        },
        {
            id: "aquarius",
            name: "Aquarius",
            description: "The Water Bearer, pouring celestial waters",
            mythology: "Ganymede, cupbearer to the gods, or Deucalion of the great flood.",
            season: "Fall",
            hemisphere: "Both",
            bestViewing: "September-November",
            stars: [
                { name: "Sadalsuud", ra: 322.890, dec: -5.571, magnitude: 2.9 },
                { name: "Sadalmelik", ra: 331.447, dec: -0.320, magnitude: 3.0 },
                { name: "Sadachbia", ra: 315.694, dec: -6.050, magnitude: 3.8 },
                { name: "Albali", ra: 293.220, dec: -13.863, magnitude: 3.8 },
                { name: "Ancha", ra: 334.208, dec: -7.783, magnitude: 4.2 }
            ],
            lines: [[0,1], [0,2], [2,3], [1,4]]
        },
        {
            id: "pisces",
            name: "Pisces",
            description: "The Fishes, swimming in opposite directions",
            mythology: "Aphrodite and Eros transformed into fish to escape Typhon.",
            season: "Fall",
            hemisphere: "Both",
            bestViewing: "September-December",
            stars: [
                { name: "Alrescha", ra: 22.897, dec: 2.764, magnitude: 3.8 },
                { name: "Fum al Samakah", ra: 350.344, dec: 6.378, magnitude: 4.5 },
                { name: "Delta Psc", ra: 358.615, dec: 7.585, magnitude: 4.4 },
                { name: "Epsilon Psc", ra: 11.625, dec: 8.824, magnitude: 4.3 },
                { name: "Gamma Psc", ra: 23.285, dec: 3.282, magnitude: 3.7 }
            ],
            lines: [[1,2], [2,3], [3,0], [0,4]]
        },
        {
            id: "aries",
            name: "Aries",
            description: "The Ram with the Golden Fleece",
            mythology: "The ram that carried Phrixus to safety, its fleece sought by Jason.",
            season: "Fall/Winter",
            hemisphere: "Both",
            bestViewing: "October-January",
            stars: [
                { name: "Hamal", ra: 31.793, dec: 23.462, magnitude: 2.0 },
                { name: "Sheratan", ra: 28.660, dec: 20.808, magnitude: 2.6 },
                { name: "Mesarthim", ra: 28.382, dec: 19.294, magnitude: 3.9 },
                { name: "41 Ari", ra: 37.206, dec: 27.260, magnitude: 3.6 }
            ],
            lines: [[0,1], [1,2], [0,3]]
        },
        {
            id: "draco",
            name: "Draco",
            description: "The Dragon wrapped around the north pole",
            mythology: "Ladon, the dragon that guarded the golden apples.",
            season: "Year-round",
            hemisphere: "Northern",
            bestViewing: "Year-round (circumpolar)",
            stars: [
                { name: "Thuban", ra: 211.097, dec: 64.376, magnitude: 3.7 },
                { name: "Etamin", ra: 269.151, dec: 51.489, magnitude: 2.2 },
                { name: "Rastaban", ra: 262.608, dec: 52.301, magnitude: 2.8 },
                { name: "Altais", ra: 194.006, dec: 67.661, magnitude: 3.1 },
                { name: "Aldhibah", ra: 213.915, dec: 58.966, magnitude: 3.0 }
            ],
            lines: [[0,4], [4,3], [0,1], [1,2]]
        },
        {
            id: "hercules",
            name: "Hercules",
            description: "The Hero kneeling with club raised",
            mythology: "The mighty hero who completed twelve labors.",
            season: "Summer",
            hemisphere: "Northern",
            bestViewing: "June-August",
            stars: [
                { name: "Kornephoros", ra: 247.555, dec: 21.490, magnitude: 2.8 },
                { name: "Zeta Her", ra: 240.083, dec: 31.603, magnitude: 2.8 },
                { name: "Pi Her", ra: 244.580, dec: 36.809, magnitude: 3.2 },
                { name: "Eta Her", ra: 248.971, dec: 38.922, magnitude: 3.5 },
                { name: "Delta Her", ra: 258.757, dec: 24.839, magnitude: 3.1 }
            ],
            lines: [[0,1], [1,2], [2,3], [0,4]]
        },
        {
            id: "bootes",
            name: "Boötes",
            description: "The Herdsman, following the Great Bear",
            mythology: "The plowman driving the oxen of the Great Bear around the pole.",
            season: "Spring/Summer",
            hemisphere: "Northern",
            bestViewing: "May-July",
            stars: [
                { name: "Arcturus", ra: 213.915, dec: 19.182, magnitude: -0.1 },
                { name: "Nekkar", ra: 225.486, dec: 40.390, magnitude: 3.5 },
                { name: "Seginus", ra: 221.247, dec: 38.308, magnitude: 3.0 },
                { name: "Epsilon Boo", ra: 211.593, dec: 27.074, magnitude: 2.4 },
                { name: "Muphrid", ra: 210.956, dec: 18.398, magnitude: 2.7 }
            ],
            lines: [[0,3], [3,2], [2,1], [0,4]]
        },
        {
            id: "corona_borealis",
            name: "Corona Borealis",
            description: "The Northern Crown, Ariadne's crown",
            mythology: "The crown given to Ariadne by Dionysus, placed in the sky.",
            season: "Summer",
            hemisphere: "Northern",
            bestViewing: "June-August",
            stars: [
                { name: "Alphecca", ra: 233.672, dec: 26.715, magnitude: 2.2 },
                { name: "Nusakan", ra: 236.014, dec: 33.312, magnitude: 3.7 },
                { name: "Theta CrB", ra: 229.252, dec: 31.359, magnitude: 4.1 },
                { name: "Beta CrB", ra: 228.856, dec: 29.106, magnitude: 3.7 }
            ],
            lines: [[2,3], [3,0], [0,1]]
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
    
    // Mandelbrot Set configuration
    mandelbrotConfig: {
        defaultSettings: {
            maxIterations: 100,
            escapeRadius: 2,
            zoom: 1,
            centerX: -0.5,
            centerY: 0,
            colorScheme: 'cosmic'
        },
        
        colorSchemes: {
            cosmic: {
                name: "Cosmic",
                colors: [
                    '#000033', '#000066', '#000099', '#0033cc',
                    '#0066ff', '#3399ff', '#66ccff', '#99ffff',
                    '#ffffff', '#ffcc99', '#ff9966', '#ff6633',
                    '#cc3300', '#990000', '#660000', '#330000'
                ]
            },
            nebula: {
                name: "Nebula",
                colors: [
                    '#000000', '#330033', '#660066', '#990099',
                    '#cc00cc', '#ff33ff', '#ff66cc', '#ff9999',
                    '#ffcccc', '#ffffff', '#ccffff', '#99ffcc',
                    '#66ff99', '#33ff66', '#00ff33', '#00cc00'
                ]
            },
            starField: {
                name: "Star Field",
                colors: [
                    '#000011', '#001122', '#002244', '#003366',
                    '#004488', '#0055aa', '#0066cc', '#2277dd',
                    '#4488ee', '#6699ff', '#88aaff', '#aabbff',
                    '#ccddff', '#eeeeff', '#ffffff', '#ffffee'
                ]
            },
            galaxy: {
                name: "Galaxy",
                colors: [
                    '#000000', '#1a0011', '#330022', '#4d0033',
                    '#660044', '#801a55', '#993366', '#b34d77',
                    '#cc6688', '#e68099', '#ff99aa', '#ffb3cc',
                    '#ffccdd', '#ffe6ee', '#ffffff', '#fff0f5'
                ]
            }
        },
        
        presetLocations: [
            {
                name: "Main Set",
                x: -0.5,
                y: 0,
                zoom: 1,
                description: "The classic Mandelbrot set view"
            },
            {
                name: "Seahorse Valley",
                x: -0.75,
                y: 0.1,
                zoom: 50,
                description: "Beautiful seahorse-like patterns"
            },
            {
                name: "Lightning",
                x: -1.775,
                y: 0,
                zoom: 100,
                description: "Lightning-like fractal branches"
            },
            {
                name: "Spiral Galaxy",
                x: -0.16,
                y: 1.04,
                zoom: 200,
                description: "Spiral patterns resembling galaxies"
            },
            {
                name: "Mini Mandelbrot",
                x: -0.1592,
                y: 1.0378,
                zoom: 1000,
                description: "A smaller copy of the main set"
            }
        ],
        
        keyboardShortcuts: {
            '+': 'Zoom in',
            '-': 'Zoom out',
            'r': 'Reset view',
            'c': 'Change color scheme',
            'i': 'Increase iterations',
            'd': 'Decrease iterations',
            's': 'Save image',
            'h': 'Show/hide help'
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
        },
        
        // Mandelbrot-specific utilities
        mandelbrot: {
            // Calculate Mandelbrot iteration for a point
            calculatePoint: function(cx, cy, maxIterations) {
                let x = 0, y = 0;
                let iteration = 0;
                
                while (x * x + y * y <= 4 && iteration < maxIterations) {
                    const xtemp = x * x - y * y + cx;
                    y = 2 * x * y + cy;
                    x = xtemp;
                    iteration++;
                }
                
                return iteration;
            },
            
            // Convert screen coordinates to complex plane
            screenToComplex: function(screenX, screenY, width, height, centerX, centerY, zoom) {
                const scale = 4 / zoom;
                const cx = centerX + (screenX - width / 2) * scale / width;
                const cy = centerY - (screenY - height / 2) * scale / height;
                return { cx, cy };
            },
            
            // Get color from iteration count
            getColor: function(iteration, maxIterations, colorScheme) {
                if (iteration === maxIterations) return '#000000';
                
                const colors = CONSTELLATION_DATA.mandelbrotConfig.colorSchemes[colorScheme].colors;
                const colorIndex = Math.floor((iteration / maxIterations) * (colors.length - 1));
                return colors[colorIndex] || colors[colors.length - 1];
            },
            
            // Smooth coloring function
            getSmoothColor: function(iteration, maxIterations, zx, zy, colorScheme) {
                if (iteration === maxIterations) return '#000000';
                
                const smoothIteration = iteration + 1 - Math.log(Math.log(Math.sqrt(zx * zx + zy * zy))) / Math.log(2);
                const colors = CONSTELLATION_DATA.mandelbrotConfig.colorSchemes[colorScheme].colors;
                const t = smoothIteration / maxIterations;
                const colorIndex = t * (colors.length - 1);
                const index1 = Math.floor(colorIndex);
                const index2 = Math.min(index1 + 1, colors.length - 1);
                const factor = colorIndex - index1;
                
                // Simple color interpolation
                return this.interpolateColors(colors[index1], colors[index2], factor);
            },
            
            // Simple color interpolation
            interpolateColors: function(color1, color2, factor) {
                const hex1 = color1.replace('#', '');
                const hex2 = color2.replace('#', '');
                
                const r1 = parseInt(hex1.substr(0, 2), 16);
                const g1 = parseInt(hex1.substr(2, 2), 16);
                const b1 = parseInt(hex1.substr(4, 2), 16);
                
                const r2 = parseInt(hex2.substr(0, 2), 16);
                const g2 = parseInt(hex2.substr(2, 2), 16);
                const b2 = parseInt(hex2.substr(4, 2), 16);
                
                const r = Math.round(r1 + (r2 - r1) * factor);
                const g = Math.round(g1 + (g2 - g1) * factor);
                const b = Math.round(b1 + (b2 - b1) * factor);
                
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            }
        }
    }
};

// Export for use in both 2D and 3D versions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONSTELLATION_DATA;
}