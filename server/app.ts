import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './database/connection';
import orderRoutes from './router/router';
import cors from 'cors';
import { initializeApp } from './initilizerApp';
import { checkJwt } from './middleware/authMiddleware';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors());

initializeApp();
connectDB();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Apply the checkJwt middleware to all routes in orderRoutes
app.use('/', checkJwt, orderRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
