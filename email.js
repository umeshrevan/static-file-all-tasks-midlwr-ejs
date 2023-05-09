const fs= require('fs')
const http = require('http')
const ejs = require('ejs')
const port=4030
//require('dotenv').config()

const server=http.createServer((req,res)=>{
            if(req.url === '/users' && req.method === 'POST'){
            let dataStore='';
            req.on('data', chunk =>{
                dataStore += chunk.toString()
                
            })
            req.on('end', ()=>{

                    const {email} =JSON.parse(dataStore)
                    // const data = JSON.parse(dataStore)
                    // const users= JSON.parse(fs.readFileSync('./user.json' , 'utf-8'))
                    // console.log(data);
                    // //console.log(req.headers);
                    // console.log(req.email);
                    // const foundEmail= users.usersData.find(obj=>obj.email === data.email)
                    // if(foundEmail){
                    //     res.statusCode=400
                    //     return res.end('Email verified')
                    // }

                const html=ejs.render(fs.readFileSync('./emailverify.ejs','utf-8'),{email:jsonData.userData})
                res.end(html)
            })
        }
})
const jsonData= JSON.parse(fs.readFile('./user.json','utf-8'))


//const port=process.env.PORT
server.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`);
})