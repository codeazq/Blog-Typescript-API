import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import * as express from "express"; 
import { Application } from 'express';
import routes from "./routes";
import * as dotenv from 'dotenv';

const env = dotenv.config();
if (!env) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const app: Application = express();

const PORT = process.env.PORT || 7000;

createConnection().then(async connection => {
    console.log("Connection to database successful")
}).catch(error => console.log(error));

app.use(express.json())
app.use('', routes())

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});