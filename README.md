# Constellation Explorer 🌟

An interactive web application for exploring constellations in both 2D and 3D views, plus fractal mathematics exploration with the Mandelbrot Set.

![home](https://github.com/user-attachments/assets/fd66142f-a948-4eb2-b0e0-49aa6b9d02ac)

## Features

### 2D Sky Map Mode 🌌
- Traditional star map interface
- Pan and zoom controls
- Constellation lines and labels
- Search functionality
- Star information tooltips
- Night/day mode toggle

![2d-1](https://github.com/user-attachments/assets/e97f4539-c989-4f00-9eca-cea2724dcf0f)

![2d-3](https://github.com/user-attachments/assets/37914cf8-77d0-4c34-9cab-e321c2a9d122)

### 3D Celestial Sphere Mode 🌐
- 360° spherical navigation
- Realistic 3D star field
- Atmospheric effects
- Camera presets and tours
- WebGL-powered rendering
- Interactive constellation highlighting

![3d-1](https://github.com/user-attachments/assets/b2c628a3-0225-463d-a2e3-8b7a0f951d2f)

![3d-3](https://github.com/user-attachments/assets/701e9be1-b189-4d16-8ace-e22b1218c935)

![3d-2](https://github.com/user-attachments/assets/2742a340-6d26-4654-886c-ba7577de06c4)

### Mandelbrot Set Explorer ⚛
- Interactive fractal exploration
- High-performance rendering
- Real-time parameter adjustment
- Pre-defined interesting locations
- Progressive rendering for smooth interaction


## Project Structure

```
constellation-explorer/
├── index.html              # Main landing page
├── css/
│   └── landing.css         # Landing page styles
├── js/
│   └── landing.js          # Landing page scripts
├── 2d/
│   ├── index.html          # 2D sky map viewer
│   ├── style.css           # 2D styles
│   └── script.js           # 2D functionality
├── 3d/
│   ├── index.html          # 3D celestial sphere viewer
│   ├── style.css           # 3D styles
│   └── script.js           # 3D functionality
├── mandelbrot/
│   ├── index.html          # Mandelbrot set explorer
│   ├── style.css           # Mandelbrot styles
│   └── script.js           # Mandelbrot calculation engine
└── shared/
    └── config.js           # Shared constellation and config data
```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Choose between 2D Sky Map, 3D Celestial Sphere, or Mandelbrot Set exploration

### Local Development

To run locally with a web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using Live Server (VS Code extension)
# Right-click index.html and select "Open with Live Server"
```

Then navigate to http://localhost:8000

## Browser Requirements

- Modern browser with ES6 support
- WebGL support (for 3D mode)
- HTML5 Canvas support
- Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## Controls

### 2D Sky Map Mode
- **Mouse**: Click and drag to pan
- **Scroll**: Zoom in/out
- **Click**: Select stars/constellations
- **Double Click**: Center view on location
- **Keyboard**: L (lines), N (names), G (grid), D (day/night)

![2d-4](https://github.com/user-attachments/assets/49d09c95-5c46-4cc2-ab2e-49b47ac6a725)

### 3D Celestial Sphere Mode
- **Mouse**: Left drag to rotate, scroll to zoom
- **Right Mouse**: Pan camera
- **Keyboard**: WASD/Arrows to rotate, Space to reset
- **Touch**: Pinch to zoom, drag to rotate
- **View Buttons**: N/S/E/W/Z for cardinal directions

![3d-4](https://github.com/user-attachments/assets/e1588546-4e1e-4991-b48c-44898394e6bf)

### Mandelbrot Set Explorer
- **Mouse**: Click and drag to pan
- **Scroll**: Zoom in/out (infinite zoom)
- **Double Click**: Quick zoom to location
- **Keyboard**: R (reset), F (fullscreen), Space (re-render)
- **Sliders**: Adjust iteration count and color intensity
- **Quick Access**: Pre-defined interesting fractal locations

## Features by Mode

| Feature | 2D Mode | 3D Mode | Mandelbrot |
|---------|---------|---------|------------|
| Pan/Zoom | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ❌ |
| Fullscreen | ✅ | ✅ | ✅ |
| Touch Support | ✅ | ✅ | ✅ |
| Keyboard Shortcuts | ✅ | ✅ | ✅ |
| Real-time Interaction | ✅ | ✅ | ✅ |
| Visual Effects | ✅ | ✅ | ✅ |
| Mathematical Focus | Stars/Constellations | 3D Astronomy | Fractal Mathematics |

## Keyboard Shortcuts

### Universal (All Modes)
- **F**: Toggle fullscreen
- **R**: Reset view
- **H** or **?**: Show help

### Mode-Specific

#### 2D Mode
- **2**: Switch to 2D mode (from landing page)
- **L**: Toggle constellation lines
- **N**: Toggle constellation names
- **G**: Toggle coordinate grid
- **D**: Toggle day/night mode

#### 3D Mode
- **3**: Switch to 3D mode (from landing page)
- **WASD/Arrow Keys**: Rotate view
- **Q/E**: Roll camera
- **+/-**: Zoom in/out

#### Mandelbrot Mode
- **M**: Switch to Mandelbrot mode (from landing page)
- **Space**: Force re-render
- **Mouse Wheel**: Precise zoom control

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **2D Graphics**: HTML5 Canvas API
- **3D Graphics**: Three.js WebGL library
- **Mathematical Computing**: Custom Mandelbrot calculation engine
- **Fonts**: Google Fonts (Space Mono, Orbitron)
- **Animations**: CSS3 animations and transitions

## Performance Features

- **Adaptive Quality**: Reduced quality during interaction for smooth performance
- **Progressive Rendering**: Mandelbrot set renders in chunks for responsiveness
- **Viewport Optimization**: Only render visible areas
- **Memory Management**: Efficient canvas and WebGL resource handling
- **Mobile Optimization**: Touch-friendly controls and responsive design

## Educational Value

This project demonstrates:
- **Astronomy**: Constellation positions, star magnitudes, celestial navigation
- **Mathematics**: Fractal geometry, complex numbers, infinite zoom concepts
- **Computer Graphics**: 2D canvas manipulation, 3D WebGL rendering
- **User Interface**: Responsive design, interactive controls, accessibility
- **Performance Optimization**: Real-time rendering, memory management

## Browser Compatibility

| Browser | 2D Mode | 3D Mode | Mandelbrot | Notes |
|---------|---------|---------|------------|-------|
| Chrome 90+ | ✅ | ✅ | ✅ | Recommended |
| Firefox 88+ | ✅ | ✅ | ✅ | Full support |
| Safari 14+ | ✅ | ✅ | ✅ | macOS/iOS |
| Edge 90+ | ✅ | ✅ | ✅ | Chromium-based |
| Mobile Safari | ✅ | ⚠️ | ✅ | Limited WebGL |
| Chrome Mobile | ✅ | ✅ | ✅ | Full support |

## Contributing

Feel free to contribute by:
- Adding new constellation data
- Improving rendering performance
- Adding new fractal exploration features
- Enhancing mobile experience
- Fixing bugs or improving documentation

## License

MIT License - feel free to use for educational or personal projects.

## Credits

- Constellation data based on astronomical catalogs
- Three.js library for 3D rendering
- Mathematical algorithms for Mandelbrot set calculation
- Google Fonts for typography
