// db.js

import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

let isConnected = false;

export enum PromptProducts {
  ChatGPT3Point5 = 'ChatGPT-3.5',
  DALLE = 'DALL-E',
}

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    
    const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@prompts.kl4a3qj.mongodb.net/?retryWrites=true&w=majority`;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
    return client.db('prompts');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export function disconnectFromDatabase() {
  if (!isConnected) {
    return;
  }

  mongoose.connection.close();
  isConnected = false;
}

