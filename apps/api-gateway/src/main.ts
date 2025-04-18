/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import express from 'express';


const app = express();
app.use(
  cors(
    {
      origin: ["http://localhost:3000"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }
  )
);

app.use(morgan('dev'));
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true, limit:"100mb" }));
app.use(cookieParser());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req:any)=>(req.user?1000:100), // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req:any) => req.ip
}));


app.set('trust proxy', 1); // trust first proxy

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/', proxy('http://localhost:6001'));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
