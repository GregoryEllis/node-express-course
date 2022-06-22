var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {
    // const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)

    // remember when we set up the stream we have access to two events.
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
        // pipe is pushing from the createReadStream into the writeStream
        // So if we can read data in chucks we can write data in chucks
      fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)