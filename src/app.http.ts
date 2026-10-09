import http from 'http';
import fsp from 'fs/promises'

const server = http.createServer(async (req, res) => {
    // res.writeHead(200, { 'Content-type': 'text/html' });
    // res.write('<h1>Hello world</h1>');
    // res.end();

    // const data = {
    //     name: 'John Doe',
    //     age: 30,
    //     job: 'Software Developer'
    // }

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
        const htmlFile = await fsp.readFile('./public/index.html')
        res.writeHead(200, { 'Content-type': 'text/html' });
        return res.end(htmlFile);
    }

    if (req.url === '/style.css') {
        const cssFile = await fsp.readFile("./public/style.css")
        res.writeHead(200, { 'Content-type': 'text/css' });
        return res.end(cssFile);
    }

    if (req.url === '/index.js') {
        const cssFile = await fsp.readFile("./public/index.js")
        res.writeHead(200, { 'Content-type': 'application/javascript' });
        return res.end(cssFile);
    }

    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end()


});

server.listen(8080, () => {
    console.log('Server running on port 8080')
})