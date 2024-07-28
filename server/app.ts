import express from 'express';
import bodyParser from "body-parser";
import connectDB from "./database/connection";
import orderRoutes from "./router/router"
import cors from "cors";
import { initializeApp } from './initilizerApp';

const app = express();
const port = process.env.PORT;
app.use(cors());

initializeApp();
connectDB();


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/', orderRoutes );


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});