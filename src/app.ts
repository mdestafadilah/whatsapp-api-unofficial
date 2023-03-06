import express from 'express';
import { defaultRoute } from './routers/whatsapp';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(bodyParser.json());
app.use('/', defaultRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});