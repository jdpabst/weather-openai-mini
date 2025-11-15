
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import router from './router';




async function startServer() {
 const app = express();
 const port = 3001;

 app.use(cors());
 app.use(express.json());
 app.use("/", router);

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
 });
}

startServer();