# 📋 Todo App

A simple and responsive Todo App built with **HTML**, **CSS**, and **JavaScript**, served using **Node.js** and **Express**. This app allows users to manage their daily tasks with features like adding, deleting, filtering, and toggling between light and dark modes.

![Design preview for the Todo app coding challenge](./design/desktop-preview.jpg)

---

## 🚀 Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos from the list
- ✅ Filter by All / Active / Completed
- ✅ Clear all completed todos
- ✅ Toggle between Light and Dark modes
- ✅ Responsive design for both mobile and desktop views

---

## 📁 Project Structure
```
amitsingh790634-todo-app/
├── README.md              # Project documentation
├── Dockerfile             # Dockerfile for containerizing the app
├── docker-compose.yml     # Docker Compose for managing services
├── server.js              # Express server to serve the app
├── style-guide.md         # Style guide for design references
├── design/                # Design mockups and resources
└── public/                # Public directory served by Express
├── index.html         # Main HTML file
├── script.js          # JavaScript logic
├── style.css          # Stylesheet for the app
└── images/            # Image assets

```
---

## 🛠️ Built With

- **HTML5** – Markup for the app
- **CSS3** – Styling with support for light/dark modes
- **JavaScript (ES6)** – Logic for managing todos
- **Node.js** – Backend runtime environment
- **Express.js** – Simple server to serve static files
- **Docker** – Containerization of the app
- **Docker Compose** – Managing multi-container applications

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/amitsingh790634-todo-app.git
cd amitsingh790634-todo-app

# Install dependencies
npm install express

# Start the server
node server.js

docker-compose up --build

# Build the Docker image
docker build -t todo-app .

# Run the container
docker run -p 8080:3000 todo-app
```


**Have fun building!** 🚀


================================================
File: Dockerfile
================================================

```
# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install express

# Copy all files to the container
COPY . .

# Expose port
EXPOSE 3000

# Run the Express server
CMD ["node", "server.js"]

```


================================================
File: docker-compose.yml
================================================



```
services:
  todo-app:
    build: .
    container_name: todo-app-node
    ports:
      - "8080:3000"
    volumes:
      - .:/app
      - /app/node_modules
    restart: always

```


================================================
File: server.js
================================================

```
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Todo app is running on http://localhost:${PORT}`);
});

```

<img width="1470" alt="Screenshot 2025-02-21 at 4 53 29 PM" src="https://github.com/user-attachments/assets/0f782e55-2b11-4a3e-adf3-5d2195d4102e" />



🤝 Acknowledgments
	•	Frontend Mentor for design inspiration
	•	Node.js and Express.js for powering the backend
	•	Docker Community for amazing containerization tools

 ✨ Author
	•	Name: Amit Singh
	•	GitHub: @amitsingh790634




---

### 📌 **Key Highlights:**

1. **Clear Instructions** on how to run locally or with Docker.
2. **Comprehensive Project Structure** for easy navigation.
3. **Screenshots Section** to visually showcase the app.
4. **Acknowledgments & Author Info** for proper credits.
5. **License Placeholder** – replace with the actual license if needed.

Let me know if you'd like any changes or additions! 🚀📋
