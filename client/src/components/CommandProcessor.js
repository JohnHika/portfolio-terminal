import axios from 'axios';

class CommandProcessor {
  constructor() {
    this.apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.currentTheme = 'green';
    this.adminToken = localStorage.getItem('adminToken') || null;
    
    // Available commands
    this.commands = {
      help: this.help.bind(this),
      about: this.about.bind(this),
      skills: this.skills.bind(this),
      projects: this.projects.bind(this),
      project: this.project.bind(this),
      blog: this.blog.bind(this),
      contact: this.contact.bind(this),
      guestbook: this.guestbook.bind(this),
      'contact form': this.contactForm.bind(this),
      resume: this.resume.bind(this),
      clear: this.clear.bind(this),
      theme: this.theme.bind(this),
      whoami: this.whoami.bind(this),
      date: this.date.bind(this),
      pwd: this.pwd.bind(this),
      ls: this.ls.bind(this),
      cat: this.cat.bind(this),
      matrix: this.matrix.bind(this),
      snake: this.snake.bind(this),
      joke: this.joke.bind(this),
      social: this.social.bind(this),
      experience: this.experience.bind(this),
      education: this.education.bind(this),
      // Fun commands
      fortune: this.fortune.bind(this),
      coffee: this.coffee.bind(this),
      weather: this.weather.bind(this),
      rickroll: this.rickroll.bind(this),
      inspire: this.inspire.bind(this),
      // Secret admin commands
      'sudo': this.adminLogin.bind(this),
      'admin': this.adminPanel.bind(this)
    };
  }

  async processCommand(input) {
    const [command, ...args] = input.toLowerCase().split(' ');
    
    // Track command usage
    try {
      await axios.post(`${this.apiBase}/analytics/track`, { command });
    } catch (error) {
      // Silently fail analytics tracking
    }

    if (this.commands[command]) {
      return await this.commands[command](args);
    } else {
      return `Command '${command}' not found. Type 'help' for available commands.`;
    }
  }

  getAutocompleteSuggestions(input) {
    const commandNames = Object.keys(this.commands);
    return commandNames.filter(cmd => cmd.startsWith(input.toLowerCase()));
  }

  help() {
    return `
<div style="color: var(--accent-color); margin-bottom: 10px; font-size: clamp(16px, 4vw, 18px);">📋 Available Commands:</div>

<div style="margin-left: clamp(10px, 3vw, 20px);">
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">help</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Show this help message</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">about</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Learn about me</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">skills</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- View my technical skills</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">experience</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Professional experience</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">education</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Educational background</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">projects</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- View my projects</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">project [id]</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- View specific project details</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">blog</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Read my blog posts</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">contact</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Get in touch with me</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">guestbook</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- View and sign the guestbook</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">guestbook modal</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Interactive guestbook modal 📝</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">resume</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Download my resume</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">social</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- My social media links</span></div>
</div>

<div style="color: var(--accent-color); margin: 15px 0 10px 0; font-size: clamp(14px, 3.5vw, 16px);">🎨 Terminal Commands:</div>
<div style="margin-left: clamp(10px, 3vw, 20px);">
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">clear</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Clear the terminal</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">theme [green|amber|dark|blue]</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Change theme</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">whoami</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Current user info</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">date</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Show current date</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">pwd</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Show current directory</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">ls</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- List files</span></div>
</div>

<div style="color: var(--accent-color); margin: 15px 0 10px 0; font-size: clamp(14px, 3.5vw, 16px);">🎮 Fun Commands:</div>
<div style="margin-left: clamp(10px, 3vw, 20px);">
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">fortune</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Get a random fortune cookie 🥠</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">coffee</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Brew some virtual coffee ☕</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">weather</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Check the weather forecast 🌦️</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">rickroll</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Never gonna give you up! 🎵</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">inspire</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Get motivated with coding quotes 💪</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">matrix</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Enter the Matrix 🕶️</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">snake</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Play Snake game (coming soon) 🐍</span></div>
  <div><span style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">joke</span> <span style="font-size: clamp(11px, 2.5vw, 13px);">- Random developer joke 😄</span></div>
</div>

<div style="margin-top: 15px; padding: clamp(8px, 2vw, 10px); background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color);">
  <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">💡 New Features:</div>
  <div style="margin-left: clamp(5px, 2vw, 10px); margin-top: 5px; font-size: clamp(11px, 2.5vw, 13px); line-height: 1.4;">
    • Type <span style="color: var(--accent-color); font-weight: bold;">'guestbook'</span> for interactive modal form<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'contact form'</span> to send a message directly<br/>
    • Click email/phone in contact command to copy to clipboard<br/>
    • Use Tab for autocomplete, Arrow keys to navigate
  </div>
</div>
    `;
  }

  about() {
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">👋 About Me</div>

<div style="margin-bottom: 15px; font-size: clamp(12px, 3vw, 14px); line-height: 1.5; padding: 0 5px;">
  Hi! I'm John Hika, a passionate full-stack developer specializing in the MERN stack 
  (MongoDB, Express.js, React.js, Node.js). I love creating innovative solutions 
  and pushing the boundaries of web technology to build meaningful applications that serve communities.
</div>

<div style="margin-bottom: 15px; font-size: clamp(12px, 3vw, 14px); line-height: 1.5; padding: 0 5px;">
  Currently, I'm developing a comprehensive Learning Management System for the Institute 
  of Apologetics and Christian Teachings (i-ACT), featuring real-time collaboration, 
  interactive Bible study groups, and community-based learning. I specialize in modern web 
  development with a focus on user experience, performance, scalability, and real-time features.
</div>

<div style="color: var(--prompt-color); margin-top: 15px; font-size: clamp(12px, 3vw, 14px); line-height: 1.5; padding: 0 5px;">
  💡 Fun fact: This entire portfolio is built as a terminal interface because 
  I believe that sometimes the most creative solutions come from thinking outside 
  the traditional UI box! Just like the innovative LMS I'm building for educational institutions.
</div>

<div style="margin-top: 15px; padding: clamp(8px, 2vw, 10px); background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color); margin-left: 5px; margin-right: 5px;">
  <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">💡 What you can do next:</div>
  <div style="margin-left: clamp(5px, 2vw, 10px); margin-top: 5px; font-size: clamp(11px, 2.5vw, 13px); line-height: 1.4;">
    • Type <span style="color: var(--accent-color); font-weight: bold;">'skills'</span> to see my MERN stack expertise<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'projects'</span> to view my work including i-ACT LMS<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'experience'</span> to see my professional journey<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'social'</span> to connect with me online<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'contact'</span> to discuss collaboration opportunities
  </div>
</div>
    `;
  }

  skills() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">🛠️ Technical Skills</div>

<div style="margin-left: 10px;">
  <div style="color: var(--prompt-color); font-weight: bold; margin: 10px 0 5px 0;">Frontend Development:</div>
  <div style="margin-left: 15px;">
    • React.js, Next.js, Vue.js<br/>
    • JavaScript (ES6+), TypeScript<br/>
    • HTML5, CSS3, SCSS, Styled Components<br/>
    • Responsive Design, Progressive Web Apps<br/>
    • State Management (Redux, Context API, Vuex)
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin: 15px 0 5px 0;">Backend Development:</div>
  <div style="margin-left: 15px;">
    • Node.js, Express.js<br/>
    • Python (Django, Flask)<br/>
    • RESTful APIs, GraphQL<br/>
    • Authentication & Authorization (JWT, OAuth)<br/>
    • Microservices Architecture
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin: 15px 0 5px 0;">Database & Storage:</div>
  <div style="margin-left: 15px;">
    • MongoDB, PostgreSQL, MySQL<br/>
    • Redis, Firebase<br/>
    • Database Design & Optimization<br/>
    • Cloud Storage Solutions
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin: 15px 0 5px 0;">DevOps & Tools:</div>
  <div style="margin-left: 15px;">
    • Git, Docker, CI/CD<br/>
    • AWS, Azure, Google Cloud<br/>
    • Linux, Nginx, Apache<br/>
    • Monitoring & Performance Optimization
  </div>
</div>

<div style="margin-top: 15px; padding: 10px; background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color);">
  <div style="color: var(--prompt-color); font-weight: bold;">💡 What you can do next:</div>
  <div style="margin-left: 10px; margin-top: 5px;">
    • Type <span style="color: var(--accent-color); font-weight: bold;">'experience'</span> to see how I've applied these skills professionally<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'projects'</span> to see these technologies in action<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'social'</span> to check out my GitHub repositories<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'contact'</span> to discuss potential collaboration
  </div>
</div>
    `;
  }

