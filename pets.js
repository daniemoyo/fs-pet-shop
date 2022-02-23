const fs = require("fs");

const read = (index) => {
    fs.readFile('./pets.json', 'utf8' , (err, data) => {
        const parsedData = JSON.parse(data);
        // console.log(Object.keys(parsedData).length);
        if (err) {
            console.error(err);
            return
        }
        index ? 
            index > Object.keys(parsedData).length || index < 0 ? 
                 console.error(`Usage: node pets.js read ${Object.keys(parsedData).length}`):
                 console.log(parsedData[index]):
            console.log(parsedData);
    });
}
const subCommand = process.argv[2];

switch (subCommand) {
    case 'read':
        read(process.argv[3]);
        break;
    case 'create':
        break;
    case 'update':
        break;
    case 'destroy':
        break;
    default:
        console.error("Usage: node pets.js [read | create | update | destroy]");
        // process.exit(1);
}

