# Vortex


## Introduction

Vortex is a web application designed to facilitate interactive AI conversations with a unique node-based visual interface. The application allows users to:

- **Ask AI Questions**: Send queries to an AI backend and receive intelligent responses
- **Visualize Conversations**: View interaction flows using an interactive node-based graph system
- **Save Conversations**: Save conversations to a database for future reference
- **Manage History**: Browse and manage previously saved conversations

The application combines a modern React frontend with Express.js backend, providing a solid user experience with real-time interactions and persistent data storage.

---

## Deployment

Both the frontend and backend are deployed on Vercel for optimal performance and reliability. [Click here](https://vortex-mk.vercel.app) for visiting the live app.


### Environment & Infrastructure
- **Frontend Hosting**: Vercel (Optimized for React/Vite apps)
- **Backend Hosting**: Vercel Node.js runtime
- **Database**: MongoDB
- **CI/CD**: Automatic deployments on git push

---

## Features

✨ **Core Functionality**
- 💬 Interactive AI conversation interface
- 📊 Node-based flow visualization using React Flow
- 💾 Persistent conversation storage
- 📱 Responsive and modern UI with Tailwind CSS
- 🔄 Real-time response handling with toast notifications
- 🌐 CORS-enabled backend for secure cross-origin requests

---

## Tech Stack

### Frontend
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2
- **UI Components**: React Flow 12.10.1
- **HTTP Client**: Axios 1.13.6
- **Notifications**: React Hot Toast 2.6.0
- **Linting**: ESLint 9.39.4

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB with Mongoose 9.3.1
- **HTTP Client**: Axios 1.13.6
- **AI Orchestration**: OpenRouter API (nvidia/nemotron-3-super-120b-a12b:free)
- **Middleware**: CORS 2.8.6
- **Environment**: dotenv 17.3.1

### Deployment
- **Platform**: Vercel
- **CI/CD**: Git-based deployments

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or Atlas instance)
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/mk-manishkumar/vortex.git
cd vortex
```

#### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

The backend will be available at `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Usage

### Development

**Frontend Development Server:**
```bash
cd frontend
npm run dev
```

**Backend Development Server:**
```bash
cd server
npm run dev
```

### Building for Production

**Frontend Build:**
```bash
cd frontend
npm run build
```

**Server Deployment:**
```bash
cd server
npm start
```

### Code Quality

**Run ESLint:**
```bash
cd frontend
npm run lint
```

**Preview Production Build:**
```bash
cd frontend
npm run preview
```

---

## Project Structure

```
vortex/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx               # Main application component
│   │   │   ├── Header.jsx            # Header component
│   │   │   ├── Container.jsx         # Layout container
│   │   │   ├── ButtonSection.jsx     # Action buttons
│   │   │   ├── ConversationsPage.jsx # Saved conversations page
│   │   │   └── childComponents/
│   │   │       ├── InputNode.jsx     # Node input component
│   │   │       ├── OutputNode.jsx    # Node output component
│   │   │       └── LoadingSpinner.jsx # Loading indicator
│   │   ├── hooks/
│   │   │   └── useVortex.js          # Custom hook for API interactions
│   │   ├── utils/
│   │   │   ├── api.js                # API service
│   │   │   └── stripMarkdown.js      # Markdown utilities
│   │   ├── assets/                   # Static assets
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                            # Express backend application
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── controller/
│   │   └── conversation.controller.js # Business logic
│   ├── model/
│   │   └── Conversation.model.js     # MongoDB schema
│   ├── route/
│   │   └── conversation.routes.js    # API endpoints
│   ├── server.js                     # Entry point
│   ├── package.json
│   └── vercel.json                   # Vercel deployment config
│
└── README.md                          # Project documentation
```

---

## API Endpoints

### Conversations

| Method | Endpoint | Description |
| :----: | :------: | :---------- |
| `POST` | `/api/conversations` | Create a new conversation |
| `GET` | `/api/conversations` | Fetch all conversations |
| `GET` | `/api/conversations/:id` | Get a specific conversation |
| `DELETE` | `/api/conversations/:id` | Delete a conversation |

---

## Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=https://vortex-server-mk.vercel.app
```

### Backend (`.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://vortex-mk.vercel.app
NODE_ENV=production
```

---

## Contributing

We welcome contributions to improve Vortex! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request


---

## Troubleshooting

### Common Issues

**Frontend won't connect to backend:**
- Verify the `VITE_API_BASE_URL` in frontend `.env`
- Check if backend server is running
- Ensure CORS is properly configured in backend

**MongoDB Connection Error:**
- Verify `MONGODB_URI` in backend `.env`
- Check MongoDB host and credentials
- Ensure network access is allowed (if using MongoDB Atlas)

**Port Already in Use:**
- Change the PORT in backend `.env`
- Update FRONTEND_URL accordingly

---

<div align="center">

Made with ❤️ by [Manish Kumar](https://github.com/mk-manishkumar)

[⬆ Back to Top](#vortex)

</div>
