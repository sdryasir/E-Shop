import { errorMiddleware } from './../../../packages/error-handler/error-middleware';

import cookieParser from 'cookie-parser';
import express from 'express';

import cors from 'cors';

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

  app.use(express.json());
  app.use(cookieParser());  

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API'});
});


app.use(errorMiddleware);

const port = process.env.PORT || 6001;
const server = app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}/api`);
});

server.on('error', (err)=>{
    console.error(err);
    process.exit(1);
});



