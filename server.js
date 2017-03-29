// simple server

'use strict';

const http = require('http');
const fs = require('fs');
const port = 8080;
const path = require('path');

const getContent = (req, res) => {

    let url;

    if (req.url === '/' || req.url === '/index.html')
        url = 'index.html';
    else if (req.url === '/js/main.js')
        url = 'js/main.js';
    else if (req.url === '/css/main.css')
        url = 'css/main.css';
	else if (req.url === '/node_modules/babel-polyfill/browser.js')
		url = 'node_modules/babel-polyfill/browser.js';
	else
		return;

    fs.readFile(url, 'utf-8', (err, content) => {
        res.end(content);
    });
};

const server = http.createServer(getContent);

server.listen(port, () => {
    console.log('started');
});
