const mongoose = require('mongoose');
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');
const AdminUser = require('./models/AdminUser');
require('dotenv').config();

// Sample projects data
const sampleProjects = [
  {
    title: "i-ACT Learning Management System",
    description: "Comprehensive MERN stack Learning Management System for the Institute of Apologetics and Christian Teachings (i-ACT). Features interactive Bible study groups, real-time collaboration, course management, and community-based learning.",
    longDescription: "A sophisticated educational platform built for Christian theological education and spiritual development. The system supports structured courses, interactive Bible study groups with study plans and progress tracking, discipleship programs, and comprehensive resource libraries. Features include real-time messaging, collaborative learning tools, assignment management, examinations, and peer-to-peer learning through group discussions.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "JWT Authentication", "Material-UI", "Real-time Messaging"],
    githubUrl: "https://github.com/JohnHika/mern-lms",
    liveUrl: "https://mern-lms-frontend-mcfc.onrender.com/",
    featured: true,
    order: 1,
    features: [
      "Interactive Bible study groups with real-time collaboration",
      "Comprehensive course management system",
      "Progress tracking and resource sharing",
      "Real-time messaging and community features",
      "Advanced authentication and user management",
      "Responsive design for all devices",
      "Assignment and examination system",
      "Structured learning paths and discipleship programs"
    ]
  },
  {
    title: "Terminal Portfolio",
    description: "Interactive portfolio built as a terminal interface with React and Node.js. Features command-line navigation, multiple themes, modal forms, and real-time data.",
    longDescription: "A unique portfolio website designed as an interactive terminal interface. Built with React and Node.js, featuring command-line navigation, autocomplete functionality, multiple themes, and interactive modal forms for contact and guestbook features.",
    technologies: ["React", "Node.js", "MongoDB", "Styled Components", "Express", "Modal System"],
    githubUrl: "https://github.com/JohnHika/terminal-portfolio",
    liveUrl: "https://john-hika-portfolio.netlify.app",
    featured: true,
    order: 2,
    features: [
      "Command-line interface with autocomplete",
      "Multiple themes (green, amber, dark, blue)",
      "Interactive modal forms for user interaction",
      "Copy-to-clipboard functionality",
      "Mobile-responsive design",
      "Real-time backend integration"
    ]
  },
  {
    title: "Real-Time Chat App",
    description: "WebSocket-based chat application with rooms, private messaging, and file sharing. Supports thousands of concurrent users.",
    technologies: ["Socket.io", "React", "Express", "MongoDB", "AWS S3"],
    githubUrl: "https://github.com/JohnHika/realtime-chat",
    liveUrl: "https://chat.john-hika.dev",
    featured: false,
    order: 3
  },
  {
    title: "Task Management API",
    description: "RESTful API for task management with authentication, real-time updates, and team collaboration features.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "WebSocket"],
    githubUrl: "https://github.com/JohnHika/task-api",
    featured: false,
    order: 4
  }
];

// Sample blog posts
const sampleBlogPosts = [
  {
    title: "Building a MERN Learning Management System: Lessons from i-ACT Platform",
    content: "Developing a comprehensive Learning Management System for the Institute of Apologetics and Christian Teachings presented unique challenges and opportunities. In this post, I'll share insights from building real-time collaboration features, user management systems, and scalable architecture using the MERN stack...",
    excerpt: "Insights from developing a comprehensive LMS with real-time collaboration, user management, and scalable MERN architecture.",
    tags: ["MERN", "LMS", "Real-time", "Education", "MongoDB", "React"],
    published: true,
    slug: "mern-lms-development-insights"
  },
  {
    title: "Building a Terminal-Style Portfolio with React",
    content: "In this post, I'll walk you through the process of creating an interactive terminal interface using React and styled-components. We'll cover command processing, theming, responsive design, and modal integration...",
    excerpt: "Learn how to create a unique terminal-style portfolio with modal forms and copy-to-clipboard functionality.",
    tags: ["React", "JavaScript", "Portfolio", "Web Development", "Styled Components"],
    published: true,
    slug: "building-terminal-portfolio-react"
  },
  {
    title: "Implementing Real-time Features with Socket.io in MERN Applications",
    content: "Real-time communication is essential for modern educational platforms. Learn how I implemented live messaging, progress tracking, and collaborative features in the i-ACT Learning Management System...",
    excerpt: "Deep dive into Socket.io implementation for real-time features in educational platforms and collaborative applications.",
    tags: ["Socket.io", "Real-time", "MERN", "WebSocket", "Collaboration"],
    published: true,
    slug: "mongodb-aggregation-pipelines"
  },
  {
    title: "Optimizing React Performance in 2024",
    content: "As React applications grow in complexity, performance optimization becomes crucial. This post covers the latest techniques and best practices...",
    excerpt: "Essential React performance optimization techniques every developer should know in 2024.",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    published: true,
    slug: "react-performance-optimization-2024"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-terminal');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await BlogPost.deleteMany({});
    await AdminUser.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Inserted sample projects');

    // Insert sample blog posts
    await BlogPost.insertMany(sampleBlogPosts);
    console.log('Inserted sample blog posts');

    // Create admin user (password: admin123)
    await AdminUser.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('Created admin user');

    console.log('✅ Database seeded successfully!');
    console.log('Admin credentials: username=admin, password=admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
