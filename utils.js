const fs = require("fs");
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

function readPetsFile(callback){
    fs.readFile(petsPath, (err, data) => {
        if (err) {
          next(err) // Pass errors to Express.
        } else {
          callback(null, JSON.parse(data));
        }
      });
}

function writePetsFile(data, callback){
  
  fs.writeFile(petsPath, JSON.stringify(data), (err, data) =>{
    if (err){
      callback(err); // Pass errors to Express.
    }else{
      callback(null, JSON.stringify(data));
    }
  });
}

module.exports = {
    readPetsFile,
    writePetsFile
}