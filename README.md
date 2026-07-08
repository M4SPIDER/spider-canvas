# 🕷️ Spider Canvas

> Real-time AI chat interface with live code preview. Build, preview, and iterate on React/HTML apps instantly.

*Inspired by Gemini Canvas*

## ✨ Features

- 🔄 **Real-time Streaming** - AI responses stream in real-time
- 📝 **Live Code Preview** - Code blocks auto-render in sandboxed iframe
- 🎨 **React/HTML Sandbox** - Babel compiles React components on-the-fly
- 📁 **File & Image Upload** - Analyze files and images with AI
- 💾 **Session Persistence** - Chat history saved to IndexedDB
- 🖥️ **Responsive Design** - Works on desktop and mobile
- 🎯 **Resizable Panels** - Drag to resize chat vs preview

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/m4spider/spider-canvas.git

# Navigate to project
cd spider-canvas

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
spider-canvas/
├── src/
│   ├── App.jsx          # Main application
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── examples/            # Power demo files (MIT Licensed)
│   ├── grass.html       # TerraSim WebGL Grass
│   ├── glaxy.jsx        # 3D Galaxy Engine
│   ├── solar system.jsx # Solar System Simulator
│   ├── chess.jsx        # Chess Arena Pro
│   └── calc.jsx         # Engineering Calculator
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🛠️ Tech Stack

- ⚡ **Vite** - Fast build tool
- ⚛️ **React 18** - UI framework
- 🎨 **Tailwind CSS** - Styling
- 🎯 **Lucide React** - Icons
- 💾 **IndexedDB** - Local storage

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_endpoint
VITE_API_KEY=your_api_key
```

## 📝 Usage

1. **Chat** - Type your message and press Enter
2. **Upload Files** - Click the paperclip icon to attach files
3. **Preview Code** - Generated code auto-renders in the preview panel
4. **Resize Panels** - Drag the divider to resize
5. **New Session** - Click the trash icon to clear history

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🍴 **Fork** the repository
- 🔀 **Create** a feature branch
- 📝 **Commit** your changes
- 📤 **Push** to the branch
- 🔄 **Create** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🎮 Demo Code License

**All demo files are also MIT licensed!** You are free to use, modify, and distribute:

| Demo | File | Description |
|------|------|-------------|
| 🌿 TerraSim Grass | `examples/grass.html` | WebGL shaders, 35K procedural grass blades, audio-reactive |
| 🌌 3D Galaxy Engine | `examples/glaxy.jsx` | 150K particles, black hole singularity, custom shaders |
| 🪐 Solar System | `examples/solar system.jsx` | Orbital mechanics, planet textures, real-time simulation |
| ♟️ Chess Arena Pro | `examples/chess.jsx` | Full AI opponent, move validation, sound FX |
| 🔬 Engineering Calc | `examples/calc.jsx` | 15+ physics solvers, unit converter, real-time graphs |

**MIT License means:**
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use in private projects
- ✅ No attribution required (but appreciated!)

### Attribution

This project is created by **VALUVAJJALA VIVEK VARDHAN RAO**, Founder of **M4 Spider**.

If you use, modify, or distribute this software, please include the following attribution:

```
Originally created by VALUVAJJALA VIVEK VARDHAN RAO (M4 Spider)
GitHub: https://github.com/m4spider/spider-canvas
```

## 🙏 Acknowledgments

- Inspired by **Gemini Canvas**
- Built with ❤️ by **M4 Spider**

## 📬 Contact

- **Author**: VALUVAJJALA VIVEK VARDHAN RAO
- **GitHub**: [m4spider](https://github.com/m4spider)
- **Email**: helpm4spider@gmail.com

---

Made with 🕷️ by **M4 Spider**
