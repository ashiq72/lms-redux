<div align="center">

# 🖥️ University LMS Frontend 🖥️

**This is the official frontend client for the University Management System, built with React, Redux, and Ant Design.**

This application provides the complete user interface for Students, Faculty, and Admins to interact with the [University LMS Server](https://github.com/[YOUR-USERNAME]/[YOUR-BACKEND-REPO-NAME]).

<!-- Badges (Update these with your actual repo) -->
<p>
  <a href="https://github.com/[YOUR-USERNAME]/lms-redux-react/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/[YOUR-USERNAME]/lms-redux-react/[YOUR-WORKFLOW-FILE.yml]?style=for-the-badge&logo=githubactions&logoColor=white&label=Build" alt="Build Status">
  </a>
  <a href="https://github.com/[YOUR-USERNAME]/lms-redux-react/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/[YOUR-USERNAME]/lms-redux-react?style=for-the-badge&color=blue&label=License" alt="License">
  </a>
  <a href="https://github.com/[YOUR-USERNAME]/lms-redux-react/issues">
    <img src="https://img.shields.io/github/issues/[YOUR-USERNAME]/lms-redux-react?style=for-the-badge&color=brightgreen" alt="Issues">
  </a>
</p>

</div>

---

## 📍 Table of Contents

* [✨ Core Features](#-core-features)
* [🛠️ Tech Stack](#-tech-stack)
* [🏁 Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation & Setup](#-installation--setup)
    * [Running the Application](#-running-the-application)
* [🔑 Environment Variables](#-environment-variables)
* [📂 Folder Structure](#-folder-structure)
* [🤝 Contributing](#-contributing)
* [📜 License](#-license)

---

## ✨ Core Features

* **Modern React:** Built with **React 19** and hooks.
* **Blazing Fast Build:** Uses **Vite** for near-instant development server startup and optimized builds.
* **Type-Safe Code:** Fully written in **TypeScript**.
* **Centralized State:** State management powered by **Redux Toolkit** (the official, recommended way to use Redux).
* **Beautiful UI:** A rich, responsive, and professional UI built with the **Ant Design (antd)** component library.
* **Client-Side Routing:** Seamless navigation using **React Router DOM v7**.
* **Robust Form Handling:** Type-safe and performant forms managed by **React Hook Form**.
* **Role-Based Views:** Custom-tailored dashboards and navigation for Student, Faculty, and Admin roles.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **UI Library** | `React 19` |
| **Build Tool** | `Vite` |
| **Language** | `TypeScript` |
| **State Management** | `@reduxjs/toolkit`, `react-redux` |
| **Routing** | `react-router-dom` |
| **Form Handling** | `react-hook-form` |
| **UI Components** | `Ant Design (antd)` |
| **Linting** | `ESLint`, `typescript-eslint` |

---

## 🏁 Getting Started

Follow these instructions to get the client up and running on your local machine.

### Prerequisites

You must have the following installed:
* Node.js (v18.x or later recommended)
* npm (or yarn/pnpm)
* The [LMS Backend Server](https://github.com/[YOUR-USERNAME]/[YOUR-BACKEND-REPO-NAME]) must be running on your local machine (e.g., on `http://localhost:5000`).

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR-USERNAME]/lms-redux-react.git
    cd lms-redux-react
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    *(Or `yarn install` / `pnpm install`)*

3.  **Set up Environment Variables:**
    * Create a `.env.local` file in the root of the project.
    * See the [Environment Variables](#-environment-variables) section below for the required values.

### 🚀 Running the Application

* **Start the development server:**
    ```sh
    npm run dev
    ```
    This will start the Vite dev server, typically on `http://localhost:5173`.

* **Build for production:**
    ```sh
    npm run build
    ```
    This builds the optimized, static files into the `/dist` directory.

* **Preview the production build:**
    ```sh
    npm run preview
    ```
    This command starts a local server to preview the production build from `/dist`.

* **Run the linter:**
    ```sh
    npm run lint
    ```

---

## 🔑 Environment Variables

To connect to the backend API, create a `.env.local` file in the project root and add the following:

```.env
# The base URL of your running backend server
VITE_API_BASE_URL="http://localhost:5000/api/v1"
