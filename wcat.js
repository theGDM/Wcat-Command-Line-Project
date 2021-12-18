const path = require("path"); //requiring path module
const fs = require("fs"); //requiring fs module

const inputArr = process.argv.slice(2);
// console.log(inputArr);

let commandArr = [0, 0, 0];
let count = 0;
//function to check whether user type wcat command or not
function checkWcat() {
    let flag = 0;
    for (let i = 0; i < inputArr.length; ++i){
        if (inputArr[i] == 'wcat') {
            flag = 1;
            // console.log("You entered correct command :)");
        } else if (inputArr[i] == '-s') {
            commandArr[0] = 1;
        } else if (inputArr[i] == '-n'){
            commandArr[1] = 1;
        } else if (inputArr[i] == '-b'){
            commandArr[2] = 1;
        }
    }
    if (flag == 1) {
        displayFileContent(inputArr);        
    } else {
        console.log("You entered wrong command :(");
    }
}

checkWcat();

// console.log(commandArr);

//function to display content of any file
function displayFileContent(inputArr){
    for (let i = 0; i < inputArr.length && (inputArr[i] != '>' || inputArr[i] != '>>'); ++i){
        // console.log(i);
        if (inputArr[i] != 'wcat' && inputArr[i] != '-b' && inputArr[i] != '-s' && inputArr[i] != '-n') {
            // console.log(inputArr[i]);
            let isFile;
            let exists = fs.existsSync(inputArr[i]);//checking whether entered path exists or not.
            if (exists) {
                isFile = fs.lstatSync(inputArr[i]).isFile();//if entered path exist, then check whether it is file or not.
            }
            if (isFile) {//if it is file, read its content and display on the console.
                let content = fs.readFileSync(inputArr[i]);
                let readableContent = content.toString();//convert content of file to string
                if (commandArr[0] && commandArr[1] && commandArr[2]) {
                    console.log("-b and -n can not be processed simultaneously!");
                    break;
                } else if (commandArr[1] && commandArr[2]) {
                    console.log("-b and -n can not be processed simultaneously!");
                    break;
                } else if (commandArr[0] && commandArr[1]) {
                    //convert big line break into single line breaks, and also give numbering to all the lines.
                    let data = readableContent.split('\n');
                    for (let i = 0; i < data.length - 1; ++i){
                        if (data[i] != '\r') {
                            console.log(`${++count} ${data[i]}`);
                            console.log(`${++count} `);
                        }
                    }
                    if (data[data.length - 1] != '\r') {
                        console.log(`${++count} ${data[data.length - 1]}`);
                    }
                } else if (commandArr[0] && commandArr[2]) {
                    //convert big line break into single line breaks, and also give numbering to only non-empty lines.
                    let data = readableContent.split('\n');
                    for (let i = 0; i < data.length - 1; ++i){
                        if (data[i] != '\r') {
                            console.log(`${++count} ${data[i]}`);
                            console.log(` `);
                        }
                    }
                    if (data[data.length - 1] != '\r') {
                        console.log(`${++count} ${data[data.length - 1]}`);
                    }
                } else if(commandArr[0]){
                    // console.log(data);
                    let data = readableContent.split('\n');
                    for (let i = 0; i < data.length - 1; ++i){
                        if (data[i] != '\r') {
                            console.log(data[i]);
                            console.log(" ");
                        }
                    }
                    if (data[data.length - 1] != '\r') {
                        console.log(data[data.length - 1]);
                    }
                } else if (commandArr[1]) {
                    //give numbering to all the lines
                    let data = readableContent.split('\n');
                    for (let i = 0; i < data.length; ++i){
                            console.log(`${++count} ${data[i]}`);
                    }

                } else if (commandArr[2]) {
                    //give numbering to only non-empty lines
                    let data = readableContent.split('\n');
                    for (let i = 0; i < data.length; ++i){
                        if (data[i] != '\r') {
                            console.log(`${++count} ${data[i]}`); 
                        } else {
                            console.log(" ");
                        }
                    }
                } else {
                    console.log(readableContent);
                }
            } else {
                console.log("File does not exist!");
            }
        }
    }
}