# 🚀 Terminal Portfolio

A unique, interactive portfolio website built as a terminal interface. Experience my professional journey through a command-line-style interface that combines creativity with functionality.

![Terminal Portfolio Demo](https://via.placeholder.com/800x400/000000/00ff00?text=Terminal+Portfolio+Demo)

## ✨ Features

### 🖥️ Terminal Interface
- **Interactive Command Line**: Real terminal experience with command history, autocomplete, and keyboard shortcuts
- **Multiple Themes**: Green (classic), Amber (retro), Dark (modern), Blue (cool)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Rich Content**: HTML-formatted responses with links, styling, and emojis

### 📊 Core Commands
- `help` - Display all available commands
- `about` - Learn about my background and experience
- `skills` - View technical skills and expertise
- `projects` - Browse my portfolio projects
- `blog` - Read my latest blog posts
- `contact` - Get in touch with me
- `guestbook` - View and sign the visitor guestbook
- `resume` - Download my resume
- `social` - Find me on social media

### 🎮 Fun Features
- `matrix` - Enter the Matrix with animated code
- `snake` - Play Snake game (coming soon)
- `joke` - Get random developer jokes
- `theme [name]` - Switch between terminal themes

## 🚀 Deployment

### Deploying to Render

This project is set up for easy deployment to Render.com using the `render.yaml` configuration file. You can deploy both the frontend and backend with just a few clicks.

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### 📈 Analytics & Admin
- **Command Tracking**: Analytics for popular commands and usage patterns
- **Admin Panel**: JWT-authenticated admin interface for content management
- **Real-time Data**: Dynamic content loaded from MongoDB database

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Styled Components** - CSS-in-JS with theming support
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing (if needed for admin)

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication for admin features
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variable management

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnHika/portfolio-terminal.git
   cd portfolio-terminal
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In server directory, create .env file
   cd server
   cp .env.example .env
   ```
   
   Update the `.env` file with your settings:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio-terminal
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Database Setup**
   - Install MongoDB locally or set up MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env` file

5. **Run the Application**
   ```bash
   # Terminal 1: Start the backend server
   cd server
   npm run dev
   
   # Terminal 2: Start the React frontend
   cd client
   npm start
   ```

6. **Visit the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
portfolio-terminal/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Terminal.js          # Main terminal component
│   │   │   └── CommandProcessor.js  # Command handling logic
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB schemas
│   │   ├── Project.js
│   │   ├── BlogPost.js
│   │   ├── ContactMessage.js
│   │   ├── GuestBookEntry.js
│   │   ├── AdminUser.js
│   │   └── CommandAnalytics.js
│   ├── routes/            # API routes
│   │   ├── projects.js
│   │   ├── blog.js
│   │   ├── contact.js
│   │   ├── guestbook.js
│   │   ├── admin.js
│   │   └── analytics.js
│   ├── index.js           # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎨 Themes

The terminal supports multiple themes that can be switched using the `theme` command:

- **Green** (`theme green`) - Classic terminal green on black
- **Amber** (`theme amber`) - Retro amber terminal style
- **Dark** (`theme dark`) - Modern dark theme with blue accents
- **Blue** (`theme blue`) - Cool blue theme

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build` in client directory
2. Deploy the `build` folder to your preferred hosting platform

### Backend (Railway/Render/Heroku)
1. Set up environment variables on your hosting platform
2. Deploy the server directory
3. Update the `REACT_APP_API_URL` environment variable in frontend

### Database
- Use MongoDB Atlas for production database
- Update the `MONGODB_URI` environment variable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Snake game implementation
- [ ] File system simulation (cd, ls, cat commands)
- [ ] Admin panel UI for content management
- [ ] WebSocket integration for real-time features
- [ ] Command autocomplete improvements
- [ ] Mobile virtual keyboard optimization
- [ ] Progressive Web App (PWA) features
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

## 📧 Contact

- **Email**: johnkimani576@gmail.com
- **LinkedIn**: [linkedin.com/in/john-hika-22890a24b/](https://www.linkedin.com/in/john-hika-22890a24b/)
- **GitHub**: [github.com/JohnHika](https://github.com/JohnHika)
- **Portfolio**: [TBU](TBU)

---

⭐ If you found this project interesting, please give it a star! It helps other developers discover this unique approach to portfolio websites.
