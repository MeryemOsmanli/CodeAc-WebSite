const BlogModel = require("../models/blog.model");

const BlogController = {
    getAll: async (req, res) => {
        try {
            const blogs = await BlogModel.find({})
            res.status(200).send(blogs)

        } catch (err) {
            res.status(404).send('Error In Getting All Blogs' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const blog = await BlogModel.findById(id)
            res.status(200).send(blog)

        } catch (err) {
            res.status(404).send('Error In Getting One Blog' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteBlog = await BlogModel.findByIdAndDelete(id)
            res.send(deleteBlog)

        } catch (err) {
            res.status(404).send('Error In Deleting Blog' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                title,
                image,
                posterTitle,
                tags,
                description,
                content,
            } = req.body

            const newBlog = new BlogModel({
                image: image.trim(),
                title: title.trim(),
                posterTitle: posterTitle.trim(),
                tags: tags.trim(),
                description: description,
                content: content.trim(),

            })
            await newBlog.save()
            res.status(200).send(newBlog)
        } catch (err) {

            res.status(404).send('Error In Posting Blog' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                title,
                image,
                posterTitle,
                tags,
                description,
                content,
            } = req.body

            await BlogModel.findByIdAndUpdate(id, {
                image: image.trim(),
                title: title.trim(),
                posterTitle: posterTitle.trim(),
                tags: tags.trim(),
                description: description,
                content: content.trim(),
            })
            const updatedBlog = await BlogModel.findById(id)
            res.status(200).send(updatedBlog)
        } catch (err) {
            res.status(404).send('Error In Editing Blogs' + err)
        }
    },


}
module.exports = BlogController;