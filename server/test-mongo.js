require('dotenv').config();
const mongoose = require('mongoose');

console.log('Attempting to connect to MongoDB Atlas...');
console.log(`Using connection string: ${process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//username:password@')}`);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'portfolio-terminal'
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
  process.exit(0);
})
.catch(err => {
  console.error('Failed to connect to MongoDB Atlas:', err);
  process.exit(1);
});
