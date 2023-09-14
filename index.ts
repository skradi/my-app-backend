import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError, } from "./utils/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per 'window' (here, per 15 minutes)
}))

// Routes...
app.use('/ad', adRouter);


app.get('/', async (req,res)=>{
    // throw new ValidationError('Damn');
    // throw new Error('Damn');
    res.send('hi');
})

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});