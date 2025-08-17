# Chatbot Flow Builder

A drag-and-drop **chatbot flow builder** built for the BiteSpeed Frontend Task.
It allows users to visually create chatbot conversation flows with nodes and connections.

[deployed link](https://bite-speed-chatbot-q2wc.vercel.app/)
Not responsive → best viewed on **desktop/laptop**
---

## ✨ Features

* Drag & drop nodes onto the canvas
* On drop, automatically opens a toggleable settings panel for that node
* Click on a node to open its respective settings panel
* Style nodes / customize node titles via double click
* Connect nodes with edges
* Zoom & pan controls
* Smooth animations with Framer Motion
* Dark mode / light mode toggle
* Clean UI with TailwindCSS

---

## 🛠️ Tech Stack

* [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)
* [ReactFlow (xyflow/react)](https://reactflow.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)

---

## 🧩 Thought Process & Execution

* Designed for **scalability** while keeping **user experience** intuitive
* **Dark/Light mode** for user preference
* Separated node panel for drag-and-drop nodes & canvas controls (zoom, fit-to-screen)

  * Panel auto-shrinks for more canvas space but can be toggled anytime
* **ReactFlow best practices**:

  * Node UI updates handled in local state first (fast UI)
  * Global state updates only after interaction ends → optimized Redux usage
* **Redux Toolkit**:

  * Global state for multi-component sync + easier backend integration with async thunks
* **Component design**:

  * Reusable, easy-to-extend (just import 2 components → new node works)
  * Clear separation of concerns

---

## 📂 Project Structure

```
src/
  ├── assets/          # SVGs and related components
  ├── components/      
  │   ├── ui/          # UI components (header, canvas, sidebar, settings)
  │   ├── nodes/       # Node components (BaseNode, NodeLabel, etc.)
  ├── rtk/             # Redux Toolkit slices & store
  ├── utils/           # Utility functions (clsx, tailwind-merge helpers)
  ├── App.tsx          # Main entry
```

### Adding a New Node

1. Add SVG → `assets/icons/` and import in `assets/icons.tsx`
2. Copy a draggable component in `src/components/ui/Sidebar` and update label/type
3. Create new node file in `src/components/nodes/NodesOnDisplay`

   * Import `BaseNode` (handles data passing & basic design)
   * Add `NodeBody` with props (`hasTarget`, `hasSource`)
4. Update `nodeTypes` object in `src/components/nodes` with new key/component

---

## ⚠️ Limitations

* Currently, only **Message node** is functional
* **Condition** and **Output** nodes are placeholders
* Not responsive → best viewed on **desktop/laptop**

---