  experience() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">💼 Professional Experience</div>

<div style="margin-left: 10px;">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Full Stack Developer</div>
  <div style="color: #888; margin-bottom: 5px;">Institute of Apologetics and Christian Teachings (i-ACT) • 2024 - Present</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • Developed comprehensive MERN stack Learning Management System serving Christian educational community<br/>
    • Built interactive Bible study groups with real-time collaboration, progress tracking, and resource sharing<br/>
    • Implemented advanced authentication system, course management, and community-based learning features<br/>
    • Created responsive platform supporting multiple learning modalities and peer-to-peer engagement<br/>
    • Technologies: MongoDB, Express.js, React.js, Node.js, Socket.io, JWT Authentication
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Senior Full Stack Developer</div>
  <div style="color: #888; margin-bottom: 5px;">Tech Innovate Inc. • 2022 - 2024</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • Led development of customer-facing web applications serving 100k+ users<br/>
    • Implemented microservices architecture reducing system latency by 40%<br/>
    • Mentored junior developers and established coding best practices<br/>
    • Technologies: React, Node.js, MongoDB, AWS, Docker
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Full Stack Developer</div>
  <div style="color: #888; margin-bottom: 5px;">StartupXYZ • 2020 - 2022</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • Built MVP from scratch using modern web technologies<br/>
    • Developed real-time features using WebSocket technology<br/>
    • Optimized database queries improving response times by 60%<br/>
    • Technologies: Vue.js, Express.js, PostgreSQL, Redis
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Frontend Developer</div>
  <div style="color: #888; margin-bottom: 5px;">WebSolutions Ltd. • 2018 - 2020</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • Developed responsive web applications for various clients<br/>
    • Implemented accessibility standards (WCAG 2.1)<br/>
    • Collaborated with design teams to create pixel-perfect UIs<br/>
    • Technologies: React, TypeScript, SCSS, Jest
  </div>
</div>

<div style="margin-top: 20px; color: var(--accent-color);">
  Type 'education' to see my academic background!
</div>
    `;
  }

  education() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">🎓 Education</div>

<div style="margin-left: 10px;">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Bachelor of Science in Computer Science</div>
  <div style="color: #888; margin-bottom: 5px;">University of Technology • 2014 - 2018</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • Graduated Magna Cum Laude (GPA: 3.8/4.0)<br/>
    • Specialized in Software Engineering and Web Development<br/>
    • Active member of Computer Science Society<br/>
    • Completed senior capstone project on distributed systems
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Certifications:</div>
  <div style="margin-left: 15px; margin-bottom: 15px;">
    • AWS Certified Solutions Architect<br/>
    • Google Cloud Professional Developer<br/>
    • MongoDB Certified Developer<br/>
    • React Developer Certification (Meta)
  </div>

  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">Continuous Learning:</div>
  <div style="margin-left: 15px;">
    • Regular attendee at tech conferences and meetups<br/>
    • Active contributor to open source projects<br/>
    • Technical blog writer sharing knowledge with the community<br/>
    • Always exploring new technologies and frameworks
  </div>
</div>

<div style="margin-top: 20px; color: var(--accent-color);">
  Type 'projects' to see how I apply my knowledge in real projects!
</div>
    `;
  }

  async projects(args) {
    try {
      const response = await axios.get(`${this.apiBase}/projects`);
      const projects = response.data;

      if (projects.length === 0) {
        return 'No projects available at the moment. Check back soon!';
      }

      let output = `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">🚀 My Projects</div>
      `;

      projects.forEach((project, index) => {
        output += `
<div style="margin-bottom: 20px; padding: 10px; border-left: 3px solid var(--accent-color);">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">
    ${index + 1}. ${project.title}
  </div>
  <div style="margin-bottom: 8px;">${project.description}</div>
  <div style="color: #888; margin-bottom: 5px;">
    <strong>Technologies:</strong> ${project.technologies.join(', ')}
  </div>
  ${project.githubUrl ? `<div style="margin-bottom: 3px;">🔗 <a href="${project.githubUrl}" target="_blank" style="color: var(--accent-color);">GitHub</a></div>` : ''}
  ${project.liveUrl ? `<div>🌐 <a href="${project.liveUrl}" target="_blank" style="color: var(--accent-color);">Live Demo</a></div>` : ''}
</div>
        `;
      });

      output += `<div style="margin-top: 15px; padding: 10px; background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color);">
<div style="color: var(--prompt-color); font-weight: bold;">💡 What you can do next:</div>
<div style="margin-left: 10px; margin-top: 5px;">
  • Type <span style="color: var(--accent-color); font-weight: bold;">'project [number]'</span> to view detailed information about a specific project<br/>
  • Type <span style="color: var(--accent-color); font-weight: bold;">'social'</span> to visit my GitHub profile<br/>
  • Type <span style="color: var(--accent-color); font-weight: bold;">'contact'</span> to get in touch about collaboration<br/>
  • Type <span style="color: var(--accent-color); font-weight: bold;">'skills'</span> to see the technologies I work with
</div>
</div>`;

      return output;
    } catch (error) {
      return 'Unable to load projects at the moment. Please try again later.';
    }
  }

  async project(args) {
    if (!args || args.length === 0) {
      return 'Please specify a project number. Usage: project [number]';
    }

    try {
      const response = await axios.get(`${this.apiBase}/projects`);
      const projects = response.data;

      const projectIndex = parseInt(args[0]) - 1;
      
      if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {
        return `Invalid project number. Please use a number between 1 and ${projects.length}.`;
      }

      const project = projects[projectIndex];

      return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">🚀 ${project.title}</div>

<div style="margin-bottom: 15px;">
  <strong>Description:</strong><br/>
  ${project.description}
</div>

${project.longDescription ? `
<div style="margin-bottom: 15px;">
  <strong>Details:</strong><br/>
  ${project.longDescription}
</div>
` : ''}

<div style="margin-bottom: 15px;">
  <strong>Technologies Used:</strong><br/>
  <div style="margin-left: 10px;">${project.technologies.join(', ')}</div>
</div>

${project.features && project.features.length > 0 ? `
<div style="margin-bottom: 15px;">
  <strong>Key Features:</strong>
  <ul style="margin-left: 20px;">
    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
  </ul>
</div>
` : ''}

<div style="margin-bottom: 15px;">
  <strong>Links:</strong><br/>
  ${project.githubUrl ? `<div style="margin-left: 10px;">🔗 <a href="${project.githubUrl}" target="_blank" style="color: var(--accent-color);">View on GitHub</a></div>` : ''}
  ${project.liveUrl ? `<div style="margin-left: 10px;">🌐 <a href="${project.liveUrl}" target="_blank" style="color: var(--accent-color);">Live Demo</a></div>` : ''}
</div>

<div style="color: var(--prompt-color); margin-top: 15px;">
  Type 'projects' to see all projects or 'project [number]' for another project.
</div>
      `;
    } catch (error) {
      return 'Unable to load project details at the moment. Please try again later.';
    }
  }

  async blog() {
    try {
      const response = await axios.get(`${this.apiBase}/blog`);
      const posts = response.data;

      if (posts.length === 0) {
        return 'No blog posts available yet. Stay tuned for exciting content!';
      }

      let output = `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">📝 Latest Blog Posts</div>
      `;

      posts.slice(0, 5).forEach((post, index) => {
        const date = new Date(post.createdAt).toLocaleDateString();
        output += `
<div style="margin-bottom: 15px; padding: 8px; border-left: 2px solid var(--prompt-color);">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 3px;">
    ${post.title}
  </div>
  <div style="color: #888; font-size: 12px; margin-bottom: 5px;">
    Published on ${date}
  </div>
  <div style="margin-bottom: 5px;">${post.excerpt}</div>
  <div style="color: var(--accent-color); font-size: 12px;">
    Tags: ${post.tags.join(', ')}
  </div>
</div>
        `;
      });

      return output;
    } catch (error) {
      return 'Unable to load blog posts at the moment. Please try again later.';
    }
  }

  contact() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">📧 Get In Touch</div>

<div style="margin-bottom: 15px;">
  I'm always excited to connect with fellow developers, potential clients, and anyone 
  interested in technology. Feel free to reach out through any of these channels:
</div>

<div style="margin-left: 15px; margin-bottom: 20px;">
  📧 <strong>Email:</strong> <span style="color: var(--accent-color); cursor: pointer;" onclick="navigator.clipboard.writeText('johnkimani576@gmail.com'); alert('Email copied to clipboard!')">johnkimani576@gmail.com</span><br/>
  📱 <strong>Phone:</strong> <span style="color: var(--accent-color); cursor: pointer;" onclick="navigator.clipboard.writeText('0742126582'); alert('Phone number copied to clipboard!')">0742126582</span><br/>
  📍 <strong>Location:</strong> Nairobi, Kenya<br/>
  💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/john-hika-22890a24b/" target="_blank" style="color: var(--accent-color);">john-hika-22890a24b</a>
</div>

<div style="background: rgba(0, 255, 0, 0.1); padding: 15px; border-left: 3px solid var(--accent-color); margin-bottom: 15px;">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px;">💼 Available For:</div>
  <div style="margin-left: 10px;">
    🟢 <strong>Open to full-time opportunities</strong><br/>
    🟢 <strong>Available for consulting work</strong><br/>
    🟢 <strong>Freelance projects welcome</strong><br/>
    🟢 <strong>Open source collaboration</strong>
  </div>
</div>

<div style="color: var(--prompt-color); margin-bottom: 10px;">
  <strong>Quick Contact Form:</strong>
</div>
<div style="margin-left: 10px; font-size: 0.9em; color: #888;">
  For a quick message, you can also use the guestbook command!
</div>

<div style="margin-top: 15px; padding: 10px; background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color);">
  <div style="color: var(--prompt-color); font-weight: bold;">💡 What you can do next:</div>
  <div style="margin-left: 10px; margin-top: 5px;">
    • Type <span style="color: var(--accent-color); font-weight: bold;">'guestbook'</span> to leave a quick message<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'social'</span> to find me on social platforms<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'resume'</span> to download my CV<br/>
    • Click on email/phone above to copy to clipboard
  </div>
</div>
    `;
  }

  contactForm() {
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">💌 Quick Contact Form</div>

<div style="margin-bottom: 15px; font-size: clamp(12px, 3vw, 14px); padding: 0 5px;">
  This would open a modal contact form in a full implementation. For now, please use:
</div>

<div style="border: 2px solid var(--accent-color); padding: clamp(10px, 3vw, 15px); margin: 10px 5px; background: rgba(0, 255, 0, 0.05);">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 10px; font-size: clamp(12px, 3vw, 14px);">📧 Direct Contact:</div>
  
  <div style="margin-left: clamp(5px, 2vw, 10px);">
    <div><strong>Email:</strong> <span style="color: var(--accent-color); cursor: pointer;" onclick="navigator.clipboard.writeText('johnkimani576@gmail.com'); alert('Email copied to clipboard!')">johnkimani576@gmail.com</span></div>
    <div><strong>Phone:</strong> <span style="color: var(--accent-color); cursor: pointer;" onclick="navigator.clipboard.writeText('0742126582'); alert('Phone copied to clipboard!')">0742126582</span></div>
  </div>
</div>

<div style="margin-top: 15px; color: var(--prompt-color); font-size: clamp(11px, 2.5vw, 13px); text-align: center;">
  💡 Type <span style="color: var(--accent-color); font-weight: bold;">'guestbook'</span> to leave a quick message, or <span style="color: var(--accent-color); font-weight: bold;">'contact'</span> for full contact info
</div>
    `;
  }

  async guestbook(args) {
    try {
      // Check if this is a sign command
      if (args && args.length > 0 && args[0] === 'sign') {
        // Need at least name and message
        if (args.length < 3) {
          return `
<div style="color: #ff5555; margin-bottom: 10px; font-size: clamp(14px, 3vw, 16px);">❌ Error: Missing required information</div>
<div style="color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px); margin-bottom: 5px;">
  Usage: guestbook sign "Your Name" "Your Message"
</div>
<div style="color: var(--accent-color); font-size: clamp(11px, 2.5vw, 13px);">
  Make sure to include both your name and message in quotes.
</div>
          `;
        }

        try {
          // Extract name and message from args
          // This handles quoted arguments
          const name = args[1].replace(/^"|"$/g, '');
          const message = args.slice(2).join(' ').replace(/^"|"$/g, '');

          await axios.post(`${this.apiBase}/guestbook`, {
            name,
            message
          });

          return `
<div style="color: #55ff55; margin-bottom: 10px; font-size: clamp(14px, 3vw, 16px);">✅ Thank you for signing the guestbook!</div>
<div style="color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px); margin-bottom: 5px;">
  Your message has been submitted successfully.
</div>
<div style="color: var(--accent-color); font-size: clamp(11px, 2.5vw, 13px); margin-top: 10px;">
  Type <strong>guestbook</strong> to view all entries.
</div>
          `;
        } catch (error) {
          console.error("Error signing guestbook:", error);
          return `
<div style="color: #ff5555; margin-bottom: 10px; font-size: clamp(14px, 3vw, 16px);">❌ Failed to submit guestbook entry. Please try again.</div>
<div style="color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px);">
  There was an error processing your request. Please try again later.
</div>
          `;
        }
      }

      // If not a sign command, show guestbook entries
      const response = await axios.get(`${this.apiBase}/guestbook`);
      const entries = response.data;

      let output = `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 Guestbook</div>

<div style="margin-bottom: 15px; color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px);">
  Leave a message: <span style="color: var(--accent-color); font-weight: bold;">guestbook sign "Your Name" "Your message"</span>
</div>
      `;

      if (entries.length === 0) {
        output += '<div>No entries yet. Be the first to sign the guestbook!</div>';
      } else {
        entries.slice(0, 10).forEach(entry => {
          const date = new Date(entry.createdAt).toLocaleDateString();
          output += `
<div style="margin-bottom: 10px; padding: 8px; border: 1px solid var(--prompt-color); border-radius: 3px;">
  <div style="color: var(--prompt-color); font-weight: bold;">${entry.name}</div>
  <div style="color: #888; font-size: 11px; margin-bottom: 5px;">${date}</div>
  <div>${entry.message}</div>
</div>
          `;
        });
      }

      return output;
    } catch (error) {
      return 'Unable to load guestbook entries at the moment. Please try again later.';
    }
  }

  resume() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">📄 Resume</div>

<div style="margin-left: 10px;">
  <div style="margin-bottom: 15px;">
    My comprehensive resume is available for download in multiple formats:
  </div>

  <div style="margin-left: 15px;">
    📥 <a href="/resume.pdf" target="_blank" style="color: var(--accent-color);">Download PDF Resume</a><br/>
    📥 <a href="/resume.docx" target="_blank" style="color: var(--accent-color);">Download Word Document</a><br/>
    🔗 <a href="https://www.linkedin.com/in/john-hika-22890a24b/" target="_blank" style="color: var(--accent-color);">View LinkedIn Profile</a>
  </div>

  <div style="margin-top: 20px; padding: 10px; background: rgba(0,255,0,0.1); border-radius: 5px;">
    <div style="color: var(--prompt-color); font-weight: bold;">Quick Summary:</div>
    <div style="margin-top: 5px;">
      • 6+ years of full-stack development experience<br/>
      • Expert in MERN stack (MongoDB, Express.js, React.js, Node.js)<br/>
      • Currently developing comprehensive LMS for educational institutions<br/>
      • Led teams and delivered projects for 100k+ users<br/>
      • Specialized in real-time applications and modern web technologies<br/>
      • Passionate about clean code, user experience, and scalable solutions
    </div>
  </div>
</div>
    `;
  }

  social() {
    return `
<div style="color: var(--accent-color); font-size: 18px; margin-bottom: 15px;">🌐 Connect With Me</div>

<div style="margin-left: 10px;">
  <div style="margin-bottom: 15px;">
    Find me across the web and stay updated with my latest work:
  </div>

  <div style="margin-left: 15px;">
    🐙 <strong>GitHub:</strong> <a href="https://github.com/JohnHika" target="_blank" style="color: var(--accent-color);">github.com/JohnHika</a><br/>
    💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/john-hika-22890a24b/" target="_blank" style="color: var(--accent-color);">linkedin.com/in/john-hika-22890a24b</a><br/>
    ❌ <strong>X (Twitter):</strong> <span style="color: var(--accent-color);">TBU (To Be Updated)</span><br/>
    💻 <strong>Dev.to:</strong> <span style="color: var(--accent-color);">TBU (To Be Updated)</span><br/>
    📧 <strong>Email:</strong> johnkimani576@gmail.com<br/>
    🌍 <strong>Portfolio:</strong> <a href="https://john-hika.dev" target="_blank" style="color: var(--accent-color);">john-hika.dev</a>
  </div>

  <div style="margin-top: 20px; color: var(--prompt-color);">
    🚀 Always open to interesting conversations and collaboration opportunities!
  </div>
</div>
    `;
  }

  clear() {
    // This will be handled by the Terminal component
    return 'CLEAR_TERMINAL';
  }

  theme(args) {
    const availableThemes = ['green', 'amber', 'dark', 'blue'];
    const newTheme = args[0];

    if (!newTheme) {
      return `
<div style="color: var(--accent-color);">Current theme: ${this.currentTheme}</div>
<div>Available themes: ${availableThemes.join(', ')}</div>
<div>Usage: theme [theme-name]</div>
      `;
    }

    if (!availableThemes.includes(newTheme)) {
      return `Theme '${newTheme}' not found. Available themes: ${availableThemes.join(', ')}`;
    }

    this.currentTheme = newTheme;
    // Emit theme change event
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
    
    return `Theme changed to '${newTheme}'`;
  }

  whoami() {
    return 'guest@portfolio-terminal';
  }

  date() {
    return new Date().toString();
  }

  pwd() {
    return '/home/guest/portfolio';
  }

  ls() {
    return `
<div style="color: var(--accent-color);">📁 Directory Contents:</div>
<div style="margin-left: 20px; margin-top: 10px;">
  📂 <span style="color: var(--prompt-color); cursor: pointer;" onclick="document.querySelector('input').value='cd projects'; document.querySelector('input').focus();">projects/</span><br/>
  📂 <span style="color: var(--prompt-color); cursor: pointer;" onclick="document.querySelector('input').value='cd blog'; document.querySelector('input').focus();">blog/</span><br/>
  📂 <span style="color: var(--prompt-color); cursor: pointer;" onclick="document.querySelector('input').value='cd resume'; document.querySelector('input').focus();">resume/</span><br/>
  📂 <span style="color: var(--prompt-color); cursor: pointer;" onclick="document.querySelector('input').value='cd contact'; document.querySelector('input').focus();">contact/</span><br/>
  📄 <span style="color: var(--accent-color); cursor: pointer;" onclick="document.querySelector('input').value='cat about.txt'; document.querySelector('input').focus();">about.txt</span><br/>
  📄 <span style="color: var(--accent-color); cursor: pointer;" onclick="document.querySelector('input').value='cat skills.json'; document.querySelector('input').focus();">skills.json</span><br/>
  📄 README.md
</div>

<div style="margin-top: 15px; padding: 10px; background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color);">
  <div style="color: var(--prompt-color); font-weight: bold;">💡 What you can do next:</div>
  <div style="margin-left: 10px; margin-top: 5px;">
    • Type <span style="color: var(--accent-color); font-weight: bold;">'projects'</span> to see my work<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'about'</span> to learn about me<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'skills'</span> to see my technical abilities<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'social'</span> to find me on GitHub & LinkedIn<br/>
    • Type <span style="color: var(--accent-color); font-weight: bold;">'help'</span> to see all available commands
  </div>
</div>
    `;
  }

  cat(args) {
    const file = args[0];
    switch(file) {
      case 'about.txt':
        return this.about();
      case 'skills.json':
        return this.skills();
      case 'README.md':
        return `
# Portfolio Terminal

Welcome to my interactive portfolio terminal! This is a unique way to explore my professional background, skills, and projects.

## Available Commands:
- Type 'help' to see all available commands
- Use arrow keys to navigate command history
- Tab completion is available for commands

## Features:
- 🎨 Multiple themes (green, amber, dark, blue)
- 📱 Responsive design
- ⚡ Real-time data from backend API
- 🎮 Fun easter egg commands

Built with React, Node.js, and lots of creativity!
        `;
      default:
        return `cat: ${file}: No such file or directory`;
    }
  }

  matrix() {
    return `
<div style="color: var(--accent-color); margin-bottom: 10px; font-size: clamp(14px, 3.5vw, 16px);">🕶️ Welcome to the Matrix...</div>
<div style="color: #00ff00; font-family: monospace; line-height: 1.3; font-size: clamp(10px, 2.5vw, 12px); overflow-x: auto; padding: 5px;">
01001000 01100101 01101100 01101100 01101111<br/>
01010111 01101111 01110010 01101100 01100100<br/>
01001001 01100001 01101101 01001110 01100101 01101111<br/>
01010100 01101000 01100101 01001111 01101110 01100101<br/>
</div>
<div style="color: var(--prompt-color); margin-top: 10px; font-size: clamp(12px, 3vw, 14px); padding: 0 5px;">
The Matrix has you... but so does this portfolio! 😄
</div>
    `;
  }

  snake() {
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 10px;">🐍 Snake Game</div>
<div style="margin-bottom: 10px; font-size: clamp(12px, 3vw, 14px); padding: 0 5px;">
  Game controls will be implemented here in a future update!
</div>
<div style="font-family: monospace; line-height: 1.2; font-size: clamp(10px, 2.5vw, 12px); overflow-x: auto; padding: 5px;">
┌─────────────────────┐<br/>
│  🍎        ●●●      │<br/>
│                     │<br/>
│                     │<br/>
│         ●           │<br/>
│                     │<br/>
└─────────────────────┘
</div>
<div style="color: var(--prompt-color); margin-top: 10px; font-size: clamp(12px, 3vw, 14px); padding: 0 5px;">
Coming soon: Fully playable Snake game right in the terminal!
</div>
    `;
  }

  async joke() {
    try {
      // You can implement a jokes API or use a predefined list
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
        "Why do Java developers wear glasses? Because they can't C#! 👓",
        "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
        "Why did the programmer quit his job? He didn't get arrays! 📊"
      ];
      
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return `
<div style="color: var(--accent-color); margin-bottom: 10px;">😄 Random Dev Joke:</div>
<div style="margin-left: 10px; font-style: italic;">
  ${randomJoke}
</div>
      `;
    } catch (error) {
      return "Couldn't fetch a joke right now. Maybe that's the joke! 😅";
    }
  }

  fortune() {
    const fortunes = [
      "Your code will compile on the first try today! 🎯",
      "A bug you've been hunting will reveal itself when you least expect it. 🐛",
      "Today is a great day to refactor that messy function you've been avoiding. 🧹",
      "You will discover a new JavaScript framework... but resist the urge to rewrite everything. 📚",
      "Your pull request will be approved without any requested changes! ✅",
      "A senior developer will compliment your clean code today. 👨‍💻",
      "Stack Overflow will have the exact answer you need on the first search. 🔍",
      "Your app will run perfectly in production... for once. 🚀",
      "You'll solve a complex algorithm problem using the simplest solution. 💡",
      "Today you'll help a fellow developer and it will make their day! 🤝",
      "Your commit message will be both descriptive AND under 50 characters. 📝",
      "The rubber duck debugging method will save you hours of frustration today. 🦆"
    ];
    
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">🥠 Fortune Cookie</div>
<div style="border: 2px solid var(--accent-color); padding: clamp(10px, 3vw, 15px); border-radius: 8px; background: rgba(0, 255, 0, 0.05); margin: 10px 5px;">
  <div style="text-align: center; font-style: italic; font-size: clamp(13px, 3vw, 16px); color: var(--prompt-color); line-height: 1.4; word-wrap: break-word;">
    ${randomFortune}
  </div>
</div>
<div style="margin-top: 10px; text-align: center; color: #888; font-size: clamp(11px, 2.5vw, 13px);">
  🥠 Crack another fortune with 'fortune' command!
</div>
    `;
  }

  coffee() {
    const coffeeTypes = ['Espresso', 'Americano', 'Latte', 'Cappuccino', 'Mocha', 'Cold Brew', 'Macchiato'];
    const coffeeType = coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
    
    const brewingStages = [
      '☕ Grinding fresh coffee beans...',
      '♨️  Heating water to perfect temperature...',
      '⏳ Brewing your perfect cup...',
      '🎯 Adding final touches...',
      '✨ Your coffee is ready!'
    ];
    
    let output = `<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">☕ Virtual Coffee Machine</div>`;
    
    brewingStages.forEach((stage, index) => {
      output += `<div style="margin: 6px 0; color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px); padding: 0 5px;">${stage}</div>`;
    });
    
    return output + `
<div style="border: 2px solid var(--accent-color); padding: clamp(10px, 3vw, 15px); margin: 15px 5px; text-align: center; background: rgba(0, 255, 0, 0.05);">
  <div style="font-size: clamp(20px, 5vw, 24px); margin-bottom: 10px;">☕</div>
  <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(14px, 3.5vw, 16px);">Your ${coffeeType} is ready!</div>
  <div style="color: #888; font-size: clamp(11px, 2.5vw, 13px); margin-top: 5px;">Perfect for coding sessions 💻</div>
</div>
<div style="color: var(--accent-color); font-size: clamp(11px, 2.5vw, 13px); text-align: center;">
  ☕ Fun fact: Programmers turn coffee into code!
</div>
    `;
  }

  weather() {
    const conditions = [
      { condition: 'Sunny', icon: '☀️', temp: '24°C', desc: 'Perfect coding weather!' },
      { condition: 'Cloudy', icon: '☁️', temp: '18°C', desc: 'Great for indoor development' },
      { condition: 'Rainy', icon: '🌧️', temp: '16°C', desc: 'Cozy debugging weather' },
      { condition: 'Partly Cloudy', icon: '⛅', temp: '22°C', desc: 'Ideal for pair programming' },
      { condition: 'Code Storm', icon: '⚡', temp: '20°C', desc: 'High productivity expected!' },
      { condition: 'Bug Shower', icon: '🐛', temp: '19°C', desc: 'Perfect for testing season' }
    ];
    
    const today = conditions[Math.floor(Math.random() * conditions.length)];
    const tomorrow = conditions[Math.floor(Math.random() * conditions.length)];
    
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">🌦️ Developer Weather Forecast</div>

<div style="border: 2px solid var(--accent-color); padding: clamp(10px, 3vw, 15px); margin: 15px 5px; background: rgba(0, 255, 0, 0.05);">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 10px; font-size: clamp(12px, 3vw, 14px);">📍 Code Valley, Dev Land</div>
  
  <div style="display: flex; align-items: center; margin-bottom: 10px; flex-wrap: wrap;">
    <span style="font-size: clamp(18px, 4vw, 24px); margin-right: clamp(8px, 2vw, 15px); margin-bottom: 5px;">${today.icon}</span>
    <div style="flex: 1; min-width: 200px;">
      <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">Today: ${today.condition}</div>
      <div style="color: #888; font-size: clamp(11px, 2.5vw, 13px);">Temperature: ${today.temp}</div>
      <div style="color: var(--accent-color); font-style: italic; font-size: clamp(11px, 2.5vw, 13px); word-wrap: break-word;">${today.desc}</div>
    </div>
  </div>
  
  <div style="border-top: 1px solid var(--accent-color); padding-top: 10px; margin-top: 10px;">
    <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px); display: flex; align-items: center; flex-wrap: wrap;">
      <span style="margin-right: 5px;">Tomorrow:</span> 
      <span style="margin-right: 8px;">${tomorrow.condition}</span> 
      <span style="margin-right: 8px;">${tomorrow.icon}</span> 
      <span>${tomorrow.temp}</span>
    </div>
    <div style="color: #888; font-size: clamp(11px, 2.5vw, 12px); margin-top: 3px;">${tomorrow.desc}</div>
  </div>
</div>

<div style="color: var(--accent-color); text-align: center; font-size: clamp(11px, 2.5vw, 13px); padding: 0 10px;">
  ⚡ Remember: There's no such thing as bad weather, only inappropriate coffee levels!
</div>
    `;
  }

  rickroll() {
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">🎵 Never Gonna Give You Up!</div>

<div style="border: 2px solid var(--accent-color); padding: clamp(10px, 3vw, 20px); text-align: center; background: rgba(0, 255, 0, 0.05); margin: 10px 5px;">
  <div style="font-size: clamp(32px, 8vw, 48px); margin-bottom: 15px;">🕺</div>
  
  <div style="color: var(--prompt-color); font-weight: bold; font-size: clamp(14px, 3.5vw, 18px); margin-bottom: 15px;">
    🎤 Rick Astley - Never Gonna Give You Up 🎤
  </div>
  
  <div style="color: var(--accent-color); line-height: 1.5; font-family: monospace; font-size: clamp(11px, 2.5vw, 13px); text-align: left; max-width: 100%; word-wrap: break-word;">
    We're no strangers to love<br/>
    You know the rules and so do I<br/>
    A full commitment's what I'm thinking of<br/>
    You wouldn't get this from any other guy<br/><br/>
    
    <span style="font-weight: bold; color: var(--prompt-color); font-size: clamp(12px, 3vw, 14px);">
    I just wanna tell you how I'm feeling<br/>
    Gotta make you understand<br/><br/>
    
    Never gonna give you up<br/>
    Never gonna let you down<br/>
    Never gonna run around and desert you<br/>
    Never gonna make you cry<br/>
    Never gonna say goodbye<br/>
    Never gonna tell a lie and hurt you 🎵
    </span>
  </div>
</div>

<div style="margin-top: 15px; text-align: center; padding: 0 10px;">
  <div style="color: #888; font-size: clamp(11px, 2.5vw, 13px);">🎉 Congratulations! You've been rickrolled in a terminal! 🎉</div>
  <div style="color: var(--accent-color); font-size: clamp(10px, 2vw, 12px); margin-top: 5px;">
    This is probably the most sophisticated rickroll you've ever experienced 😄
  </div>
</div>
    `;
  }

  inspire() {
    const quotes = [
      {
        quote: "Code is like humor. When you have to explain it, it's bad.",
        author: "Cory House"
      },
      {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
      },
      {
        quote: "Experience is the name everyone gives to their mistakes.",
        author: "Oscar Wilde"
      },
      {
        quote: "In order to understand recursion, one must first understand recursion.",
        author: "Anonymous"
      },
      {
        quote: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs"
      },
      {
        quote: "Debugging is twice as hard as writing the code in the first place.",
        author: "Brian Kernighan"
      },
      {
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
      },
      {
        quote: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds"
      },
      {
        quote: "The computer was born to solve problems that did not exist before.",
        author: "Bill Gates"
      },
      {
        quote: "A ship in port is safe, but that's not what ships are built for. Sail out to sea and do new things.",
        author: "Grace Hopper"
      }
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">💪 Daily Coding Inspiration</div>

<div style="border: 2px solid var(--accent-color); padding: clamp(12px, 3vw, 20px); background: rgba(0, 255, 0, 0.05); margin: 10px 5px;">
  <div style="text-align: center; margin-bottom: 15px; font-size: clamp(18px, 4vw, 24px);">✨</div>
  
  <div style="color: var(--prompt-color); font-size: clamp(13px, 3vw, 16px); font-style: italic; text-align: center; line-height: 1.5; margin-bottom: 15px; word-wrap: break-word; padding: 0 5px;">
    "${randomQuote.quote}"
  </div>
  
  <div style="text-align: center; color: var(--accent-color); font-weight: bold; font-size: clamp(12px, 3vw, 14px);">
    — ${randomQuote.author}
  </div>
</div>

<div style="margin-top: 15px; padding: clamp(8px, 2vw, 10px); background: rgba(0, 255, 0, 0.1); border-left: 3px solid var(--accent-color); margin-left: 5px; margin-right: 5px;">
  <div style="color: var(--prompt-color); font-weight: bold; margin-bottom: 5px; font-size: clamp(12px, 3vw, 14px);">💡 Today's Coding Goal:</div>
  <div style="color: #888; font-size: clamp(11px, 2.5vw, 13px); line-height: 1.4;">
    Write code that makes tomorrow-you proud of today-you! 🚀
  </div>
</div>
    `;
  }

  async adminLogin(args) {
    // Secret admin login command: sudo login username password
    if (args.length < 2 || args[0] !== 'login') {
      return `
<div style="color: #ff5555;">Command not found: sudo ${args.join(' ')}</div>
<div style="color: var(--text-color); margin-top: 5px;">Type 'help' for available commands.</div>
      `;
    }

    const username = args[1];
    const password = args.slice(2).join(' ');

    if (!username || !password) {
      return `
<div style="color: #ff5555;">Error: Missing username or password</div>
<div style="color: var(--text-color); margin-top: 5px;">Usage: sudo login [username] [password]</div>
      `;
    }

    try {
      const response = await axios.post(`${this.apiBase}/admin/login`, {
        username,
        password
      });

      if (response.data && response.data.token) {
        this.adminToken = response.data.token;
        // Save token to localStorage to persist through refreshes
        localStorage.setItem('adminToken', response.data.token);
        
        return `
<div style="color: #55ff55; font-weight: bold; margin-bottom: 10px;">✅ Admin login successful!</div>
<div style="color: var(--accent-color); margin-bottom: 5px;">Welcome, ${response.data.user.username}!</div>
<div style="color: var(--text-color);">Type 'admin' to access the admin panel.</div>
        `;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return `
<div style="color: #ff5555; font-weight: bold; margin-bottom: 10px;">❌ Authentication failed</div>
<div style="color: var(--text-color);">Invalid username or password.</div>
      `;
    }
  }

  async adminPanel(args) {
    // Check if admin is authenticated
    if (!this.adminToken) {
      return `
<div style="color: #ff5555; font-weight: bold; margin-bottom: 10px;">❌ Access denied</div>
<div style="color: var(--text-color);">Please login with 'sudo login [username] [password]' first.</div>
      `;
    }

    // Admin command handler
    if (args.length === 0) {
      // Show admin dashboard
      return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">🔐 Admin Panel</div>

<div style="margin-bottom: 20px; padding: 10px; border: 1px solid var(--accent-color); border-radius: 5px;">
  <div style="color: var(--prompt-color); margin-bottom: 10px; font-weight: bold;">Available Admin Commands:</div>
  <div style="margin-left: 10px; line-height: 1.5;">
    • <span style="color: var(--accent-color);">admin guestbook</span> - Manage guestbook entries<br/>
    • <span style="color: var(--accent-color);">admin analytics</span> - View command usage statistics<br/>
    • <span style="color: var(--accent-color);">admin logout</span> - Log out from admin session
  </div>
</div>

<div style="color: #888; font-size: 12px; margin-top: 10px;">For security, your session will expire after 24 hours.</div>
      `;
    }

    // Handle admin subcommands
    const subcommand = args[0];

    if (subcommand === 'logout') {
      this.adminToken = null;
      localStorage.removeItem('adminToken');
      return `
<div style="color: var(--accent-color);">✅ You have been successfully logged out of admin mode.</div>
      `;
    } else if (subcommand === 'guestbook') {
      return await this.adminGuestbook(args.slice(1));
    } else if (subcommand === 'analytics') {
      return await this.adminAnalytics(args.slice(1));
    } else {
      return `
<div style="color: #ff5555;">Unknown admin command: ${subcommand}</div>
<div style="color: var(--text-color); margin-top: 5px;">Type 'admin' for available admin commands.</div>
      `;
    }
  }

  async adminGuestbook(args) {
    try {
      // List pending entries by default
      if (args.length === 0 || args[0] === 'list') {
        // Get all entries including pending ones
        const config = { headers: { Authorization: `Bearer ${this.adminToken}` } };
        const response = await axios.get(`${this.apiBase}/admin/guestbook`, config);
        
        if (!response.data || response.data.length === 0) {
          return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 Guestbook Admin</div>
<div style="color: var(--text-color);">No pending guestbook entries found.</div>
          `;
        }

        // Store entries for easy reference by index
        this.pendingEntries = response.data.filter(entry => !entry.approved);
        
        if (this.pendingEntries.length === 0) {
          return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 Guestbook Admin</div>
<div style="color: var(--text-color);">No pending guestbook entries found.</div>
<div style="color: #888; margin-top: 10px;">All entries have been reviewed.</div>
          `;
        }

        let output = `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 Guestbook Admin</div>

<div style="margin-bottom: 10px;">
  <div style="color: var(--prompt-color);">Commands:</div>
  <div style="margin-left: 10px; color: var(--text-color); font-size: 14px;">
    • <span style="color: var(--accent-color);">admin guestbook approve [number]</span> - Approve entry by number<br/>
    • <span style="color: var(--accent-color);">admin guestbook reject [number]</span> - Reject entry by number<br/>
    • <span style="color: var(--accent-color);">admin guestbook all</span> - Show all entries (approved & pending)
  </div>
</div>

<div style="color: var(--prompt-color); margin: 15px 0 10px 0;">Pending Entries (${this.pendingEntries.length}):</div>
        `;

        this.pendingEntries.forEach((entry, index) => {
          const date = new Date(entry.createdAt).toLocaleDateString();
          const number = index + 1;
          output += `
<div style="margin-bottom: 15px; padding: 10px; border: 1px solid var(--prompt-color); border-radius: 3px; background: rgba(255, 255, 255, 0.05);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
    <div style="color: var(--accent-color); font-weight: bold;">#${number} - ${entry.name}</div>
    <div style="color: #888; font-size: 12px;">${date}</div>
  </div>
  <div style="color: #888; font-size: 12px; margin-bottom: 8px;">${entry.email || 'No email'}</div>
  <div style="margin-bottom: 10px; line-height: 1.4;">${entry.message}</div>
  <div style="font-size: 12px; color: #666;">
    Use: <span style="color: #55ff55;">admin guestbook approve ${number}</span> | 
    <span style="color: #ff5555;">admin guestbook reject ${number}</span>
  </div>
</div>
          `;
        });

        return output;
      }
      
      // Show all entries (approved and pending)
      if (args[0] === 'all') {
        const config = { headers: { Authorization: `Bearer ${this.adminToken}` } };
        const response = await axios.get(`${this.apiBase}/admin/guestbook`, config);
        
        if (!response.data || response.data.length === 0) {
          return `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 All Guestbook Entries</div>
<div style="color: var(--text-color);">No guestbook entries found.</div>
          `;
        }

        let output = `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📖 All Guestbook Entries</div>
<div style="margin-bottom: 15px;">
  <div style="color: var(--prompt-color);">Total: ${response.data.length} entries</div>
  <div style="color: #888; font-size: 12px;">✅ Approved: ${response.data.filter(e => e.approved).length} | ⏳ Pending: ${response.data.filter(e => !e.approved).length}</div>
</div>
        `;

        response.data.forEach((entry, index) => {
          const date = new Date(entry.createdAt).toLocaleDateString();
          const status = entry.approved ? '✅ Approved' : '⏳ Pending';
          const statusColor = entry.approved ? '#55ff55' : '#ffaa00';
          
          output += `
<div style="margin-bottom: 10px; padding: 8px; border: 1px solid ${entry.approved ? '#55ff55' : '#ffaa00'}; border-radius: 3px; background: rgba(255, 255, 255, 0.02);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
    <div style="color: var(--accent-color); font-weight: bold;">${entry.name}</div>
    <div style="color: ${statusColor}; font-size: 12px;">${status}</div>
  </div>
  <div style="color: #888; font-size: 11px; margin-bottom: 5px;">${date} • ${entry.email || 'No email'}</div>
  <div style="font-size: 13px; line-height: 1.3;">${entry.message}</div>
</div>
          `;
        });

        return output;
      }
      
      // Handle approve/reject by number
      if ((args[0] === 'approve' || args[0] === 'reject') && args.length > 1) {
        const action = args[0];
        const number = parseInt(args[1]);
        
        if (isNaN(number) || number < 1) {
          return `
<div style="color: #ff5555;">❌ Invalid entry number: ${args[1]}</div>
<div style="color: var(--text-color); margin-top: 5px;">Please use a valid number from the list. Type 'admin guestbook' to see entries.</div>
          `;
        }
        
        // Check if we have pending entries cached
        if (!this.pendingEntries || this.pendingEntries.length === 0) {
          return `
<div style="color: #ff5555;">❌ No entries loaded</div>
<div style="color: var(--text-color); margin-top: 5px;">Please run 'admin guestbook' first to load entries.</div>
          `;
        }
        
        // Check if number is valid
        if (number > this.pendingEntries.length) {
          return `
<div style="color: #ff5555;">❌ Entry #${number} not found</div>
<div style="color: var(--text-color); margin-top: 5px;">Valid entries are #1 to #${this.pendingEntries.length}. Type 'admin guestbook' to see the list.</div>
          `;
        }
        
        const entry = this.pendingEntries[number - 1];
        const approved = action === 'approve';
        
        try {
          const config = { headers: { Authorization: `Bearer ${this.adminToken}` } };
          await axios.patch(`${this.apiBase}/guestbook/${entry._id}/approve`, { approved }, config);
          
          // Remove from pending list since it's been processed
          this.pendingEntries.splice(number - 1, 1);
          
          return `
<div style="color: ${approved ? '#55ff55' : '#ff5555'}; margin-bottom: 10px;">
  ${approved ? '✅' : '❌'} Entry #${number} by "${entry.name}" ${approved ? 'approved' : 'rejected'} successfully!
</div>
<div style="color: var(--text-color);">Remaining pending entries: ${this.pendingEntries.length}</div>
<div style="color: #888; margin-top: 5px;">Type 'admin guestbook' to manage more entries.</div>
          `;
        } catch (apiError) {
          return `
<div style="color: #ff5555; margin-bottom: 10px;">❌ Failed to ${action} entry</div>
<div style="color: var(--text-color);">${apiError.response?.data?.error || apiError.message}</div>
          `;
        }
      }
      
      return `
<div style="color: #ff5555;">❌ Unknown guestbook command: ${args.join(' ')}</div>
<div style="color: var(--text-color); margin-top: 10px;">Available commands:</div>
<div style="margin-left: 10px; color: var(--text-color); font-size: 14px;">
  • <span style="color: var(--accent-color);">admin guestbook</span> - List pending entries<br/>
  • <span style="color: var(--accent-color);">admin guestbook all</span> - Show all entries<br/>
  • <span style="color: var(--accent-color);">admin guestbook approve [number]</span> - Approve entry<br/>
  • <span style="color: var(--accent-color);">admin guestbook reject [number]</span> - Reject entry
</div>
      `;
    } catch (error) {
      console.error('Admin guestbook error:', error);
      return `
<div style="color: #ff5555; margin-bottom: 10px;">❌ Error managing guestbook entries</div>
<div style="color: var(--text-color);">${error.response?.data?.error || error.message}</div>
      `;
    }
  }

  async adminAnalytics(args) {
    try {
      const config = { headers: { Authorization: `Bearer ${this.adminToken}` } };
      const response = await axios.get(`${this.apiBase}/analytics/commands`, config);
      
      if (!response.data || !response.data.commandStats) {
        return `<div style="color: #ff5555;">Failed to retrieve analytics data.</div>`;
      }
      
      const { commandStats, totalCommands, recentActivity } = response.data;
      
      let output = `
<div style="color: var(--accent-color); font-size: clamp(16px, 4vw, 18px); margin-bottom: 15px;">📊 Command Usage Analytics</div>

<div style="margin-bottom: 20px;">
  <div style="color: var(--prompt-color); margin-bottom: 10px;">Total Commands Tracked: ${totalCommands}</div>
  <div style="color: var(--text-color); margin-bottom: 15px;">Recent Activity (24h): ${recentActivity.length} commands</div>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--prompt-color); color: var(--accent-color);">Command</th>
      <th style="text-align: right; padding: 8px; border-bottom: 1px solid var(--prompt-color); color: var(--accent-color);">Count</th>
      <th style="text-align: right; padding: 8px; border-bottom: 1px solid var(--prompt-color); color: var(--accent-color);">Percentage</th>
    </tr>
      `;
      
      commandStats.forEach(stat => {
        const percentage = ((stat.count / totalCommands) * 100).toFixed(1);
        output += `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">${stat._id}</td>
      <td style="text-align: right; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">${stat.count}</td>
      <td style="text-align: right; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">${percentage}%</td>
    </tr>
        `;
      });
      
      output += `
  </table>
</div>
      `;
      
      return output;
    } catch (error) {
      console.error('Admin analytics error:', error);
      return `
<div style="color: #ff5555; margin-bottom: 10px;">❌ Error retrieving analytics</div>
<div style="color: var(--text-color);">${error.response?.data?.error || error.message}</div>
      `;
    }
  }
}

export default CommandProcessor;
