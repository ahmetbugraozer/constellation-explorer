# Constellation Explorer 🌟

An interactive web application for exploring constellations in both 2D and 3D views.

![home](https://github.com/user-attachments/assets/fd66142f-a948-4eb2-b0e0-49aa6b9d02ac)

## Features

### 2D Mode
- Traditional star map interface
- Pan and zoom controls
- Constellation lines and labels
- Search functionality
- Star information tooltips

![2d-1](https://github.com/user-attachments/assets/e97f4539-c989-4f00-9eca-cea2724dcf0f)

![2d-3](https://github.com/user-attachments/assets/37914cf8-77d0-4c34-9cab-e321c2a9d122)



### 3D Mode
- 360° spherical navigation
- Realistic 3D star field
- Atmospheric effects
- Camera presets and tours
- WebGL-powered rendering

![3d-1](https://github.com/user-attachments/assets/b2c628a3-0225-463d-a2e3-8b7a0f951d2f)

![3d-3](https://github.com/user-attachments/assets/701e9be1-b189-4d16-8ace-e22b1218c935)

![3d-2](https://github.com/user-attachments/assets/2742a340-6d26-4654-886c-ba7577de06c4)


## Project Structure

```
constellation-explorer/
├── index.html              # Main landing page
├── css/
│   └── landing.css         # Landing page styles
├── js/
│   └── landing.js          # Landing page scripts
├── 2d/
│   ├── index.html          # 2D viewer
│   ├── style.css           # 2D styles
│   └── script.js           # 2D functionality
├── 3d/
│   ├── index.html          # 3D viewer
│   ├── style.css           # 3D styles
│   └── script.js           # 3D functionality
└── shared/
    └── config.js           # Shared constellation data
```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Choose between 2D or 3D viewing modes

### Local Development

To run locally with a web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then navigate to http://localhost:8000


## Browser Requirements

- Modern browser with ES6 support
- WebGL support (for 3D mode)
- Recommended: Chrome, Firefox, Safari, Edge

## Controls

### 2D Mode
- **Mouse**: Click and drag to pan
- **Scroll**: Zoom in/out
- **Click**: Select stars/constellations

![2d-4](https://github.com/user-attachments/assets/49d09c95-5c46-4cc2-ab2e-49b47ac6a725)

### 3D Mode
- **Mouse**: Left drag to rotate, scroll to zoom
- **Keyboard**: WASD/Arrows to rotate, Space to reset
- **Touch**: Pinch to zoom, drag to rotate

![3d-4](https://github.com/user-attachments/assets/e1588546-4e1e-4991-b48c-44898394e6bf)

## Technologies Used

- HTML5 Canvas (2D mode)
- Three.js (3D mode)
- Vanilla JavaScript
- CSS3 with animations

## License

MIT License - feel free to use for educational or personal projects.
