const express = require("express");
const app = express();

const fs = require("fs");
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const { readPetsFile, writePetsFile} = require("./utils.js");

app.use(express.json());

//Get all the Pets
app.get('/pets', (req, res) => {
   //Callback Function from readPets. Sends the response with the pets object in json
   readPetsFile((err, data)=>{
       res.json(data);
   });
});

//Look for a single pet
app.get('/pets/:index', (req, res) => {
    //Callback Function from readPets. Sends the response with pets[index] in json
    readPetsFile( (err, data)=>{
       
        const index = Number(req.params.index);
            console.log(data.length);
        (index < 0 || index >= data.length || typeof index === 'string') ?
            res.status(404).send('Not Found'):
        res.json(data[req.params.index]);
    });
 });

 //Create a Pet
 app.post('/pets', (req, res) => {
        console.log(req.body.age);
    if(Object.keys(req.body).length < 0 || typeof req.body.age !== 'number'){
        res.status(400).send("Bad Request");
     }else{
        
         //read pets.json file
        readPetsFile( (err, data)=>{
            //push response body to read object
            data.push(req.body);
                //write to the file with new pushed object
            writePetsFile(data, (err)=>{
                    res.json(req.body);
            });
        });
     }
   
 });


app.listen(3000, ()=>{
    console.log("Listening on Port: 3000");
});

module.exports = app;