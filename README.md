# 📝 Agnirva Notes App

A clean, feature-rich note-taking web application built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just open the file and start writing.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

### Note Management
- **Create notes** with a title, body, and comma-separated tags
- **Edit notes** via a modal dialog
- **Delete notes** with a single click
- **Pin notes** to keep important ones at the top of the list
- **Drag-and-drop reordering** — grab any note card and rearrange freely

### Search & Filtering
- **Live search** — filters notes instantly by title, content, or tag as you type
- **Tag sidebar** — click any tag to filter notes by that tag
- **Tag pills on cards** — click an inline tag to jump straight to that filter
- **Clear Filter** button to reset back to all notes

### Appearance
- **Dark mode toggle** (🌙) persisted across sessions via `localStorage`
- Glassmorphism-style card UI with smooth hover animations
- Gradient background with frosted-glass panels

### Persistence
- All notes and dark-mode preference are saved to `localStorage` — your data survives page refreshes

---

## 📂 File Structure

```
├── AgnirvaNoteTakingApp.html   # App shell and markup
├── script.js                   # All app logic (CRUD, search, drag, modal)
└── styles.css                  # Styling, dark mode, animations
```

---

## 🚀 Getting Started

No installation or build step required.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/agnirva-notes-app.git
   ```

2. Open `AgnirvaNoteTakingApp.html` in any modern browser:
   ```bash
   open AgnirvaNoteTakingApp.html
   # or just double-click the file
   ```

That's it — the app runs entirely in the browser.

---

## 🛠 How It Works

| Area | Detail |
| :--- | :--- |
| **Storage** | `localStorage` — notes persist as a JSON array; dark-mode preference stored as a boolean string |
| **Rendering** | `render()` rebuilds the note list on every state change, applying search and tag filters |
| **Drag & Drop** | Native HTML5 `dragstart` / `dragover` / `dragend` events; note order syncs back to the array on drop |
| **Modal** | A fixed-position overlay for editing; populated with the selected note's data via `editIndex` |
| **Tag Sidebar** | Built by `renderTags()`, which collects a `Set` of all unique tags across all notes |

---

## 🌐 Browser Compatibility

| Browser | Supported |
| :--- | :--- |
| Chrome 90+ | ✅ |
| Firefox 88+ | ✅ |
| Edge 90+ | ✅ |
| Safari 14+ | ✅ |

---

## 🤝 Contributing

Contributions and suggestions are welcome! Some ideas for future improvements:

- Note timestamps (created / last edited)
- Markdown rendering in note bodies
- Export notes as `.txt` or `.json`
- Note colour labels
- Keyboard shortcuts for common actions

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and free to use.

---

<p align="center">Built with ❤️ by Agnirva</p>
