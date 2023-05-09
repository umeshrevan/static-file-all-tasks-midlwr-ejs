// const http =require ('http')
// const server= http.createServer((req, res)=>{
//     if(req.url==="/home"){
//         let name
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html')
//         res.end(`
//         <input type="text" placeholder="name" value="${req.query.name}"/>
//         `)
//     }
// })
// server.listen(5000,()=>{
//     console.log("Listening on ${server}");
// })
const http = require('http');
const server = http.createServer((req, res) => {
    res.send(`
        <!doctype html>
        <html>
        <body>
            <form action="/" method="post">
                <input type="text" name="fname" /><br />
                <input type="number" name="age" /><br />
                <input type="file" name="photo" /><br />
                <button>Save</button>
            </form>
        </body>
        </html>
    `);
});
server.listen(3000);