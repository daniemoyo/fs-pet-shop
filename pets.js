// const path = require('path')
// const petsPath = path.join(__dirname, 'pets.json');

const fs = require("fs");

const read = (index) => {
    fs.readFile('./pets.json', 'utf8' , (err, data) => {
        const parsedData = JSON.parse(data);
        // console.log(parsedData);
        if (err) throw err;
        index ? 
            index > parsedData.length || index < 0 ? 
                 console.error(`Usage: node pets.js read INDEX`):
                 console.log(parsedData[index]):
            console.log(parsedData);
    });
};

const create = () =>{

    if(process.argv.length <= 5){
         console.error("Usage: node pets.js create AGE KIND NAME");
         process.exit(1);
    }else{
        const [, , ,age, kind, name] = process.argv;
        let pet = { 
            age: Number(age),
            kind: kind, 
            name: name
        };
        fs.readFile('./pets.json', (err, data) => {
            if (err) throw err;
            let petObj = JSON.parse(data);
            petObj.push(pet); 
            
            let data1 = JSON.stringify(petObj);
        
            fs.writeFile('./pets.json', data1, (err) => {
                if (err) throw err;
                console.log(pet);
            });
        });
        
    }

}; 
const update = () =>{

    if(process.argv.length <= 6){
         console.error("Usage: node pets.js update INDEX AGE KIND NAME");
         process.exit(1);
    }else{
        const [, , ,index, age, kind, name] = process.argv;
        let petUpdate = { 
            age: Number(age),
            kind: kind, 
            name: name
        };
        fs.readFile('./pets.json', (err, data) => {
            if (err) throw err;
            let petObj = JSON.parse(data);
            console.log(petObj[index]);
            petObj[index] = petUpdate; 
            
            let data1 = JSON.stringify(petObj);
        
            fs.writeFile('./pets.json', data1, (err) => {
                if (err) throw err;
                console.log(petObj[index]);
            });
        });
        
    }

}; 
const subCommand = process.argv[2];

switch (subCommand) {
    case 'read':
        read(process.argv[3]);
        break;
    case 'create':
        create();
        break;
    case 'update':
        update();
        break;
    case 'destroy':
        break;
    default:
        console.error("Usage: node pets.js [read | create | update | destroy]");
        process.exit(1);
}

