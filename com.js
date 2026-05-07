import http from 'http'
import { platform } from 'os';
import { text } from 'stream/consumers';

const hotsname = '127.0.0.1';
const port = 2000;

const server = http.createServer((req,res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});

server.listen(port,hotsname, () =>{
    console.log(`Servidor corriendo en  http://${hotsname}:${port}/`);
});

