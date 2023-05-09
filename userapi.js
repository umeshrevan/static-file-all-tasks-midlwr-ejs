const http =require('http')
const fs = require('fs')
const api_key = "access"
const port= 8080
const filename= 'user.json';

    
const server = http.createServer((req, res) => {
    if(req.url==='/getuser' && req.method==='GET'){
        const apikey = req.headers["api-key"];
    if(apikey!==api_key){
        res.end("Unauthorized");
    }
    fs.readFile(filename,'utf-8',(err,data) => {
        if(err){
            res.end("Error");
        }
        res.end(data)
    })
    }

})


server.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})