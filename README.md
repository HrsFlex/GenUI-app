# 🌌 ForceUI – The Self-Evolving Application Framework

> **An application that doesn't have a fixed interface. It *learns*, *adapts*, and *rebuilds itself* based on user intent, history, and context.**

[![Built with Tambo](https://img.shields.io/badge/Built%20with-Tambo%20AI-purple)](https://tambo.co)
[![MCP Enabled](https://img.shields.io/badge/MCP-Enabled-green)](https://modelcontextprotocol.io)
[![Hackathon 2026](https://img.shields.io/badge/Hackathon-2026-blue)](https://tambo.co)

---

## 🚀 Vision

ForceUI is a **next-generation Generative UI framework** that revolutionizes how users interact with applications. Instead of navigating through fixed menus and predetermined workflows, users simply describe what they need in natural language, and ForceUI **automatically assembles the perfect interface**.

## ✨ Core Features

### 1. 🧠 Intent-Driven UI Orchestration
- **Natural Language Processing**: Understands user intent from conversational input
- **Smart Component Selection**: Automatically selects and renders the most relevant components
- **Context-Aware**: Considers user history, persona, and preferences

### 2. 👤 Persona-Based Adaptation
- **Founder Mode**: Focus on high-level metrics, timelines, and strategic planning
- **Developer Mode**: Code-centric views, technical dashboards, and debugging tools
- **Analyst Mode**: Data visualizations, reports, and deep analysis
- **Recruiter Mode**: Candidate tracking, pipeline management

### 3. 🔌 MCP Integrations (Model Context Protocol)
- **GitHub Integration**: Real-time commit tracking, PR status, and issue management
- **Calendar Integration**: Meeting schedules, event coordination
- **Analytics API**: Live data streaming and metrics visualization
- **Workflow Recording**: Capture and replay user workflows for automation

### 4. 🪄 AI Explainability
- **Transparent Reasoning**: See exactly why the AI chose specific components
- **Intent Analysis**: Understand how your input was interpreted
- **Confidence Scores**: View the AI's certainty in its decisions

### 5. 📦 Self-Composed Components
Every component is:
- **Schema-Validated** with Zod for type safety
- **AI-Describable** for intelligent selection
- **Persona-Aware** for contextual display
- **Animated** with Framer Motion for smooth transitions

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        ForceUI                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Intent     │  │  Component  │  │   Explainability    │  │
│  │  Classifier │→ │  Orchestr.  │→ │      Engine         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Memory    │  │   Persona   │  │   MCP Integrations  │  │
│  │    Store    │  │    Store    │  │  (GitHub, Calendar) │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                   Tambo AI SDK + Next.js                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
forceui/
├── src/
│   ├── app/                    # Next.js pages
│   │   └── forceui/           # Main ForceUI application
│   ├── components/
│   │   ├── generative/        # AI-rendered components
│   │   │   ├── Timeline.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ChartView.tsx
│   │   │   ├── SummaryPanel.tsx
│   │   │   ├── ExplainabilityPanel.tsx
│   │   │   └── MCPStatusPanel.tsx  # MCP integrations demo
│   │   ├── interactable/      # User-interactive components
│   │   │   ├── IntentChat.tsx
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── NotesPanel.tsx
│   │   │   ├── PersonaSwitcher.tsx
│   │   │   └── WorkflowRecorder.tsx  # Workflow recording demo
│   │   └── layout/            # Layout components
│   ├── engine/                # Core intelligence layer
│   │   ├── intentClassifier.ts
│   │   ├── orchestrator.ts
│   │   ├── componentRegistry.ts
│   │   └── explainability.ts
│   ├── stores/                # Zustand state management
│   ├── config/                # Configuration files
│   └── hooks/                 # Custom React hooks
└── screenshots/               # Demo screenshots
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **Tambo AI SDK** | Generative UI capabilities |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Recharts** | Data visualization |
| **Zustand** | State management |
| **Zod** | Schema validation |
| **MCP** | Model Context Protocol integrations |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the forceui directory
cd forceui

# Install dependencies
npm install

# Set up environment
cp example.env.local .env.local
# Add your Tambo API key to .env.local

# Run development server
npm run dev
```

### Access the App
Open [http://localhost:3000/forceui](http://localhost:3000/forceui) in your browser.

---

## 💡 Example Use Cases

Try these prompts in the IntentChat:

| Prompt | Result |
|--------|--------|
| "Plan a product launch" | Timeline + KanbanBoard + StatsCard |
| "Show my integrations" | MCPStatusPanel with live status |
| "Record a workflow" | WorkflowRecorder component |
| "Analyze user metrics" | ChartView + StatsCard + SummaryPanel |
| "Switch to developer mode" | UI adapts for developer persona |

---

## 🎯 Hackathon Highlights

### Innovation Points
1. **Intent-to-UI Pipeline**: Revolutionary approach to UI generation
2. **MCP Integration**: Showcasing Model Context Protocol for external tool access
3. **Explainable AI**: Full transparency in AI decision-making
4. **Persona-Aware**: Dynamic adaptation based on user role

### Demo Flow
1. Load the application → See the animated welcome screen
2. Try "Show my integrations" → View the MCP Status Panel
3. Click "Record a workflow" → Interact with the Workflow Recorder
4. Use "Plan a product launch" → Watch components assemble
5. Toggle "Show AI Reasoning" → See the explainability panel

---

## 👥 Team

Built for the **Tambo Hackathon 2026** 🏆

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- [Tambo Documentation](https://docs.tambo.co)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Project Repository](https://github.com/your-repo/forceui)
