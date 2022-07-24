// To use practice1.js module
const { sentence } = require("./practice2");

console.log(sentence)

// To use export modules
const os = require('os')
const {readFile, writeFile} = require('fs')

// To grap userInfo from os
const user = os.userInfo();
console.log(user.username)

// To create a file called practice.txt inside content folder and write sentence from practice2.js and user.username inside of it.
 writeFile(
    './content/practice.txt',`${sentence},${user.username}`,
    (err)=> {
        if (err) {
            console.log(err)
            return
        }
         
    })



