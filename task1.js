const http = require('http')
const fs = require('fs')
const port=8080

const server =http.createServer((req , res) =>{
        // res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        console.log('req' , 'res')
        if (req.url == '/') {
            res.statusCode = 200;
            res.end("<h1>This is first page.</h1>");
        }
        else if(req.url == '/home') {
            res.statusCode = 200;
            const data=fs.readFileSync('./home.html',"utf-8")
            res.end(data);
        }
        else{
            res.statusCode = 400;
            res.end("<h1> Page Not Found</h1>");
        }
})

server.listen(port, ()=>{
    console.log(`Listening on port https://localhost:${port}`);
})