// A better solution would be to setup a promise and use await
const {readFile, writeFile} = require('fs').promises;
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

// getText('../content/first.txt')
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

// With this code only when the promise is resolved I get the result.     
const start = async() =>{
    try {
        const first = await readFile('./content/first.txt', 'utf8')
        const second = await readFile('./content/second.txt', 'utf8')
        await writeFile(
            './content/result-mind-grenade.txt',`THIS IS AWESOME : ${first} ${second}`,{ flag:'a' })
        console.log(first, second);
    }   catch (error){
        console.log(error);
        
    }
}

start()


// const getText = (path) =>{
//     return new Promise((resolve,reject)=> {
//         readFile(path,'utf8',(err,data)=>{
//             if(err){
//                 reject(err)
//                 return
//             } else {
//                 resolve(data)
//             } 
//         })
//     })
// }