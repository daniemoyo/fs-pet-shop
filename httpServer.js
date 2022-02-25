const http = require('http');

const fs = require('fs');
const path = require('path');
// const { callbackify } = require('util');
const petsPath = path.join(__dirname, 'pets.json');

const petRegExp = /^\/pets\/(\d*)$/;

// function read(callback) {
//     fs.readFile(Data_path, "utf-8", (err, data) =>{
//         if (err) callback(err);
//         callback(null, JSON.parse(data));
//     })
// }

const server = http.createServer((req, res) =>{
    
    if(req.method === 'GET' && req.url === '/pets'){
        fs.readFile(petsPath, 'utf8' , (err, data) => {
            if (err) throw err;      
            let obj = JSON.parse(data);
            res.writeHead(200, {"content-Type": "application/json"});
            res.write(JSON.stringify(obj));
            res.end();
        });

    }else if (req.method === 'GET' && petRegExp.test(req.url)) {
       let index = Number(req.url.match(petRegExp)[1]);
       
       fs.readFile(petsPath, 'utf8' , (err, data) => {
        if (err) throw err;      
             let parsedData = JSON.parse(data);
             console.log(index);
        if (index > parsedData.length || index < 0 || typeof index === 'string') {
            res.writeHead(404, {"content-Type": "text/plain"});
            res.write("Not Found");
            res.end();
        }else{
            res.writeHead(200, {"content-Type": "application/json"});
            res.write(JSON.stringify(parsedData[index]));
            res.end();
        }
    });
        
    } else {
        console.log();
    }
});

server.listen(8080, function(){
    console.log("listening on Port 8080");
});

module.exports = server;