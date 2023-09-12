import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

// Routes...
app.get('/', async (req,res)=>{
    // throw new ValidationError('Damn');
    // throw new Error('Damn');
    res.send('hi');
})

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});