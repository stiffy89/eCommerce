import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import categoryRoute from './routes/category.route';

const app: Application = express();

dotenv.config(); // this basically makes the config from all our .env file available to the whole project
const port = process.env.PORT; //now we can access the port from process.env because of the .config() exposure
const api = process.env.API; //now we can access the api from process.env because of the .config() exposure

const corsOptions = {
    origin : ['http://localhost:3000'],                     //list of origins that are allowed, can do * if we want to allow all
    methods : "GET, HEAD, POST, PUT, PATCH, DELETE",        //the list of methods that are allowed - HEAD is basically a get call WITHOUT THE BODY - checking if url exists, size of resrouce before dl'ing, health checks and validators
    allowedHeaders: ['Content-Type', 'Authorization'],      //the headers that are allowed
    credentials: true                                       //passing credentials in the header
}

app.use(cors(corsOptions))
app.use(express.json()) //need to allow our express to be able to use json
app.use(`${api}/categories`, categoryRoute);                //the middleware will RUN ON EVERY REQUEST -> typically anything that we want for every single request, we would use app.use(<someMiddleWare>)

app.get(`${api}/health`, (req: Request, res: Response) => {             //you may notice that here its app.get -> only run if its a GET on this path
    res.send('app is healthy');
});

const connectionString = process.env.MONGODB_CONN_STRING;
if (!connectionString) {
    console.error('MONGODB_CONN_STRING is not set in the .env file');
    process.exit(1);
}

mongoose.connect(connectionString) //this will connect mongoose to our mongodb database
.then(() => {
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log(error)
})

app.listen(port, () => {
    console.log('app listening on http://localhost:3000')
})