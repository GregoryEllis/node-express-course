const express = require('express');
const router = express.Router();

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')
 
// Default method that the browser performs
// '/' is the base of the route if there is something else after the base route some additional info we will have to add it.
// router.get('/',getPeople)
// router.post('/',createPerson)
// router.post('/postman',createPersonPostman)
// router.put('/:id',updatePerson)
// router.delete('/:id',deletePerson)

// Here's another way to set up the routes
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)

module.exports = router
