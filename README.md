
# 🧾 Restaurant POS System

A web-based **Point of Sale (POS)** application for restaurants, providing separate workflows for **Administrators** and **Cashiers**.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://pos-system-orcin-five.vercel.app/)

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8)
![Zustand](https://img.shields.io/badge/Zustand-433E38)

## ✨ Features

### Authentication & Role-Based Access

- Login through the backend API.
- Separate Admin and Cashier experiences.
- Role-aware access to application sections.

### Cashier Workflow

- Browse menu items by category.
- Add products to the cart.
- Update item quantities and review selected items.
- Calculate the subtotal, 14% tax, and total amount.

### Application & UI

- Client-side navigation with React Router.
- Shared cart and UI state managed with Zustand.
- Form handling and validation with Formik and Yup.
- REST API integration using Axios.
- Toast notifications for user feedback.
- Responsive interface styled with Tailwind CSS and DaisyUI.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript |
| Build Tool | Vite |
| Routing | React Router |
| Styling | Tailwind CSS, DaisyUI |
| State Management | Zustand |
| API Communication | Axios, REST API |
| Forms & Validation | Formik, Yup |
| UI Feedback | react-hot-toast, react-icons |
| Deployment | Vercel |

## 🔌 Backend Configuration

This frontend communicates with a restaurant POS backend API.

Before running the application, make sure the backend is available and that the API base URL in the project configuration points to the correct backend.

Do not add credentials or private tokens to source files.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Access to the POS backend API.

### Installation

```bash
git clone https://github.com/NancyRashid123/POS-system.git
cd POS-system
npm install
```

### Run Locally

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Production Build

```bash
npm run build
npm run preview
```

## ☁️ Deployment

Deployed on Vercel:

[Live Demo](https://pos-system-orcin-five.vercel.app/)

The frontend requires access to its backend API for authentication and POS data.

## 👩‍💻 Author

**Nancy Rashid**

[GitHub](https://github.com/NancyRashid123)

[Repository](https://github.com/NancyRashid123/POS-system)

