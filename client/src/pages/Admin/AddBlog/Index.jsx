import React from 'react'
import { Helmet } from 'react-helmet'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { postBlog } from '../../../redux/slices/blogSlice';
import { useDataContext } from '../../../context/context';
const AddBlog = () => {
    const { theme } = useDataContext()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: "",
            image: "",
            posterTitle: "By Admin",
            tags: "",
            description: "",
            content: "",

        },
        validationSchema: Yup.object({
            description: Yup.string()
                .required('Blog Description Is Required'),
            title: Yup.string()
                .required('Blog Title Is Required'),
            content: Yup.string()
                .required('Blog Content Is Required'),
            image: Yup.string()
                .required('Blog Image Is Required'),
            tags: Yup.string()
                .required('Blog Tag Is Required'),

        }),
        onSubmit: async (values) => {
            const splt = values.description.split('\n')
            const newData = {
                title: values.title.trim(),
                description: splt,
                image: values.image.trim(),
                content: values.content.trim(),
                posterTitle: values.posterTitle.trim(),
                tags: values.tags.trim()
            }
            dispatch(postBlog(newData));
            formik.resetForm()
            navigate('/admin/blogs')
        },

    });

    return (
        <main className={`addManagement ${theme ? " " : "addLight"}`} >

            <Helmet>
                <title>Add Blog</title>
            </Helmet>
            <div className="addManagementInside">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <div className='addManagementInsideCard'>
                                <div className="addManagementInsideCardBox">
                                    <h4 >Add Blog</h4>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogTitle">Blog Title</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.title}
                                                name='title'
                                                type="text" id='blogTitle' placeholder='Enter Blog Title' />
                                            {formik.touched.title && formik.errors.title ? (
                                                <div className='testimonialError'>{formik.errors.title}</div>
                                            ) : null}

                                        </div>

                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogImage">Blog Image</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.image}
                                                name='image'
                                                type="text" id='blogImage' placeholder='Enter Blog Image' />
                                            {formik.touched.image && formik.errors.image ? (
                                                <div className='testimonialError'>{formik.errors.image}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogContent">Blog Content</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.content}
                                                name='content'
                                                type="text" id='blogContent' placeholder='Enter Blog Content' />
                                            {formik.touched.content && formik.errors.content ? (
                                                <div className='testimonialError'>{formik.errors.content}</div>
                                            ) : null}

                                        </div>
                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogTag">Blog Tag</label>
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.tags}
                                                name='tags'
                                                type="text" id='blogTag' placeholder='Enter Blog Tag' />
                                            {formik.touched.tags && formik.errors.tags ? (
                                                <div className='testimonialError'>{formik.errors.tags}</div>
                                            ) : null}

                                        </div>


                                        <div className="addManagementFormItem ">
                                            <label htmlFor="blogDescription">Blog Description</label>
                                            <textarea
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                name='description'
                                                type="text" id='blogDescription' placeholder='Enter Blog Description' cols="30" rows="10"></textarea>
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className='testimonialError'>{formik.errors.description}</div>
                                            ) : null}
                                        </div>

                                        <div className="managementFormBtn  ">
                                            <button type='submit ' className='btn btn-outline-success  w-100'>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AddBlog
