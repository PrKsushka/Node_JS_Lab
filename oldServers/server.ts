import 'dotenv/config';
import products from '../data/dataAboutProducts';
import postDataAboutProducts from '../service/service';
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
  const { url, method } = req;
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Hello');
    res.end();
  } else if (url === '/products' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(JSON.stringify(products));
    res.end();
  } else if (url === '/products' && method === 'POST') {
    postDataAboutProducts(req, res);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('Page not found');
  }
});

const PORT = process.env.PORT;
server.listen(PORT, function (error?: string) {
  if (error) {
    console.log('Ooops, something went wrong', error);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
