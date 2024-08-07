import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  app  from '../server';
import http from 'http'; // Import http module for server

dotenv.config();

let server: http.Server | null = null; // Variable to store the server instance


const connectServer = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('MongoDB connection string not provided. Please set MONGODB_URI in .env file.');
      return null;
    }
  
  try {
    await mongoose.connect(mongoURI, {});
    console.log('MongoDB connected');


const PORT = process.env.PORT || 3000;
server = await app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
return server ;


  } catch (error) {
    console.error('server connection error', error);
   return null
  }
};

// Function to close the server (for testing purposes)
function closeServer(): void {
    if (server) {
      server.close();
    }
  }

export  { connectServer, closeServer }