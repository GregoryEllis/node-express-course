const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './new-public/index.html'))
})

app.listen(3000, () => {
    console.log('server is listening on port 3000....')
})