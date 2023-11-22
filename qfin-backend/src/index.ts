import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.get('/ping', (req: Request, res: Response) => {
  let date = new Date();
  res.json({'ping': date})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});