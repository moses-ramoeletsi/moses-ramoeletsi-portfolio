import express from 'express';
import dotenv from "dotenv";
import { dbConnection } from './dbConnection/dbConnection.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {    
    res.send('Server is up and running');
});

app.listen(PORT, () => {   
    dbConnection(); 
    console.log('Server is running on port 3000');
});