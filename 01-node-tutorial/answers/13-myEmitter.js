// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods: on- listen for an event, emit- emit an event
// keep track of the order
// additional arguments
// built-in modules utilize it

// The order matters: customEmitter.on, then customEmitter.emit 
customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

// The first argument most match that of customEmitter.on
customEmitter.emit('response', 'Greg', 326)
