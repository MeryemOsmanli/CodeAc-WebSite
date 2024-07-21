const OurTeamModel = require("../models/ourTeam.model");

const OurTeamController = {
    getAll: async (req, res) => {
        try {
            const ourTeam = await OurTeamModel.find({})
            res.status(200).send(ourTeam)

        } catch (err) {
            res.status(404).send('Error In Getting All Our Team' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const ourTeam = await OurTeamModel.findById(id)
            res.status(200).send(ourTeam)

        } catch (err) {
            res.status(404).send('Error In Getting One Our Team' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deletingOurTeam = await OurTeamModel.findByIdAndDelete(id)
            res.send(deletingOurTeam)

        } catch (err) {
            res.status(404).send('Error In Deleting Our Team' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                image,
                title,
                content,


            } = req.body
            const newOurTeam = new OurTeamModel({
                image: image.trim(),
                title: title.trim(),
                content: content.trim(),


            })
            await newOurTeam.save()
            res.status(200).send(newOurTeam)
        } catch (err) {
            res.status(404).send('Error In Posting Our Team' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                image,
                title,
                content,

            } = req.body

            await OurTeamModel.findByIdAndUpdate(id, {
                image: image.trim(),
                title: title.trim(),
                content: content.trim(),

            })
            const updatedOurTeam = await OurTeamModel.findById(id)
            res.status(200).send(updatedOurTeam)
        } catch (err) {
            res.status(404).send('Error In Editing Our Team' + err)
        }
    },
}


module.exports = OurTeamController