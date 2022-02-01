const products = require("../data/dataAboutProducts");
exports.postDataAboutProducts = function (req, res) {
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