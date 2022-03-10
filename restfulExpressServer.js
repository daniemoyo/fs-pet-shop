const express = require("express");
const app = express();

const fs = require("fs");
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const basicAuth = require('express-basic-auth');

app.use(
    basicAuth({
    users: { 'admin':'meowmix'},
    unauthorizedResponse: { "message":"Access unauthorized: Username or Password is incorrect" },
    },
    express.json()
));


const { Pool } = require('pg');
const pool = new Pool({
    database: 'petshop'
});


const { readPetsFile, writePetsFile} = require("./utils.js");

//Create a Pet
app.post('/pets', (req, res) => {
    if(Object.keys(req.body).length < 0 || typeof req.body.age !== 'number'){
        res.status(400).send("Bad Request");
    }else{
        const {age, name, kind} = req.body;
        
        pool.query('INSERT INTO pets(age, name, kind) VALUES($1, $2, $3) RETURNING *',[age, name, kind], (err, result) => {
            console.log(result.rows);
            res.status(201).json(result.rows[0])
        });
    }
    
});
//Get all the Pets
app.get('/pets', (req, res) => {
    //Callback Function from readPets. Sends the response with the pets object in json
    pool.query('SELECT * FROM pets', (err, result) => {
        console.log(result.rows);
        res.json(result.rows)
    });
});

//Look for a single pet
app.get('/pets/:id', (req, res) => {
    //Callback Function from readPets. Sends the response with pets[index] in json
    const id = Number(req.params.id);
    
    pool.query('SELECT * FROM pets WHERE id=$1',[id]
    )
    .then( (result)=> {
        // console.log(result);
        res.json(result.rows[0]);
    })
    .catch((err)=>{
        res.sendStatus(500);
    });
    
});
//Patch a pet
app.patch('/pets/:id', (req, res) => {
    const { age, name, kind } = req.body;
    const id = Number(req.params.id);
    const query = `
    UPDATE pets SET
    age  = COALESCE($1, age),
    name = COALESCE($2, name),
    kind = COALESCE($3, kind)
    WHERE id= $4
    RETURNING *`;
    pool.query(query, [age,name,kind,id]
        )
        .then( (result)=> {
            // console.log(result);
            res.json(result.rows[0]);
        })
        .catch((err)=>{
            res.sendStatus(500);
        });
    });
    
    app.delete('/pets/:index', (req, res) => {
        const id = Number(req.params.index);
        const query = `
        DELETE FROM pets 
        WHERE id= $1
        RETURNING *`;
        pool.query(query, [id]
            )
            .then( (result)=> {
                // console.log(result);
                res.json(result.rows[0]);
            })
            .catch((err)=>{
                res.sendStatus(500);
            });
        });
        
        
app.use((req, res, next) => {
    res.status(404).send("Not found");
});

app.listen(3000, ()=>{
    console.log("Listening on Port: 3000");
});

module.exports = app;