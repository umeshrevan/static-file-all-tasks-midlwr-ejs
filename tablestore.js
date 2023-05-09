const http= require('http')
const fs = require('fs');
const ejs = require('ejs');
port=5050

const server =http.createServer((req , res) =>{
    if (req.url == '/') {
        res.statusCode = 200;
        res.end("<h1>This is first page.</h1>");
    }
    else if(req.url == '/users') {
        res.statusCode = 200;
        const html=ejs.render(fs.readFileSync('user.ejs', 'utf8'), { user: data.usersData});
        res.end(html)
    }
})
const jsonData = fs.readFileSync('user.json', 'utf8');
const data = JSON.parse(jsonData);

server.listen(port, ()=>{
    console.log(`Listening on port https://localhost:${port}`);
})