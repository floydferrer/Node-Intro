const fs = require('fs');
const process = require('process');
const axios = require('axios');
let path;
let out;

function handleOutput(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', err => {
            if (err) {
                console.error(err);
                process.exit(1);
            } else{
                console.log('Write successful')
            }
        });
    } else{
        console.log(text);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error: ', err);
            process.exit(1);
        } else{
            handleOutput(data, out)
        }
    })
}

async function webCat(path) {
    try{
        let res = await axios.get(path);
        handleOutput(res.data, out);
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}

if (process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}

