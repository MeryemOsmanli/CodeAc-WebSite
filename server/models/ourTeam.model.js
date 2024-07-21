const mongoose = require('mongoose')
const OurTeamSchema = require('../schema/ourTeam.schema')

const OurTeamModel = mongoose.model('OurTeam', OurTeamSchema)
module.exports = OurTeamModel