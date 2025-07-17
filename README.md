# 🏰 Deus Vault OS Website

[![THERION Protocol](https://img.shields.io/badge/THERION-PROTOCOL-00e1ff.svg?style=for-the-badge)](https://github.com/yourusername/deusvault-os)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb.svg?style=for-the-badge)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**The self-evolving development environment that transforms how you create software. Built for professionals who demand excellence.**

## ⚔️ Features

### 🎮 Interactive 3D Navigation

- **Enhanced Hexagon Navigation**: Smooth rotation with fixed geometry issues
- **Interactive Face Selection**: Click or navigate sections with visual feedback
- **Keyboard Controls**: Full keyboard navigation support (A/D, Arrow keys, P for autoplay)
- **Touch/Mobile Support**: Optimized touch interactions for mobile devices

### 🎯 Enhanced User Experience

- **Autoplay Mode**: Automatic section transitions (Toggle with 'P')
- **Fullscreen Support**: Immersive viewing experience
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Full keyboard navigation and screen reader support

### 🚀 Performance Optimizations

- **WebGL Acceleration**: Hardware-accelerated 3D graphics
- **Smooth Animations**: 60fps interpolated transitions
- **Optimized Assets**: Compressed textures and efficient geometry
- **Progressive Loading**: Smart loading states and fallbacks

### 🎨 Visual Enhancements

- **Glass Morphism**: Advanced blur effects and transparency
- **Cyberpunk Aesthetics**: Neon colors and futuristic design
- **Dynamic Materials**: Animated textures and pulsing effects
- **Enhanced Typography**: Custom font stack with variable weights

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **3D Graphics**: Three.js with WebGL
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/deusvault-os-website.git
   cd deusvault-os-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 Navigation Controls

### Keyboard Shortcuts

- **A / D / Arrow Keys**: Navigate between sections
- **Spacebar**: Next section
- **P**: Toggle autoplay mode
- **F**: Toggle fullscreen
- **H**: Toggle controls visibility
- **R**: Reset to home section
- **Escape**: Exit fullscreen

### Mouse/Touch Controls

- **Click & Drag**: Rotate hexagon manually
- **Section Dots**: Click to jump to specific sections
- **Navigation Buttons**: Use enhanced control panel

## 🎯 Interactive Elements

### Enhanced Hexagon Features

- **6 Interactive Faces**: Each representing a different section
- **Dynamic Materials**: Face highlighting and pulsing animations
- **Section Indicators**: Visual labels and numbering
- **Smooth Rotation**: Fixed rotation issues with proper angle calculations
- **Corner Indicators**: Animated corner elements for active sections

### Control Panel Features

- **Home Reset**: Quick return to hero section
- **Autoplay Toggle**: Start/stop automatic navigation
- **Settings Panel**: Configuration options
- **Progress Indicators**: Visual feedback for current position

## 🎨 Customization

### Theme Colors

```css
:root {
  --cyber-cyan: #00e1ff;
  --cyber-mint-bright: #39ff14;
  --cyber-yellow: #ffd700;
  --cyber-purple: #bf00ff;
  --cyber-pink: #ff006e;
  --cyber-orange: #ff8500;
}
```

### Animation Settings

```css
:root {
  --animation-speed-fast: 0.15s;
  --animation-speed-normal: 0.3s;
  --animation-speed-slow: 0.6s;
  --animation-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔧 Development

### Project Structure

```
deusvault-os-website/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # UI primitives
│   │   ├── figma/          # Figma-imported components
│   │   └── ...             # Feature components
│   ├── styles/             # Global styles
│   └── main.tsx           # Application entry point
├── components/             # Additional components
├── styles/                # CSS files
├── public/                # Static assets
└── App.tsx               # Main application component
```

### Adding New Sections

1. **Create component** in `components/`
2. **Add to sections array** in `App.tsx`
3. **Update hexagon faces** in `ThreeJSScene.tsx`
4. **Test navigation** and interactions

### Performance Optimization

- Use `React.memo()` for expensive components
- Implement proper cleanup in useEffect hooks
- Optimize Three.js geometries and materials
- Use proper image formats and compression

## 🎯 Browser Support

- **Chrome 90+** (Recommended)
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

**Note**: WebGL 2.0 support required for optimal experience.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use ESLint and Prettier configurations
- Write descriptive commit messages
- Test on multiple browsers and devices
- Optimize for performance and accessibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For amazing 3D capabilities
- **React Team** - For the robust framework
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For utility-first styling
- **Radix UI** - For accessible primitives

## 🔗 Links

- [Documentation](https://github.com/yourusername/deusvault-os-website/wiki)
- [Issue Tracker](https://github.com/yourusername/deusvault-os-website/issues)
- [Discussions](https://github.com/yourusername/deusvault-os-website/discussions)

---

<div align="center">

**Built with ⚔️ by the THERION Protocol**

_Deus Vult - Autonomous Excellence_

</div>
