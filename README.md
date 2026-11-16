# POS System

A web-based Point of Sale (POS) application designed to support restaurant order processing through separate administrative and cashier workflows.

## Live Demo

[Open POS System](https://pos-system-orcin-five.vercel.app/)

## Features

- Separate Admin and Cashier experiences.
- User authentication through the backend API.
- Role-aware access for administrative and cashier workflows.
- Product categories and menu browsing.
- Cashier order workflow with cart management.
- Add items to the cart and adjust order quantities.
- Calculate subtotal, tax, and total amount.
- Connect the frontend to REST API endpoints using Axios.
- Client-side state management with Zustand.
- Form handling and validation with Formik and Yup.
- Toast notifications for operation feedback.
- Responsive interface built with Tailwind CSS and DaisyUI.

## Tech Stack

- **Frontend:** React, Vite, JavaScript
- **Routing:** React Router
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** Zustand
- **API Integration:** Axios, REST API
- **Forms & Validation:** Formik, Yup
- **Notifications:** react-hot-toast
- **Icons:** react-icons
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js
- npm
- Access to the configured POS backend API

### Installation

```bash
git clone https://github.com/NancyRashid123/POS-system.git
cd POS-system
npm install
```

### Configuration

The application communicates with a backend API. Configure the API base URL in the appropriate project configuration before running locally. Do not commit private credentials or tokens.

### Run Locally

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

The application is deployed on Vercel: [pos-system-orcin-five.vercel.app](https://pos-system-orcin-five.vercel.app/).

## Author

**Nancy Rashid**  
[GitHub Profile](https://github.com/NancyRashid123)
