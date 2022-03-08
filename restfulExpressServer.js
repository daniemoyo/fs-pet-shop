const express = require("express");
const app = express();

const fs = require("fs");
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const { readPetsFile, writePetsFile} = require("./utils.js");

app.use(express.json());

//Create a Pet
app.post('/pets', (req, res) => {
   if(Object.keys(req.body).length < 0 || typeof req.body.age !== 'number'){
       res.status(400).send("Bad Request");
    }else{
        //read pets.json file
       readPetsFile( (err, data)=>{
           //push response body to read object
           data.push(req.body);
               //write to the file with new pushed object
           writePetsFile(data, (err)=>{
                res.status(201).send(req.body);
           });
       });
    }
  
});
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
        res.json(data[index]);
    });
 });
 //Patch a pet
app.patch('/pets/:index', (req, res) => {
   
    //Callback Function from readPets. Sends the response with pets[index] in json
    readPetsFile( (err, data)=>{   
        const index = Number(req.params.index);
        if(index < 0 || index >= data.length || typeof index === 'string'){
            res.status(404).send('Not Found');
        }
        data[index] = {...data[index], ...req.body}
        writePetsFile(data, (err)=>{
            res.json(data[index]);
        })
    });
 });
 app.delete('/pets/:index', (req, res) => {
   
    //Callback Function from readPets. Sends the response with pets[index] in json
    readPetsFile( (err, data)=>{   
        const index = Number(req.params.index);
        if(index < 0 || index >= data.length || typeof index === 'string'){
            res.status(404).send('Not Found');
        }
        const deleted = data.splice(index,1);
        writePetsFile(data, (err)=>{
            res.json(deleted);
        })
    });
 });



app.listen(3000, ()=>{
    console.log("Listening on Port: 3000");
});

module.exports = app;