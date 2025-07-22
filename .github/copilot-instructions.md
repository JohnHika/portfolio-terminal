# Copilot Instructions for Portfolio Terminal

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a full-stack terminal-style portfolio application built with React frontend and Express.js backend. The project features an interactive terminal interface that allows visitors to explore portfolio content through command-line-style interactions.

## Architecture
- **Frontend**: React.js with styled-components for theming
- **Backend**: Express.js with MongoDB for data persistence
- **Key Features**: Terminal UI, command processing, theming, real-time data, responsive design

## Development Guidelines

### Frontend (React)
- Use functional components with hooks
- Implement styled-components for theming with CSS variables
- Follow the command pattern for terminal interactions
- Maintain terminal state (history, current input, themes)
- Use axios for API communication

### Backend (Express)
- RESTful API design with proper error handling
- MongoDB with Mongoose for data modeling
- JWT authentication for admin features
- Command analytics tracking
- CORS enabled for frontend communication

### Terminal Commands
- Each command should be implemented in CommandProcessor class
- Commands should return HTML strings for rich formatting
- Track command usage for analytics
- Support command history and autocomplete
- Implement theme switching functionality

### Styling
- Use CSS variables for theming (--bg-color, --text-color, --accent-color, --prompt-color)
- Monospace fonts (Fira Code preferred)
- Responsive design for mobile devices
- Terminal-like animations (blinking cursor, scrolling)

### Code Quality
- Keep components focused and reusable
- Use proper error boundaries
- Implement loading states
- Add proper TypeScript types if converting to TypeScript
- Follow consistent naming conventions

## API Endpoints
- `/api/projects` - Project portfolio data
- `/api/blog` - Blog posts
- `/api/contact` - Contact form submissions
- `/api/guestbook` - Guestbook entries
- `/api/admin` - Admin authentication
- `/api/analytics` - Command usage tracking
