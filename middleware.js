const fs= require('fs')
const http = require('http')
const port=3030
//require('dotenv').config()

const server=http.createServer((req,res)=>{
            if(req.url === '/users' && req.method === 'POST'){
            let dataStore='';
            req.on('data', chunk =>{
                dataStore += chunk.toString()
            })
            req.on('end', ()=>{
                try{
                    const data = JSON.parse(dataStore)
                    const users= getUsers()
                    console.log(data);
                    console.log(req.baseurl,req.cookies,req.path,);
                    //console.log(req.headers);
                    const foundUsername= users.usersData.find(obj=>obj.username === data.username)
                    const foundEmail= users.usersData.find(obj=>obj.email === data.email)
                    if(foundUsername){
                        res.statusCode=400
                        return res.end('Username already exists')
                    }
                    else if(foundEmail){
                        res.statusCode=400
                        return res.end('Email already exists')
                    }
                    else{
                        users.usersData.push(data) //pushing data that is on line 14
                        const message=addUsers(users)
                        return res.end(message)
                    }
                }catch (error) {
                    res.statusCode = 400;
                    return res.end('Invalid JSON data');
                  }
            })
        }
})
function getUsers(){
    try{
        const data = fs.readFileSync('./user.json' , 'utf-8');
        return JSON.parse(data);
    }catch(error){
        return [];
    }
}

function addUsers(users){
    const data = JSON.stringify(users)
    fs.writeFileSync("./user.json", data);
    return "data added successfully"
}

//const port=process.env.PORT
server.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})