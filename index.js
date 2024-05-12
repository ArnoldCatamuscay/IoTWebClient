import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';

const PORT = 8000;

const app = express();
app.use(cors());

app.get('/', (res, req) => {
  req.json('Hi')
});

app.get('/firebase', (res, req) => {
  req.json('Future Firebase communication will be here')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// This code won't be bundled by Vite, as it's server-side
