import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Problemrouter from './routes/problem.routes.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use('/api/problems', Problemrouter);

app.get('/', (req, res) => {
    res.send('Hello leetcode');
}); 

app.listen(process.env.PORT, () => {
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
});