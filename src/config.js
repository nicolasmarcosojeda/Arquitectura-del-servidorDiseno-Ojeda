import dotenv from 'dotenv';
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  apiKey: process.env.API_KEY || 'your-default-api-key',
};

export default config;
