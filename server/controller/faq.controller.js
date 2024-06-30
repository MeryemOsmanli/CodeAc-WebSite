const FaqModel = require("../models/faq.model");

const FaqController = {
    getAll: async (req, res) => {
        try {
            const questions = await FaqModel.find({})
            res.status(200).send(questions)

        } catch (err) {
            res.status(404).send('Error In Getting All Questions' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const question = await FaqModel.findById(id)
            res.status(200).send(question)

        } catch (err) {
            res.status(404).send('Error In Getting One Question' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteQuestion = await FaqModel.findByIdAndDelete(id)
            res.send(deleteQuestion)

        } catch (err) {
            res.status(404).send('Error In Deleting Question' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                type,
                title,
                content,
            } = req.body
            const newQuestion = new FaqModel({
                type: type.trim(),
                title: title.trim(),
                content: content.trim(),

            })
            await newQuestion.save()
            res.status(200).send(newQuestion)
        } catch (err) {
            res.status(404).send('Error In Posting Question' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                type,
                title,
                content,
            } = req.body

            await FaqModel.findByIdAndUpdate(id, {
                type: type.trim(),
                title: title.trim(),
                content: content.trim(),
            })
            const updatedQuestion = await FaqModel.findById(id)
            res.status(200).send(updatedQuestion)
        } catch (err) {
            res.status(404).send('Error In Editing Question' + err)
        }
    },
}


module.exports = FaqController