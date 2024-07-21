const express = require('express')
const OurTeamController = require('../controller/ourTeam.controller')
const router = express.Router()


// Get
router.get('/', OurTeamController.getAll)
router.get('/:id', OurTeamController.getOne)
// Post
router.post('/', OurTeamController.add)
// Delete
router.delete('/:id', OurTeamController.delete)
// Put
router.put('/:id', OurTeamController.edit)

module.exports = router