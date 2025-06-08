class MandelbrotExplorer {
    constructor() {
        this.canvas = document.getElementById("universe");
        this.ctx = this.canvas.getContext("2d");
        
        // Mandelbrot parametreleri - daha yüksek iterasyon
        this.zoom = 200;
        this.centerX = 0;
        this.centerY = 0;
        this.maxIterations = 500;
        this.colorIntensity = 3;
        
        // Performans ve interaksiyon
        this.isRendering = false;
        this.isDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.renderStartTime = 0;
        this.dragStartTime = 0;
        this.lastRenderTime = 0;
        
        // Viewport optimizasyonu
        this.viewportBounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
        this.renderQueue = [];
        this.isRealTimeRender = false;
        
        // Gelişmiş optimizasyon
        this.offscreenCanvas = null;
        this.offscreenCtx = null;
        this.renderCache = new Map();
        this.adaptiveQuality = true;
        this.renderWorkers = [];
        this.workerPool = [];
        this.useWorkers = false;
        
        this.init();
    }
    
    init() {
        this.hideLoader();
        
        this.resizeCanvas();
        this.setupOffscreenCanvas();
        if (this.useWorkers) {
            this.setupWorkerPool();
        }
        this.setupEventListeners();
        this.setupUI();
        this.render();
        this.showNotification("🌌 Welcome to the Mandelbrot Universe!");
        
        // Global referansı kaydet
        window.mandelbrotExplorer = this;
    }
    
    hideLoader() {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('fade-out');
                // Loader tamamen gizlendikten sonra DOM'dan kaldır
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }
        }, 1500); // 1.5 saniye bekle (2D ve 3D modlar gibi)
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.offscreenCanvas) {
            this.offscreenCanvas.width = window.innerWidth;
            this.offscreenCanvas.height = window.innerHeight;
        }
    }
    
    setupOffscreenCanvas() {
        try {
            this.offscreenCanvas = document.createElement('canvas');
            this.offscreenCanvas.width = this.canvas.width;
            this.offscreenCanvas.height = this.canvas.height;
            this.offscreenCtx = this.offscreenCanvas.getContext('2d');
        } catch (e) {
            console.warn("OffscreenCanvas not supported, falling back to regular canvas");
        }
    }
    
    setupWorkerPool() {
        // Worker pool for parallel processing
        const numWorkers = Math.min(8, navigator.hardwareConcurrency || 4);
        this.workerPool = [];
        
        for (let i = 0; i < numWorkers; i++) {
            const workerCode = `
                self.onmessage = function(e) {
                    const { startY, endY, width, height, zoom, centerX, centerY, maxIterations, colorIntensity } = e.data;
                    const result = [];
                    
                    const centerPixelX = width / 2;
                    const centerPixelY = height / 2;
                    
                    for (let y = startY; y < endY; y++) {
                        for (let x = 0; x < width; x++) {
                            const dx = (x - centerPixelX) / zoom + centerX;
                            const dy = (y - centerPixelY) / zoom + centerY;
                            
                            let a = 0;
                            let b = 0;
                            let iteration = 0;
                            
                            // Optimized escape time algorithm
                            while (iteration < maxIterations) {
                                const aa = a * a;
                                const bb = b * b;
                                if (aa + bb > 4) break;
                                
                                b = 2 * a * b + dy;
                                a = aa - bb + dx;
                                iteration++;
                            }
                            
                            // Calculate color
                            let r, g, b;
                            if (iteration === maxIterations) {
                                r = g = b = 0;
                            } else {
                                // Smooth coloring
                                const smoothed = iteration + 1 - Math.log2(Math.log2(a * a + b * b));
                                r = Math.min(255, Math.floor(smoothed * colorIntensity));
                                g = Math.min(255, Math.floor(smoothed));
                                b = Math.min(255, Math.floor(smoothed * 0.5));
                            }
                            
                            result.push({ x, y, r, g, b });
                        }
                    }
                    
                    self.postMessage({ startY, endY, pixels: result });
                };
            `;
            
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const worker = new Worker(URL.createObjectURL(blob));
            this.workerPool.push(worker);
        }
    }
    
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener("wheel", this.handleWheel.bind(this));
        this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.canvas.addEventListener("dblclick", this.handleDoubleClick.bind(this));
        this.canvas.addEventListener("contextmenu", e => e.preventDefault());
        
        // Keyboard events
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        
        // Window events
        window.addEventListener("resize", () => {
            this.resizeCanvas();
            this.render();
        });
        
        // Touch events for mobile
        this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));
    }
    
    setupUI() {
        // Panel toggle
        document.getElementById("togglePanel").addEventListener("click", () => {
            const content = document.getElementById("panelContent");
            const button = document.getElementById("togglePanel");
            content.classList.toggle("collapsed");
            button.textContent = content.classList.contains("collapsed") ? "+" : "−";
        });
        
        // Sliders - yüksek iterasyon desteği
        const iterationSlider = document.getElementById("iterationSlider");
        iterationSlider.max = "2000";
        iterationSlider.value = "500";
        iterationSlider.addEventListener("input", (e) => {
            this.maxIterations = parseInt(e.target.value);
            this.render();
        });
        
        document.getElementById("colorIntensity").addEventListener("input", (e) => {
            this.colorIntensity = parseInt(e.target.value);
            this.render();
        });
    }
    
    handleWheel(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Zoom towards mouse position
        const worldX = (mouseX - this.canvas.width / 2) / this.zoom + this.centerX;
        const worldY = (mouseY - this.canvas.height / 2) / this.zoom + this.centerY;
        
        const zoomFactor = e.deltaY > 0 ? 0.8 : 1.25;
        this.zoom *= zoomFactor;
        
        // Adjust center to zoom towards mouse
        this.centerX = worldX - (mouseX - this.canvas.width / 2) / this.zoom;
        this.centerY = worldY - (mouseY - this.canvas.height / 2) / this.zoom;
        
        this.render();
    }
    
    handleMouseDown(e) {
        if (e.button === 0) { // Left click
            this.isDragging = true;
            this.dragStartTime = performance.now();
            this.canvas.classList.add("dragging");
            document.body.classList.add("dragging");
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            
            // Sürükleme başladığında real-time render modu
            this.isRealTimeRender = true;
        }
    }
    
    handleMouseMove(e) {
        if (this.isDragging) {
            const deltaX = e.clientX - this.lastMousePos.x;
            const deltaY = e.clientY - this.lastMousePos.y;
            
            this.centerX -= deltaX / this.zoom;
            this.centerY -= deltaY / this.zoom;
            
            this.lastMousePos = { x: e.clientX, y: e.clientY };
            
            // Throttled rendering during drag
            const now = performance.now();
            if (now - this.lastRenderTime > 50) { // 20 FPS limit during drag
                this.renderFast();
                this.lastRenderTime = now;
            }
        }
    }
    
    handleMouseUp(e) {
        if (e.button === 0) {
            this.isDragging = false;
            this.isRealTimeRender = false;
            this.canvas.classList.remove("dragging");
            document.body.classList.remove("dragging");
            
            // Sürükleme bittiğinde full quality render
            setTimeout(() => {
                if (!this.isDragging) {
                    this.render();
                }
            }, 100);
        }
    }
    
    handleDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.centerX += (x - this.canvas.width / 2) / this.zoom;
        this.centerY += (y - this.canvas.height / 2) / this.zoom;
        this.zoom *= 2;
        
        this.render();
        this.showNotification("🔍 Quick Zoom Applied!");
    }
    
    handleKeyDown(e) {
        switch(e.key.toLowerCase()) {
            case 'r':
                this.resetView();
                break;
            case 'f':
                this.toggleFullscreen();
                break;
            case ' ':
                e.preventDefault();
                this.render();
                break;
        }
    }
    
    // Touch events for mobile support
    handleTouchStart(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            this.isDragging = true;
            this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (this.isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - this.lastMousePos.x;
            const deltaY = e.touches[0].clientY - this.lastMousePos.y;
            
            this.centerX -= deltaX / this.zoom;
            this.centerY -= deltaY / this.zoom;
            
            this.lastMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            this.render();
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.isDragging = false;
    }
    
    // Gelişmiş hızlı render - adaptive quality
    renderFast() {
        if (this.isRendering && !this.isDragging) return;
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Adaptive quality based on zoom level
        let skipSize = 1;
        let reducedIterations = this.maxIterations;
        
        if (this.isDragging) {
            if (this.zoom > 10000) {
                skipSize = 4;
                reducedIterations = Math.max(100, this.maxIterations / 8);
            } else if (this.zoom > 1000) {
                skipSize = 3;
                reducedIterations = Math.max(150, this.maxIterations / 6);
            } else {
                skipSize = 2;
                reducedIterations = Math.max(200, this.maxIterations / 4);
            }
        }
        
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;
        
        this.renderViewportOptimized(data, width, height, skipSize, reducedIterations);
        
        this.ctx.putImageData(imageData, 0, 0);
        this.updateUI();
    }
    
    async render() {
        if (this.isRendering && !this.isRealTimeRender) return;
        
        if (!this.isDragging) {
            this.isRendering = true;
            this.renderStartTime = performance.now();
            this.showLoading(true);
        }
        
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        if (this.isDragging) {
            this.renderFast();
        } else {
            // Use progressive rendering instead of workers for stability
            await this.renderProgressive(width, height);
            
            const renderTime = performance.now() - this.renderStartTime;
            document.getElementById("renderTime").textContent = `${renderTime.toFixed(0)}ms`;
        }
        
        if (!this.isDragging) {
            this.isRendering = false;
            this.showLoading(false);
        }
    }
    
    async renderProgressive(width, height) {
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;
        
        const centerPixelX = width / 2;
        const centerPixelY = height / 2;
        const chunkSize = Math.max(1, Math.floor(height / 40)); // 40 chunks for smoother progress
        
        for (let startY = 0; startY < height; startY += chunkSize) {
            // Sürükleme başladıysa progressive rendering'i durdur
            if (this.isDragging) {
                break;
            }
            
            const endY = Math.min(startY + chunkSize, height);
            
            for (let y = startY; y < endY; y++) {
                for (let x = 0; x < width; x++) {
                    const dx = (x - centerPixelX) / this.zoom + this.centerX;
                    const dy = (y - centerPixelY) / this.zoom + this.centerY;
                    
                    let a = 0;
                    let b = 0;
                    let iteration = 0;
                    
                    // Cardioid and period-2 bulb checking for optimization
                    const q = (dx - 0.25) * (dx - 0.25) + dy * dy;
                    if (q * (q + (dx - 0.25)) < 0.25 * dy * dy || 
                        (dx + 1) * (dx + 1) + dy * dy < 0.0625) {
                        iteration = this.maxIterations;
                    } else {
                        while (iteration < this.maxIterations && (a * a + b * b) < 4) {
                            const temp = a * a - b * b + dx;
                            b = 2 * a * b + dy;
                            a = temp;
                            iteration++;
                        }
                    }
                    
                    const pixelIndex = (y * width + x) * 4;
                    const color = this.calculateColorOptimized(iteration, this.maxIterations, a, b);
                    
                    data[pixelIndex] = color.r;
                    data[pixelIndex + 1] = color.g;
                    data[pixelIndex + 2] = color.b;
                    data[pixelIndex + 3] = 255;
                }
            }
            
            // Progress update ve intermediate render
            const progress = ((startY + chunkSize) / height) * 100;
            document.getElementById("progressFill").style.width = `${Math.min(100, progress)}%`;
            
            // Her chunk'tan sonra ekranı güncelle
            if (startY % (chunkSize * 4) === 0) {
                this.ctx.putImageData(imageData, 0, 0);
                await new Promise(resolve => setTimeout(resolve, 1));
            }
        }
        
        // Final render
        this.ctx.putImageData(imageData, 0, 0);
        this.updateUI();
    }
    
    // Optimized viewport rendering
    renderViewportOptimized(data, width, height, skipSize = 1, iterations = null) {
        const maxIter = iterations || this.maxIterations;
        const centerPixelX = width / 2;
        const centerPixelY = height / 2;
        
        for (let y = 0; y < height; y += skipSize) {
            for (let x = 0; x < width; x += skipSize) {
                const dx = (x - centerPixelX) / this.zoom + this.centerX;
                const dy = (y - centerPixelY) / this.zoom + this.centerY;
                
                // Optimized mandelbrot calculation
                let a = 0;
                let b = 0;
                let iteration = 0;
                
                // Cardioid and period-2 bulb checking for optimization
                const q = (dx - 0.25) * (dx - 0.25) + dy * dy;
                if (q * (q + (dx - 0.25)) < 0.25 * dy * dy || 
                    (dx + 1) * (dx + 1) + dy * dy < 0.0625) {
                    iteration = maxIter;
                } else {
                    while (iteration < maxIter) {
                        const aa = a * a;
                        const bb = b * b;
                        if (aa + bb > 4) break;
                        
                        b = 2 * a * b + dy;
                        a = aa - bb + dx;
                        iteration++;
                    }
                }
                
                const color = this.calculateColorOptimized(iteration, maxIter, a, b);
                
                // Fill multiple pixels for skip size
                for (let sy = 0; sy < skipSize && y + sy < height; sy++) {
                    for (let sx = 0; sx < skipSize && x + sx < width; sx++) {
                        const pixelIndex = ((y + sy) * width + (x + sx)) * 4;
                        data[pixelIndex] = color.r;
                        data[pixelIndex + 1] = color.g;
                        data[pixelIndex + 2] = color.b;
                        data[pixelIndex + 3] = 255;
                    }
                }
            }
        }
    }
    
    calculateViewportBounds(width, height, centerPixelX, centerPixelY) {
        const padding = 0.1; // %10 padding
        const worldWidth = width / this.zoom;
        const worldHeight = height / this.zoom;
        
        return {
            minX: this.centerX - (worldWidth / 2) - (worldWidth * padding),
            maxX: this.centerX + (worldWidth / 2) + (worldWidth * padding),
            minY: this.centerY - (worldHeight / 2) - (worldHeight * padding),
            maxY: this.centerY + (worldHeight / 2) + (worldHeight * padding)
        };
    }
    
    calculateColorOptimized(iteration, maxIterations, a, b) {
        if (iteration === maxIterations) {
            return { r: 0, g: 0, b: 0 };
        } else {
            // Orijinal renk şeması koruyarak smooth coloring
            const smoothed = iteration + 1 - Math.log2(Math.log2(a * a + b * b + 1e-10));
            const r = Math.min(255, Math.floor(smoothed * this.colorIntensity));
            const g = Math.min(255, Math.floor(smoothed));
            const b_ = Math.min(255, Math.floor(smoothed * 0.5));
            return { r, g, b: b_ };
        }
    }
    
    showLoading(show) {
        const overlay = document.getElementById("loadingOverlay");
        if (show && !this.isDragging) {
            overlay.style.display = "flex";
        } else {
            overlay.style.display = "none";
            document.getElementById("progressFill").style.width = "0%";
        }
    }
    
    showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.classList.add("show");
        
        setTimeout(() => {
            notification.classList.remove("show");
        }, 3000);
    }
    
    updateUI() {
        document.getElementById("zoomLevel").textContent = `${(this.zoom / 200).toFixed(2)}x`;
        document.getElementById("centerX").textContent = this.centerX.toFixed(6);
        document.getElementById("centerY").textContent = this.centerY.toFixed(6);
        document.getElementById("iterations").textContent = this.maxIterations;
    }
    
    resetView() {
        this.zoom = 200;
        this.centerX = 0;
        this.centerY = 0;
        this.maxIterations = 500;
        this.colorIntensity = 3;
        
        document.getElementById("iterationSlider").value = 500;
        document.getElementById("colorIntensity").value = 3;
        
        this.render();
        this.showNotification("🏠 Returned to initial view");
    }
    
    goToInteresting(region) {
        const locations = [
            { x: -0.7269, y: 0.1889, zoom: 15000, iter: 800, name: "Seahorse Valley" },
            { x: -0.8, y: 0.156, zoom: 25000, iter: 1000, name: "Lightning" },
            { x: -0.1, y: 0.651, zoom: 12000, iter: 600, name: "Spiral Galaxy" }
        ];
        
        const location = locations[region - 1];
        if (!location) {
            this.showNotification("❌ Invalid location selected");
            return;
        }
        
        this.centerX = location.x;
        this.centerY = location.y;
        this.zoom = location.zoom;
        this.maxIterations = location.iter;
        
        // UI'yi güncelle
        document.getElementById("iterationSlider").value = location.iter;
        
        this.render();
        this.showNotification(`🎯 Exploring ${location.name} with ${location.iter} iterations...`);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.showNotification("🖥️ Fullscreen mode active - High performance");
        } else {
            document.exitFullscreen();
            this.showNotification("🪟 Switched to windowed mode");
        }
    }
}

let mandelbrotExplorer = null;

function resetView() {
    if (mandelbrotExplorer) {
        mandelbrotExplorer.resetView();
    }
}

function goToInteresting(region) {
    if (mandelbrotExplorer) {
        mandelbrotExplorer.goToInteresting(region);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    mandelbrotExplorer = new MandelbrotExplorer();
});
