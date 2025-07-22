#### Prerequisites

1. Create a [Render.com](https://render.com) account
2. Have your MongoDB connection string ready (mongodb+srv://...) from your existing setup

#### Option 1: Deploy using Blueprint (Recommended)

1. Fork this repository to your GitHub account
2. Log in to Render.com
3. Go to the Dashboard and click on "New" > "Blueprint"
4. Connect your GitHub account if you haven't already
5. Select the forked repository
6. Render will detect the `render.yaml` file and set up the services
7. Click "Apply" to create the services
8. Configure the environment variables:
   - For the API service, add your existing `MONGODB_URI` (the mongodb+srv:// connection string you already have)
   - Render will auto-generate the `JWT_SECRET` value
9. Wait for the deployment to complete

#### Option 2: Manual Deployment

If you prefer to deploy manually, you can create individual services on Render:

##### Backend API Service

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: portfolio-terminal-api
   - **Environment**: Node
   - **Build Command**: `npm install && npm run install-server`
   - **Start Command**: `npm run start`
4. Add environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `JWT_SECRET`: (generate a secure random string)
   - `MONGODB_URI`: (paste your existing mongodb+srv:// connection string here)
5. Click "Create Web Service"

##### Frontend Web Service

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: portfolio-terminal-web
   - **Build Command**: `npm install && npm run install-client && npm run build-client`
   - **Publish Directory**: `./client/build`
4. Add environment variables:
   - `REACT_APP_API_URL`: https://[your-backend-name].onrender.com/api
5. Click "Create Static Site"

### 🔄 Updating Your Deployment

After making changes to your code:

1. Commit and push your changes to GitHub
2. Render will automatically detect the changes and rebuild your services

### 🧪 Testing Your Deployment

After deployment:

1. Visit your frontend URL (e.g., https://portfolio-terminal-web.onrender.com)
2. Verify that you can use all commands and that they connect to the backend
3. Try submitting a contact form or signing the guestbook to test database functionality

### 💾 Setting Up MongoDB Atlas for Production Deployment

Follow these exact steps to set up MongoDB Atlas for your production deployment:

1. **Create a MongoDB Atlas Account** (if you haven't already):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose the free shared cluster option
   - Select your preferred cloud provider and region (closest to your users)
   - Click "Create Cluster" (this may take a few minutes)

3. **Set Up Database Access**:
   - In the left sidebar, go to "Security" > "Database Access"
   - Click "Add New Database User"
   - Create a username and secure password (SAVE THESE!)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Set Up Network Access**:
   - In the left sidebar, go to "Security" > "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Your Connection String**:
   - Once your cluster is created, click "Connect"
   - Choose "Connect your application"
   - Select "Node.js" and the latest version
   - **COPY THE EXACT CONNECTION STRING** provided
   - It will look like: `mongodb+srv://<username>:<password>@clustername.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<username>` and `<password>` with your database user credentials

6. **Create Your Database**:
   - In the left sidebar, click "Browse Collections"
   - Click "Add My Own Data"
   - Create a database named `portfolio-terminal`

7. **Add as Environment Variable in Render**:
   - When deploying to Render, add the complete connection string as the MONGODB_URI environment variable

> **IMPORTANT**: The connection string must include your ACTUAL cluster name (NOT just "cluster0.mongodb.net" but something like "cluster0.abcd123.mongodb.net")

## 🛠️ Local Development

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-terminal.git
   cd portfolio-terminal
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory with your MongoDB URI and JWT secret
   - Create `.env.development` in the client directory with your API URL

4. Start the development servers
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app
