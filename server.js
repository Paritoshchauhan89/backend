import express from 'express';
import dotenv from 'dotenv';
import Connection from './database/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import colors from 'colors'
import morgan from 'morgan';
import Auth from './routes/authRoute.js'

// configure env
dotenv.config();

//databse config
Connection();

// rest object
const app = express();

// router import 

app.use(bodyParser.json({ externals: true }));
app.use(bodyParser.urlencoded({ extended: true }));


// middelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use("/api/v1/auth",Auth);





// rest api 
app.get("/", (req, res) => {
    res.send("<h1>Project-VP-ME  Backend is Live</h1>")
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(colors.bgCyan.white(`server is running at http://localhost:${PORT} ${process.env.WEBNAME}`)));