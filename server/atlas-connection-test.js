/**
 * This script helps identify the correct MongoDB Atlas connection string
 * 
 * Instructions:
 * 1. Go to your MongoDB Atlas dashboard
 * 2. Click "Connect" on your cluster
 * 3. Choose "Connect your application"
 * 4. Copy the connection string 
 * 5. Replace the connection string below with yours (keep the password)
 * 6. Run this script with: node atlas-connection-test.js
 */
const mongoose = require('mongoose');

// REPLACE THIS with your actual connection string from MongoDB Atlas
// It should look something like:
// mongodb+srv://johnkimani576:XNuEeRKvegIJNkJ7@cluster0.ojcqbuz.mongodb.net/?retryWrites=true&w=majority
const connectionString = "mongodb+srv://johnkimani576:XNuEeRKvegIJNkJ7@cluster0.ojcqbuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log('Attempting to connect to MongoDB Atlas...');
console.log(`Using connection string: ${connectionString.replace(/\/\/[^:]+:[^@]+@/, '//username:password@')}`);

mongoose.connect(connectionString, {
  dbName: 'portfolio-terminal'
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
  console.log('Your connection string works correctly.');
  process.exit(0);
})
.catch(err => {
  console.error('Failed to connect to MongoDB Atlas:', err);
  console.log('\nTROUBLESHOOTING TIPS:');
  console.log('1. Make sure you replaced the connection string with yours from MongoDB Atlas');
  console.log('2. Verify that your IP address is whitelisted in MongoDB Atlas Network Access');
  console.log('3. Check that your username and password are correct');
  console.log('4. Ensure your MongoDB Atlas cluster is running');
  process.exit(1);
});
