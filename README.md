# 🎓 UniLink

A full-stack MERN web application with secure JSON Web Token authentication and responsive UI using Tailwind CSS. A modern social networking platform designed for university students to connect, share, and collaborate.

---

## 📊 Tech Stack

| Component | Technology | Composition |
|-----------|------------|-------------|
| **Backend** | Express.js, Node.js | JavaScript |
| **Frontend** | React, Vite, Tailwind CSS | JavaScript, CSS, HTML |
| **Database** | MongoDB with Mongoose | - |
| **Authentication** | JWT (JSON Web Tokens) | JavaScript |
| **Language Composition** | JavaScript (98.4%), CSS (1.4%), HTML (0.2%) | - |

---

## ✨ Core Features

### 🔐 Authentication & Security
- **Secure Login & Registration**: JWT-based authentication system
- **Protected Routes**: Role-based access control for sensitive pages
- **Password Security**: Bcrypt encryption for secure password storage
- **Token Management**: Automatic token refresh and expiration handling

### 👤 User Management
- **User Profiles**: Personalized user profiles with customizable information
- **Profile Updates**: Edit profile picture, bio, and personal details
- **Follow System**: Follow/unfollow other users to build your network
- **User Discovery**: Find and connect with other university students

### 📝 Social Features
- **Posts**: Create, view, like, and comment on posts
- **Real-time Feed**: Live updates of campus activity
- **Personalized Profiles**: Showcase skills, achievements, and interests
- **Groups & Events**: Collaboration spaces for student groups and university events

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Tailwind CSS Styling**: Modern, clean, and professional UI
- **Intuitive Navigation**: Easy-to-use interface for all features
- **Real-time Notifications**: Stay updated with important events

---

## 🏗️ Project Structure

```
UniLink/
├── backend/                 # Express.js API Server
│   ├── config/             # Database and environment configuration
│   ├── models/             # MongoDB Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Auth, validation, error handling
│   ├── .env.example        # Environment variables template
│   └── server.js           # Express server entry point
├── frontend/               # React + Vite Application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context API for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   ├── styles/         # Global CSS and Tailwind config
│   │   └── App.jsx         # Main App component
│   ├── index.html          # HTML entry point
│   └── vite.config.js      # Vite configuration
├── docs/                   # Documentation files
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting
- **Git** - [Download](https://git-scm.com/)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/PTejasKr/UniLink-1.git
cd UniLink-1
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/unilink
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unilink

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=UniLink
```

### Running the Application

#### Start MongoDB

```bash
# If installed locally
mongod

# OR use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend .env file
```

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on http://localhost:5000
Connected to MongoDB
```

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

Visit `http://localhost:5173` in your browser to access UniLink!

---

## 📚 Available Scripts

### Backend Scripts

```bash
npm start          # Start the server in production mode
npm run dev        # Start with nodemon for development (hot reload)
npm test           # Run tests
npm run lint       # Run ESLint
```

### Frontend Scripts

```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 🔐 Authentication Flow

1. **User Registration**
   - User submits registration form
   - Password is hashed using bcryptjs
   - User is saved to MongoDB
   - JWT token is generated and sent to client

2. **User Login**
   - User submits credentials
   - Password is verified against stored hash
   - JWT token is generated
   - Token is stored in localStorage/sessionStorage
   - User is redirected to dashboard

3. **Protected Routes**
   - JWT token is included in request headers
   - Backend middleware verifies token
   - If valid, user can access protected resources
   - If invalid/expired, user is redirected to login

4. **Token Management**
   - Tokens are included in all authenticated API requests
   - Tokens are verified on backend
   - Automatic token refresh on expiration

---

## 🛠️ API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### User Routes
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users` - Get all users
- `POST /api/users/:id/follow` - Follow user

### Post Routes
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Add comment

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Problem**: "Cannot connect to MongoDB"
- **Solution**: 
  - Ensure MongoDB service is running
  - Check MongoDB URI in `.env` file
  - Verify MongoDB Atlas credentials if using cloud

### JWT Token Errors
- **Problem**: "Invalid token" or "Token expired"
- **Solution**:
  - Clear browser localStorage
  - Log out and log back in
  - Check JWT_SECRET in backend `.env`

### CORS Errors
- **Problem**: "Access to XMLHttpRequest blocked"
- **Solution**:
  - Verify CORS is enabled in backend
  - Check FRONTEND_URL in backend `.env`
  - Ensure API requests use correct base URL

### Port Already in Use
- **Problem**: "Port 5000/5173 already in use"
- **Solution**:
  ```bash
  # Find process using port
  lsof -i :5000  # or :5173
  # Kill process
  kill -9 <PID>
  ```

### Dependencies Issues
- **Problem**: `npm install` fails
- **Solution**:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## 📝 Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/unilink |
| JWT_SECRET | Secret key for JWT signing | your_secret_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment mode | development, production |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |
| VITE_APP_NAME | Application name | UniLink |

---

## 📦 Dependencies

### Backend Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **express-validator** - Input validation

### Frontend Dependencies
- **react** - UI library
- **vite** - Build tool
- **tailwindcss** - CSS framework
- **axios** - HTTP client
- **react-router-dom** - Client routing
- **react-context-api** - State management

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes before submitting PR
- Update README if adding new features

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💼 Author

**Tejas Kumar** - [GitHub Profile](https://github.com/PTejasKr)

**Original Repository**: [Abhish0030/UniLink](https://github.com/Abhish0030/UniLink)

---

## 🙏 Acknowledgments

- Thanks to the MERN stack community
- Inspired by modern social networking platforms
- Built with ❤️ for university students
- Special thanks to all contributors

---

## 📞 Support & Contact

For support, questions, or suggestions:
- 📧 Email: tejaskumar@example.com
- 🐛 Report issues: [GitHub Issues](https://github.com/PTejasKr/UniLink-1/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/PTejasKr/UniLink-1/discussions)

---

## 🎯 Roadmap

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Real-time notifications using WebSockets
- [ ] Image upload and storage
- [ ] Direct messaging between users
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

---

**Last Updated**: April 2026 | **Version**: 1.0.0
