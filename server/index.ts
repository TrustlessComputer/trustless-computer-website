import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import path from 'path';
import { APP_ENV, APP_PORT } from './config';

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  process.kill(process.pid, 'SIGINT');
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, '../dist'), {
  index: false,
}));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(APP_PORT, () => {
  console.log(
    `> Server listening at :${APP_PORT} as ${APP_ENV}`,
  );
});