import products from '../data/dataAboutProducts';
import { IncomingMessage, ServerResponse } from 'http';

const postDataAboutProducts = function (req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    let postBody = JSON.parse(body);
    products.push(postBody);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify(postBody));
  });
};
export default postDataAboutProducts;
